import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex admin-layout">
    <Sidebar />
    <div className="flex-1 ml-48 p-5">
      {children}
    </div>
  </div>
  );
};

export default AdminLayout;