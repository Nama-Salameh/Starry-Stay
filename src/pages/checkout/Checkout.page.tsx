import React, { useEffect, useState } from "react";
import localization from "../../localizationConfig";
import { getBooking } from "../../services/booking/Booking.service";
import {
  getAllRoomsFromCart,
  removeRoomFromCart,
} from "../../utils/storageUtils/cartStorage/CartStorage";
import {
  getHotelInfoByItsId,
  getHotelRoomsByItsId,
} from "../../services/hotels/Hotels.service";
import { getDecodedToken } from "../../utils/TokenUtils";
import style from "./Checkout.module.css";
import IToken from "../../interfaces/IToken.interface";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useCartContext } from "../../contexts/cartContext/CartContext.context";
import BookedRooms from "../../components/checkoutComponents/BookedRooms.component";
import BigSubmitButton from "../../components/common/Buttons/BigSubmitButton.component";
import { Select, MenuItem, Button, TextareaAutosize } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "../../components/common/textField/TextField.component";

export default function Checkout() {
const userInfo : IToken = getDecodedToken() as IToken;
console.log(userInfo);

  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };
  return (
    <div className={style.pageContainer}>
      <BookedRooms />
      <div className={style.personalInfoContainer}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{ paymentMethod: "", specialRequests: "" }}
          validationSchema={Yup.object({
            paymentMethod: Yup.string().required(localization.required),
          })}
        >
          <Form>
            <div>
              <h2>{userInfo.given_name} {userInfo.family_name}</h2>
              <label htmlFor="paymentMethod">Payment </label>
              <Field
                as={Select}
                name="paymentMethod"
                id="paymentMethod"
                variant="outlined"
                displayEmpty
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
            <div>
              <TextInput
                name="specialRequests"
                type="text"
                placeholder="Any Speical remarks or requests"
                onChange={handleFormSubmit}
                multiline
                rows={5}
                textFieldWidth={0.5}
              />
            </div>
            <BigSubmitButton text={localization.confirm} buttonWidth={300} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
