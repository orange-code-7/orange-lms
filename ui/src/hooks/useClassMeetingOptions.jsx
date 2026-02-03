// src/hooks/useClassMeetingOptions.js
import { useEffect, useState } from "react";
import ClassService from "@/services/class.service";

const useClassMeetingOptions = (values, setValues, baseSchema) => {
  const [schema, setSchema] = useState(baseSchema);

  // 1️⃣ Load classes (ONCE)
  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await ClassService.getAll();

      setSchema((prev) =>
        prev.map((f) =>
          f.name === "classId"
            ? {
                ...f,
                options: classes.map((c) => ({
                  label: `${c.code} - ${c.name}`,
                  value: c.id,
                })),
              }
            : f,
        ),
      );
    };

    fetchClasses();
  }, []);

  // 2️⃣ Load meetings when classId changes
  useEffect(() => {
    if (!values.classId) return;

    const fetchMeetings = async () => {
      const cls = await ClassService.getById(values.classId);

      setSchema((prev) =>
        prev.map((f) =>
          f.name === "meetingId"
            ? {
                ...f,
                options: cls.meeting.map((m) => ({
                  label: `Meeting ${m.meetingNumber} - ${m.name}`,
                  value: m.id,
                })),
              }
            : f,
        ),
      );

      // reset meetingId when class changes
      setValues((prev) => ({ ...prev, meetingId: "" }));
    };

    fetchMeetings();
  }, [values.classId, setValues]);

  return schema;
};

export default useClassMeetingOptions;
