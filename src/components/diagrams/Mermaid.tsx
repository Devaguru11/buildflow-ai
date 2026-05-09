import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Download, Copy } from 'lucide-react';
import { toPng } from 'html-to-image';
import { cn } from '../../lib/utils';

interface MermaidProps {
  chart: string;
  className?: string;
}

export default function Mermaid({ chart, className }: MermaidProps) {
  const [svg, setSvg] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      securityLevel: 'loose',
      fontFamily: 'JetBrains Mono',
      themeVariables: {
        primaryColor: '#06b6d4',
        primaryTextColor: '#fff',
        primaryBorderColor: '#06b6d4',
        lineColor: '#06b6d4',
        secondaryColor: '#9333ea',
        tertiaryColor: '#1e293b',
        mainBkg: 'transparent',
        nodeBorder: 'rgba(255, 255, 255, 0.1)',
        nodeBkg: 'rgba(255, 255, 255, 0.03)',
        clusterBkg: 'rgba(255, 255, 255, 0.01)',
        clusterBorder: 'rgba(255, 255, 255, 0.1)',
        defaultLinkColor: 'rgba(6, 182, 212, 0.3)',
        titleColor: '#fff',
        edgeLabelBackground: '#0a0a0a',
      },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substring(7)}`;
        const { svg: generatedSvg } = await mermaid.render(id, chart);
        setSvg(generatedSvg);
      } catch (error) {
        console.error('Mermaid render error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chart) renderChart();
  }, [chart]);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chart);
    alert('Mermaid syntax copied to clipboard!');
  };

  const handleDownloadImage = async () => {
    const content = containerRef.current?.querySelector('.mermaid-content') as HTMLElement;
    if (!content) return;

    try {
      const dataUrl = await toPng(content, {
        backgroundColor: '#050505',
        quality: 1,
        pixelRatio: 2,
        style: {
          transform: 'none',
          padding: '40px'
        }
      });
      
      const link = document.createElement('a');
      link.download = `blueprint-flow-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative group w-full h-full min-h-[400px] bg-black/20 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center",
        isFullScreen && "p-8 bg-[#050505]",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm z-30">
          <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest animate-pulse">Rendering_Neural_Map...</span>
        </div>
      )}

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={copyToClipboard}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest"
              >
                Copy_Source
              </button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button 
                onClick={() => zoomIn()}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => zoomOut()}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={() => resetTransform()}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownloadImage}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-colors"
                title="Download PNG"
              >
                <Download className="w-4 h-4" />
              </button>
              <button 
                onClick={toggleFullScreen}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-colors"
                title="Full Screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 z-20 opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest bg-black/40 px-2 py-1 rounded border border-white/5">
                Drag to pan • Scroll to zoom
              </span>
            </div>

            <TransformComponent
              wrapperClassName="!w-full !h-full"
              contentClassName="!w-full !h-full flex items-center justify-center"
            >
              <div 
                className="mermaid-content cursor-grab active:cursor-grabbing p-12"
                dangerouslySetInnerHTML={{ __html: svg }} 
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
