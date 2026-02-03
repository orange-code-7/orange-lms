// src/pages/Notes/Edit.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";
import { materialSchema } from "@/schema/";
import MaterialService from "@/services/materials.service";

const Edit = () => {
  const { id } = useParams();
  const { values, handleChange, setValues } = useForm(materialSchema);
  const [loading, setLoading] = useState(true);

  const schema = useClassMeetingOptions(values, setValues, materialSchema);

  // load note data
  useEffect(() => {
    const fetchTask = async () => {
      const note = await MaterialService.getById(id);
      setValues(flattenNote(note));
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (payload) => {
    // await TaskService.update(id, {
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
      title="Edit Material"
      description="Update material information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update Material"
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
