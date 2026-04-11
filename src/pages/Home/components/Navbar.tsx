import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="flex items-center flex-shrink-0">
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
