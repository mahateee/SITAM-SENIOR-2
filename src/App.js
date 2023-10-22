// import logo from "./logo.svg";
import "./App.css";
import Assets from "./pages/Assets";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Switch, Routes, Route } from "react-router-dom";
import AddAsset from "./pages/AddAsset";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditAsset from "./pages/EditAsset";
import ShowPage from "./pages/ShowPage";
import { useEffect, useState } from "react";
// import Request from "./component/Request";
import AuthProvider from "./context/AuthContext";
import Requests from "./pages/Requests";
import NewRequest from "./pages/NewRequest";
import UserInfo from "./pages/UserInfo";
import AdminAccount from "./pages/Admin/AdminAccount";
import RequestPage from "./pages/Admin/RequestPage";
import Maintenance from "./pages/Maintenance";
import MaintenancePage from "./pages/Admin/MaintenacePage";
import EmployeeList from "./pages/Admin/EmployeeList";

const USER_TYPE = {
  PUBLIC: "Public User",
  NORMAL_USER: "user",
  ADMIN_USER: "admin",
};
function App() {
  const [userRole, setUserRole] = useState(USER_TYPE.PUBLIC);
  const navigate = useNavigate();

  const adminUserRoutes = [
    { path: "/", element: <Assets /> },
    { path: "/add", element: <AddAsset /> },
    { path: "/edit/:id", element: <EditAsset /> },
    { path: "/show/:id", element: <ShowPage /> },
  ];

  useEffect(() => {
    if (userRole === USER_TYPE.ADMIN_USER) {
      navigate("/Asset");
    } else if (userRole === USER_TYPE.NORMAL_USER) {
      navigate("/user");
    } else {
      navigate("/");
    }
  }, [userRole]);
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <Home />
              </PublicElement>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicElement>
                <SignIn setUserRole={setUserRole} />
              </PublicElement>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicElement>
                <SignUp />
              </PublicElement>
            }
          />
          <Route
            path="/Asset/*"
            element={
              <AdminElement userRole={userRole}>
                <Routes>
                  {adminUserRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </AdminElement>
            }
          />
          <Route
            path="/adminAccount"
            element={
              <AdminElement userRole={userRole}>
                <AdminAccount />
              </AdminElement>
            }
          />
          <Route
            path="/requestPage"
            element={
              <AdminElement userRole={userRole}>
                <RequestPage />
              </AdminElement>
            }
          />
          <Route
            path="/employeelist"
            element={
              <AdminElement userRole={userRole}>
                <EmployeeList />
              </AdminElement>
            }
          />
          <Route
            path="/maintenancePage"
            element={
              <AdminElement userRole={userRole}>
                <MaintenancePage />
              </AdminElement>
            }
          />

          <Route
            path="/user"
            element={
              <UserElement userRole={userRole}>
                <UserInfo />
              </UserElement>
            }
          />

          <Route
            path="/Request"
            element={
              <UserElement userRole={userRole}>
                <Requests />
              </UserElement>
            }
          />

          <Route
            path="/newRequest"
            element={
              <UserElement userRole={userRole}>
                <NewRequest />
              </UserElement>
            }
          />
          <Route
            path="/Request/Maintenance/:id"
            element={
              <UserElement userRole={userRole}>
                <Maintenance />
              </UserElement>
            }
          />

          {/* <Route
            path="/Request/Assets"
            element={
              <UserElement userRole={userRole}>
                <div>Asset</div>
              </UserElement>
            }
          /> */}
          {/* <Route
            path="/Request/Maintenance"
            element={
              <UserElement userRole={userRole}>
                <div>Maintenance</div>
              </UserElement>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </>
  );
}
function PublicElement({ children }) {
  return <>{children}</>;
}
function UserElement({ children, userRole }) {
  if (userRole === USER_TYPE.NORMAL_USER || userRole === USER_TYPE.ADMIN_USER) {
    return <>{children}</>;
  }
}
function AdminElement({ children, userRole }) {
  if (userRole === USER_TYPE.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <div>you don't have access to this page!</div>;
  }
}
export default App;
