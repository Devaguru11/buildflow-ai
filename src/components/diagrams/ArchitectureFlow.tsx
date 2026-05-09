import { ReactFlow, Background, Controls, MiniMap, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '../../lib/utils';
import { Shield, Server, Database, Globe, Layers, Key, Zap } from 'lucide-react';

const nodeIcons: Record<string, any> = {
  client: Globe,
  server: Server,
  database: Database,
  auth: Key,
  middleware: Layers,
  external: Zap,
  cache: Zap
};

function CustomNode({ data }: any) {
  const Icon = nodeIcons[data.category] || Layers;
  
  return (
    <div className="px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl min-w-[160px] group transition-all hover:border-cyan-500/50">
      <Handle type="target" position={Position.Left} className="!bg-cyan-500/50 !border-none !w-1 !h-4 !rounded-none" />
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg border",
          data.category === 'client' ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" :
          data.category === 'server' ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
          data.category === 'database' ? "bg-green-500/10 border-green-500/20 text-green-400" :
          "bg-white/5 border-white/10 text-white/40"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white tracking-tight uppercase">{data.label}</span>
          <span className="text-[10px] text-white/30 font-mono font-medium">{data.sublabel}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-cyan-500/50 !border-none !w-1 !h-4 !rounded-none" />
    </div>
  );
}

const nodeTypes = {
  input: CustomNode,
  output: CustomNode,
  default: CustomNode
};

interface ArchitectureFlowProps {
  nodes: any[];
  edges: any[];
  className?: string;
}

export default function ArchitectureFlow({ nodes, edges, className }: ArchitectureFlowProps) {
  return (
    <div className={cn("w-full h-full min-h-[500px] border border-white/5 rounded-3xl overflow-hidden bg-[#050505]", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges.map(edge => ({
          ...edge,
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'rgba(6, 182, 212, 0.2)', strokeWidth: 2 },
          labelStyle: { fill: 'rgba(255,255,255,0.3)', fontSize: 8, fontWeight: 700, textTransform: 'uppercase' },
          labelBgStyle: { fill: '#0a0a0a', fillOpacity: 0.8 },
          labelBgPadding: [4, 2],
          labelBgBorderRadius: 4
        }))}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
      >
        <Background 
          color="#ffffff" 
          gap={20} 
          size={1} 
          className="opacity-[0.03]"
        />
        <Controls className="!bg-[#0a0a0a] !border-white/10 !fill-white" />
        <MiniMap 
          nodeColor={(n: any) => {
            const category = n.data?.category;
            if (category === 'client') return '#06b6d4';
            if (category === 'server') return '#a855f7';
            if (category === 'database') return '#22c55e';
            return '#1e293b';
          }}
          maskColor="rgba(0,0,0,0.8)"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
        />
      </ReactFlow>
    </div>
  );
}
