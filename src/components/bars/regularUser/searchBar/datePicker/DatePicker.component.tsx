import React, { useState } from "react";
import { DatePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import style from "./DatePicker.module.css";

const MyDateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>([null, null]);

  const onChange = (dates: RangeValue<Dayjs>) => {
    setDateRange(dates);
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
          dropdownClassName={style.customDatePickerDropdown}
          placeholder={["_ _/_ _/_ _ ", "_ _/_ _/_ _"]}
          disabledDate={disabledDate}
        />
      </div>
    </div>
  );
};

export default MyDateRangePicker;
