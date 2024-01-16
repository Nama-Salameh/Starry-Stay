import React, { useState } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "../Form.module.css";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import * as Yup from "yup";
import localization from "../../../../localizationConfig";
import FileUploadInput from "../../FileUploadInput/FileUploadInput.component";
import { ErrorTypes } from "../../../../enums/ErrorTypes.enum";
import AmenitiesForm from "../amenitiesForm/AmenitiesFrom.component";
import handleErrorType from "../../../../utils/handleErrorUtils/HnadleError.utils";

type HotelAmenityForCreate = {
  name: string;
  description: string;
};
type HotelAmenity = HotelAmenityForCreate & {
  id: number;
};
type City = {
  id: number;
  name: string;
  description: string;
};
type CreateHotelSubmitFunction = (
  name: string,
  description: string,
  starRating: number,
  latitude: number,
  longitude: number,
  hotelType: number,
  cityId: number,
  imageFile: File[] | null,
  hotelAmenities: HotelAmenityForCreate[] | null
) => Promise<void>;

type UpdateHotelSubmitFunction = (
  name: string,
  description: string,
  starRating: number,
  latitude: number,
  longitude: number,
  hotelId: number
) => Promise<void>;
interface HotelFormProps {
  onCancel: () => void;
  onSubmit: CreateHotelSubmitFunction | UpdateHotelSubmitFunction;
  initialValues: {
    name: string;
    description: string;
    hoteltype: number;
    starrating: number;
    latitude: number;
    longitude: number;
    cities: City[] | null;
    amenities: HotelAmenity[] | [];
    hotelId?: number | undefined;
    cityId?: number | null;
    imageFile?: File[] | null;
  };
  isCreateMode?: boolean;
  onAmenitiesChange?: (
    hotelId: number,
    amenities: HotelAmenityForCreate[] | HotelAmenity[]
  ) => Promise<void>;
}

const HotelForm: React.FC<HotelFormProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
  onAmenitiesChange,
}) => {
  console.log("the amenities : ", initialValues.amenities);
  const [isLoading, setIsLoading] = useState(false);
  const [hotelAmenities, setHotelAmenities] = useState<HotelAmenityForCreate[]>(
    initialValues.amenities || []
  );
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityDescription, setNewAmenityDescription] = useState("");
  const [editingAmenityId, setEditingAmenityId] = useState(-1);

  const handleFormSubmit = async (values: any, formikProps: any) => {
    try {
      setIsLoading(true);

      if (isCreateMode) {
        await (onSubmit as CreateHotelSubmitFunction)(
          values.name,
          values.description,
          values.starrating,
          values.latitude,
          values.longitude,
          values.hoteltype,
          values.cityId,
          values.imageFile,
          hotelAmenities
        );
      } else if (values.hotelId !== undefined) {
        if (onAmenitiesChange) {
          await onAmenitiesChange(values.hotelId, hotelAmenities);
        }
        await (onSubmit as UpdateHotelSubmitFunction)(
          values.name,
          values.description,
          values.starrating,
          values.latitude,
          values.longitude,
          values.hotelId
        );
      }
      formikProps.resetForm();
      setHotelAmenities([]);
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

  const handleAddAmenity = () => {
    const newAmenity: HotelAmenityForCreate = {
      name: newAmenityName,
      description: newAmenityDescription,
    };

    if (editingAmenityId !== -1) {
      const updatedAmenities = hotelAmenities.map((amenity, index) =>
        index === editingAmenityId ? newAmenity : amenity
      );
      setHotelAmenities(updatedAmenities);
      setEditingAmenityId(-1);
    } else {
      setHotelAmenities([...hotelAmenities, newAmenity]);
    }

    setNewAmenityName("");
    setNewAmenityDescription("");
  };

  const handleEditAmenity = (id: number) => {
    const amenityToEdit = hotelAmenities[id];
    if (amenityToEdit) {
      setNewAmenityName(amenityToEdit.name || "");
      setNewAmenityDescription(amenityToEdit.description || "");
      setEditingAmenityId(id);
    }
  };

  const handleRemoveAmenity = (id: number) => {
    const updatedAmenities = [...hotelAmenities];
    updatedAmenities.splice(id, 1);
    setHotelAmenities(updatedAmenities);
  };

  const handleAmenitiesChangeInHotelForm = async (updatedAmenities: any) => {
    setHotelAmenities(updatedAmenities);
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values, formikProps) => {
        handleFormSubmit(values, formikProps);
      }}
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
            error={formikProps.touched.name && Boolean(formikProps.errors.name)}
            className={style.textField}
          />
          <TextInput
            label="Hotel description"
            name="description"
            fullWidth
            required
            multiline
            rows={4}
            error={
              formikProps.touched.description &&
              Boolean(formikProps.errors.description)
            }
            className={style.textField}
          />
          <TextInput
            label="Hotel Type"
            name="hoteltype"
            fullWidth
            required
            error={
              formikProps.touched.hoteltype &&
              Boolean(formikProps.errors.hoteltype)
            }
            className={style.textField}
          />
          <TextInput
            label="Hotel Rating"
            name="starrating"
            fullWidth
            required
            error={
              formikProps.touched.starrating &&
              Boolean(formikProps.errors.starrating)
            }
            className={style.textField}
          />
          <div className={style.hotelLocationContainer}>
            <TextInput
              label="latitude"
              name="latitude"
              required
              error={
                formikProps.touched.latitude &&
                Boolean(formikProps.errors.latitude)
              }
              className={`${style.textField} ${style.locationField}`}
            />
            <TextInput
              label="longitude"
              name="longitude"
              required
              error={
                formikProps.touched.longitude &&
                Boolean(formikProps.errors.longitude)
              }
              className={`${style.textField} ${style.locationField}`}
            />
          </div>
          {isCreateMode && initialValues.cities && (
            <Select
              name="cityId"
              fullWidth
              required
              error={
                formikProps.touched.cityId && Boolean(formikProps.errors.cityId)
              }
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
                {localization.hotelCity}
              </MenuItem>
              {initialValues.cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          )}
          <AmenitiesForm
            amenities={initialValues.amenities}
            onAddAmenity={handleAddAmenity}
            onEditAmenity={handleEditAmenity}
            onRemoveAmenity={handleRemoveAmenity}
            onAmenitiesChange={handleAmenitiesChangeInHotelForm}
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
                setHotelAmenities([]);
              }}
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
