

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">

      {/* Navbar (sticky for better UX) */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto">

        {/* Responsive Container */}
        <div className="w-full h-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1600px] mx-auto">
          
          <Outlet />

        </div>

      </main>
    </div>
  );
};