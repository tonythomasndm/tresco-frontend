import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("U");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed?.name || parsed?.email || "U");
      } catch {
        setUserName(user);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#f8fafc] lg:bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center flex-shrink-0 gap-2 cursor-pointer"
          >
            <img src="/Logo.svg" alt="logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-extrabold text-[#0a152e] tracking-tight">
               Tresco
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-sm font-medium text-slate-500 hover:text-[#0a152e]">
              How it works
            </a>
            <a href="#solutions" className="text-sm font-medium text-slate-500 hover:text-[#0a152e]">
              Solutions
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-500 hover:text-[#0a152e]">
              Pricing
            </a>
            <a href="#resources" className="text-sm font-medium text-slate-500 hover:text-[#0a152e]">
              Resources
            </a>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-5">
            {isLoggedIn ? (
              <div className="relative flex items-center gap-4">
                <div
                  className="pl-4 border-l border-slate-200 cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-8 h-8 bg-[#1c3c66] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 top-10 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-[100] py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-slate-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#1c3c66] text-white px-5 py-2.5 rounded-lg hover:bg-[#122b4f]"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f8fafc] border-t px-4 pb-6">
          <a href="#how-it-works" className="block py-2">How it works</a>
          <a href="#solutions" className="block py-2">Solutions</a>
          <a href="#pricing" className="block py-2">Pricing</a>
          <a href="#resources" className="block py-2">Resources</a>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/connect")}
                className="w-full mt-4 bg-gray-200 py-2 rounded"
              >
                Analysis
              </button>
              <button
                onClick={handleLogout}
                className="w-full mt-2 bg-red-100 text-red-600 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block mt-4 text-center bg-[#1c3c66] text-white py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;