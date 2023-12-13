import React from "react";
import localization from "../../localizationConfig";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logoImage from "../../assets/images/logo.jpeg";
import style from "./Login.module.css";
import TextInput from "../../components/common/textFile/TextField.component";
import BigSubmitButton from "../../components/common/Buttons/BigSubmitButton.component";

const handleLogin = () => {};

export default function Login() {
  return (
    <div className={style.loginContainer}>
      <img src={logoImage} className={style.logo} alt="logo" />
      <h1 className={style.title}>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(localization.InvalidEmail)
            .required(localization.required),
          password: Yup.string()
            .min(8, localization.InvalidPassword)
            .required(localization.required),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={style.from}>
          <TextInput
            label={localization.email}
            name="email"
            type="email"
            placeholder={localization.email}
          />
          <TextInput
            label={localization.password}
            name="password"
            type="password"
            placeholder={localization.password}
          />
          <BigSubmitButton text={localization.login} onClick={handleLogin} />
        </Form>
      </Formik>
    </div>
  );
}
