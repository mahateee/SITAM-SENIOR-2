// import logo from "./logo.svg";
import "./App.css";
import Assets from "./pages/Assets";
import { Link } from "react-router-dom";
import { Switch, Routes, Route } from "react-router-dom";
import AddAsset from "./pages/AddAsset";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Asset" element={<Assets />} />
        <Route path="/Asset/add" element={<AddAsset />} />
        {/* <Route path='/Asset/show/:id' element={<ShowPage/>} /> */}
        {/* <Route path='/Asset/edit/:id' element={<EditPage/>} /> */}
      </Routes>
    </>
  );
}

export default App;
