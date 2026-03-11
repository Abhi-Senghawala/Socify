import React from "react";
import MobileBottomBar from "./MobileBottombar";
import DesktopSidebar from "./DesktopSidebar";
import MobileTopbar from "./MobileTopBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900">
      <DesktopSidebar />
      <MobileTopbar />
      <main className="md:ml-20 lg:ml-20 min-h-screen pb-16 md:pb-0 pt-14 md:pt-0">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
      <MobileBottomBar />
    </div>
  );
};

export default Layout;
