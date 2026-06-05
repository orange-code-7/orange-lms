import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/forms/Form";
import SuccessPopup from "@/components/ui/popup/SuccessPopup";

import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";

import { taskSchema } from "@/schemas";

import TaskService from "@/services/modules/task.service";

const Create = () => {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm(taskSchema);

  const schema = useClassMeetingOptions(values, setValues, taskSchema);

  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      const { MeetingId, ClassId, ...taskData } = payload;

      await TaskService.createTaskByMeeting(MeetingId, taskData);

      setOpenSuccessPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSuccessPopup = () => {
    setOpenSuccessPopup(false);

    navigate("/tasks");
  };

  return (
    <>
      <Form
        title="Create Task"
        description="Fill task information"
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Task"
      />

      <SuccessPopup
        open={openSuccessPopup}
        onClose={handleCloseSuccessPopup}
        title="Task Created"
        message="Task has been created successfully."
      />
    </>
  );
};

export default Create;
