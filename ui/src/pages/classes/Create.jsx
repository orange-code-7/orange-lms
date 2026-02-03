import { useEffect, useState } from "react";
import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import { classSchema } from "@/schema";
import ClassService from "@/services/class.service";
import MentorService from "@/services/mentors.service";

const Create = () => {
  const [schema, setSchema] = useState(classSchema);
  const { values, handleChange } = useForm(classSchema);

  useEffect(() => {
    const fetchMentors = async () => {
      const mentors = await MentorService.getAll();

      const mentorOptions = mentors.map((m) => ({
        label: m.name,
        value: m.id,
      }));

      setSchema((prev) =>
        prev.map((field) =>
          field.name === "mentorId"
            ? { ...field, options: mentorOptions }
            : field,
        ),
      );
    };

    fetchMentors();
  }, []);

  const handleSubmit = async (payload) => {
    // await ClassService.create({
    //   ...payload,
    //   mentorId: Number(payload.mentorId),
    // });
    alert(
      JSON.stringify({
        ...payload,
        mentorId: Number(payload.mentorId),
      }),
    );
  };

  return (
    <Form
      title="Create Class"
      description="Open a new class"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Class"
    />
  );
};

export default Create;
