import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Input } from "@mui/material";
import { Formik, Form } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "../Form.module.css";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import { notifyError } from "../../../../utils/toastUtils/Toast.utils";
import * as Yup from "yup";
import localization from "../../../../localizationConfig";
import FileUploadInput from "../../FileUploadInput/FileUploadInput.component";
import { ErrorTypes } from "../../../../enums/ErrorTypes.enum";

type CreateCitySubmitFunction = (
  name: string,
  description: string,
  imageFile: File[] | null
) => Promise<void>;

type UpdateCitySubmitFunction = (
  name: string,
  description: string,
  cityId: number
) => Promise<void>;
interface CityFormProps {
  onCancel: () => void;
  onSubmit: CreateCitySubmitFunction | UpdateCitySubmitFunction;
  initialValues: {
    name: string;
    description: string;
    cityId?: number | undefined;
    imageFile?: File[] | null;
  };
  isCreateMode?: boolean;
}

const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
};

const CityForm: React.FC<CityFormProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values: any, formikProps: any) => {
    try {
      setIsLoading(true);
      if (values.cityId !== undefined) {
        await (onSubmit as UpdateCitySubmitFunction)(
          values.name,
          values.description,
          values.cityId
        );
      } else if (isCreateMode) {
        await (onSubmit as UpdateCitySubmitFunction)(
          values.name,
          values.description,
          values.imageFile
        );
      }
      formikProps.resetForm();
    } catch (errorType) {
      switch (errorType) {
        case ErrorTypes.Network:
          notifyError(errorMessages.network);
          break;
        case ErrorTypes.Timeout:
          notifyError(
            `${
              isCreateMode ? "creating" : "updating"
            } timed out. Please try again.`
          );
          break;
        case ErrorTypes.Unknown:
          notifyError(errorMessages.unknown);
          break;
        default:
          notifyError(
            `Failed ${
              isCreateMode ? "creating" : "updating"
            } city. please Try again`
          );
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, formikProps) => handleFormSubmit(values, formikProps)}
      validationSchema={Yup.object({
        name: Yup.string().required(localization.required),
        description: Yup.string().required(localization.required),
        imageFile: isCreateMode
          ? Yup.mixed().notRequired().nullable()
          : Yup.mixed(),
      })}
    >
      {(formikProps) => {
        return (
          <Form>
            <h3>
              {isCreateMode ? "Create" : "Update"} {localization.city}
            </h3>
            <TextInput
              label="City name"
              name="name"
              fullWidth
              required
              className={style.textField}
            />
            <TextInput
              label="City description"
              name="description"
              fullWidth
              required
              multiline
              rows={4}
              className={style.textField}
            />
            {isCreateMode && (
              <FileUploadInput
                formikProps={formikProps}
                label="Upload Image"
                name="imageFile"
              />
            )}

            <Box className={style.buttonContainer}>
              <Button
                variant="contained"
                onClick={() => {
                  onCancel();
                  formikProps.resetForm();
                }}
                className={style.cancelButton}
              >
                {localization.cancel}
              </Button>
              {!isLoading ? (
                <SmallSubmitButton
                  text={isCreateMode ? "Create" : "Update"}
                  buttonWidth={110}
                />
              ) : (
                <SmallButtonLoader buttonWidth="110px" buttonHeight="38px" />
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CityForm;
