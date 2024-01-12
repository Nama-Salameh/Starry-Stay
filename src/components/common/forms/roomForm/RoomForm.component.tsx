import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Input, Switch } from "@mui/material";
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
import AmenitiesForm from "../amenitiesForm/AmenitiesFrom.component";
type RoomAmenityForCreate = {
  name: string;
  description: string;
};
type RoomAmenityForUpdate = RoomAmenityForCreate & {
  id: number;
};
interface RoomFormProps {
  onCancel: () => void;
  onSubmit: (
    roomNumber: number,
    cost: number,
    roomId: number,
    imageFile?: File | null
  ) => Promise<void> | undefined;
  initialValues: {
    id: number;
    roomNumber: number | null;
    cost: number | null;
    amenities: RoomAmenityForUpdate[];
    imageFile?: File | null;
  };
  isCreateMode?: boolean;
  onAmenitiesChange: (
    roomId: number,
    amenities: RoomAmenityForCreate[] | RoomAmenityForUpdate[]
  ) => Promise<void>;
}

const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
};

const RoomForm: React.FC<RoomFormProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
  onAmenitiesChange,
}) => {
  const roomId = initialValues.id;
  const [type, setType] = useState("standard");
  const [capacityOfAdults, setCapacityOfAdults] = useState(2);
  const [capacityOfChildren, setCapacityOfChildren] = useState(1);
  const [availability, setAvailability] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [roomAmenities, setRoomAmenities] = useState<RoomAmenityForCreate[]>(
    initialValues.amenities
  );
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityDescription, setNewAmenityDescription] = useState("");
  const [isAddingAmenity, setIsAddingAmenity] = useState(false);
  const [editingAmenityId, setEditingAmenityId] = useState(-1);

  const handleFormSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (roomId !== undefined && roomId !== -1) {
        await onAmenitiesChange(roomId, roomAmenities);
        await onSubmit(values.roomNumber, values.cost, roomId);
      } else if (isCreateMode) {
        await onAmenitiesChange(roomId, values.amenities);
        await onSubmit(values.roomNumber, values.cost, values.imageFile);
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
            } room. please Try again`
          );
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAmenity = () => {
    const newAmenity: RoomAmenityForCreate = {
      name: newAmenityName,
      description: newAmenityDescription,
    };

    if (editingAmenityId !== -1) {
      const updatedAmenities = roomAmenities.map((amenity, index) =>
        index === editingAmenityId ? newAmenity : amenity
      );
      setRoomAmenities(updatedAmenities);
      setEditingAmenityId(-1);
    } else {
      setRoomAmenities([...roomAmenities, newAmenity]);
    }

    setNewAmenityName("");
    setNewAmenityDescription("");
    setIsAddingAmenity(false);
  };

  const handleEditAmenity = (id: number) => {
    const amenityToEdit = roomAmenities[id];
    if (amenityToEdit) {
      setNewAmenityName(amenityToEdit.name || "");
      setNewAmenityDescription(amenityToEdit.description || "");
      setEditingAmenityId(id);
      setIsAddingAmenity(true);
    }
  };

  const handleRemoveAmenity = (id: number) => {
    const updatedAmenities = [...roomAmenities];
    updatedAmenities.splice(id, 1);
    setRoomAmenities(updatedAmenities);
  };

  const handleAmenitiesChangeInRoomForm = async (updatedAmenities: any) => {
    setRoomAmenities(updatedAmenities);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={Yup.object({
        roomNumber: Yup.number().required(localization.required),
        cost: Yup.number().required(localization.required),
        imageFile: isCreateMode
          ? Yup.mixed().notRequired().nullable()
          : Yup.mixed(),
      })}
    >
      {(formikProps) => {
        return (
          <Form>
            <h3>
              {isCreateMode ? localization.create : localization.update}{" "}
              {localization.room}
            </h3>
            <TextInput
              label="Room number"
              name="roomNumber"
              fullWidth
              required
              value={formikProps.values.roomNumber ?? ""}
              className={style.textField}
            />
            <TextInput
              label="Room cost"
              name="cost"
              fullWidth
              required
              value={formikProps.values.cost ?? ""}
              className={style.textField}
            />
            <TextInput
              label="Room type"
              name="type"
              fullWidth
              required
              value={type}
              onChange={(e: any) => setType(e.target.value)}
              className={style.textField}
            />
            <TextInput
              label="Capacity of adults"
              name="capacityOfAdults"
              fullWidth
              required
              value={capacityOfAdults}
              onChange={(e: any) => setCapacityOfAdults(e.target.value)}
              className={style.textField}
            />
            <TextInput
              label="Capacity of children"
              name="capacityOfChildren"
              fullWidth
              required
              value={capacityOfChildren}
              onChange={(e: any) => setCapacityOfChildren(e.target.value)}
              className={style.textField}
            />
            <div>
              Availability
              <Switch
                name="availability"
                checked={availability}
                onChange={(e: any) => setAvailability(e.target.checked)}
              />
            </div>
            <AmenitiesForm
              amenities={formikProps.values.amenities}
              onAddAmenity={handleAddAmenity}
              onEditAmenity={handleEditAmenity}
              onRemoveAmenity={handleRemoveAmenity}
              onAmenitiesChange={handleAmenitiesChangeInRoomForm}
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
                {localization.cancel}{" "}
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

export default RoomForm;
