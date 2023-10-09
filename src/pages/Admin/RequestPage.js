import AdminSidebar from "../../component/AdminSidebar";
import AdminNewRequestsTable from "./AdminApproval";
import AdminRequest from "./AdminResquest";

export default function RequestPage() {
  return (
    <>
      <AdminSidebar />
      <section className="bg-gray-50 min-h-screen p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <AdminRequest />
          <div className="mb-8 lg:mb-12" />{" "}
          {/* Adding space between components */}
          <AdminNewRequestsTable />
        </div>
      </section>
    </>
  );
}
