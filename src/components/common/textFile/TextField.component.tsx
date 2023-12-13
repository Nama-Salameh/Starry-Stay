import { useField, FieldAttributes } from "formik";
import style from "./TextField.component.module.css";
import { TextField } from "@mui/material";

const TextInput: React.FC<FieldAttributes<any>> = ({
  label,
  textFieldWidth = 500,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className={style.formField}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextField
        sx={{ width: textFieldWidth }}
        className={style.textInput}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextInput;
