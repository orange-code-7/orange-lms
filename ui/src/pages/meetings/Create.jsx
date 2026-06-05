import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/forms/Form";

import SuccessPopup from "@/components/ui/popup/SuccessPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";

import useForm from "@/hooks/useForm";

import { meetingSchema } from "@/schemas";

import ClassService from "@/services/modules/class.service";
import MeetingService from "@/services/modules/meeting.service";

const Create = () => {
  const navigate = useNavigate();

  const [schema, setSchema] = useState(meetingSchema);

  const { values, handleChange } = useForm(meetingSchema);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getAll();

        const classOptions = (res.data || []).map((cls) => ({
          label: `${cls.code} - ${cls.name}`,
          value: cls.id,
        }));

        setSchema((prev) =>
          prev.map((field) =>
            field.name === "ClassId"
              ? {
                  ...field,
                  options: classOptions,
                }
              : field,
          ),
        );
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load classes",
        );

        setOpenError(true);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const classId = Number(data.ClassId);

      const payload = { ...data };

      delete payload.ClassId;

      await MeetingService.create(classId, payload);

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create meeting",
      );

      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);

    navigate("/meetings");
  };

  if (loading) {
    return (
      <div className="rounded-sm border border-gray-200 bg-white p-4">
        Creating meeting...
      </div>
    );
  }

  return (
    <>
      <Form
        title="Create Meeting"
        description="Create a new meeting."
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Meeting"
      />

      <SuccessPopup
        open={openSuccess}
        onClose={handleCloseSuccess}
        title="Meeting Created"
        message="Meeting has been created successfully."
      />

      <ErrorPopup
        open={openError}
        onClose={() => setOpenError(false)}
        title="Create Meeting Failed"
        message={error}
      />
    </>
  );
};

export default Create;
