import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, MenuItem } from "@mui/material";
import * as Yup from "yup";
import TextInput from "../../common/textField/TextField.component";
import BigSubmitButton from "../../common/Buttons/BigSubmitButton.component";
import BigButtonLoader from "../../common/loaders/BigButtonLoader.component";
import style from "./PersonalInfoContainer.module.css";
import localization from "../../../localizationConfig";

const PersonalInfo = ({
  userInfo,
  onSubmit,
  isConfirmLoading,
  isSmallScreen,
}: {
  userInfo: { givenName: string; familyName: string };
  onSubmit: (values: any, actions: any) => void;
  isConfirmLoading: boolean;
  isSmallScreen: boolean;
}) => {
  return (
    <div>
      <h2>
        {userInfo.givenName} {userInfo.familyName}
      </h2>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ paymentMethod: "", specialRequests: "" }}
        validationSchema={Yup.object({
          paymentMethod: Yup.string().required(localization.required),
        })}
      >
        {({ handleChange, values }) => (
          <Form >
            <div className={style.paymentSelectContainer}>
              <Field
                as={Select}
                name="paymentMethod"
                id="paymentMethod"
                variant="outlined"
                displayEmpty
                className={style.paymentMethodSelector}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  <em>{localization.paymentMethod}</em>
                </MenuItem>
                <MenuItem value={localization.cash}>
                  {localization.cash}
                </MenuItem>
                <MenuItem value={localization.creditCard}>
                  {localization.creditCard}
                </MenuItem>
              </Field>
              <ErrorMessage
                name="paymentMethod"
                component="div"
                className="error"
              />
            </div>
            <TextInput
              name="specialRequests"
              type="text"
              placeholder={localization.specialRemarks}
              onChange={handleChange}
              multiline
              rows={5}
              textFieldWidth={1}
              className={style.specialRequsetField}
            />
            <div className={style.submitButton}>
              {!isSmallScreen ? (
                !isConfirmLoading ? (
                  <BigSubmitButton
                    text={localization.confirm}
                    disabled={!values.paymentMethod}
                    buttonWidth={600}
                  />
                ) : (
                  <BigButtonLoader buttonWidth={600} />
                )
              ) : !isConfirmLoading ? (
                <BigSubmitButton
                  text={localization.confirm}
                  disabled={!values.paymentMethod}
                  buttonWidth={270}
                />
              ) : (
                <BigButtonLoader buttonWidth={270} />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfo;
