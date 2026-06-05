import {
  Home,
  BookOpen,
  Calendar,
  FileText,
  CheckSquare,
  Archive,
  User,
  Users,
} from "lucide-react";

import ROLES from "./roles";
import ROUTES from "./routes";

export const MENU_BY_ROLE = {
  [ROLES.OWNER]: [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: Home,
          path: ROUTES.DASHBOARD,
        },
      ],
    },

    {
      title: "LEARNING",
      items: [
        {
          name: "Classes",
          icon: BookOpen,
          path: ROUTES.CLASSES,
        },
        {
          name: "Meetings",
          icon: Calendar,
          path: ROUTES.MEETINGS,
        },
        {
          name: "Tasks",
          icon: CheckSquare,
          path: ROUTES.TASKS,
        },
        {
          name: "Notes",
          icon: FileText,
          path: ROUTES.NOTES,
        },
        {
          name: "Materials",
          icon: Archive,
          path: ROUTES.MATERIALS,
        },
      ],
    },

    {
      title: "PEOPLE",
      items: [
        {
          name: "Mentors",
          icon: User,
          path: ROUTES.MENTORS,
        },
        {
          name: "Mentees",
          icon: Users,
          path: ROUTES.MENTEES,
        },
      ],
    },
  ],

  [ROLES.ADMIN]: [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: Home,
          path: ROUTES.DASHBOARD,
        },
      ],
    },

    {
      title: "LEARNING",
      items: [
        {
          name: "Classes",
          icon: BookOpen,
          path: ROUTES.CLASSES,
        },
        {
          name: "Meetings",
          icon: Calendar,
          path: ROUTES.MEETINGS,
        },
        {
          name: "Tasks",
          icon: CheckSquare,
          path: ROUTES.TASKS,
        },
        {
          name: "Notes",
          icon: FileText,
          path: ROUTES.NOTES,
        },
        {
          name: "Materials",
          icon: Archive,
          path: ROUTES.MATERIALS,
        },
      ],
    },

    {
      title: "PEOPLE",
      items: [
        {
          name: "Mentors",
          icon: User,
          path: ROUTES.MENTORS,
        },
        {
          name: "Mentees",
          icon: Users,
          path: ROUTES.MENTEES,
        },
      ],
    },
  ],

  [ROLES.MENTOR]: [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: Home,
          path: ROUTES.DASHBOARD,
        },
      ],
    },

    {
      title: "MY LEARNING",
      items: [
        {
          name: "Classes",
          icon: BookOpen,
          path: ROUTES.CLASSES,
        },
        {
          name: "Meetings",
          icon: Calendar,
          path: ROUTES.MEETINGS,
        },
      ],
    },

    {
      title: "CONTENT",
      items: [
        {
          name: "Tasks",
          icon: CheckSquare,
          path: ROUTES.TASKS,
        },
        {
          name: "Notes",
          icon: FileText,
          path: ROUTES.NOTES,
        },
        {
          name: "Materials",
          icon: Archive,
          path: ROUTES.MATERIALS,
        },
      ],
    },
  ],

  [ROLES.MENTEE]: [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: Home,
          path: ROUTES.DASHBOARD,
        },
      ],
    },

    {
      title: "MY LEARNING",
      items: [
        {
          name: "Classes",
          icon: BookOpen,
          path: ROUTES.CLASSES,
        },
        {
          name: "Meetings",
          icon: Calendar,
          path: ROUTES.MEETINGS,
        },
      ],
    },

    {
      title: "LEARNING RESOURCES",
      items: [
        {
          name: "Tasks",
          icon: CheckSquare,
          path: ROUTES.TASKS,
        },
        {
          name: "Notes",
          icon: FileText,
          path: ROUTES.NOTES,
        },
        {
          name: "Materials",
          icon: Archive,
          path: ROUTES.MATERIALS,
        },
      ],
    },
  ],
};
