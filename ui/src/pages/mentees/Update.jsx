import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import MenteeService from "@/services/mentees.service";
import { menteeSchema } from "@/schema";

const flattenData = (mentee) => ({
  name: mentee?.name || "",
  email: mentee?.email || "",
  avatarUrl: mentee?.avatarUrl || "",
  age: mentee?.profile?.age || "",
  phoneNumber: mentee?.profile?.phoneNumber || "",
  city: mentee?.profile?.city || "",
  background: mentee?.profile?.background || "",
});

const Edit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { values, handleChange, setValues } = useForm(menteeSchema);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await MenteeService.getById(id);
      setValues(flattenData(res)); // populate form AFTER fetch
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
      title="Edit Mentee"
      description="Update mentee information"
      schema={menteeSchema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update Mentee"
    />
  );
};

export default Edit;
