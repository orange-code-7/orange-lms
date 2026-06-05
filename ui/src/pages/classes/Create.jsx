import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/ui/forms/Form";

import SuccessPopup from "@/components/ui/popup/SuccessPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";

import useForm from "@/hooks/useForm";

import { classSchema } from "@/schemas";

import ClassService from "@/services/modules/class.service";
import MentorService from "@/services/modules/mentor.service";

const Create = () => {
  const navigate = useNavigate();

  const [schema, setSchema] = useState(classSchema);

  const { values, handleChange } = useForm(classSchema);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await MentorService.getAll();

        const mentorOptions = (res.data || []).map((mentor) => ({
          label: mentor.name,
          value: mentor.id,
        }));

        setSchema((prev) =>
          prev.map((field) =>
            field.name === "MentorId"
              ? {
                  ...field,
                  options: mentorOptions,
                }
              : field,
          ),
        );
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load mentors",
        );

        setOpenError(true);
      }
    };

    fetchMentors();
  }, []);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        MentorId: Number(data.MentorId),
      };

      await ClassService.create(payload);

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create class",
      );

      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);

    navigate("/classes");
  };

  if (loading) {
    return (
      <div className="rounded-sm border border-gray-200 bg-white p-4">
        Creating class...
      </div>
    );
  }

  return (
    <>
      <Form
        title="Create Class"
        description="Create a new learning class."
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Class"
      />

      <SuccessPopup
        open={openSuccess}
        onClose={handleCloseSuccess}
        title="Class Created"
        message="Class has been created successfully."
      />

      <ErrorPopup
        open={openError}
        onClose={() => setOpenError(false)}
        title="Create Class Failed"
        message={error}
      />
    </>
  );
};

export default Create;
