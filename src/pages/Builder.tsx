import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  Code2, 
  Globe, 
  Layout, 
  Rocket, 
  Sparkles, 
  Users, 
  Wallet,
  Settings2,
  Layers,
  Database,
  Terminal,
  Activity,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { generateBlueprint } from '../lib/gemini';
import { useStore } from '../store/useStore';
import { db, auth } from '../lib/firebase';
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';

const STEPS = [
  { id: 'idea', title: 'Neural Core', icon: Brain, description: 'Define original concept' },
  { id: 'stack', title: 'System Map', icon: Code2, description: 'Architectural selection' },
  { id: 'details', title: 'Network Hub', icon: Globe, description: 'Deployment strategy' },
  { id: 'priority', title: 'Launch Vector', icon: Rocket, description: 'Execution constraints' },
];

export default function Builder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    idea: '',
    techStack: '',
    budget: 'Scalable',
    teamSize: 'Agile Team',
    timeline: '4 Weeks',
    deployment: 'Cloud Run',
    industry: 'SaaS',
    priority: 'Speed',
    platform: 'Cloud-Native',
    security: 'High',
    infrastructure: 'Containerized',
    databaseType: 'SQL',
    protocol: 'REST'
  });
  
  const navigate = useNavigate();
  const { user, stats } = useStore();
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!user) {
      alert("Please sign in to generate and save blueprints.");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateBlueprint(formData.idea, formData);
      const projectId = crypto.randomUUID().split('-')[0];
      
      const newProject = {
        userId: user.uid,
        title: result.title || 'Untitled Project',
        description: result.description || formData.idea,
        industry: formData.industry,
        techStack: result.techStack || formData.techStack.split(',').map((s: string) => s.trim()),
        generatedAt: new Date().toISOString(),
        readinessScore: result.readinessScore || 85,
        data: result
      };

      await setDoc(doc(db, 'projects', projectId), newProject);
      
      const userDocRef = doc(db, 'users', user.uid);
      const xpGain = 500;
      const newXp = (stats.xp || 0) + xpGain;
      const newLevel = Math.floor(newXp / 1000) + 1;
      
      await updateDoc(userDocRef, {
        xp: increment(xpGain),
        completedBlueprints: increment(1),
        level: newLevel
      });

      navigate(`/blueprint/${projectId}`);
    } catch (err: any) {
      console.error("Builder Error:", err);
      setError(err.message || "Blueprint synthesis interrupted. Please refine your vision and retry.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-[#050505] overflow-hidden">
      {/* Sidebar Navigator */}
      <aside className="w-full lg:w-96 border-r border-white/5 flex flex-col bg-[#050505] relative z-20 shrink-0">
        <div className="absolute inset-0 architect-grid opacity-[0.03] pointer-events-none" />
        <div className="p-12 space-y-12 relative z-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none font-display">System Architect</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black">Orchestrating technical vision</p>
          </div>

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-6 group">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border relative",
                  i === currentStep ? "bg-white text-black border-white glow-white scale-110" : 
                  i < currentStep ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "bg-white/5 border-white/10 text-white/10"
                )}>
                  {i < currentStep ? <ShieldCheck className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  {i === currentStep && (
                    <motion.div 
                      layoutId="activeStepNode"
                      className="absolute -right-2 top-0 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className={cn(
                    "text-xs font-black uppercase tracking-widest transition-colors",
                    i <= currentStep ? "text-white" : "text-white/10"
                  )}>{step.title}</h3>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-tight",
                    i <= currentStep ? "text-white/60" : "text-white/20"
                  )}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-12 mt-12 border-t border-white/5 space-y-6">
             <div className="flex items-center gap-4 text-white/10">
                <Terminal className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">BuildFlow_CLI_v2.4.0</span>
             </div>
             <div className="flex items-center gap-4 text-white/10">
                <Activity className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Neural_Link: Stable</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Builder Area */}
      <main className="flex-1 overflow-y-auto relative scrollbar-hide">
        <div className="max-w-4xl mx-auto p-12 lg:p-24 min-h-screen flex flex-col">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-16"
              >
                <div className="relative w-64 h-64">
                   <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                   <div className="absolute inset-0 border border-white/[0.03] rounded-full animate-spin [animation-duration:10s]" />
                   <div className="absolute inset-8 border border-white/[0.03] rounded-full animate-spin [animation-duration:15s] [animation-direction:reverse]" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl animate-bounce">
                        <Zap className="w-10 h-10 text-black stroke-[3px]" />
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none font-display">Synthesizing_Build_Specs</h2>
                  <div className="flex flex-col gap-3 items-center">
                    <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                       <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" /> Architecting System Nodes...
                    </p>
                    <p className="text-white/20 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                       <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" /> Mapping ER Relationships...
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
              >
                <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                  <Zap className="w-10 h-10 text-red-500" />
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Interference Detected</h2>
                  <p className="text-white/40 text-base leading-relaxed font-bold uppercase tracking-tight">{error}</p>
                </div>
                <button
                  onClick={handleFinish}
                  className="px-12 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl"
                >
                  Recall Protocol
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col"
              >
                <div className="flex-1 space-y-16">
                  {currentStep === 0 && (
                    <div className="space-y-12">
                      <div className="space-y-4">
                        <div className="text-[11px] text-cyan-400 font-mono font-black uppercase tracking-[0.3em]">Module_01: Neural_Input</div>
                        <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none font-display">The Vision</h2>
                        <p className="text-xl text-white/50 font-medium leading-relaxed max-w-xl">Describe your product vision in natural language. Our architect will parse the underlying technical requirements.</p>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-white/[0.01] rounded-[3rem] border border-white/5 group-hover:border-white/10 transition-colors" />
                        <textarea
                          value={formData.idea}
                          onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                          className="w-full h-80 bg-transparent rounded-[3rem] p-10 text-white focus:outline-none transition-all text-2xl font-medium tracking-tight placeholder:text-white/20 resize-none scrollbar-hide relative z-10"
                          placeholder="What are we building?"
                          style={{ lineHeight: '1.4' }}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-12">
                      <div className="space-y-4">
                        <div className="text-[11px] text-purple-400 font-mono font-black uppercase tracking-[0.3em]">Module_02: System_Nodes</div>
                        <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none font-display">Arch Map</h2>
                        <p className="text-xl text-white/30 font-medium leading-relaxed max-w-xl">Configure the technical constraints of your system architecture.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <InputField 
                          label="Technical Stack"
                          icon={Code2}
                          placeholder="e.g. Next.js, Python, Redis"
                          value={formData.techStack}
                          onChange={(val: string) => setFormData({ ...formData, techStack: val })}
                        />
                        <SelectField 
                          label="Business Vertical"
                          icon={Box}
                          options={['Fintech', 'SaaS', 'Web3', 'AI/ML', 'Health', 'Logistics']}
                          value={formData.industry}
                          onChange={(val: string) => setFormData({ ...formData, industry: val })}
                        />
                        <SelectField 
                          label="Data Layer Strategy"
                          icon={Database}
                          options={['SQL', 'NoSQL', 'Graph', 'Vector']}
                          value={formData.databaseType || 'SQL'}
                          onChange={(val: string) => setFormData({ ...formData, databaseType: val })}
                        />
                        <SelectField 
                          label="Security Protocol"
                          icon={ShieldCheck}
                          options={['Standard', 'High', 'SOC2 Ready', 'Military']}
                          value={formData.security}
                          onChange={(val: string) => setFormData({ ...formData, security: val })}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-12">
                      <div className="space-y-4">
                        <div className="text-[11px] text-yellow-400 font-mono font-black uppercase tracking-[0.3em]">Module_03: Cloud_Orbit</div>
                        <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none font-display">Network Hub</h2>
                        <p className="text-xl text-white/30 font-medium leading-relaxed max-w-xl">Define the infrastructure lifecycle and deployment velocity.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <SelectField 
                          label="Launch Infrastructure"
                          icon={Globe}
                          options={['Cloud Run', 'Vercel', 'AWS/EKS', 'Kubernetes']}
                          value={formData.deployment}
                          onChange={(val: string) => setFormData({ ...formData, deployment: val })}
                        />
                        <SelectField 
                          label="Build Velocity"
                          icon={Activity}
                          options={['Aggressive', 'Balanced', 'Stable']}
                          value={formData.timeline}
                          onChange={(val: string) => setFormData({ ...formData, timeline: val })}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-12">
                      <div className="space-y-4">
                        <div className="text-[11px] text-green-400 font-mono font-black uppercase tracking-[0.3em]">Module_04: Launch_Vector</div>
                        <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none font-display">North Star</h2>
                        <p className="text-xl text-white/30 font-medium leading-relaxed max-w-xl">What is the single most critical factor for this technical orchestration?</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <PriorityCard 
                          title="SPEED"
                          description="Market Entry"
                          active={formData.priority === 'Speed'}
                          onClick={() => setFormData({ ...formData, priority: 'Speed' })}
                        />
                        <PriorityCard 
                          title="SECURITY"
                          description="Zero Trust"
                          active={formData.priority === 'Security'}
                          onClick={() => setFormData({ ...formData, priority: 'Security' })}
                        />
                        <PriorityCard 
                          title="SCALE"
                          description="Auto-Pivot"
                          active={formData.priority === 'Scalability'}
                          onClick={() => setFormData({ ...formData, priority: 'Scalability' })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center gap-3 disabled:opacity-0 transition-all font-black text-white/20 hover:text-white text-xs uppercase tracking-widest"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3px]" /> Previous
                  </button>
                  
                  {currentStep === STEPS.length - 1 ? (
                    <button
                      onClick={handleFinish}
                      disabled={!formData.idea}
                      className="px-12 py-5 bg-white text-black font-black rounded-2xl shadow-[0_20px_40px_-5px_rgba(255,255,255,0.3)] flex items-center gap-4 transition-all hover:scale-105 uppercase tracking-widest text-xs disabled:opacity-30 group"
                    >
                      Authenticate Build <Rocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform stroke-[3px]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                      disabled={currentStep === 0 && !formData.idea}
                      className="px-12 py-5 bg-white text-black rounded-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30"
                    >
                      Next Sequence <ChevronRight className="w-4 h-4 stroke-[3px]" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function InputField({ label, icon: Icon, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-6">
      <label className="text-[11px] uppercase font-black text-white/40 flex items-center gap-3 tracking-[0.2em] font-mono">
        <Icon className="w-4 h-4" /> {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.01] border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.03] transition-all font-bold placeholder:text-white/20 text-lg"
      />
    </div>
  );
}

function SelectField({ label, icon: Icon, options, value, onChange }: any) {
  return (
    <div className="space-y-6">
      <label className="text-[11px] uppercase font-black text-white/20 flex items-center gap-3 tracking-[0.2em] font-mono">
        <Icon className="w-4 h-4" /> {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "p-5 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest border transition-all text-center",
              value === opt ? "bg-white text-black border-white shadow-2xl" : "bg-white/[0.01] border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function PriorityCard({ title, description, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-10 rounded-[3rem] border text-center transition-all group relative overflow-hidden flex flex-col items-center justify-center space-y-4",
        active ? "bg-white text-black border-white shadow-2xl" : "bg-white/[0.01] border-white/5 hover:border-white/20"
      )}
    >
      <div className={cn("text-xl font-black uppercase italic tracking-tighter leading-none", active ? "text-black" : "text-white/40 group-hover:text-white/60")}>{title}</div>
      <div className={cn("text-[9px] uppercase font-black tracking-[0.2em] leading-none", active ? "text-black/40" : "text-white/10")}>{description}</div>
    </button>
  );
}
