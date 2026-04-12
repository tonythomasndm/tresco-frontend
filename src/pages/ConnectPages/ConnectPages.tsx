import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Link as LinkIcon,
  Code,
  Code2,
  Database,
  Plus,
  ChevronRight,
  Search,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  Terminal,
} from "lucide-react";
import {
  parseResumeForLinks,
  type ExtractedLinks,
} from "../../utils/resumeParser";
import { savePlatformAccounts } from "../../utils/platformAccounts";
import { supabase } from '../../configs/supaClient';

const ConnectPages = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [links, setLinks] = useState<ExtractedLinks>({
    linkedin: "",
    github: "",
    hackerrank: "",
    leetcode: "",
    stackoverflow: "",
    behance: "",
    personalWebsite: "",
    other: [],
  });

  const [additionalRepos, setAdditionalRepos] = useState({
    behance: false,
    personalWebsite: false,
    otherUrl: false,
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setIsParsing(true);
    setError(null);

    try {
      const extractedLinks = await parseResumeForLinks(file);

      setLinks(extractedLinks);

      // Update additional toggles based on what was found
      setAdditionalRepos({
        behance: !!extractedLinks.behance,
        personalWebsite: !!extractedLinks.personalWebsite,
        otherUrl: extractedLinks.other.length > 0,
      });
    } catch (err) {
      console.error("Error parsing resume:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(
        `Failed to parse resume: ${errMsg}. Please enter links manually.`,
      );
    } finally {
      setIsParsing(false);
      // Reset input so the same file could be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleChange = (platform: keyof ExtractedLinks, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Get the logged-in user from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('You must be logged in to save. Please log in first.');
        setIsSaving(false);
        return;
      }

      const user = JSON.parse(storedUser);
      let userId = user.id;

      // Auto-heal legacy sessions without ID
      if (!userId && user.email) {
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single();
          
        if (data && data.id) {
          userId = data.id;
          user.id = userId;
          localStorage.setItem('user', JSON.stringify(user)); // Update session in place
        } else {
          console.error("Auto-heal failed:", fetchError);
        }
      }

      if (!userId) {
        setError('Invalid user session. Please log in again.');
        setIsSaving(false);
        return;
      }

      // Save platform accounts to Supabase
      const result = await savePlatformAccounts(userId, links as unknown as Record<string, string>);

      if (!result.success) {
        setError(`Failed to save: ${result.error}`);
        setIsSaving(false);
        return;
      }

      // Also keep a local copy for downstream processing page
      localStorage.setItem('connected_pages', JSON.stringify(links));
      navigate('/processing');
    } catch (err) {
      console.error('Error saving platform accounts:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(`Something went wrong: ${errMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50">
      
      {/* Top Navbar */}
      {/* <nav className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#0a152e] rounded flex items-center justify-center">
             <UserIcon className="w-5 h-5 text-blue-400" />
           </div>
           <span className="text-lg font-bold tracking-tight text-blue-600">Tresco</span>
        </div>
        <button className="text-slate-500 hover:text-slate-800">
           <Search className="w-5 h-5" />
        </button>
      </nav> */}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl px-4 py-8 pb-24 mx-auto">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0a152e] tracking-tight leading-tight mb-3">
            Connect your
            <br className="hidden sm:block" /> professional pages
          </h1>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            Synchronize your digital footprint to generate a high-fidelity
            recruitment profile. We aggregate data from these sources to build
            your Tresco.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 mb-6 border border-red-100 bg-red-50 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Upload Button */}
        <div className="mb-10">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isParsing}
            className="w-full sm:w-auto bg-[#2b5a9e] hover:bg-[#1e407a] text-white font-medium rounded-xl px-6 py-4 flex items-center justify-center sm:justify-start gap-3 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            <Upload className="w-5 h-5" />
            <span>
              {isParsing ? "Extracting links..." : "Import from Resume"}
            </span>
            {!isParsing && <ChevronRight className="w-4 h-4 ml-2" />}
          </button>
        </div>

        <div className="space-y-6">
          {/* LinkedIn Card */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl sm:p-6 border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800">LinkedIn</h3>
                   <p className="text-xs text-slate-500 mt-0.5">Import professional history and endorsements.</p>
                 </div>
              </div>
              <span className="hidden sm:inline-flex bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Recommended
              </span>
            </div>
            <div className="mt-4">
               <input 
                 type="url" 
                 placeholder="linkedin.com/in/username"
                 value={links.linkedin}
                 onChange={(e) => handleChange('linkedin', e.target.value)}
                 className="w-full px-4 py-3 text-sm font-medium transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full py-3 mt-3 text-sm font-semibold transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">
                 {links.linkedin ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl sm:p-6 border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-50 border-slate-100">
                  <Code className="w-5 h-5 text-slate-700" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800">GitHub</h3>
                 <p className="text-xs text-slate-500 mt-0.5">Analyze repository contributions and code quality.</p>
               </div>
            </div>
            <div className="mt-4">
               <input 
                 type="url" 
                 placeholder="github.com/username"
                 value={links.github}
                 onChange={(e) => handleChange('github', e.target.value)}
                 className="w-full px-4 py-3 text-sm font-medium transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full py-3 mt-3 text-sm font-semibold transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">
                 {links.github ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          {/* StackOverflow Card */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl sm:p-6 border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50">
                <Database className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">StackOverflow</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showcase community contributions and expertise.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="url"
                placeholder="stackoverflow.com/users/..."
                value={links.stackoverflow}
                onChange={(e) => handleChange("stackoverflow", e.target.value)}
                className="w-full px-4 py-3 text-sm font-medium transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
              />
              <button className="w-full py-3 mt-3 text-sm font-semibold transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">
                {links.stackoverflow ? "Link Added" : "Add link"}
              </button>
            </div>
          </div>

          {/* HackerRank Card */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl sm:p-6 border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50">
                <Terminal className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">HackerRank</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify coding certifications and challenge scores.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="url"
                placeholder="hackerrank.com/profile/username"
                value={links.hackerrank}
                onChange={(e) => handleChange("hackerrank", e.target.value)}
                className="w-full px-4 py-3 text-sm font-medium transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
              />
              <button className="w-full py-3 mt-3 text-sm font-semibold transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">
                {links.hackerrank ? "Link Added" : "Add link"}
              </button>
            </div>
          </div>

          {/* LeetCode Card */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl sm:p-6 border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50">
                  <Code2 className="w-5 h-5 text-orange-500" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800">LeetCode</h3>
                 <p className="text-xs text-slate-500 mt-0.5">Showcase coding algorithms and problem-solving skills.</p>
               </div>
            </div>
            <div className="mt-4">
               <input 
                 type="url" 
                 placeholder="leetcode.com/username"
                 value={links.leetcode}
                 onChange={(e) => handleChange('leetcode', e.target.value)}
                 className="w-full px-4 py-3 text-sm font-medium transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full py-3 mt-3 text-sm font-semibold transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">
                 {links.leetcode ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          <div className="p-5 mt-8 bg-white border shadow-sm rounded-2xl sm:p-6 border-slate-100">
             <div className="flex items-center gap-2 mb-5">
               <Plus className="w-4 h-4 text-blue-600 bg-blue-50 rounded-full p-0.5" />
               <h3 className="text-sm font-bold text-slate-800">Additional Repositories</h3>
             </div>
             
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  setAdditionalRepos((p) => ({ ...p, behance: !p.behance }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  additionalRepos.behance
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Search className="w-4 h-4" /> Behance
                {additionalRepos.behance && (
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
                )}
              </button>

              <button
                onClick={() =>
                  setAdditionalRepos((p) => ({
                    ...p,
                    personalWebsite: !p.personalWebsite,
                  }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  additionalRepos.personalWebsite
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <UserIcon className="w-4 h-4" /> Personal Website
                {additionalRepos.personalWebsite && (
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
                )}
              </button>

              <button
                onClick={() =>
                  setAdditionalRepos((p) => ({ ...p, otherUrl: !p.otherUrl }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  additionalRepos.otherUrl
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Plus className="w-4 h-4" /> Other URL
                {additionalRepos.otherUrl && (
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
                )}
              </button>
            </div>

            {/* Expanded Inputs based on toggles */}
            <div className="mt-5 space-y-3">
              {additionalRepos.behance && (
                <input
                  type="url"
                  placeholder="behance.net/..."
                  value={links.behance}
                  onChange={(e) => handleChange("behance", e.target.value)}
                  className="w-full px-4 py-2 text-sm border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              )}
              {additionalRepos.personalWebsite && (
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={links.personalWebsite}
                  onChange={(e) =>
                    handleChange("personalWebsite", e.target.value)
                  }
                  className="w-full px-4 py-2 text-sm border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              )}
              {additionalRepos.otherUrl && (
                <input
                  type="url"
                  placeholder="https://other-portfolio.com"
                  value={links.other[0] || ""}
                  onChange={(e) => {
                    const newOther = [...links.other];
                    newOther[0] = e.target.value;
                    setLinks((p) => ({ ...p, other: newOther }));
                  }}
                  className="w-full px-4 py-2 text-sm border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6 pb-20">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 font-medium transition-colors bg-white border rounded-xl text-slate-600 border-slate-200 hover:bg-slate-50"
            >
              Skip
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>



    </div>
  );
};

export default ConnectPages;
