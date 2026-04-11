import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut, Settings, ChevronRight, Lock } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    try {
      setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#f1f5f9] to-[#e8f0fe]">
      {/* Top Nav */}
      {/* <nav className="bg-[#03102a] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-white stroke-[2.5]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 5 18 3-9h3" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">TrustScore</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </nav> */}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-28 sm:h-32 bg-gradient-to-r from-[#03102a] via-[#0a1835] to-[#162550] relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(99,102,241,0.3) 0%, transparent 50%)'
            }} />
          </div>

          {/* Avatar + Info */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-xl border-4 border-white -mt-12 sm:-mt-14">
              {getInitials(user.name)}
            </div>

            <div className="mt-4 sm:mt-5">
              <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0a152e] tracking-tight">{user.name}</h1>
              <p className="text-slate-500 text-sm sm:text-base mt-0.5">{user.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  <Shield className="w-3 h-3" />
                  {user.role || 'Member'}
                </span>
                {user.created_at && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    Joined {formatDate(user.created_at)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Full Name</p>
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Email Address</p>
                <p className="text-sm font-semibold text-slate-800">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Role</p>
                <p className="text-sm font-semibold text-slate-800 capitalize">{user.role || 'Member'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Account ID</p>
                <p className="text-sm font-semibold text-slate-800 font-mono">{String(user.id).slice(0, 8)}...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Quick Actions</h3>
          </div>
          <div>
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Change Password</p>
                  <p className="text-xs text-slate-400">Update your account password</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-red-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-600">Sign Out</p>
                  <p className="text-xs text-slate-400">Log out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
