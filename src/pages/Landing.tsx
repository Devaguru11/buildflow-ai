import { motion } from 'motion/react';
import { ArrowRight, Bot, Cpu, Layers, Sparkles, Zap, Shield, BarChart3, Globe, Rocket, CheckCircle2, Star, ZapOff, Fingerprint, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Landing() {
  return (
    <div className="relative pt-12 pb-32 overflow-hidden bg-[#050505]">
      {/* Hero Background Elements */}
      <div className="absolute top-0 inset-x-0 h-screen pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 architect-grid opacity-20" />
      </div>

      {/* Hero Content */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Architecting the future of technical execution</span>
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter leading-[0.85] text-white"
            >
              FROM IDEA TO <br />
              <span className="text-gradient hover:text-cyan-400 transition-colors cursor-default">PRODUCT_BLUEPRINT</span> <br />
              IN MINUTES.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-base md:text-xl text-white/60 leading-relaxed font-medium"
            >
              BuildFlow AI transforms startup ideas into production-ready system architecture, 
              flowcharts, database schemas, and execution roadmaps instantly.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/builder"
              className="px-10 py-5 bg-white text-black font-black rounded-2xl flex items-center gap-3 group transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] uppercase tracking-widest text-xs"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3px]" />
            </Link>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-xs backdrop-blur-md">
              Watch Demo Video
            </button>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group h-[500px]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="blueprint-card w-full h-full p-2 bg-[#050505]">
            <div className="w-full h-full bg-[#080808] rounded-[2.2rem] overflow-hidden border border-white/5 relative">
              {/* Mock App UI */}
              <div className="absolute top-0 inset-x-0 h-16 bg-white/[0.02] border-b border-white/5 flex items-center px-8 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/30 uppercase tracking-widest">BuildFlow_OS_Active</div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                </div>
              </div>
              <div className="p-12 pt-24 grid grid-cols-12 gap-8">
                <div className="col-span-3 space-y-4">
                  <div className="h-6 w-32 bg-white/10 rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                    <div className="h-3 w-4/5 bg-white/5 rounded-full" />
                    <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                  </div>
                </div>
                <div className="col-span-9 space-y-8">
                   <div className="grid grid-cols-3 gap-6">
                      <div className="h-40 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl p-6 relative overflow-hidden">
                        <Cpu className="w-32 h-32 absolute -right-8 -bottom-8 opacity-10 text-cyan-500" />
                      </div>
                      <div className="h-40 bg-purple-500/5 border border-purple-500/10 rounded-3xl" />
                      <div className="h-40 bg-white/5 border border-white/5 rounded-3xl" />
                   </div>
                   <div className="h-48 bg-white/[0.02] border border-white/5 rounded-3xl" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Markers */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-y border-white/5">
        <div className="text-center space-y-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Trusted by founders worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-30 grayscale">
            <div className="text-2xl font-black italic tracking-tighter">ORBIT</div>
            <div className="text-2xl font-black italic tracking-tighter">NEXUS</div>
            <div className="text-2xl font-black italic tracking-tighter">VOID</div>
            <div className="text-2xl font-black italic tracking-tighter">PULSE</div>
            <div className="text-2xl font-black italic tracking-tighter">APEX</div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 p-2 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase italic">Instant <br /><span className="text-cyan-400">Arch Orchestration</span></h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-md">Our neural engine analyzes your idea and generates production-ready system maps in a unified technical language.</p>
            <ul className="space-y-4">
              <FeatureItem label="Advanced System Architecture" />
              <FeatureItem label="Production SQL Schemas" />
              <FeatureItem label="API Endpoint Mapping" />
            </ul>
          </div>
          <div className="flex-1 w-full aspect-square bg-[#0c0c0c] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group">
             <div className="absolute inset-0 architect-grid opacity-10 group-hover:opacity-20 transition-opacity" />
             <Network className="w-full h-full text-white/[0.02] absolute inset-0 -rotate-12 scale-110" />
             <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 bg-cyan-500/20 border border-cyan-500/30 rounded-3xl glow-cyan animate-bounce flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-cyan-400" />
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PremiumFeatureCard 
            icon={Fingerprint}
            title="Biometric Security"
            description="Enterprise-grade security blueprints baked into every design by default."
            color="cyan"
          />
          <PremiumFeatureCard 
            icon={Layers}
            title="Full-Stack Logic"
            description="From database relationships to client-side state management flowcharts."
            color="purple"
          />
          <PremiumFeatureCard 
            icon={BarChart3}
            title="Investor Ready"
            description="Generate high-impact pitch summaries and cost estimations for seed funding."
            color="green"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="blueprint-card p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 opacity-30" />
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none relative z-10">Start Your <br />Build Today.</h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto relative z-10 font-medium">Join 12,000+ founders architecting their vision on BuildFlow AI.</p>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/builder"
              className="px-12 py-6 bg-white text-black font-black rounded-2xl flex items-center gap-4 transition-all hover:scale-105 uppercase tracking-widest text-xs"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 stroke-[3px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-black">B</div>
              <span className="text-sm font-bold uppercase tracking-widest text-white">BuildFlow <span className="text-white/30 italic">AI</span></span>
           </div>
           <div className="flex gap-8 text-[10px] uppercase font-black tracking-widest text-white/20">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
           </div>
           <p className="text-[10px] font-mono text-white/20">© 2026 BUILDFLOW_SYSTEMS_LLC</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
      <span className="text-sm font-bold text-white/60 uppercase tracking-tight">{label}</span>
    </li>
  );
}

function PremiumFeatureCard({ icon: Icon, title, description, color }: any) {
  const colors: any = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
  };
  return (
    <div className="blueprint-card p-8 group h-full">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 border", colors[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold text-white uppercase italic tracking-tighter mb-4">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed font-medium">{description}</p>
    </div>
  );
}
