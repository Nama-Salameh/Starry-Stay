import React from "react";
import style from "./PaymentInfoContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faCalendarDays,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import localization from "../../../localizationConfig";
export default function PaymentInfoContainer({
  paymentInfo,
}: {
  paymentInfo: {
    paymentMethod: string;
    totalCost: number;
    formattedDate: string;
    formattedTime: string;
  };
}) {
  return (
    <div className={style.paymentInfo}>
      <p>
        <FontAwesomeIcon icon={faCreditCard} className={style.icon} />
        <b>{localization.payment} : </b>
        {paymentInfo.paymentMethod}
      </p>
      <p>
        <FontAwesomeIcon icon={faDollarSign} className={style.icon} />
        <b>{localization.totalCost} : </b> {paymentInfo.totalCost}
        <b>$</b>
      </p>
      <p>
        <FontAwesomeIcon icon={faCalendarDays} className={style.icon} />
        {paymentInfo.formattedDate}
      </p>
      <p>
        <FontAwesomeIcon icon={faClock} className={style.icon} />
        {paymentInfo.formattedTime}
      </p>
    </div>
  );
}
