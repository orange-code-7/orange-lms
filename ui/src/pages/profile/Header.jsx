import { Edit2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ user, roleStyles }) => {
  return (
    <div className="rounded-sm border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl || "https://ui-avatars.com/api/?name=User"}
            alt={user.name}
            className="h-20 w-20 rounded-full border border-gray-200 object-cover"
          />

          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <span
                className={`rounded-sm px-2 py-1 text-xs font-medium ${
                  roleStyles[user.role] || "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>

              <span
                className={`rounded-sm px-2 py-1 text-xs font-medium ${
                  user.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <h1 className="text-2xl font-bold">{user.name}</h1>

            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <Link
          to="/profile/edit"
          className="flex items-center gap-2 rounded-sm bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
        >
          <Edit2 size={16} />
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Header;
