import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBreadcrumbs from "@/hooks/useBreadcrumbs";
import MentorService from "@/services/mentees.service";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Pencil,
  Trash2,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Detail = () => {
  const { id } = useParams();
  const breadcrumbs = useBreadcrumbs([{ label: "Mentees", to: "/mentees" }]);

  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await MentorService.getById(id);
      setMentor(res);
    };
    fetchMentor();
  }, [id]);

  if (!mentor) return <div className="p-6 text-gray-500">Loading...</div>;

  const ongoingClasses =
    mentor.classes?.filter((c) => c.status === "ongoing") ?? [];

  const finishedClasses =
    mentor.classes?.filter((c) => c.status === "finished") ?? [];

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        {breadcrumbs.map((b) => (
          <span key={b.to}>{b.label} / </span>
        ))}
        <span className="font-medium">{mentor.name}</span>
      </div>

      {/* TOP : PROFILE */}
      <Card className="relative overflow-hidden">
        <div className="absolute right-4 top-4 flex gap-2">
          <Button size="sm" variant="default">
            <Pencil size={16} className="mr-1" /> Edit
          </Button>
          <Button size="sm" variant="default">
            <Trash2 size={16} className="mr-1" /> Delete
          </Button>
        </div>

        <CardContent className="flex gap-6 p-6">
          <img
            src={mentor.avatarUrl}
            alt={mentor.name}
            className="w-28 h-28 rounded-xl object-cover"
          />

          <div className="space-y-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {mentor.name}
              <CheckCircle
                size={18}
                className={mentor.isActive ? "text-green-500" : "text-gray-400"}
              />
            </h2>

            <p className="text-gray-600">{mentor.profile?.background}</p>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mt-3">
              <div className="flex items-center gap-2">
                <Mail size={16} /> {mentor.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> {mentor.profile?.phoneNumber}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> {mentor.profile?.city}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} /> Age {mentor.profile?.age}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOTTOM : CLASSES */}
      <div className="grid grid-cols-2 gap-6">
        {/* Ongoing */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={18} /> Ongoing Classes
            </h3>

            {ongoingClasses.length === 0 ? (
              <p className="text-sm text-gray-500">No ongoing classes</p>
            ) : (
              <ul className="space-y-2">
                {ongoingClasses.map((cls) => (
                  <li
                    key={cls.id}
                    className="p-3 rounded-lg bg-gray-50 flex justify-between"
                  >
                    <span>{cls.name}</span>
                    <span className="text-xs text-gray-500">{cls.code}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Finished */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle size={18} /> Finished Classes
            </h3>

            {finishedClasses.length === 0 ? (
              <p className="text-sm text-gray-500">No finished classes</p>
            ) : (
              <ul className="space-y-2">
                {finishedClasses.map((cls) => (
                  <li
                    key={cls.id}
                    className="p-3 rounded-lg bg-green-50 flex justify-between"
                  >
                    <span>{cls.name}</span>
                    <span className="text-xs text-green-700">Completed</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
