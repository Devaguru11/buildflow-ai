import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import BlueprintView from './pages/BlueprintView';
import Pricing from './pages/Pricing';
import Navbar from './components/layout/Navbar';
import { useStore } from './store/useStore';

export default function App() {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] relative overflow-hidden">
      {/* Premium Background Ambiance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#080808] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blueprint/:id" element={<BlueprintView />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
