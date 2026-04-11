// import React, { useMemo, useCallback } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { ROUTES } from "../../constants";


// const Navbar = () => {
//   console.log("TopNavbar loaded");
//   const navigate = useNavigate();

//   const navItems = useMemo(
//     () => [
//       { label: "Home", path: ROUTES.HOME },
//       { label: "Analysis", path: ROUTES.DASHBOARD },
//       { label: "Profile", path: ROUTES.PROFILE },
//     ],
//     []
//   );

//   const handleLogout = useCallback(() => {
//     localStorage.clear(); // adjust if using token-based auth
//     navigate(ROUTES.LOGIN);
//   }, [navigate]);

//   return (
//     <header className="items-center justify-between hidden h-16 px-6 bg-white border-b shadow-sm md:flex">

//       {/* Left - Logo */}
//       <div className="flex items-center gap-2 text-lg font-semibold">
//         <img src="/Logo.svg" alt="logo" className="object-contain w-8 h-8" />
//         <span>TrustScore</span>
//       </div>

//       {/* Center - Navigation */}
//       <nav className="flex items-center gap-6">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `text-sm font-medium transition ${isActive
//                 ? "text-blue-600"
//                 : "text-gray-600 hover:text-blue-500"
//               }`
//             }
//           >
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Right - Actions */}
//       <div>
//         <button
//           onClick={handleLogout}
//           className="text-sm font-medium text-red-500 hover:text-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default React.memo(Navbar);



import React, { useMemo, useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Home", path: ROUTES.HOME },
      { label: "Profile", path: ROUTES.PROFILE },

      { label: "Dashboard", path: ROUTES.DASHBOARD },
      { label: "Analysis", path: ROUTES.CONNECT },

    ],
    []
  );

 const handleLogout = useCallback(() => {
  localStorage.removeItem("user");
  navigate(ROUTES.HOME);
}, [navigate]);

  return (
    <header className="w-full bg-white border-b shadow-sm">

      {/* Top Bar */}
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        
        {/* Logo */}
        <div
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-2 text-lg font-semibold cursor-pointer"
        >
          <img src="/Logo.svg" alt="logo" className="object-contain w-8 h-8" />
          <span>TrustScore</span>
        </div>

        {/* Desktop Nav */}
        <nav className="items-center hidden gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Logout */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-700 md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 bg-white border-t md:hidden">
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-left text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default React.memo(Navbar);