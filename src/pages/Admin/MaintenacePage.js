import AdminSidebar from "../../component/AdminSidebar";
import AdminMaintenance from "../Admin/AdminMaintenance"
import AdminMaintenanceApproval from "../Admin/AdminMaintenanceApproval";

export default function MaintenancePage() {
  return (
    <>
      <AdminSidebar />
      <section className="bg-gray-50 min-h-screen p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <AdminMaintenance />
          <div className="mb-8 lg:mb-12" />{" "}
          {/* Adding space between components */}
          < AdminMaintenanceApproval/>
        </div>
      </section>
    </>
  );
}
