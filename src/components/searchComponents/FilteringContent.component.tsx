import React, { useEffect, useState } from "react";
import StarRating from "./starRating/StarRating.component";
import CheckboxFiltering from "./checkbox/CheckboxFiltering.component";
import { Divider } from "@mui/material";
import { getAmenitiesNames } from "../../services/aminities/Aminities.service";
import localization from "../../localizationConfig";

export default function FilteringContent() {
  const [amenitiesNames, setAmenitiesNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const names = await getAmenitiesNames();
        setAmenitiesNames(names || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>{localization.filterBy}</h2>
      <Divider />
      <StarRating />
      <Divider />
      <CheckboxFiltering items={amenitiesNames} title={localization.roomAmenities} />
      <Divider />
    </div>
  );
}
