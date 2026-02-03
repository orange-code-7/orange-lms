import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import { mentorSchema } from "@/schema";
import MentorService from "@/services/mentors.service";

const Create = () => {
  const { values, handleChange } = useForm(mentorSchema);

  const handleSubmit = async (payload) => {
    // await MentorService.create(payload);
    alert(JSON.stringify(payload));
  };

  return (
    <Form
      title="Create Mentor"
      description="Fill mentor personal information"
      schema={mentorSchema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Mentor"
    />
  );
};

export default Create;
