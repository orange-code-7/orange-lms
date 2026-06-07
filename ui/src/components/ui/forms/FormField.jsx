import React from "react";

import { INPUT_COMPONENTS } from "./form.type";

const FormField = ({ field, value, onChange }) => {
  const Component = INPUT_COMPONENTS[field.type];

  if (!Component) return null;

  return (
    <Component
      {...field}
      value={value}
      onChange={(value) => onChange(field.name, value)}
    />
  );
};

export default FormField;
