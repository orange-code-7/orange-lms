import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/ui/Form/Form";
import useForm from "@/hooks/useForm";
import { meetingSchema } from "@/schema";
import ClassService from "@/services/class.service";
import MeetingService from "@/services/meetings.service";

const Edit = () => {
  const { id } = useParams();
  const [schema, setSchema] = useState(meetingSchema);
  const [loading, setLoading] = useState(true);

  const { values, handleChange, setValues } = useForm(meetingSchema);

  useEffect(() => {
    const fetchData = async () => {
      const [cls, classes] = await Promise.all([
        MeetingService.getById(id),
        ClassService.getAll(),
      ]);

      const classOptions = classes.map((m) => ({
        label: m.name,
        value: m.id,
      }));

      setSchema((prev) =>
        prev.map((field) =>
          field.name === "classId"
            ? { ...field, options: classOptions }
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
    //   classId: Number(payload.classId),
    // });
    alert(
      JSON.stringify({
        ...payload,
        classId: Number(),
      }),
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      title="Edit Meeting"
      description="Update meeting information"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update Meeting"
    />
  );
};

const flattenData = (cls) => ({
  classId: cls?.classId || "",
  meetingNumber: cls?.meetingNumber || "",
  name: cls?.name || "",
  description: cls?.description || "",
  meetingDate: cls?.meetingDate?.slice(0, 10) || "",
  startHour: cls?.startHour?.slice(0, 5) || "",
  finishHour: cls?.finishHour?.slice(0, 5) || "",
  imageUrl: cls?.imageUrl || "",
});

export default Edit;
