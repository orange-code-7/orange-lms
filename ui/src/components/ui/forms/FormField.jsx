import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  Hash,
  Clock,
} from "lucide-react";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import NumberInput from "../inputs/NumberInput";
import TextArea from "../inputs/TextArea";
import Select from "../inputs/Select";
import Checkbox from "../inputs/Checkbox";
import RadioButton from "../inputs/RadioButton";
import DateInput from "../inputs/DateInput"; // <- import DateInput
import TimeInput from "../inputs/TimeInput";

// Default icons for types
const icons = {
  text: User,
  email: Mail,
  number: FileText,
  textarea: FileText,
  phone: Phone,
  address: MapPin,
  date: Calendar,
  time: Clock,
  id: Hash,
};

// Map type to input component
const inputMap = {
  text: TextInput,
  email: EmailInput,
  number: NumberInput,
  textarea: TextArea,
  select: Select,
  checkbox: Checkbox,
  radio: RadioButton,
  time: TimeInput,
  date: DateInput, // <- add date type
};

const FormField = ({ field, value, onChange }) => {
  const { type } = field;
  const Component = inputMap[type];

  if (!Component) return null; // skip if type is unknown

  return (
    <Component
      {...field}
      value={value}
      onChange={(val) => onChange(field.name, val)}
    />
  );
};

export default FormField;
