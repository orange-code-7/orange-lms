import React from "react";

import Profile from "@/pages/profile";
import ProfileEdit from "@/pages/profile/Edit";
import Settings from "@/pages/settings";

const profileRoutes = [
  {
    path: "profile",
    element: <Profile />,
  },

  {
    path: "profile/edit",
    element: <ProfileEdit />,
  },

  {
    path: "settings",
    element: <Settings />,
  },
];

export default profileRoutes;
