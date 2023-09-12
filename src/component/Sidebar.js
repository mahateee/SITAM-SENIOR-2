import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="h-screen flex">
      <div
        className={`bg-gray-800 text-white w-64 ${
          collapsed ? "hidden" : "block"
        } transition-all duration-300`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Sidebar</h2>
          <ul className="mt-8">
            {/* Add your menu items here */}
            <li className="mb-4">Menu Item 1</li>
            <li className="mb-4">Menu Item 2</li>
            <li className="mb-4">Menu Item 3</li>
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-4">
        <button
          className="text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleSidebar}
        >
          {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
