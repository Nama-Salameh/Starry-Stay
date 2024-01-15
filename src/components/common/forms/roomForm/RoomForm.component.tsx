import React, { useState } from "react";
import { Box, Button, Switch } from "@mui/material";
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

type RoomAmenityForCreate = {
  name: string;
  description: string;
};
type RoomAmenity = RoomAmenityForCreate & {
  id: number;
};

type CreateRoomSubmitFunction = (
  roomNumber: number,
  cost: number,
  imageFile: File[],
  roomAmenities: RoomAmenityForCreate[] | null
) => Promise<void>;

type UpdateRoomSubmitFunction = (
  roomNumber: number,
  cost: number,
  roomId: number
) => Promise<void>;

interface RoomFormProps {
  onCancel: () => void;
  onSubmit: CreateRoomSubmitFunction | UpdateRoomSubmitFunction;

  initialValues: {
    id?: number;
    roomNumber: number | null;
    cost: number | null;
    type: string;
    capacityOfAdults: number | null;
    capacityOfChildren: number | null;
    availability: boolean | undefined;
    amenities: RoomAmenity[] | [];
    imageFile?: File[];
  };
  isCreateMode?: boolean;
  onAmenitiesChange?: (
    roomId: number,
    amenities: RoomAmenityForCreate[] | RoomAmenity[]
  ) => Promise<void>;
}

const RoomForm: React.FC<RoomFormProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  isCreateMode = false,
  onAmenitiesChange,
}) => {
  const roomId = initialValues.id;
  const [isLoading, setIsLoading] = useState(false);
  const [roomAmenities, setRoomAmenities] = useState<RoomAmenityForCreate[]>(
    initialValues.amenities
  );
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityDescription, setNewAmenityDescription] = useState("");
  const [editingAmenityId, setEditingAmenityId] = useState(-1);

  const handleFormSubmit = async (values: any, formikProps: any) => {
    try {
      setIsLoading(true);
      if (roomId !== undefined && roomId !== -1) {
        if (onAmenitiesChange) {
          await onAmenitiesChange(roomId, roomAmenities);
        }
        await (onSubmit as UpdateRoomSubmitFunction)(
          values.roomNumber,
          values.cost,
          roomId
        );
      } else if (isCreateMode) {
        await (onSubmit as CreateRoomSubmitFunction)(
          values.roomNumber,
          values.cost,
          values.imageFile,
          roomAmenities
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
      formikProps.resetForm({ values: initialValues });
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
  };

  const handleEditAmenity = (id: number) => {
    const amenityToEdit = roomAmenities[id];
    if (amenityToEdit) {
      setNewAmenityName(amenityToEdit.name || "");
      setNewAmenityDescription(amenityToEdit.description || "");
      setEditingAmenityId(id);
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

  const handleCancel = (formikProps: any) => {
    formikProps.resetForm({ values: initialValues });
    setRoomAmenities(initialValues.amenities || []);
    setNewAmenityName("");
    setNewAmenityDescription("");
    setEditingAmenityId(-1);
    onCancel();
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, formikProps) => handleFormSubmit(values, formikProps)}
      validationSchema={Yup.object({
        roomNumber: Yup.number().required(localization.required),
        cost: Yup.number().required(localization.required),
        type: Yup.string().required(localization.required),
        capacityOfAdults: Yup.number().nullable(),
        capacityOfChildren: Yup.number().nullable(),
        availability: Yup.boolean().nullable(),
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
              value={formikProps.values.type}
              className={style.textField}
            />
            <TextInput
              label="Capacity of adults"
              name="capacityOfAdults"
              fullWidth
              required
              value={formikProps.values.capacityOfAdults}
              className={style.textField}
            />
            <TextInput
              label="Capacity of children"
              name="capacityOfChildren"
              fullWidth
              required
              value={formikProps.values.capacityOfChildren}
              className={style.textField}
            />
            <div>
              {localization.availability}
              <Switch
                name="availability"
                checked={formikProps.values.availability}
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
                onClick={() => {
                  handleCancel(formikProps);
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

export default RoomForm;
