import React, { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import TextInput from "../../textField/TextField.component";
import style from "./EditForm.module.css";
import BigSubmitButton from "../../Buttons/BigSubmitButton.component";
import SmallSubmitButton from "../../Buttons/SmallSubmitButton.component";
import SmallButtonLoader from "../../loaders/SmallButtonLoaders.component";
import { notifyError } from "../../../../utils/toastUtils/Toast.utils";
interface EditFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onUpdate: (cityId: number, name: string, description: string) => void;
  cityInfo: { id: number; name: string; description: string } | null;
}

const EditForm: React.FC<EditFormProps> = ({
  isOpen,
  onCancel,
  onUpdate,
  cityInfo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: cityInfo?.name || "",
    description: cityInfo?.description || "",
  };

  const handleUpdate = async (values: any) => {
    try {
      setIsLoading(true);
      if (cityInfo) {
        await onUpdate(cityInfo.id, values.name, values.description);
      }
    } catch (error) {
      notifyError("Updating city failed..");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Box className={style.modalContainer}>
        <Formik initialValues={initialValues} onSubmit={handleUpdate}>
          <Form>
            <TextInput
              label="City name"
              name="name"
              fullWidth
              className={style.textField}
            />
            <TextInput
              label="City description"
              name="description"
              fullWidth
              multiline
              rows={4}
              className={style.textField}
            />
            <Box className={style.buttonContainer}>
              <Button
                variant="contained"
                onClick={onCancel}
                className={style.cancelButton}
              >
                Cancel
              </Button>
              {!isLoading ? (
                <SmallSubmitButton text={"Update"} buttonWidth={110} />
              ) : (
                <SmallButtonLoader buttonWidth="110px" buttonHeight="38px" />
              )}
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditForm;
