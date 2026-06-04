const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "-");
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};
import { can } from "./can";

export { formatDate, getNestedValue, can };
