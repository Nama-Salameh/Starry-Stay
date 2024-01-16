import { useField, FieldAttributes } from "formik";
import style from "./TextField.component.module.css";
import { TextField } from "@mui/material";

const TextInput: React.FC<
  FieldAttributes<any> & {
    label: string;
    textFieldWidth?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
> = ({ label, textFieldWidth, onChange, ...props }) => {
  const [field, meta] = useField(props);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={style.formField}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextField
        sx={{ width: textFieldWidth || "100%" }}
        className={style.textInput}
        {...field}
        {...props}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextInput;
