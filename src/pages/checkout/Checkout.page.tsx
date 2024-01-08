import React, { useEffect, useState, startTransition } from "react";
import localization from "../../localizationConfig";
import { postBooking } from "../../services/booking/Booking.service";
import { getDecodedToken } from "../../utils/TokenUtils";
import style from "./Checkout.module.css";
import IToken from "../../interfaces/IToken.interface";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import { CircularProgress, useMediaQuery } from "@mui/material";
import BookedRooms from "../../components/checkoutComponents/BookedRooms.component";
import BigSubmitButton from "../../components/common/Buttons/BigSubmitButton.component";
import { Select, MenuItem } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "../../components/common/textField/TextField.component";
import { useNavigate } from "react-router";
import BigButtonLoader from "../../components/common/loaders/BigButtonLoader.component";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import { notifyError } from "../../utils/toastUtils/Toast.utils";

type RoomDetails = {
  roomNumber: number;
  roomType: string;
  price: number;
  hotelName: string;
};

const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
  conflict: localization.conflictBookingError,
};

export default function Checkout() {
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const navigate = useNavigate();
  const userInfo: IToken = getDecodedToken() as IToken;
  console.log(userInfo);
  const [selectedRooms, setSelectedRooms] = useState<RoomDetails[]>([]);
  const handleRoomDetailsChange = (details: RoomDetails[]) => {
    setSelectedRooms(details);
  };
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("selected rooms : ", selectedRooms);

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsConfirmLoading(true);
      console.log("Form values:", values);
      //post booking
      /*for (const room of selectedRooms) {
      const bookingDateTime = new Date();
      const bookingStatus = "Confirmed";
      try {
        await postBooking(
          `${userInfo.given_name} ${userInfo.family_name}`,
          room.hotelName,
          room.roomNumber.toString(),
          room.roomType,
          bookingDateTime,
          room.price,
          values.paymentMethod,
          bookingStatus
        );
      } catch (error) {
        console.error("Error posting booking:", error);
      }
    }*/
      startTransition(() => navigate("/confirmation"));
    } catch (errorType) {
      switch (errorType) {
        case ErrorTypes.Network:
          notifyError(errorMessages.network);
          break;
        case ErrorTypes.Conflict:
          notifyError(errorMessages.conflict);
          break;
        case ErrorTypes.Unknown:
          notifyError(errorMessages.unknown);
          break;
      }
    } finally {
      setIsConfirmLoading(false);
      setIsLoading(false);
      resetForm();
    }
  };
  return (
    <div className={style.pageContainer}>
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>Loading...</span>
        </div>
      )}
      {!isLoading && (
        <div>
          <BookedRooms onRoomDetailsChange={handleRoomDetailsChange} />
          <div className={style.personalInfoContainer}>
            <h2>
              {userInfo.given_name} {userInfo.family_name}
            </h2>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={{ paymentMethod: "", specialRequests: "" }}
              validationSchema={Yup.object({
                paymentMethod: Yup.string().required(localization.required),
              })}
            >
              {({ handleChange, values }) => (
                <Form className={style.form}>
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
                    placeholder="Any Speical remarks or requests"
                    onChange={handleFormSubmit}
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
        </div>
      )}
    </div>
  );
}
