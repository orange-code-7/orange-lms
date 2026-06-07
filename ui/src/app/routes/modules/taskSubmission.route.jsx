import React from "react";

const taskSubmissionRoutes = {
  path: "task-submissions",

  children: [
    {
      index: true,
      element: <div>Task Submission List</div>,
    },

    {
      path: ":id",
      element: <div>Task Submission Detail</div>,
    },
  ],
};

export default taskSubmissionRoutes;
