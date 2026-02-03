import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import { menteeSchema } from "@/schema";
import MentorService from "@/services/mentees.service";

const Create = () => {
  const { values, handleChange } = useForm(menteeSchema);

  const handleSubmit = async (payload) => {
    // await MentorService.create(payload);
    alert(JSON.stringify(payload));
  };

  return (
    <Form
      title="Create Mentee"
      description="Fill mentee personal information"
      schema={menteeSchema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Mentee"
    />
  );
};

export default Create;
