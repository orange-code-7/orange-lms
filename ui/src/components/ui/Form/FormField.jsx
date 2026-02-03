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
import TextInput from "./Inputs/TextInput";
import EmailInput from "./Inputs/EmailInput";
import NumberInput from "./Inputs/NumberInput";
import TextArea from "./Inputs/TextArea";
import Select from "./Inputs/Select";
import Checkbox from "./Inputs/Checkbox";
import RadioButton from "./Inputs/RadioButton";
import DateInput from "./Inputs/DateInput"; // <- import DateInput
import TimeInput from "./Inputs/TimeInput";

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
