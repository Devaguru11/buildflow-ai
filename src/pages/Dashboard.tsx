import { motion } from 'motion/react';
import { 
  Plus, 
  Rocket, 
  Zap, 
  Trophy, 
  Clock, 
  Shield, 
  BarChart3, 
  ArrowUpRight, 
  History,
  LayoutDashboard,
  Brain,
  Layers,
  Database,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { cn, formatXP } from '../lib/utils';
import React from 'react';

export default function Dashboard() {
  const { stats, projects } = useStore();

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#050505]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none architect-grid z-0" />

      {/* Sidebar - Architect Profile */}
      <aside className="w-full lg:w-80 border-r border-white/5 flex flex-col bg-[#050505] overflow-y-auto scrollbar-hide shrink-0 lg:h-full relative z-20">
        <div className="p-8 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Architect Identity</h3>
              <div className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-[9px] font-mono text-cyan-400">ID: 8824-X</div>
            </div>
            
            <div className="flex flex-col items-center bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 py-10 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2rem] p-0.5 relative z-10 glow-cyan mb-6">
                <div className="w-full h-full bg-[#050505] rounded-[1.8rem] flex items-center justify-center">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2 relative z-10">
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Lvl {stats.level}</h4>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-black">Principal Strategist</p>
                <div className="flex flex-col items-center gap-2 mt-4">
                  <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.xp % 1000) / 10}%` }}
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 font-bold uppercase tracking-widest">{stats.xp % 1000} / 1000 XP</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <StatCardSmall icon={Zap} label="Accumulated XP" value={formatXP(stats.xp)} color="cyan" />
              <StatCardSmall icon={Rocket} label="Ready Builds" value={projects.length.toString()} color="purple" />
              <StatCardSmall icon={Clock} label="Active Streak" value={`${stats.streak} Days`} color="orange" />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-6">Neural Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              <AchievementBadge title="MVP Master" earned />
              <AchievementBadge title="Scale Pro" />
              <AchievementBadge title="Cloud Native" locked />
            </div>
          </div>

          <div className="pt-8 mt-auto border-t border-white/5">
             <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-[2rem] group cursor-pointer hover:bg-purple-500/10 transition-colors">
                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Star className="w-3 h-3" /> Upgrade Target
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-bold uppercase tracking-tight">Unlock "Investor Mode 2.0" with 2,500 total XP.</p>
                <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                  Check Requirements <ArrowRight className="w-3 h-3" />
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto relative scrollbar-hide">
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-[1.8rem] flex items-center justify-center shadow-2xl">
                  <LayoutDashboard className="w-7 h-7 text-white/50" />
                </div>
                <div>
                   <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic font-display">Command Console</h1>
                   <div className="flex items-center gap-2 mt-1">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] font-mono">System Readiness: Optimal</span>
                   </div>
                </div>
              </div>
            </div>
            
            <Link 
              to="/builder"
              className="px-10 py-5 bg-white text-black text-xs font-black rounded-2xl flex items-center gap-4 group transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] uppercase tracking-widest"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform stroke-[4px]" />
              Initialize Build Protocol
            </Link>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xs font-black text-white/50 uppercase tracking-[0.4em]">Active Orchestrations</h2>
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/40">{projects.length} FLEET_NODES</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-widest text-white/10">
                 <button className="hover:text-white transition-colors">Sort: Date</button>
                 <div className="w-px h-4 bg-white/5" />
                 <button className="hover:text-white transition-colors">Filter: All</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.length === 0 ? (
                <div className="col-span-full py-40 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[4rem]">
                   <div className="w-24 h-24 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Rocket className="w-10 h-10 text-white/5" />
                  </div>
                  <p className="text-2xl font-black text-white/20 uppercase tracking-tighter italic">No blueprints detected in current fleet.</p>
                  <p className="text-[10px] text-white/10 uppercase tracking-[0.3em] font-bold mt-4">Initialize your first build to start orchestrating.</p>
                </div>
              ) : (
                projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCardSmall({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  };
  return (
    <div className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between transition-all hover:bg-white/[0.04] hover:border-white/10 group">
      <div className="flex items-center gap-5">
        <div className={cn("p-2.5 rounded-xl border transition-all group-hover:scale-110", colors[color])}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">{label}</span>
      </div>
      <span className="text-sm font-mono font-bold text-white tracking-widest">{value}</span>
    </div>
  );
}

function AchievementBadge({ title, earned, locked }: any) {
  return (
    <div className={cn(
      "aspect-square rounded-2xl border flex items-center justify-center transition-all duration-500 relative group cursor-pointer",
      earned ? "bg-cyan-500/5 border-cyan-500/20 text-cyan-400 glow-cyan" : "bg-white/[0.02] border-white/5 text-white/5",
      locked && "opacity-10 grayscale"
    )} title={title}>
      {earned && <div className="absolute inset-0 bg-cyan-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />}
      {earned ? <Trophy className="w-7 h-7 relative z-10" /> : <Shield className="w-7 h-7 relative z-10" />}
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/blueprint/${project.id}`} className="group block">
        <div className="blueprint-card p-1">
           <div className="p-8 h-full flex flex-col group-hover:bg-white/[0.02] transition-colors relative">
              <div className="flex items-center justify-between mb-10">
                <div className="flex gap-2">
                  {project.techStack.slice(0, 2).map((tech: string, i: number) => (
                    <span key={i} className="text-[8px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/30 uppercase font-mono tracking-tighter">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowUpRight className="w-4 h-4 text-white/30" />
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                   <div className="text-[9px] text-cyan-400 font-mono font-black uppercase tracking-[0.3em]">Blueprint_Active</div>
                   <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tighter leading-[0.9] italic font-display">
                     {project.title}
                   </h3>
                </div>
                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-bold uppercase tracking-tight">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
                    <span className="relative block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                  </div>
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Deployment_Ready</span>
                </div>
                <div className="text-[9px] font-mono text-white/10">
                  {new Date(project.generatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                </div>
              </div>
           </div>
        </div>
      </Link>
    </motion.div>
  );
}
