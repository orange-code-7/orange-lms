import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "@/components/ui/forms/Form";

import SuccessPopup from "@/components/ui/popup/SuccessPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";

import useForm from "@/hooks/useForm";

import { classSchema } from "@/schemas";

import ClassService from "@/services/modules/class.service";
import MentorService from "@/services/modules/mentor.service";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schema, setSchema] = useState(classSchema);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { values, handleChange, setValues } = useForm(classSchema);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [classRes, mentorRes] = await Promise.all([
          ClassService.getById(id),
          MentorService.getAll(),
        ]);

        const mentorOptions = (mentorRes.data || []).map((mentor) => ({
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

        setValues(flattenData(classRes.data));
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load class",
        );

        setOpenError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValues]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        MentorId: Number(data.MentorId),
      };

      await ClassService.update(id, payload);

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update class",
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
        Loading class...
      </div>
    );
  }

  return (
    <>
      <Form
        title="Edit Class"
        description="Update class information."
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Update Class"
      />

      <SuccessPopup
        open={openSuccess}
        onClose={handleCloseSuccess}
        title="Class Updated"
        message="Class has been updated successfully."
      />

      <ErrorPopup
        open={openError}
        onClose={() => setOpenError(false)}
        title="Update Class Failed"
        message={error}
      />
    </>
  );
};

const flattenData = (cls) => ({
  code: cls?.code || "",
  name: cls?.name || "",
  description: cls?.description || "",
  category: cls?.category || "",
  level: cls?.level || "",
  startDate: cls?.startDate?.slice(0, 10) || "",
  endDate: cls?.endDate?.slice(0, 10) || "",
  status: cls?.status || "",
  imageUrl: cls?.imageUrl || "",
  MentorId: cls?.MentorId || cls?.mentor?.id || "",
});

export default Edit;
