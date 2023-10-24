import Sidebar from "../component/Sidebar";
import TaskManager from "../component/TaskManger";
import ChatGPT from "../component/VirtualAssistant";
function Productivity(){
    return(
        <>
        <Sidebar />
        <div class="px-24 pt-6">
            <div class="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2">
                <TaskManager />
                <ChatGPT />
            </div>
        </div>
        </>

    );
}
export default Productivity;