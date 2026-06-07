import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import usePopupStore from "@/app/store/popupStore";

import useBreadcrumbs from "@/hooks/useBreadcrumbs";

import MenteeService from "@/services/modules/mentee.service";

import LoadingPage from "@/components/ui/loading/LoadingPage";
import PageHeader from "@/components/ui/page/PageHeader";

import Tabs from "@/components/ui/tabs/Tabs";
import TabHeader from "@/components/ui/tabs/TabHeader";
import TabContent from "@/components/ui/tabs/TabContent";

import TableActions from "@/components/ui/tables/TableActions";

const TABS = [
  {
    label: "Active Classes",
    value: "active",
  },
  {
    label: "Finished Classes",
    value: "finished",
  },
];

const Detail = () => {
  const { id } = useParams();

  const breadcrumbs = useBreadcrumbs([
    {
      label: "Mentees",
      to: "/mentees",
    },
  ]);

  const { openConfirm, openError, openSuccess } = usePopupStore();

  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const res = await MenteeService.getById(id);

        setMentee(res.data);
      } catch (error) {
        console.error(error);

        openError({
          title: "Load Failed",
          message: error?.response?.data?.message || "Failed to load mentee.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMentee();
  }, [id, openError]);

  const handleRemove = () => {
    openConfirm({
      title: "Delete Mentee",
      message:
        "Are you sure you want to delete this mentee? This action cannot be undone.",

      action: async () => {
        try {
          await MenteeService.delete(id);

          openSuccess({
            title: "Success",
            message: "Mentee deleted successfully.",
          });
        } catch (error) {
          console.error(error);

          openError({
            title: "Delete Failed",
            message:
              error?.response?.data?.message || "Failed to delete mentee.",
          });
        }
      },
    });
  };

  const { activeClasses, finishedClasses } = useMemo(() => {
    const classes = mentee?.enrolledClasses || [];

    return {
      activeClasses: classes.filter(
        (item) => item.ClassUser?.status === "Active",
      ),

      finishedClasses: classes.filter(
        (item) => item.ClassUser?.status === "Finished",
      ),
    };
  }, [mentee]);

  if (loading) {
    return <LoadingPage title="Loading Mentee..." />;
  }

  if (!mentee) {
    return <div className="p-4">Mentee not found.</div>;
  }

  return (
    <div className="min-h-screen space-y-4 bg-[var(--color-background)] p-4">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={mentee.name}
        description={mentee.email}
      />

      <Link
        to="/mentees"
        className="inline-flex items-center gap-2 rounded-sm border border-gray-200 bg-[var(--color-surface)] px-3 py-2 text-sm hover:bg-gray-50"
      >
        <ArrowLeft size={16} />
        Back to Mentees
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-5">
            <div className="flex flex-col items-center">
              <img
                src={
                  mentee.avatarUrl || "https://placehold.co/150x150?text=Mentee"
                }
                alt={mentee.name}
                className="h-32 w-32 rounded-sm border border-gray-200 object-cover"
              />

              <h1 className="mt-4 text-center text-xl font-bold">
                {mentee.name}
              </h1>

              <p className="mt-1 text-center text-sm text-[var(--color-text-muted)]">
                {mentee.email}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-sm bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                  {mentee.role}
                </span>

                <span
                  className={`rounded-sm px-2 py-1 text-xs font-medium ${
                    mentee.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {mentee.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-4">
                <TableActions
                  id={mentee.id}
                  resource="mentee"
                  detailUrl={null}
                  editUrl={`/mentees/edit/${mentee.id}`}
                  showDetail={false}
                  onDelete={handleRemove}
                />
              </div>

              <div className="mt-6 w-full space-y-4 border-t border-gray-200 pt-5">
                <InfoItem
                  label="Age"
                  value={`${mentee.profile?.age || "-"} Years Old`}
                />

                <InfoItem
                  label="Gender"
                  value={mentee.profile?.gender || "-"}
                />

                <InfoItem
                  label="Address"
                  value={`${mentee.profile?.address || "-"}, ${mentee.profile?.city || "-"}, ${mentee.profile?.country || "-"}`}
                />

                <InfoItem
                  label="Phone Number"
                  value={mentee.profile?.phoneNumber || "-"}
                />

                <InfoItem
                  label="Background"
                  value={mentee.profile?.background || "-"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Tabs>
            <TabHeader
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="rounded-sm border border-gray-200 bg-[var(--color-surface)] p-4">
              <TabContent activeTab={activeTab} value="active">
                <ClassList data={activeClasses} showProgress />
              </TabContent>

              <TabContent activeTab={activeTab} value="finished">
                <ClassList data={finishedClasses} />
              </TabContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>

    <p className="mt-1 font-medium">{value}</p>
  </div>
);

const ClassList = ({ data, showProgress = false }) => {
  if (!data?.length) {
    return <p className="text-sm text-gray-500">No classes found.</p>;
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.id} className="rounded-sm border border-gray-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {item.code}
              </p>
            </div>

            <span
              className={`rounded-sm px-2 py-1 text-xs font-medium ${
                item.ClassUser?.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {item.ClassUser?.status}
            </span>
          </div>

          {showProgress && (
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span>Progress</span>

                <span>{item.ClassUser?.progressPercentage || 0}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-orange-500"
                  style={{
                    width: `${item.ClassUser?.progressPercentage || 0}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Detail;
