import React from "react";
import { DatePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import style from "./DatePicker.module.css";
import { useSearchContext } from "../../../../../contexts/SearchContext.context";
import { handleError } from "../../../../../services/ApisConfig";

const DateRangePickerComponent = () => {
  const { searchParams, setSearchParamsValue } = useSearchContext();

  const onChange = (dates: RangeValue<Dayjs>) => {
    try {
      if (Array.isArray(dates) && dates.length === 2 && dates[0] && dates[1]) {
        const startDate = dates[0].format("YYYY-MM-DD");
        const endDate = dates[1].format("YYYY-MM-DD");
        setSearchParamsValue("checkInDate", startDate);
        setSearchParamsValue("checkOutDate", endDate);
      }
    } catch (error) {
      let { message, type } = handleError(error);
      throw { message, type };
    }
  };

  const disabledDate = (date: Dayjs | null) => {
    return date ? date.isBefore(dayjs(), "day") : false;
  };

  return (
    <div className={style.datePickerContainer}>
      <FontAwesomeIcon icon={faCalendarAlt} className={style.calenderIcon} />
      <div className={style.datePicker}>
        <div className={style.datePickerDateLabels}>
          <span>Check-in-date </span>
          <span>Check-out-date</span>
        </div>
        <DatePicker.RangePicker
          value={[searchParams.startDate, searchParams.endDate]}
          onChange={onChange}
          suffixIcon={null}
          className={style.dateRangePicker}
          dropdownClassName={style.customDatePickerDropdown}
          placeholder={["_ _/_ _/_ _ ", "_ _/_ _/_ _"]}
          disabledDate={disabledDate}
        />
      </div>
    </div>
  );
};

export default DateRangePickerComponent;
