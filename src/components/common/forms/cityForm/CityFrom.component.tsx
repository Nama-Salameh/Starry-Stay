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

interface CityFormProps {
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    cityId?: number,
    imageFile?: File | null
  ) => Promise<void> | undefined;
  initialValues: {
    name: string;
    description: string;
    cityId?: number | undefined;
    imageFile?: File | null;
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

  const handleFormSubmit = async (values: any) => {
    console.log("values ", values);
    try {
      setIsLoading(true);
      console.log("id", values.cityId);
      if (values.cityId !== undefined) {
        await onSubmit(values.name, values.description, values.cityId);
      } else if (isCreateMode) {
        await onSubmit(values.name, values.description, values.imageFile);
      }
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
      onSubmit={handleFormSubmit}
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
            <h3>{isCreateMode ? "Create" : "Update"} City</h3>
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
                onClick={onCancel}
                className={style.cancelButton}
              >
                Cancel
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
