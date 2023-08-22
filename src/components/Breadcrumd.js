import React from "react";
import { Breadcrumb } from "antd";

const BreadcrumbComp = ({ items }) => {
  return (
    <>
      <Breadcrumb separator=">" items={items} />
    </>
  );
};
export default BreadcrumbComp;
