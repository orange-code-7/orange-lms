import UI_PERMISSIONS from "@/constants/permissions";

export const can = (role, resource, action) => {
  return UI_PERMISSIONS?.[role]?.[resource]?.includes(action) || false;
};
