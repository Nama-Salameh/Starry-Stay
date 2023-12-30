import React from "react";
import { Input } from "@mui/material";
import style from "./FileUploadInput.module.css";

interface FileUploadInputProps {
  formikProps: any;
  name: string;
  label: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  formikProps,
  label,
  name,
}) => {
  return (
    <div className={style.fileUploadContainer}>
      <label htmlFor={name}>
        {label}
      </label>
      <Input
        type="file"
        id={name}
        name={name}
        className={style.fileInput}
        inputProps={{
          accept: "image/*",
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            formikProps.setFieldValue(name, file);
          },
        }}
      />
      {formikProps.touched[name] && formikProps.errors[name] ? (
        <div className={style.error}>{formikProps.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default FileUploadInput;
