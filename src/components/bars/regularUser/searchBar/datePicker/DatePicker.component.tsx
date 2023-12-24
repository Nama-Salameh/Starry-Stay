import React, { useEffect, useState } from "react";
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
  const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>([null, null]);
  const onChange = (dates: RangeValue<Dayjs>) => {
    try {
      if (Array.isArray(dates) && dates.length === 2 && dates[0] && dates[1]) {
        setSearchParamsValue("checkInDate", dates[0].format("YYYY-MM-DD"));
        setSearchParamsValue("checkOutDate", dates[1].format("YYYY-MM-DD"));
        setDateRange(dates);
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
          value={dateRange}
          onChange={onChange}
          suffixIcon={null}
          className={style.dateRangePicker}
          popupClassName={style.customDatePickerDropdown}
          placeholder={["_ _/_ _/_ _ ", "_ _/_ _/_ _"]}
          disabledDate={disabledDate}
        />
      </div>
    </div>
  );
};

export default DateRangePickerComponent;
