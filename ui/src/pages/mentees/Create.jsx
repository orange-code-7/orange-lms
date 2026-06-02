import Form from "@/components/ui/forms/Form";
import useForm from "@/hooks/useForm";
import { menteeSchema } from "@/schemas";
import MentorService from "@/services/modules/mentee.service";

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
