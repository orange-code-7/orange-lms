import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/forms/Form";
import SuccessPopup from "@/components/ui/popup/SuccessPopup";

import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";

import { materialSchema } from "@/schemas";

import MaterialService from "@/services/modules/material.service";

const Create = () => {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm(materialSchema);

  const schema = useClassMeetingOptions(values, setValues, materialSchema);

  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      const { MeetingId, ClassId, ...materialData } = payload;

      await MaterialService.createMaterialByMeeting(MeetingId, materialData);

      setOpenSuccessPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSuccessPopup = () => {
    setOpenSuccessPopup(false);

    navigate("/materials");
  };

  return (
    <>
      <Form
        title="Create Material"
        description="Fill material information"
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Material"
      />

      <SuccessPopup
        open={openSuccessPopup}
        onClose={handleCloseSuccessPopup}
        title="Material Created"
        message="Material has been created successfully."
      />
    </>
  );
};

export default Create;
