import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextInput from "../../textField/TextField.component";
import style from "./AmenitiesForm.module.css";
import localization from "../../../../localizationConfig";

interface Amenity {
  name: string;
  description: string;
}
const AmenitiesForm: React.FC<{
  amenities: Amenity[];
  onAddAmenity: (newAmenity: Amenity) => void;
  onEditAmenity: (id: number, updatedAmenity: Amenity) => void;
  onRemoveAmenity: (id: number) => void;
  onAmenitiesChange: (amenities: Amenity[]) => void;
}> = ({
  amenities,
  onAddAmenity,
  onEditAmenity,
  onRemoveAmenity,
  onAmenitiesChange,
}) => {
  const [newAmenities, setNewAmenities] = useState<Amenity[]>(amenities);
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityDescription, setNewAmenityDescription] = useState("");
  const [isAddingAmenity, setIsAddingAmenity] = useState(false);
  const [editingAmenityId, setEditingAmenityId] = useState(-1);

  useEffect(() => {
    setNewAmenities(amenities);
  }, [amenities]);

  const resetForm = () => {
    setNewAmenityName("");
    setNewAmenityDescription("");
    setIsAddingAmenity(false);
    setEditingAmenityId(-1);
  };
  const handleAddAmenity = () => {
    const newAmenity: Amenity = {
      name: newAmenityName,
      description: newAmenityDescription,
    };

    if (editingAmenityId !== -1) {
      const updatedAmenities = [...newAmenities];
      updatedAmenities[editingAmenityId] = newAmenity;
      setNewAmenities(updatedAmenities);
      onEditAmenity(editingAmenityId, newAmenity);
      onAmenitiesChange(updatedAmenities);
    } else {
      setNewAmenities([...newAmenities, newAmenity]);
      onAddAmenity(newAmenity);
      onAmenitiesChange([...newAmenities, newAmenity]);
    }

    resetForm();
  };

  const handleEditAmenity = (id: number) => {
    const amenityToEdit = newAmenities[id];
    setNewAmenityName(amenityToEdit.name);
    setNewAmenityDescription(amenityToEdit.description);
    setEditingAmenityId(id);
    setIsAddingAmenity(true);
  };

  const handleRemoveAmenity = (id: number) => {
    const updatedAmenities = [...newAmenities];
    updatedAmenities.splice(id, 1);
    setNewAmenities(updatedAmenities);
    onRemoveAmenity(id);
    onAmenitiesChange(updatedAmenities);
    resetForm();
  };

  return (
    <div>
      <p>{localization.amenities}</p>
      <div className={style.amenitiesContainer}>
        {newAmenities.length === 0 ? (
          <p>{localization.noAmenitiesAdded}</p>
        ) : (
          <ul>
            {newAmenities.map((amenity, index) => (
              <li key={index} className={style.amenityItem}>
                <div className={style.amenityDetails}>
                  <strong>{amenity.name}</strong>
                  <p>{amenity.description}</p>
                </div>
                <div className={style.amenityButtons}>
                  <Button
                    onClick={() => handleEditAmenity(index)}
                    variant="outlined"
                    color="primary"
                  >
                    {localization.edit}
                  </Button>
                  <Button
                    onClick={() => handleRemoveAmenity(index)}
                    variant="outlined"
                    color="primary"
                  >
                    {localization.remove}{" "}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(isAddingAmenity || editingAmenityId !== -1) && (
        <div className={style.addAmenityContainer}>
          <TextInput
            label="Amenity Name"
            name="newAmenityName"
            fullWidth
            value={newAmenityName}
            className={style.textField}
            onChange={(e: any) => setNewAmenityName(e.target.value)}
          />
          <TextInput
            label="Amenity Description"
            name="newAmenityDescription"
            fullWidth
            value={newAmenityDescription}
            className={style.textField}
            onChange={(e: any) => setNewAmenityDescription(e.target.value)}
          />
          <div className={style.addAmenityButtons}>
            <Button
              type="button"
              onClick={handleAddAmenity}
              variant="outlined"
              color="primary"
            >
              {editingAmenityId !== -1
                ? localization.update
                : localization.confirm}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsAddingAmenity(false);
                setEditingAmenityId(-1);
                setNewAmenityName("");
                setNewAmenityDescription("");
                setNewAmenities(amenities);
              }}
              variant="outlined"
              color="primary"
            >
              {localization.cancel}{" "}
            </Button>
          </div>
        </div>
      )}

      <div className={style.toggleAmenityButtonContainer}>
        <Button
          variant="outlined"
          type="button"
          onClick={() => setIsAddingAmenity(!isAddingAmenity)}
        >
          {isAddingAmenity ? localization.cancel : localization.addAmenity}
        </Button>
      </div>
    </div>
  );
};

export default AmenitiesForm;
