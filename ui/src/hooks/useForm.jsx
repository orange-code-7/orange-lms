import { useState } from "react";

const useForm = (schema, initialData = {}) => {
  const buildState = (data) =>
    schema.reduce((acc, field) => {
      acc[field.name] = data?.[field.name] ?? "";
      return acc;
    }, {});

  const [values, setValues] = useState(buildState(initialData));

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
};

export default useForm;
