import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("U");
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <div className="items-center hidden space-x-5 md:flex">

    
      
  
    
  {isLoggedIn && (
    <Link
      to="/profile"
      className="flex items-center gap-2 text-sm font-medium text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-100 transition"
    >
      <User className="w-4 h-4" />
      Profile
    </Link>
  )}        
       


            {isLoggedIn ? (
              <Link
                to="/connect"
                className="text-[13px] font-semibold bg-[#1c3c66] text-white px-5 py-2.5 rounded-lg hover:bg-[#122b4f] transition-all shadow-md"
              >
                Analysis
              </Link>
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

            <div className="flex flex-col gap-3 px-3 pt-6 mt-6 border-t border-slate-200">
              {isLoggedIn ? (
                <Link
                  to="/connect"
                  className="block w-full text-center px-4 py-3.5 text-[15px] font-semibold bg-[#1c3c66] text-white rounded-xl"
                >
                  Analysis
                </Link>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;