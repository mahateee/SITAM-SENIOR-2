import Sidebar from "../component/Sidebar";
import AssetsTable from "../component/CurrentAssets";
import { useLocation } from 'react-router-dom';
import ReturnAlerts from "../component/ReturnAlerts";
import MaintenanceAlert from "../component/MaintenanceAlert";

function PersonalAssets(){
    const location = useLocation();
  const showReturnAlert = location.state?.showReturnAlert || false;
  const showMaintenanceAlert = location.state?.showMaintenanceAlert || false;
    return(
        <>
        <Sidebar />
        <div class="px-24 pt-6">
        {showReturnAlert && <ReturnAlerts />}
        {showMaintenanceAlert && <MaintenanceAlert />}
        {/* Adding space between components */}
        <div className="mb-8 lg:mb-12" />{" "}
        <AssetsTable />
        </div>
        </>
    );

}
export default PersonalAssets;