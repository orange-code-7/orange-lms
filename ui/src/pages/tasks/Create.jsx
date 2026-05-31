// src/pages/Notes/Create.jsx
import Form from "@/components/ui/forms/Form";
import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";
import { taskSchema } from "@/schemas";
import TaskService from "@/services/modules/note.service";
// import { useAuth } from "@/context/AuthContext";

const Create = () => {
  // const auth = useAuth();
  const { values, handleChange, setValues } = useForm(taskSchema);

  const schema = useClassMeetingOptions(values, setValues, taskSchema);

  const handleSubmit = async (payload) => {
    // await TaskService.create({
    //   ...payload,
    //   classId: Number(payload.classId),
    //   meetingId: Number(payload.meetingId),
    //   createdBy: auth.user.id, // mentor login
    // });
    alert(
      JSON.stringify({
        ...payload,
        classId: Number(payload.classId),
        meetingId: Number(payload.meetingId),
        // createdBy: auth.user.id, // mentor login
      }),
    );
  };

  return (
    <Form
      title="Create Task"
      description="Fill task information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Task"
    />
  );
};

export default Create;
