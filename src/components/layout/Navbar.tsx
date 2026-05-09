import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Code2, LayoutDashboard, Rocket, User, LogOut, LogIn, CreditCard, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
import { signInWithGoogle, signOut } from '../../lib/firebase';

export default function Navbar() {
  const location = useLocation();
  const { stats, user } = useStore();
  const isLanding = location.pathname === '/';

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full h-16 flex items-center transition-all duration-300",
      isLanding ? "bg-black/10 backdrop-blur-md border-b border-white/[0.03]" : "bg-[#050505] border-b border-white/5"
    )}>
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Box className="w-5 h-5 text-black stroke-[3px]" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white font-display uppercase italic">
              BuildFlow <span className="text-white/20 not-italic">AI</span>
            </span>
          </Link>

          {user && (
            <div className="hidden lg:flex items-center gap-2">
              <nav className="flex items-center gap-1 bg-white/[0.03] px-1 py-1 rounded-2xl border border-white/5">
                <NavButton to="/dashboard" icon={LayoutDashboard} active={location.pathname === '/dashboard'}>Dashboard</NavButton>
                <NavButton to="/builder" icon={Rocket} active={location.pathname === '/builder'}>Architect</NavButton>
                <NavButton to="/pricing" icon={CreditCard} active={location.pathname === '/pricing'}>Enterprise</NavButton>
              </nav>
            </div>
          )}
        </div>

        <div className="flex items-center gap-8">
          {user && (
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-black leading-none">Identity Secured</span>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                   <span className="text-xs font-mono font-bold text-white/60 tracking-tighter">Lvl {stats.level} Strategist</span>
                </div>
              </div>
            </div>
          )}
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="group relative">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-white/30">
                   {user.displayName ? <span className="text-sm font-black text-white">{user.displayName[0]}</span> : <User className="w-5 h-5 text-white/50" />}
                </div>
                {/* Simple dropdown indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 rounded-lg border-2 border-[#050505] flex items-center justify-center">
                   <ChevronRight className="w-3 h-3 text-black stroke-[4px] rotate-90" />
                </div>
              </div>
              <button 
                onClick={() => signOut()}
                className="p-2.5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors text-white/20 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className="px-6 py-2.5 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)]"
            >
              Authenticate
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavButton({ to, icon: Icon, children, active }: { to: string, icon: any, children: React.ReactNode, active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
        active 
          ? "bg-white/[0.08] text-white shadow-sm border border-white/10" 
          : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
      )}
    >
      <Icon className={cn("w-3.5 h-3.5 transition-colors", active ? "text-cyan-400" : "text-current")} />
      {children}
    </Link>
  );
}
