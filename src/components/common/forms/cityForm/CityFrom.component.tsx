import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Input } from "@mui/material";
import { Formik, Form } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "./Form.module.css";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import { notifyError } from "../../../../utils/toastUtils/Toast.utils";
import * as Yup from "yup";
import localization from "../../../../localizationConfig";
import FileUploadInput from "../../FileUploadInput/FileUploadInput.component";

interface CityFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    cityId?: number,
    imageFile?: File | null
  ) => Promise<void> | undefined;
  initialValues: { name: string; description: string; imageFile?: File | null };
  isCreateMode?: boolean;
}

const CityForm: React.FC<CityFormProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (Object.keys(values).length === 3 && values.cityId !== undefined) {
        await onSubmit(values.name, values.description, values.cityId);
      } else if (isCreateMode) {
        await onSubmit(values.name, values.description, values.imageFile);
      }
    } catch (error) {
      notifyError(`Failed ${isCreateMode ? "creating" : "updating"} city.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Box className={style.modalContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={Yup.object({
            cityname: Yup.string().required(localization.required),
            description: Yup.string().required(localization.required),
            imageFile: isCreateMode
              ? Yup.mixed().notRequired().nullable()
              : Yup.mixed(),
          })}
        >
          {(formikProps) => (
            <Form>
              <TextInput
                label="City name"
                name="cityname"
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
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default CityForm;
