import React, { useEffect, useState } from "react";
import { Input } from "@mui/material";
import style from "./FileUploadInput.module.css";
import { Button } from "antd";

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
      const newImages = Array.from(files).filter((file) => {
        return !images.some(
          (existingImage) => existingImage.name === file.name
        );
      });

      const newPreviews = newImages.map((file) => (
        <div key={`${file.name}`}>
          <img
            key={`${file.name}`}
            src={URL.createObjectURL(file)}
            alt={`Selected Image ${file.name}`}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              marginRight: "10px",
            }}
          />
          <Button onClick={() => handleDelete(file)}>Delete</Button>
        </div>
      ));

      const updatedPreviews = [
        ...(formikProps.values[`${name}Previews`] || []),
        ...newPreviews,
      ];

      const updatedImages = [...images, ...newImages];

      formikProps.setFieldValue(`${name}Previews`, updatedPreviews);
      formikProps.setFieldValue(name, updatedImages);
      setImages(updatedImages);
    } else {
      formikProps.setFieldValue(`${name}Previews`, null);
      formikProps.setFieldValue(name, null);
      setImages([]);
    }
  };

  const handleDelete = (fileToDelete: File) => {
    setImages((prevImages) =>
      prevImages.filter(
        (existingImage) => existingImage.name !== fileToDelete.name
      )
    );
  };

  useEffect(() => {
    const updatedPreviews = images.map((file) => (
      <div key={`${file.name}`}>
        <img
          key={`${file.name}`}
          src={URL.createObjectURL(file)}
          alt={`Selected Image ${file.name}`}
          style={{
            maxWidth: "100px",
            maxHeight: "100px",
            marginRight: "10px",
          }}
        />
        <Button onClick={() => handleDelete(file)}>Delete</Button>
      </div>
    ));
    const updatedImages = images;
    formikProps.setFieldValue(name, updatedImages);
    formikProps.setFieldValue(`${name}Previews`, updatedPreviews);
    formikProps.setFieldValue(name, images);
  }, [images]);

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
