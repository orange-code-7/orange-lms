import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/ui/forms/Form";
import useForm from "@/hooks/useForm";
import { classSchema } from "@/schemas";
import ClassService from "@/services/modules/class.service";
import MentorService from "@/services/modules/mentor.service";

const Edit = () => {
  const { id } = useParams();
  const [schema, setSchema] = useState(classSchema);
  const [loading, setLoading] = useState(true);

  const { values, handleChange, setValues } = useForm(classSchema);

  useEffect(() => {
    const fetchData = async () => {
      const [cls, mentors] = await Promise.all([
        ClassService.getById(id),
        MentorService.getAll(),
      ]);

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

      setValues(flattenData(cls));
      setLoading(false);
    };

    fetchData();
  }, [id, setValues]);

  const handleSubmit = async (payload) => {
    // await ClassService.update(id, {
    //   ...payload,
    //   mentorId: Number(payload.mentorId),
    // });
    alert(
      JSON.stringify({
        ...payload,
        mentorId: Number(),
      }),
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      title="Edit Class"
      description="Update class information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update Class"
    />
  );
};

const flattenData = (cls) => ({
  code: cls[0]?.code || "",
  name: cls[0]?.name || "",
  category: cls[0]?.category || "",
  level: cls[0]?.level || "",
  startDate: cls[0]?.startDate?.slice(0, 10) || "",
  endDate: cls[0]?.endDate?.slice(0, 10) || "",
  status: cls[0]?.status || "",
  imageUrl: cls[0]?.imageUrl || "",
  mentorId: cls[0]?.mentor?.id || cls?.mentorId || "",
});

export default Edit;
