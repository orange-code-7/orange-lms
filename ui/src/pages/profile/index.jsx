import Header from "./Header";
import Content from "./Content";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  const roleStyles = {
    Owner: "bg-purple-100 text-purple-700",
    Admin: "bg-orange-100 text-orange-700",
    Mentor: "bg-blue-100 text-blue-700",
    Mentee: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-4">
      <Header user={user} roleStyles={roleStyles} />
      <Content user={user} />
      <h1>Profile Details</h1>
    </div>
  );
};

export default Profile;
