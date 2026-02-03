// src/pages/Notes/Edit.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";
import { noteSchema } from "@/schema/";
import NoteService from "@/services/notes.service";

const Edit = () => {
  const { id } = useParams();
  const { values, handleChange, setValues } = useForm(noteSchema);
  const [loading, setLoading] = useState(true);

  const schema = useClassMeetingOptions(values, setValues, noteSchema);

  // load note data
  useEffect(() => {
    const fetchNote = async () => {
      const note = await NoteService.getById(id);
      setValues(flattenNote(note));
      setLoading(false);
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (payload) => {
    // await NoteService.update(id, {
    //   ...payload,
    //   classId: Number(payload.classId),
    //   meetingId: Number(payload.meetingId),
    // });
    alert(
      JSON.stringify({
        ...payload,
        classId: Number(payload.classId),
        meetingId: Number(payload.meetingId),
      }),
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      title="Edit Note"
      description="Update note information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update Note"
    />
  );
};

const flattenNote = (note) => ({
  classId: note?.classId || "",
  meetingId: note?.meetingId || "",
  name: note?.name || "",
  description: note?.description || "",
  fileUrl: note?.fileUrl || "",
});

export default Edit;
