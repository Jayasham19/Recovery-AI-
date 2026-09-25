import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function FragmentGraph({ fragments, relationships }) {
  const { nodes, edges } = useMemo(() => {
    if (!fragments || fragments.length === 0) {
      return { nodes: [], edges: [] };
    }

    const calculatedNodes = fragments.map((frag, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);

      let borderColor = '#FF5733';
      if (frag.fileType === 'JPEG') borderColor = '#FF5733';
      else if (frag.fileType === 'PNG') borderColor = '#9ba89e';
      else if (frag.fileType === 'PDF') borderColor = '#ef4444';
      else if (frag.fileType === 'TXT') borderColor = '#38bdf8';

      return {
        id: frag.fragmentId,
        position: { x: 80 + col * 220, y: 60 + row * 160 },
        data: { 
          label: (
            <div className="p-2.5 text-left font-mono text-[11px] leading-tight">
              <div className="flex items-center justify-between gap-2 border-b border-olive-border pb-1 mb-1">
                <span className="font-bold text-white">{frag.fragmentId}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-coral/20 text-coral font-semibold">
                  {frag.fileType}
                </span>
              </div>
              <div className="text-slate-400 text-[10px]">
                Offset: <span className="text-slate-200">0x{frag.offset.toString(16).toUpperCase()}</span>
              </div>
              <div className="text-slate-400 text-[10px]">
                Entropy: <span className="text-coral">{frag.entropy}</span>
              </div>
            </div>
          )
        },
        style: {
          background: '#1c221e',
          color: '#fff',
          border: `1px solid ${borderColor}`,
          borderRadius: '10px',
          boxShadow: `0 0 15px -3px ${borderColor}35`,
          width: 170
        }
      };
    });

    const calculatedEdges = (relationships || []).map((rel, idx) => {
      const confPercent = Math.round(rel.overallConfidence * 100);
      const isHigh = confPercent >= 80;

      return {
        id: `e-${rel.fragmentA}-${rel.fragmentB}-${idx}`,
        source: rel.fragmentA,
        target: rel.fragmentB,
        label: `${confPercent}%`,
        animated: isHigh,
        style: {
          stroke: isHigh ? '#FF5733' : '#6b7280',
          strokeWidth: isHigh ? 2.5 : 1.5,
        },
        labelStyle: {
          fill: isHigh ? '#FF5733' : '#9ca3af',
          fontWeight: 700,
          fontFamily: 'monospace',
          fontSize: 10
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isHigh ? '#FF5733' : '#6b7280'
        }
      };
    });

    return { nodes: calculatedNodes, edges: calculatedEdges };
  }, [fragments, relationships]);

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-xs font-mono">
        No fragments available for relationship graph. Execute recovery pipeline to map nodes.
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      className="bg-black"
    >
      <Background color="#2d3830" gap={20} size={1} />
      <Controls className="bg-olive-card border-olive-border text-coral" />
      <MiniMap 
        nodeColor="#FF5733" 
        maskColor="rgba(0, 0, 0, 0.85)"
        className="bg-olive-card border border-olive-border rounded-lg"
      />
    </ReactFlow>
  );
}
