import { motion } from 'motion/react';
import { Check, Zap, Rocket, Building2, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="flex-1 flex flex-col items-center relative overflow-hidden bg-[#050505] min-h-screen">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 architect-grid opacity-[0.03]" />
      </div>

      <div className="max-w-7xl w-full z-10 space-y-24 p-8 lg:p-24 relative">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Enterprise Scalability Protocols</span>
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none font-display">Capitalize <br /><span className="text-gradient">Your Build.</span></h1>
            <p className="text-lg md:text-xl text-white/30 font-medium leading-relaxed">Select the architectural tier tailored to your execution velocity.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            icon={Zap}
            tier="Sandbox"
            price="0"
            description="Operational baseline for initial experimentation."
            features={['3 Neural Blueprints', 'Standard System Maps', 'Manual ER Exports', 'Community Engine Access']}
          />
          <PricingCard 
            icon={Rocket}
            tier="Founder"
            price="49"
            description="The high-velocity suite for series-ready startups."
            features={['Unlimited Neural Blueprints', 'Advanced Arch Orchestration', 'Live Engine Collaboration', 'CTO Priority Strategy', 'White-Label Branding']}
            featured
          />
          <PricingCard 
            icon={Building2}
            tier="Enterprise"
            price="249"
            description="Zero-trust infrastructure for global scale teams."
            features={['Biometric Security Audits', 'Multi-Region Strategy', 'Custom API Integration', 'Dedicated Architect Lead', 'SSO & Multi-Tenant Hub']}
          />
        </div>

        <div className="blueprint-card p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/[0.01]">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/[0.05] border border-white/10 rounded-[1.8rem] flex items-center justify-center">
                 <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Custom Requirements?</h4>
                 <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.2em]">Contact our core engineering team for specialized blueprints.</p>
              </div>
           </div>
           <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
              Initialize Consultation
           </button>
        </div>

        <div className="flex flex-col items-center gap-8 text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] pt-12">
           <div className="flex items-center gap-12">
             <span>Protocol: SECURE_STRIPE</span>
             <span>Region: GLOBAL_EDGE</span>
             <span>Identity: AES_256_GCM</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ tier, price, description, features, icon: Icon, featured }: any) {
  return (
    <div className={cn(
      "blueprint-card flex flex-col transition-all duration-500 group relative h-full",
      featured ? "border-white/20 shadow-[0_40px_80px_-20px_rgba(255,255,255,0.1)] scale-105 z-10" : "bg-black/40"
    )}>
      {featured && (
        <div className="absolute top-0 right-0 p-8">
           <div className="px-4 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
              Optimal_Vector
           </div>
        </div>
      )}
      
      <div className="p-10 space-y-10 flex-1 flex flex-col">
        <div className={cn("w-16 h-16 rounded-[1.8rem] flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shadow-2xl", featured ? "bg-white text-black border-white" : "bg-white/[0.03] border-white/10 text-white/20")}>
          <Icon className="w-7 h-7 stroke-[2.5px]" />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">{tier} Protocol</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter text-white italic">${price}</span>
              <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">/ Month</span>
            </div>
          </div>
          <p className="text-sm text-white/30 leading-relaxed font-bold uppercase tracking-tight">{description}</p>
        </div>
        
        <div className="space-y-6 pt-10 border-t border-white/5 flex-1">
          {features.map((f: string, i: number) => (
            <div key={i} className="flex items-start gap-4 group/item">
              <div className={cn("mt-1 w-2 h-2 rounded-full transition-all group-hover/item:scale-125", featured ? "bg-cyan-500" : "bg-white/10")} />
              <span className="text-[11px] text-white/50 font-bold uppercase tracking-tight leading-tight">{f}</span>
            </div>
          ))}
        </div>

        <button className={cn(
          "w-full py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all mt-10",
          featured 
            ? "bg-white text-black hover:scale-[1.02] shadow-[0_20px_40px_-5px_rgba(255,255,255,0.2)]" 
            : "bg-white/[0.03] hover:bg-white/[0.08] text-white/40 hover:text-white border border-white/10"
        )}>
          Initialize Protocol
        </button>
      </div>
    </div>
  );
}
