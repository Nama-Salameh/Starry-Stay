import React from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
export default function CheckboxFiltering({
  items,
  title,
}: {
  items: string[];
  title: string;
}) {
  return (
    <div>
      <h3>{title}</h3>
      <FormGroup>
        {items.map((item, index) => (
          <FormControlLabel key={index} control={<Checkbox />} label={item} />
        ))}
      </FormGroup>
    </div>
  );
}
