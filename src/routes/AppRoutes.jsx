import React, { useContext } from "react";
import {  Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DroneTagging from "../components/DroneTagging";
import UploadFile from "../components/UploadFile";
import Excel from "../components/Excel";
import { UserContext } from "../context/userContext";
import SignIn from "../components/SignIn";

const AppRoutes = () => {
  const { userData } = useContext(UserContext);
  if (!userData) {
    return <SignIn />;
  }
  return (
    <div>
      <Layout />
        <Routes>
          <Route index element={<DroneTagging />} />
          <Route path="upload_file" element={<UploadFile />} />
          <Route path="excel" element={<Excel />} />
        </Routes>

    </div>
  );
};

export default AppRoutes;
