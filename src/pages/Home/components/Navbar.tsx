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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="w-full bg-[#f8fafc] lg:bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 gap-2">
            <img
              src="/Logo.svg"
              alt="logo"
              className="object-contain w-8 h-8"
            />
            <Link
              to="/"
              className="text-xl font-extrabold text-[#0a152e] tracking-tight"
            >
              TrustSco
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="items-center hidden space-x-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-500 hover:text-[#0a152e] transition-colors"
            >
              How it works
            </a>
            <a
              href="#solutions"
              className="text-sm font-medium text-slate-500 hover:text-[#0a152e] transition-colors"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-500 hover:text-[#0a152e] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#resources"
              className="text-sm font-medium text-slate-500 hover:text-[#0a152e] transition-colors"
            >
              Resources
            </a>
          </div>

          {/* Desktop Auth */}
          <div className="items-center hidden space-x-5 md:flex">
            {isLoggedIn ? (
              <div className="relative flex items-center gap-4">
                <div
                  className="pl-4 border-l cursor-pointer border-slate-200"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[#1c3c66] rounded-full hover:shadow-md transition">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 w-32 py-1 bg-white border rounded-lg shadow-lg top-10 border-slate-200 z-[100]">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-2 px-4 py-2 text-[13px] font-semibold text-red-500 transition hover:bg-slate-50 hover:text-red-700"
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
                className="text-[13px] font-semibold bg-[#1c3c66] text-white px-5 py-2.5 rounded-lg hover:bg-[#122b4f] transition-all shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 hover:text-[#0a152e] focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f8fafc] border-b border-slate-100 absolute w-full top-20 shadow-xl">
          <div className="px-4 pt-4 pb-8 space-y-3">
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#0a152e] hover:bg-slate-100 transition-colors"
            >
              How it works
            </a>
            <a
              href="#solutions"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#0a152e] hover:bg-slate-100 transition-colors"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#0a152e] hover:bg-slate-100 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#resources"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#0a152e] hover:bg-slate-100 transition-colors"
            >
              Resources
            </a>

            <div className="flex flex-col gap-3 px-3 pt-6 mt-6 border-t border-slate-200">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-[#1c3c66] rounded-full">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      Signed in
                    </span>
                  </div>
                  <Link
                    to="/connect"
                    className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition"
                  >
                    Analysis
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold bg-[#1c3c66] text-white rounded-xl hover:bg-[#122b4f] transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
