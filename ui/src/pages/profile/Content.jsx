import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { useState } from "react";

import Form from "@/components/ui/forms/Form";
import { profileSchema } from "../../schemas";

const Content = ({ user }) => {
  const [values] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    active: user.isActive ? "active" : "not active",
    age: user?.profile?.age || "",
    phoneNumber: user?.profile?.phoneNumber || "",
    city: user?.profile?.city || "",
    country: user?.profile?.country || "",
    address: user?.profile?.address || "",
    background: user?.profile?.background || "",
  });

  return (
    <div className="space-y-4">
      <Form
        title="Profile Information"
        description="Your account and personal information."
        schema={profileSchema}
        values={values}
        onChange={() => {}}
        onSubmit={() => {}}
        submitLabel=""
      />
    </div>
  );
};

export default Content;
