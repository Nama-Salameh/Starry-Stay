import React, { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "../Form.module.css";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import { notifyError } from "../../../../utils/toastUtils/Toast.utils";
import * as Yup from "yup";
import localization from "../../../../localizationConfig";
import FileUploadInput from "../../FileUploadInput/FileUploadInput.component";

interface HotelFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    starrating: number,
    latitude: number,
    longitude: number,
    hotelId?: number,
    imageFile?: File | null
  ) => Promise<void> | undefined;
  initialValues: {
    name: string;
    description: string;
    hoteltype: number;
    starrating: number;
    latitude: number;
    longitude: number;
    imageFile?: File | null;
  };
  isCreateMode?: boolean;
}

const HotelForm: React.FC<HotelFormProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values: any) => {
    console.log("Entering handleFormSubmit");
    console.log("Submitting form with values:", values);
    try {
      setIsLoading(true);

      if (values.hotelId !== undefined) {
        console.log("Updating hotel:", values.hotelId);

        await onSubmit(
          values.name,
          values.description,
          values.starrating,
          values.latitude,
          values.longitude,
          values.hotelId
        );
      } else if (isCreateMode) {
        console.log("Creating hotel");

        await onSubmit(
          values.name,
          values.description,
          values.hoteltype,
          values.starrating,
          values.latitude,
          values.longitude,
          values.imageFile
        );
      }
      console.log("Form submitted successfully");
    } catch (error) {
      notifyError(`Failed ${isCreateMode ? "creating" : "updating"} hotel.`);
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
            name: Yup.string().required(localization.required),
            description: Yup.string().required(localization.required),
            starrating: Yup.number().required(localization.required),
            latitude: Yup.number().required(localization.required),
            longitude: Yup.number().required(localization.required),
            imageFile: isCreateMode
              ? Yup.mixed().notRequired().nullable()
              : Yup.mixed(),
          })}
        >
          {(formikProps) => (
            <Form className={style.formContainer}>
              <TextInput
                label="Hotel name"
                name="name"
                fullWidth
                required
                className={style.textField}
              />
              <TextInput
                label="Hotel description"
                name="description"
                fullWidth
                required
                multiline
                rows={4}
                className={style.textField}
              />
              <TextInput
                label="Hotel Type"
                name="hoteltype"
                fullWidth
                required
                className={style.textField}
              />
              <TextInput
                label="Hotel Rating"
                name="starrating"
                fullWidth
                required
                className={style.textField}
              />
              <div className={style.hotelLocationContainer}>
                <TextInput
                  label="latitude"
                  name="latitude"
                  required
                  className={`${style.textField} ${style.locationField}`}
                />
                <TextInput
                  label="longitude"
                  name="longitude"
                  required
                  className={`${style.textField} ${style.locationField}`}
                />
              </div>
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

export default HotelForm;
