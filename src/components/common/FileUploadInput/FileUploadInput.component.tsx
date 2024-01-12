import React, { useEffect, useState } from "react";
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
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      const newImages = [...images, ...Array.from(files)];

      const newPreviews = Array.from(files).map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={`Selected Image ${index + 1}`}
          style={{
            maxWidth: "100px",
            maxHeight: "100px",
            marginRight: "10px",
          }}
        />
      ));

      const updatedPreviews = [
        ...(formikProps.values[`${name}Previews`] || []),
        ...newPreviews,
      ];

      const updatedImages = [...newImages];

      formikProps.setFieldValue(`${name}Previews`, updatedPreviews);
      formikProps.setFieldValue(name, updatedImages);
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    } else {
      formikProps.setFieldValue(`${name}Previews`, null);
      formikProps.setFieldValue(name, null);
      setImages([]);
    }
  };
  return (
    <div className={style.fileUploadContainer}>
      <label htmlFor={name}>{label}</label>
      <Input
        type="file"
        id={name}
        name={name}
        className={style.fileInput}
        inputProps={{
          accept: "image/*",
          multiple: true,
          onChange: handleChange,
        }}
      />
      <div>{formikProps.values[`${name}Previews`]}</div>
      {formikProps.touched[name] && formikProps.errors[name] ? (
        <div className={style.error}>{formikProps.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default FileUploadInput;
