"use client";
import React from "react";

import FilterTab from "@/components/FilterTab";
import ListView from "@/components/ListView/ListView";

const DRCard = ({ data }) => {
  return (
    <>
      <FilterTab
        isTitle
        isTitleName={"Available Doctors"}
        isTitleLeftArrow
        // handleTitleLeftArrowClick={() => setScheduled(false)}
      />

      <ListView  setPatientData={undefined} />
    </>
  );
};

export default DRCard;
