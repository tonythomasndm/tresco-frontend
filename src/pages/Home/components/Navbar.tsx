import { useState, useEffect, useRef } from "react";
import { Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(() => !!localStorage.getItem("user"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/40 border-b border-slate-100/50' 
        : 'bg-transparent'
    }`}>
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
              <>
                <Link
                  to="/connect"
                  className="text-[13px] font-semibold bg-[#1c3c66] text-white px-5 py-2.5 rounded-lg hover:bg-[#122b4f] transition-all shadow-md mr-1"
                >
                  Analysis
                </Link>
                
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-100 transition"
                  >
                    <User className="w-4 h-4" />
                    <span className="capitalize">{firstName}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 w-48 py-2 mt-2 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 flex flex-col z-50">
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-[#0a152e] hover:bg-slate-50 transition-colors w-full"
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 justify-start hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[13px] font-semibold text-slate-600 hover:text-[#0a152e]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-[13px] font-semibold bg-[#1c3c66] text-white px-5 py-2.5 rounded-lg hover:bg-[#122b4f]"
                >
                  Get Started
                </Link>
              </>
            )}

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

          <div className="flex flex-col gap-3 px-3 pt-6 mt-6 border-t border-slate-200">
            {isLoggedIn ? (
              <>
                <Link
                  to="/connect"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold bg-[#1c3c66] text-white rounded-xl"
                >
                  Analysis
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-3.5 text-[15px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
                >
                  <User className="w-[18px] h-[18px]" /> Profile (<span className="capitalize">{firstName}</span>)
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-3.5 text-[15px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-colors"
                >
                  <LogOut className="w-[18px] h-[18px]" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold bg-[#1c3c66] text-white rounded-xl"
                >
                  Get Started Today
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;