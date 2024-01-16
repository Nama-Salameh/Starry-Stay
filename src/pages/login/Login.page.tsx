import localization from "../../localizationConfig";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logoImage from "../../assets/images/logo.jpeg";
import style from "./Login.module.css";
import TextInput from "../../components/common/textField/TextField.component";
import BigSubmitButton from "../../components/common/Buttons/BigSubmitButton.component";
import { login } from "../../services/users/UserRegistration.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormHelperText } from "@mui/material";
import BigButtonLoader from "../../components/common/loaders/BigButtonLoader.component";
import { getDecodedToken } from "../../utils/TokenUtils";
import IToken from "../../interfaces/IToken.interface";
import { useMediaQuery } from "@mui/material";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import handleErrorType from "../../utils/handleErrorUtils/HnadleError.utils";

const errorMessages = {
  unauthorized: localization.incorrectUsernameOrPassword,
  notFound: localization.userNotFoundError,
  timeout: localization.loginTimedout,
};

export default function Login() {
  const isSmallScreen = useMediaQuery("(max-width:550px)");
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const decodedToken: IToken | null = getDecodedToken() as IToken | null;

  useEffect(() => {
    document.title = localization.loginPageTitle;
  });
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      setIsLoginLoading(true);
      await login(values.username, values.password);
      if (decodedToken?.userType === "Admin") navigate("/Admin");
      else navigate("/home");
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        notFound: errorMessages.notFound,
        timeout: errorMessages.timeout,
      });
      if (errorType === ErrorTypes.Unauthorized)
        setValidationMessage(errorMessages.unauthorized);
    } finally {
      setIsLoginLoading(false);
    }
  };
  const handleInputChange = () => {
    setValidationMessage("");
  };

  return (
    <div className={style.loginContainer}>
      <img src={logoImage} className={style.logo} alt="logo" />
      <h1 className={style.title}>{localization.login}</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required(localization.required),
          password: Yup.string().required(localization.required),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values);
          setSubmitting(false);
        }}
      >
        <Form className={style.from}>
          <TextInput
            label={localization.userName}
            name="username"
            type="text"
            placeholder={localization.userName}
            onChange={handleInputChange}
          />
          <TextInput
            label={localization.password}
            name="password"
            type="password"
            placeholder={localization.password}
            onChange={handleInputChange}
          />
          {validationMessage !== "" && (
            <FormHelperText className={`${style.error} mt-2`}>
              {validationMessage}
            </FormHelperText>
          )}
          {!isSmallScreen ? (
            !isLoginLoading ? (
              <BigSubmitButton text={localization.login} />
            ) : (
              <BigButtonLoader />
            )
          ) : !isLoginLoading ? (
            <BigSubmitButton text={localization.login} buttonWidth={340} />
          ) : (
            <BigButtonLoader buttonWidth={340} />
          )}
        </Form>
      </Formik>
    </div>
  );
}
