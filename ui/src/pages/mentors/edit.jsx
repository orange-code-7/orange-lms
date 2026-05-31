import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/ui/forms/Form";
import useForm from "@/hooks/useForm";
import MentorService from "@/services/modules/mentor.service";
import { mentorSchema } from "@/schemas";

const flattenMentor = (mentor) => ({
  name: mentor?.name || "",
  email: mentor?.email || "",
  avatarUrl: mentor?.avatarUrl || "",
  age: mentor?.profile?.age || "",
  phoneNumber: mentor?.profile?.phoneNumber || "",
  city: mentor?.profile?.city || "",
  background: mentor?.profile?.background || "",
});

const Edit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { values, handleChange, setValues } = useForm(mentorSchema);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await MentorService.getById(id);
      setValues(flattenMentor(res)); // populate form AFTER fetch
      setLoading(false);
    };
    fetchMentor();
  }, [id, setValues]); // <- setValues is stable, no loop

  const handleSubmit = async (payload) => {
    // await MentorService.update(id, payload);
    alert(JSON.stringify(payload));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      title="Edit Mentor"
      description="Update mentor information"
      schema={mentorSchema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update Mentor"
    />
  );
};

export default Edit;
