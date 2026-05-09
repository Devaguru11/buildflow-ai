import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Layers, 
  MessageSquare, 
  Rocket, 
  Share2, 
  Shield, 
  Zap,
  CheckCircle2,
  Database,
  Code2,
  TrendingUp,
  ExternalLink,
  FileCode,
  Globe,
  Users,
  Settings2,
  Lock,
  Network,
  GitBranch,
  DollarSign,
  Briefcase,
  Lightbulb
} from 'lucide-react';
import { useStore } from '../store/useStore';
import ArchitectureFlow from '../components/diagrams/ArchitectureFlow';
import Mermaid from '../components/diagrams/Mermaid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import { jsPDF } from 'jspdf';

export default function BlueprintView() {
  const { id } = useParams();
  const { projects } = useStore();
  const project = projects.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('architecture');

  const tabs = [
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'flows', label: 'Flows', icon: Network },
    { id: 'strategy', label: 'Strategy', icon: Shield },
    { id: 'features', label: 'Features', icon: Lightbulb },
    { id: 'infrastructure', label: 'Infra', icon: Globe },
    { id: 'database', label: 'Schema', icon: Database },
    { id: 'api', label: 'API', icon: Code2 },
    { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'advice', label: 'CTO Advice', icon: MessageSquare },
  ];

  const handleExportPDF = () => {
    if (!project) return;
    const doc = new jsPDF();
    let y = 20;

    const addSection = (title: string, content: any, spacing = 10) => {
      // Check if we need a new page before the title
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(6, 182, 212); // cyan-500
      doc.text(title, 20, y);
      y += 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);

      if (!content) {
        doc.text("N/A", 20, y);
        y += 10;
        return;
      }

      if (Array.isArray(content)) {
        content.forEach((item, i) => {
          let text = "";
          if (typeof item === 'object') {
            // Specialized formatting for specific array types
            if (item.feature) text = `${item.feature}: ${item.description} (${item.priority || item.timeline})`;
            else if (item.category) text = `${item.category}: ${item.service} - ${item.description}`;
            else if (item.method) text = `${item.method} ${item.path} - ${item.purpose}`;
            else if (item.week) text = `WEEK ${item.week}: ${item.tasks.join(', ')}`;
            else text = JSON.stringify(item);
          } else {
            text = item;
          }
          
          const splitItem = doc.splitTextToSize(`• ${text}`, 170);
          if (y + splitItem.length * 5 > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(splitItem, 20, y);
          y += splitItem.length * 5 + 2;
        });
        y += spacing;
      } else if (typeof content === 'object') {
        Object.entries(content).forEach(([key, val]) => {
          const text = `${key.toUpperCase()}: ${val}`;
          const splitText = doc.splitTextToSize(text, 170);
          if (y + splitText.length * 5 > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(splitText, 20, y);
          y += splitText.length * 5 + 2;
        });
        y += spacing;
      } else {
        const splitText = doc.splitTextToSize(String(content).replace(/#/g, ''), 170);
        if (y + splitText.length * 5 > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(splitText, 20, y);
        y += splitText.length * 5 + spacing;
      }
    };

    // Header
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNICAL MANIFEST", 20, y);
    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`PROJECT: ${project.title.toUpperCase()}`, 20, y);
    y += 6;
    doc.text(`ID: ${project.id}`, 20, y);
    y += 6;
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 20, y);
    y += 20;

    // Content Sections
    addSection('1. EXECUTIVE SUMMARY', project.data.executiveSummary || project.description);
    addSection('2. ARCHITECTURE OVERVIEW', project.data.techStackRecommendation);
    addSection('3. TECH STACK', project.data.techStack);
    addSection('4. INFRASTRUCTURE', project.data.infrastructureStack);
    addSection('5. DEPLOYMENT STRATEGY', project.data.deploymentStrategy);
    addSection('6. SECURITY PROTOCOLS', project.data.securityRecommendations);
    addSection('7. SCALING PLAN', project.data.scalingStrategy);
    addSection('8. DATABASE SCHEMA (SQL)', project.data.databaseSchema);
    addSection('9. API DEFINITION', project.data.apiStructure);
    addSection('10. MVP ROADMAP', project.data.mvpRoadmap);
    addSection('11. MVP FEATURES', project.data.mvpFeatures);
    addSection('12. INVESTOR DECK', project.data.investorMode);
    addSection('13. COST ESTIMATION', project.data.costEstimation);
    addSection('14. CRITICAL FAILURE POINTS', project.data.criticalFailurePoints);
    addSection('15. FINAL CTO ADVICE', project.data.finalCtoRecommendations);

    doc.save(`${project.title.replace(/\s+/g, '_')}_Full_Spec.pdf`);
  };

  if (!project) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse">
        <Rocket className="w-8 h-8 text-white/20" />
      </div>
      <h2 className="text-xl font-bold text-white/30 tracking-widest font-mono">/ FLEET_ERROR: BLUEPRINT_NOT_FOUND</h2>
      <Link to="/dashboard" className="text-cyan-400 font-bold hover:underline">RE-ESTABLISH CONNECTION →</Link>
    </div>
  );

  const { data } = project;

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#050505]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none architect-grid z-0" />

      {/* Sticky Navigator Sidebar */}
      <aside className="w-full lg:w-72 border-r border-white/5 flex flex-col bg-[#050505] overflow-y-auto shrink-0 lg:h-full relative z-20 scrollbar-hide">
        <div className="p-8 pb-4">
           <Link to="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-cyan-400 transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Fleet Console
          </Link>
          
          <div className="space-y-1 mb-10">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-4">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">ID_{project.id?.slice(0, 8)}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-white uppercase font-display leading-tight">{project.title}</h1>
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-4 px-4">Navigator</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  activeTab === tab.id 
                    ? "bg-white/[0.03] text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" 
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full"
                  />
                )}
                <tab.icon className={cn("w-4 h-4 transition-colors", activeTab === tab.id ? "text-cyan-400" : "group-hover:text-white/60")} />
                <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-white/5 space-y-6">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Confidence</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{Math.round((data.confidenceRatio || 0.85) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500" 
                  style={{ width: `${(data.confidenceRatio || 0.85) * 100}%` }}
                />
              </div>
           </div>

           <div className="flex flex-col gap-2">
              <button 
                onClick={handleExportPDF}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)]"
              >
                <Download className="w-4 h-4" /> Export_Spec
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                <Share2 className="w-4 h-4" /> Share_Build
              </button>
           </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto relative scrollbar-hide z-10">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {tabs.find(t => t.id === activeTab)?.icon && (
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    {React.createElement(tabs.find(t => t.id === activeTab)!.icon, { className: "w-6 h-6 text-cyan-400" })}
                  </div>
                )}
                <div>
                  <h2 className="text-4xl font-bold tracking-tighter text-white uppercase font-display leading-none">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-white/50 font-medium mt-2 tracking-tight">System validation & architectural orchestrations.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
               <div className="flex flex-col items-center">
                  <span className="text-[9px] text-white/40 uppercase font-black tracking-widest leading-normal mb-2">Build Readiness</span>
                  <div className="flex items-center gap-3">
                     <span className="text-2xl font-mono font-bold text-white">{project.readinessScore}%</span>
                     <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${project.readinessScore}%` }} />
                     </div>
                  </div>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase font-black tracking-widest leading-normal mb-1">Status</span>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">Day_Zero_Certified</span>
               </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {activeTab === 'architecture' && (
                <div className="space-y-8 pb-32">
                  <div className="blueprint-card p-1">
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                          <Layers className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Architecture Node Graph</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-white/30 uppercase">Neural_Map_Active</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[9px] text-white/20 uppercase font-black tracking-widest leading-none mb-1">Architecture Score</div>
                          <div className="text-sm font-mono font-bold text-cyan-400">9.4 / 10</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white/40">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-0 bg-black/40 min-h-[500px] flex items-center justify-center relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.02] to-transparent pointer-events-none" />
                      <Mermaid chart={data.systemArchitecture} className="border-none bg-transparent min-h-[500px]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ArchitectureBadge icon={Network} label="Architectural Tier" value="Enterprise Grade" color="cyan" description="System architecture designed for sub-100ms latency and high availability." />
                    <ArchitectureBadge icon={GitBranch} label="Communication" value="Event Driven" color="purple" description="Asynchronous message passing via distributed event bus for loose coupling." />
                    <ArchitectureBadge icon={CheckCircle2} label="Consistency" value="Strong Model" color="green" description="ACID compliant transactions at the scale layer for financial-grade data integrity." />
                  </div>
                </div>
              )}
              {activeTab === 'flows' && (
                <div className="flex flex-col gap-12 pb-32">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <FlowCard icon={Users} title="User Journey Flow" chart={data.userFlow} color="cyan" />
                    <FlowCard icon={Settings2} title="Admin Orchestration" chart={data.adminFlow} color="purple" />
                    <FlowCard icon={Zap} title="Request Lifecycle" chart={data.backendRequestFlow} color="yellow" />
                    <FlowCard icon={Lock} title="Auth Architecture" chart={data.authFlow} color="green" />
                  </div>
                  
                  <div className="blueprint-card p-1">
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                          <Rocket className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Product Vision Mind Map</h3>
                      </div>
                    </div>
                    <div className="p-0 bg-black/40 min-h-[400px] overflow-hidden flex items-center justify-center">
                      <Mermaid chart={data.mindMap} className="border-none bg-transparent min-h-[400px]" />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'strategy' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                          <Shield className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Security Strategy</h3>
                      </div>
                      <div className="prose prose-invert max-w-none prose-sm text-white/80 leading-relaxed font-medium">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.securityRecommendations}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Scaling Strategy</h3>
                      </div>
                      <div className="prose prose-invert max-w-none prose-sm text-white/60 leading-relaxed font-medium">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.scalingStrategy}</ReactMarkdown>
                      </div>

                      {data.criticalFailurePoints && (
                        <div className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-3xl">
                           <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Zap className="w-3 h-3" /> Critical Failure Points & Bottlenecks
                           </h4>
                           <ul className="space-y-2">
                              {data.criticalFailurePoints.map((point: string, i: number) => (
                                <li key={i} className="text-xs text-white/60 flex items-start gap-2">
                                  <span className="text-red-500">•</span> {point}
                                </li>
                              ))}
                           </ul>
                        </div>
                      )}
                    </div>
                  </div>
              )}
              {activeTab === 'features' && (
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">MVP Launch Features</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.mvpFeatures?.map((f: any, i: number) => (
                        <div key={i} className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{f.priority}</span>
                            <Zap className="w-3.5 h-3.5 text-white/20" />
                          </div>
                          <h4 className="text-sm font-bold text-white mb-2">{f.feature}</h4>
                          <p className="text-xs text-white/40 leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="pt-12 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">Post-MVP Scaling & AI</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.advancedFeatures?.map((f: any, i: number) => (
                        <div key={i} className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl flex gap-6 items-start">
                          <div className="px-3 py-1 bg-purple-500/10 rounded-lg text-[10px] font-bold text-purple-400 whitespace-nowrap">{f.timeline}</div>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">{f.feature}</h4>
                            <p className="text-xs text-white/40">{f.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
              {activeTab === 'infrastructure' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.infrastructureStack?.map((item: any, i: number) => (
                      <div key={i} className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-cyan-500/30 transition-all group">
                        <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100">{item.category}</div>
                        <h4 className="text-lg font-bold text-white uppercase mb-2">{item.service}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="prose prose-invert max-w-none prose-sm bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                     <h3 className="text-white uppercase font-bold text-base mb-4 tracking-tight flex items-center gap-3">
                        <Globe className="w-5 h-5 text-cyan-400" />
                        Deployment & CI/CD Strategy
                     </h3>
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.deploymentStrategy}</ReactMarkdown>
                  </div>
                </div>
              )}
              {activeTab === 'database' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32">
                  <div className="blueprint-card p-1 flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                          <Database className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">ER Relationship Diagram</h3>
                      </div>
                      <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-white/40 uppercase">optimized_shard</div>
                    </div>
                    <div className="p-0 bg-black/40 flex-1 overflow-hidden flex items-center justify-center min-h-[400px]">
                       <Mermaid chart={data.erDiagram} className="border-none bg-transparent min-h-[400px]" />
                    </div>
                  </div>

                  <div className="blueprint-card p-1 flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <FileCode className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">SQL Source Schema</h3>
                      </div>
                      <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4 text-white/40" />
                      </button>
                    </div>
                    <div className="p-0 bg-[#050505] flex-1 overflow-auto scrollbar-hide relative group">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                        <Code2 className="w-32 h-32" />
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none font-mono p-8 text-white/60">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.databaseSchema}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
                       <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white/30 uppercase font-bold tracking-tighter">Postgres_SQL</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white/30 uppercase font-bold tracking-tighter">Enterprise_Stable</span>
                       </div>
                       <span className="text-[9px] text-white/20 uppercase font-black">Lines: {data.databaseSchema.split('\n').length}</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'api' && (
                <div className="space-y-4">
                  <div className="overflow-hidden bg-white/[0.02] border border-white/10 rounded-3xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                          <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Protocol</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Endpoint</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Purpose</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Auth</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {data.apiStructure.map((api: any, i: number) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter font-mono",
                                api.method === 'GET' ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20" : 
                                api.method === 'POST' ? "bg-purple-500/20 text-purple-400 border border-purple-500/20" :
                                "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                              )}>{api.method}</span>
                            </td>
                            <td className="px-6 py-4">
                              <code className="text-xs font-mono text-white/80">{api.path}</code>
                            </td>
                            <td className="px-6 py-4 text-xs text-white/50">{api.purpose}</td>
                            <td className="px-6 py-4">
                               {api.authRequired ? (
                                 <Lock className="w-3.5 h-3.5 text-green-400" />
                               ) : (
                                 <Globe className="w-3.5 h-3.5 text-white/10" />
                               )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === 'business' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                        <Briefcase className="w-48 h-48" />
                      </div>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-cyan-500/10 rounded-xl">
                          <Rocket className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">Investor Pitch Deck</h3>
                      </div>
                      
                      <div className="space-y-8 relative z-10">
                        <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl italic">
                          <p className="text-base text-white/80 leading-relaxed">"{data.investorMode?.pitch}"</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                              <DollarSign className="w-3 h-3" /> Monetization Strategy
                            </h4>
                            <p className="text-xs text-white/50 leading-relaxed">{data.investorMode?.monetization}</p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                              <Globe className="w-3 h-3" /> Market Analysis
                            </h4>
                            <p className="text-xs text-white/50 leading-relaxed">{data.investorMode?.marketAnalysis}</p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                           <h4 className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Zap className="w-3 h-3" /> Competitive Advantage
                           </h4>
                           <p className="text-xs text-white/60 leading-relaxed bg-green-500/5 p-4 rounded-2xl border border-green-500/10">
                              {data.investorMode?.competitiveAdvantage}
                           </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem]">
                      <div className="flex items-center gap-3 mb-6">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-bold text-white uppercase">Operational Expenditure</h3>
                      </div>
                      <div className="space-y-4">
                        {data.costEstimation?.map((cost: any, i: number) => (
                           <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold text-white">{cost.service}</span>
                                 <span className="text-[10px] text-white/30 uppercase tracking-wider">{cost.tier}</span>
                              </div>
                              <span className="text-sm font-mono font-bold text-green-400">{cost.monthlyCost}</span>
                           </div>
                        ))}
                        <div className="pt-6 flex justify-between items-center border-t border-white/10">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Est. Monthly Burn</span>
                              <span className="text-2xl font-mono font-bold text-white leading-none mt-1">
                                $~{data.costEstimation?.reduce((acc: number, curr: any) => acc + (parseFloat(curr.monthlyCost.replace(/[^0-9.]/g, '')) || 0), 0).toFixed(2)}
                              </span>
                           </div>
                           <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest">
                             Optimized Plan
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black border border-white/10 p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden group">
                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-[0.02] pointer-events-none architect-grid" />
                     
                     <div className="flex items-center gap-3 mb-8 relative z-10">
                        <Network className="w-6 h-6 text-purple-400" />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">Tech Stack Rationale</h3>
                      </div>
                      <div className="prose prose-invert prose-sm flex-1 overflow-auto max-h-[600px] pr-4 relative z-10 scrollbar-hide">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.techStackRecommendation}</ReactMarkdown>
                      </div>
                      <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                         <div className="flex -space-x-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="w-10 h-10 rounded-full bg-white/5 border-2 border-black flex items-center justify-center backdrop-blur-sm">
                                 <Users className="w-4 h-4 text-white/30" />
                              </div>
                            ))}
                         </div>
                         <div className="text-right">
                            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest leading-none mb-1">Architecture Model</div>
                            <div className="text-sm font-bold text-purple-400 uppercase font-mono tracking-tighter">Day_Zero_Elite</div>
                         </div>
                      </div>
                  </div>
                </div>
              )}
              {activeTab === 'advice' && (
                <div className="h-full max-w-4xl mx-auto space-y-12">
                  <div className="flex flex-col items-center justify-center text-center space-y-8">
                    <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                      <MessageSquare className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">CTO Directives</h2>
                      <p className="text-white/40 text-sm tracking-wide">Elite implementation advice for Day-Zero and initial production launch.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl">
                        <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-2">Complexity Rating</div>
                        <div className="text-2xl font-bold text-white">{data.enterpriseComplexity || 5}/10</div>
                     </div>
                     <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl">
                        <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-2">Build Readiness</div>
                        <div className="text-2xl font-bold text-white">{project.readinessScore}%</div>
                     </div>
                     <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl">
                        <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest mb-2">Sync Confidence</div>
                        <div className="text-2xl font-bold text-white">{Math.round((data.confidenceRatio || 0.85) * 100)}%</div>
                     </div>
                  </div>

                  <div className="prose prose-invert max-w-none prose-md text-white/70 leading-loose text-left bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] italic relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                      <Rocket className="w-32 h-32" />
                    </div>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.finalCtoRecommendations}</ReactMarkdown>
                  </div>

                  {data.criticalFailurePoints && (
                    <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem]">
                       <h3 className="text-white uppercase font-bold text-lg mb-6 flex items-center gap-3">
                          <Zap className="w-5 h-5 text-red-400" />
                          Risk Assessment & Mitigation
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.criticalFailurePoints.map((point: string, i: number) => (
                            <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-2xl text-xs text-white/60 leading-relaxed italic border-l-2 border-l-red-500">
                               "{point}"
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'roadmap' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-32">
                  {data.mvpRoadmap.map((week: any, i: number) => (
                    <div key={i} className="blueprint-card flex flex-col group h-full">
                       <div className="p-6 bg-black/40 border-b border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                             <span className="text-6xl font-black font-display">{week.week}</span>
                          </div>
                          <div className="relative z-10">
                            <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Execution_Phase</h4>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter font-display italic">Week_{week.week}</h3>
                          </div>
                       </div>
                       <div className="p-8 space-y-6 flex-1">
                          <ul className="space-y-4">
                            {week.tasks.map((task: string, j: number) => (
                              <li key={j} className="flex items-start gap-4 group/task">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500/40 group-hover/task:bg-cyan-500 transition-colors" />
                                <span className="text-xs font-medium text-white/40 group-hover/task:text-white/70 transition-colors leading-relaxed">{task}</span>
                              </li>
                            ))}
                          </ul>
                       </div>
                       <div className="p-6 pt-0 mt-auto">
                          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                             <span className="text-[9px] font-bold text-white/20 uppercase">Risk Level</span>
                             <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function ArchitectureBadge({ icon: Icon, label, value, color, description }: any) {
  const colors: any = {
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    green: "bg-green-500/10 border-green-500/20 text-green-400",
  };
  return (
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-cyan-500/30 transition-all group">
      <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-6 border", colors[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-[10px] text-white/20 uppercase font-black mb-2 tracking-widest">{label}</div>
      <div className="text-lg text-white font-bold tracking-tight uppercase font-display">{value}</div>
      <p className="text-xs text-white/30 mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

function FlowCard({ icon: Icon, title, chart, color }: any) {
  const colors: any = {
    cyan: "text-cyan-400 bg-cyan-500/10",
    purple: "text-purple-400 bg-purple-500/10",
    yellow: "text-yellow-400 bg-yellow-500/10",
    green: "text-green-400 bg-green-500/10",
  };
  return (
    <div className="blueprint-card p-1">
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-4">
          <div className={cn("p-2 rounded-lg", colors[color])}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
        </div>
        <div className="flex gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
           <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="p-0 bg-black/40 flex items-center justify-center overflow-hidden min-h-[300px]">
        <Mermaid chart={chart} className="border-none bg-transparent min-h-[300px]" />
      </div>
    </div>
  );
}

function TabNavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
        active 
          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
