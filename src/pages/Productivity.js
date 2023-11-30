import Sidebar from "../component/Sidebar";
import TaskManager from "../component/TaskManger";
import ChatGPT from "../component/VirtualAssistant";
import frame from "../images/InsideFrame.svg";

function Productivity() {
  return (
    <>
      <Sidebar />
      <div
        class="px-24 pt-6"
        style={{
          backgroundImage: `url(${frame})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "111vh", // Set minimum height to 100% of the viewport height
        }}
      >
        <div class="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 min-h-screen">
          <TaskManager />
          <ChatGPT />
        </div>
      </div>
    </>
  );
}

export default Productivity;
