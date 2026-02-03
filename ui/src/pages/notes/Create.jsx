// src/pages/Notes/Create.jsx
import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";
import { noteSchema } from "@/schema";
import NoteService from "@/services/notes.service";
// import { useAuth } from "@/context/AuthContext";

const Create = () => {
  // const auth = useAuth();
  const { values, handleChange, setValues } = useForm(noteSchema);

  const schema = useClassMeetingOptions(values, setValues, noteSchema);

  const handleSubmit = async (payload) => {
    // await NoteService.create({
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
      title="Create Note"
      description="Fill note information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Note"
    />
  );
};

export default Create;
