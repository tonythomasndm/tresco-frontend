import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  AlertCircle
} from 'lucide-react';
import { parseResumeForLinks, type ExtractedLinks } from '../../utils/resumeParser';

const ConnectPages = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [links, setLinks] = useState<ExtractedLinks>({
    linkedin: '',
    github: '',
    kaggle: '',
    leetcode: '',
    stackoverflow: '',
    behance: '',
    personalWebsite: '',
    other: []
  });

  const [additionalRepos, setAdditionalRepos] = useState({
    stackoverflow: false,
    behance: false,
    personalWebsite: false,
    otherUrl: false
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    setIsParsing(true);
    setError(null);

    try {
      const extractedLinks = await parseResumeForLinks(file);
      
      setLinks(extractedLinks);

      // Update additional toggles based on what was found
      setAdditionalRepos({
        stackoverflow: !!extractedLinks.stackoverflow,
        behance: !!extractedLinks.behance,
        personalWebsite: !!extractedLinks.personalWebsite,
        otherUrl: extractedLinks.other.length > 0
      });

    } catch (err) {
      console.error('Error parsing resume:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(`Failed to parse resume: ${errMsg}. Please enter links manually.`);
    } finally {
      setIsParsing(false);
      // Reset input so the same file could be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = (platform: keyof ExtractedLinks, value: string) => {
    setLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = () => {
    // In a real app, send to backend. For now, save to localStorage.
    localStorage.setItem('connected_pages', JSON.stringify(links));
    navigate('/processing'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <nav className="bg-white px-4 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#0a152e] rounded flex items-center justify-center">
             <UserIcon className="w-5 h-5 text-blue-400" />
           </div>
           <span className="font-bold text-blue-600 tracking-tight text-lg">TrustScore</span>
        </div>
        <button className="text-slate-500 hover:text-slate-800">
           <Search className="w-5 h-5" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 pb-24">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0a152e] tracking-tight leading-tight mb-3">
            Connect your<br className="hidden sm:block"/> professional pages
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Synchronize your digital footprint to generate a high-fidelity recruitment profile. 
            We aggregate data from these sources to build your TrustScore.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
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
            <span>{isParsing ? 'Extracting links...' : 'Import from Resume'}</span>
            {!isParsing && <ChevronRight className="w-4 h-4 ml-2" />}
          </button>
        </div>

        <div className="space-y-6">
          {/* LinkedIn Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
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
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl py-3 transition-colors">
                 {links.linkedin ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
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
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl py-3 transition-colors">
                 {links.github ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          {/* Kaggle Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-cyan-600" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800">Kaggle</h3>
                 <p className="text-xs text-slate-500 mt-0.5">Fetch data science rankings and competition results.</p>
               </div>
            </div>
            <div className="mt-4">
               <input 
                 type="url" 
                 placeholder="kaggle.com/username"
                 value={links.kaggle}
                 onChange={(e) => handleChange('kaggle', e.target.value)}
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl py-3 transition-colors">
                 {links.kaggle ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          {/* LeetCode Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
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
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
               />
               <button className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl py-3 transition-colors">
                 {links.leetcode ? 'Link Added' : 'Add link'}
               </button>
            </div>
          </div>

          {/* Additional Repositories Toggle */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 mt-8">
             <div className="flex items-center gap-2 mb-5">
               <Plus className="w-4 h-4 text-blue-600 bg-blue-50 rounded-full p-0.5" />
               <h3 className="font-bold text-slate-800 text-sm">Additional Repositories</h3>
             </div>
             
             <div className="flex flex-wrap gap-3">
               <button 
                 onClick={() => setAdditionalRepos(p => ({...p, stackoverflow: !p.stackoverflow}))}
                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                   additionalRepos.stackoverflow 
                   ? 'bg-blue-50 border-blue-200 text-blue-700' 
                   : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 <Database className="w-4 h-4" /> Stack Overflow
                 {additionalRepos.stackoverflow && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
               </button>
               
               <button 
                 onClick={() => setAdditionalRepos(p => ({...p, behance: !p.behance}))}
                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                   additionalRepos.behance 
                   ? 'bg-blue-50 border-blue-200 text-blue-700' 
                   : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 <Search className="w-4 h-4" /> Behance
                 {additionalRepos.behance && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
               </button>

               <button 
                 onClick={() => setAdditionalRepos(p => ({...p, personalWebsite: !p.personalWebsite}))}
                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                   additionalRepos.personalWebsite 
                   ? 'bg-blue-50 border-blue-200 text-blue-700' 
                   : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 <UserIcon className="w-4 h-4" /> Personal Website
                 {additionalRepos.personalWebsite && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
               </button>

               <button 
                 onClick={() => setAdditionalRepos(p => ({...p, otherUrl: !p.otherUrl}))}
                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                   additionalRepos.otherUrl 
                   ? 'bg-blue-50 border-blue-200 text-blue-700' 
                   : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 <Plus className="w-4 h-4" /> Other URL
                 {additionalRepos.otherUrl && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
               </button>
             </div>

             {/* Expanded Inputs based on toggles */}
             <div className="space-y-3 mt-5">
               {additionalRepos.stackoverflow && (
                 <input 
                   type="url" 
                   placeholder="stackoverflow.com/users/..."
                   value={links.stackoverflow}
                   onChange={(e) => handleChange('stackoverflow', e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                 />
               )}
               {additionalRepos.behance && (
                 <input 
                   type="url" 
                   placeholder="behance.net/..."
                   value={links.behance}
                   onChange={(e) => handleChange('behance', e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                 />
               )}
               {additionalRepos.personalWebsite && (
                 <input 
                   type="url" 
                   placeholder="https://yourwebsite.com"
                   value={links.personalWebsite}
                   onChange={(e) => handleChange('personalWebsite', e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                 />
               )}
               {additionalRepos.otherUrl && (
                 <input 
                   type="url" 
                   placeholder="https://other-portfolio.com"
                   value={links.other[0] || ''}
                   onChange={(e) => {
                     const newOther = [...links.other];
                     newOther[0] = e.target.value;
                     setLinks(p => ({ ...p, other: newOther }));
                   }}
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                 />
               )}
             </div>
          </div>
          
          {/* Action Buttons */}
          <div className="pt-6 pb-20 flex justify-end gap-4">
             <button
               onClick={() => navigate('/processing')}
               className="px-6 py-3 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
             >
               Skip
             </button>
             <button
               onClick={handleSave}
               className="px-6 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
             >
               Save Changes
             </button>
          </div>
        </div>
      </main>

      {/* Mock Bottom Nav (matches design) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between sm:justify-center sm:gap-16 items-center shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-20">
         <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
            <Database className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Store</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
            <Search className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Analysis</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
            <UserIcon className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Candidates</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5 text-blue-600">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Connect</span>
         </button>
      </div>

    </div>
  );
};

export default ConnectPages;
