import React from "react";
import Sidebar from "../component/Sidebar";
import AssetsTable from "../component/CurrentAssets";
import TaskManager from "../component/TaskManger";
import PreviousRequests from "../component/PreviousRequests";
import ChatGPT from "../component/VirtualAssistant";

function Requests() {
  return (
    <>
      <Sidebar />
      <div class="px-24 pt-6">
        <div class="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
          <PreviousRequests />
          <TaskManager />
          <AssetsTable />
          <ChatGPT />
        </div>
      </div>
    </>
    
  );
}

export default Requests;
