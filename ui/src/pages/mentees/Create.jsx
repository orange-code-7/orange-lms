import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/forms/Form";

import SuccessPopup from "@/components/ui/popup/SuccessPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";

import useForm from "@/hooks/useForm";

import { userSchema } from "@/schemas";

import MenteeService from "@/services/modules/mentee.service";

const Create = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm(userSchema);

  const [error, setError] = useState("");

  const [openError, setOpenError] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      await MenteeService.create(payload);

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create mentee",
      );

      setOpenError(true);
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);

    navigate("/mentees");
  };

  return (
    <>
      <Form
        title="Create Mentee"
        description="Fill mentee personal information"
        schema={userSchema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Mentee"
      />

      <SuccessPopup
        open={openSuccess}
        onClose={handleCloseSuccess}
        title="Mentee Created"
        message="Mentee has been created successfully."
      />

      <ErrorPopup
        open={openError}
        onClose={() => setOpenError(false)}
        title="Create Mentee Failed"
        message={error}
      />
    </>
  );
};

export default Create;
