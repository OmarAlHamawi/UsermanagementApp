import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import MainPage from "./components/Main/MainPage";
import CreateUser from "./components/APIs/CreateUser";
import DeleteUser from "./components/APIs/DeleteUser";
import GetUserById from "./components/APIs/GetUserById";
import UpdateUser from "./components/APIs/UpdateUser";
import ViewAllUsers from "./components/APIs/ViewAllUsers";
import CreateUpdateUser from "./components/APIs/CreateUpdateUser";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/users" element={<ViewAllUsers />} />
      <Route path="/users/get-by-id" element={<GetUserById />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="/users/update" element={<UpdateUser />} />
      <Route path="/users/delete" element={<DeleteUser />} />
      <Route path="/user/form" element={<CreateUpdateUser />} />
    </Routes>
  );
}

export default App;
