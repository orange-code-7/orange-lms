import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "@/components/ui/forms/Form";

import SuccessPopup from "@/components/ui/popup/SuccessPopup";
import ErrorPopup from "@/components/ui/popup/ErrorPopup";

import useForm from "@/hooks/useForm";
import useClassMeetingOptions from "@/hooks/useClassMeetingOptions";

import { taskSchema } from "@/schemas";

import TaskService from "@/services/modules/task.service";

const Edit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { values, handleChange, setValues } = useForm(taskSchema);

  const schema = useClassMeetingOptions(values, setValues, taskSchema, true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);

        const res = await TaskService.getById(id);

        setValues(flattenTask(res.data));
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message || err?.message || "Failed to load task",
        );

        setOpenError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, setValues]);

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);

      await TaskService.update(id, {
        ...payload,
        ClassId: Number(payload.ClassId),
        MeetingId: Number(payload.MeetingId),
        maxScore: Number(payload.maxScore),
      });

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message || err?.message || "Failed to update task",
      );

      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);

    navigate("/tasks");
  };

  if (loading) {
    return (
      <div className="rounded-sm border border-gray-200 bg-white p-4">
        Loading task...
      </div>
    );
  }

  return (
    <>
      <Form
        title="Edit Task"
        description="Update task information"
        schema={schema}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Update Task"
      />

      <SuccessPopup
        open={openSuccess}
        onClose={handleCloseSuccess}
        title="Task Updated"
        message="Task has been updated successfully."
      />

      <ErrorPopup
        open={openError}
        onClose={() => setOpenError(false)}
        title="Update Task Failed"
        message={error}
      />
    </>
  );
};

const flattenTask = (task) => ({
  ClassId: task?.ClassId || task?.Class?.id || "",
  MeetingId: task?.MeetingId || task?.Meeting?.id || "",
  name: task?.name || "",
  description: task?.description || "",
  dueDate: task?.dueDate?.slice(0, 10) || "",
  maxScore: task?.maxScore || "",
  status: task?.status || "",
  fileUrl: task?.fileUrl || "",
});

export default Edit;
