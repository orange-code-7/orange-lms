import { useEffect, useState } from "react";
import Form from "@/components/ui/forms/Form";
import useForm from "@/hooks/useForm";
import { meetingSchema } from "@/schemas";
import ClassService from "@/services/modules/class.service";
import MeetingService from "@/services/modules/meeting.service";

const Create = () => {
  const [schema, setSchema] = useState(meetingSchema);
  const { values, handleChange } = useForm(meetingSchema);

  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await ClassService.getAll();

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
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (payload) => {
    // await MeetingService.create({
    //   ...payload,
    //   classId: Number(payload.classId),
    // });
    alert(
      JSON.stringify({
        ...payload,
        classId: Number(payload.classId),
      }),
    );
  };

  return (
    <Form
      title="Create Meeting"
      description="Open a new meeting"
      schema={schema}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create Meeting"
    />
  );
};

export default Create;
