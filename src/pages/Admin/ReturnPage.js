import AdminSidebar from "../../component/AdminSidebar";
import ReturnedAssetsTable from "../../component/ReturnedAssetsTable";

export default function ReturnPage(){
    return(
        <>
        <AdminSidebar />
        <section className="bg-gray-50 min-h-screen p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <ReturnedAssetsTable />
        </div>
        </section>
        </>
    );

}