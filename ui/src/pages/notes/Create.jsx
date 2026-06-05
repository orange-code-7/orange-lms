import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/forms/Form";
import SuccessPopup from "@/components/ui/popup/SuccessPopup";

import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";

import { noteSchema } from "@/schemas";

import NoteService from "@/services/modules/note.service";

const Create = () => {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm(noteSchema);

  const schema = useClassMeetingOptions(values, setValues, noteSchema);

  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      const { MeetingId, ClassId, ...noteData } = payload;

      await NoteService.createNoteByMeeting(MeetingId, noteData);

      setOpenSuccessPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSuccessPopup = () => {
    setOpenSuccessPopup(false);

    navigate("/notes");
  };

  return (
    <>
      <Form
        title="Create Note"
        description="Fill note information"
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Note"
      />

      <SuccessPopup
        open={openSuccessPopup}
        onClose={handleCloseSuccessPopup}
        title="Note Created"
        message="Note has been created successfully."
      />
    </>
  );
};

export default Create;
