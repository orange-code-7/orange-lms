import Swal from "sweetalert2";
import { Download, Calendar, Award, User, BookOpen } from "lucide-react";
import { formatDate } from "@/helpers";

const Detail = (task) => {
  if (!task) {
    Swal.fire({
      icon: "error",
      title: "No data",
      text: "Task data not found",
    });
    return;
  }

  Swal.fire({
    title: task.name ?? "Task Detail",
    html: `
      <div style="text-align:left; font-size:14px">

        <div style="
          background:#f9fafb;
          border-radius:12px;
          padding:16px;
          margin-bottom:12px
        ">
          <p style="font-weight:600; margin-bottom:4px">Description</p>
          <p style="color:#555">${task.description ?? "-"}</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">

          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:12px">
            <p style="font-size:12px; color:#888">Due Date</p>
            <p style="font-weight:600">
              ${task.dueDate ? formatDate(task.dueDate) : "-"}
            </p>
          </div>

          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:12px">
            <p style="font-size:12px; color:#888">Max Score</p>
            <p style="font-weight:600">
              ${task.maxScore ?? "-"}
            </p>
          </div>

          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:12px">
            <p style="font-size:12px; color:#888">Class</p>
            <p style="font-weight:600">
              ${task.Class?.name ?? "-"}
            </p>
          </div>

          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:12px">
            <p style="font-size:12px; color:#888">Meeting</p>
            <p style="font-weight:600">
              ${task.Meeting?.name ?? "-"}
            </p>
          </div>

        </div>

        <div style="
          margin-top:16px;
          background:#fff7ed;
          border:1px dashed #fdba74;
          border-radius:12px;
          padding:14px
        ">
          <p style="font-size:12px; color:#9a3412">Created By</p>
          <p style="font-weight:600; color:#7c2d12">
            ${task.TaskCreatedBy?.name ?? "-"}
          </p>
        </div>

        <div style="margin-top:18px; text-align:center">
          ${
            task.fileUrl
              ? `
                <a href="${task.fileUrl}"
                   target="_blank"
                   rel="noopener noreferrer"
                   style="
                     display:inline-flex;
                     align-items:center;
                     gap:8px;
                     padding:10px 16px;
                     border-radius:999px;
                     background:#f97316;
                     color:white;
                     text-decoration:none;
                     font-weight:600
                   ">
                   ⬇️ Download File
                </a>
              `
              : `<p style="color:#999">No file attached</p>`
          }
        </div>

      </div>
    `,
    width: 720,
    confirmButtonText: "Close",
    confirmButtonColor: "#1647f9",
  });
};

export default Detail;
