import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "../Form.module.css";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import * as Yup from "yup";
import localization from "../../../../localizationConfig";
import FileUploadInput from "../../FileUploadInput/FileUploadInput.component";
import { ErrorTypes } from "../../../../enums/ErrorTypes.enum";
import handleErrorType from "../../../../utils/handleErrorUtils/HnadleError.utils";

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
      handleErrorType(errorType as ErrorTypes, {
        timeout: `${
          isCreateMode ? "creating" : "updating"
        } timed out. Please try again.`,
      });
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
