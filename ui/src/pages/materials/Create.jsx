// src/pages/Notes/Create.jsx
import Form from "@/components/ui/forms/Form";
import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";
import { materialSchema } from "@/schemas";
import MaterialService from "@/services/modules/material.service";
// import { useAuth } from "@/context/AuthContext";

const Create = () => {
  // const auth = useAuth();
  const { values, handleChange, setValues } = useForm(materialSchema);

  const schema = useClassMeetingOptions(values, setValues, materialSchema);

  const handleSubmit = async (payload) => {
    // await MaterialService.create({
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
      title="Create Material"
      description="Fill material information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Material"
    />
  );
};

export default Create;
