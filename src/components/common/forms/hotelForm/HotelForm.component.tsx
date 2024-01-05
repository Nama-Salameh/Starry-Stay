import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "../Form.module.css";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import { notifyError } from "../../../../utils/toastUtils/Toast.utils";
import * as Yup from "yup";
import localization from "../../../../localizationConfig";
import FileUploadInput from "../../FileUploadInput/FileUploadInput.component";
import { ErrorTypes } from "../../../../enums/ErrorTypes.enum";

type City = {
  id: number;
  name: string;
  description: string;
};

interface HotelFormProps {
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    starrating: number,
    latitude: number,
    longitude: number,
    hotelId?: number,
    hotelType?: number,
    cityId?: number,
    imageFile?: File | null
  ) => Promise<void> | undefined;
  initialValues: {
    name: string;
    description: string;
    hoteltype: number;
    starrating: number;
    latitude: number;
    longitude: number;
    cities: City[] | null;
    hotelId?: number | undefined;
    cityId?: number | null;
    imageFile?: File | null;
  };
  isCreateMode?: boolean;
}

const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
};

const HotelForm: React.FC<HotelFormProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("Received Initial Values:", initialValues);

  const handleFormSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      if (values.hotelId !== undefined) {
        await onSubmit(
          values.name,
          values.description,
          values.starrating,
          values.latitude,
          values.longitude,
          values.hotelId
        );
      } else if (isCreateMode) {
        await onSubmit(
          values.name,
          values.description,
          values.starrating,
          values.latitude,
          values.longitude,
          values.hoteltype,
          values.cityId,
          values.imageFile
        );
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
            } hotel. please Try again`
          );
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={Yup.object({
        name: Yup.string().required(localization.required),
        description: Yup.string().required(localization.required),
        starrating: Yup.number().required(localization.required),
        latitude: Yup.number().required(localization.required),
        longitude: Yup.number().required(localization.required),
        cityId: Yup.number().required(localization.required),
        hoteltype: Yup.number().required(localization.required),
        imageFile: isCreateMode
          ? Yup.mixed().notRequired().nullable()
          : Yup.mixed(),
      })}
    >
      {(formikProps) => (
        <Form className={style.formContainer}>
          <h3>{isCreateMode ? "Create" : "Update"} Hotel</h3>
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
          {isCreateMode && initialValues.cities && (
            <Select
              name="cityId"
              fullWidth
              required
              value={formikProps.values.cityId || localization.hotelCity}
              onChange={(e) =>
                formikProps.setFieldValue("cityId", e.target.value)
              }
              renderValue={() => {
                if (!formikProps.values.cityId) {
                  return <span>{localization.hotelCity}</span>;
                } else {
                  const selectedCity = initialValues.cities?.find(
                    (city) => city.id === formikProps.values.cityId
                  );
                  return (
                    <span>
                      {selectedCity
                        ? selectedCity.name
                        : localization.hotelCity}
                    </span>
                  );
                }
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
              className={style.textField}
            >
              <MenuItem disabled value="">
                Hotel City
              </MenuItem>
              {initialValues.cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          )}
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
  );
};

export default HotelForm;
