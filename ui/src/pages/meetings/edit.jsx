import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "@/components/ui/forms/Form";

import SuccessPopup from "@/components/ui/popup/SuccessPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";

import useForm from "@/hooks/useForm";

import { meetingSchema } from "@/schemas";

import ClassService from "@/services/modules/class.service";
import MeetingService from "@/services/modules/meeting.service";

const Edit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [schema, setSchema] = useState(meetingSchema);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { values, handleChange, setValues } = useForm(meetingSchema);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [meetingRes, classRes] = await Promise.all([
          MeetingService.getById(id),
          ClassService.getAll(),
        ]);

        const classOptions = (classRes.data || []).map((cls) => ({
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

        setValues(flattenData(meetingRes.data));
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load meeting",
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

      const payload = {
        ...data,
        ClassId: Number(data.ClassId),
      };

      await MeetingService.update(id, payload);

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update meeting",
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
        Loading meeting...
      </div>
    );
  }

  return (
    <>
      <Form
        title="Edit Meeting"
        description="Update meeting information."
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Update Meeting"
      />

      <SuccessPopup
        open={openSuccess}
        onClose={handleCloseSuccess}
        title="Meeting Updated"
        message="Meeting has been updated successfully."
      />

      <ErrorPopup
        open={openError}
        onClose={() => setOpenError(false)}
        title="Update Meeting Failed"
        message={error}
      />
    </>
  );
};

const flattenData = (meeting) => ({
  ClassId: meeting?.ClassId || meeting?.class?.id || "",
  meetingNumber: meeting?.meetingNumber || "",
  name: meeting?.name || "",
  description: meeting?.description || "",
  meetingDate: meeting?.meetingDate?.slice(0, 10) || "",
  startHour: meeting?.startHour?.slice(0, 5) || "",
  finishHour: meeting?.finishHour?.slice(0, 5) || "",
  imageUrl: meeting?.imageUrl || "",
});

export default Edit;
