import React, { useState, useEffect } from 'react';
import {
  KnowledgeGraphData,
  KnowledgeGraphNode
} from '../types';
import { getKnowledgeGraphApi } from '../services/api';
import {
  Sparkles,
  Layers,
  Filter,
  Info,
  ExternalLink,
  Search,
  CheckCircle2
} from 'lucide-react';

const NODE_COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  product: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-950', dot: 'bg-amber-500' },
  classification: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-950', dot: 'bg-blue-500' },
  regulation: { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-950', dot: 'bg-purple-500' },
  ip_type: { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-950', dot: 'bg-emerald-500' },
  authority: { bg: 'bg-rose-50', border: 'border-rose-400', text: 'text-rose-950', dot: 'bg-rose-500' },
  law: { bg: 'bg-stone-100', border: 'border-stone-400', text: 'text-stone-900', dot: 'bg-stone-600' },
  source: { bg: 'bg-teal-50', border: 'border-teal-400', text: 'text-teal-950', dot: 'bg-teal-500' }
};

export const KnowledgeGraphViewer: React.FC = () => {
  const [graphData, setGraphData] = useState<KnowledgeGraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getKnowledgeGraphApi()
      .then((data) => {
        setGraphData(data);
        if (data.nodes.length > 0) {
          setSelectedNode(data.nodes[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !graphData) {
    return (
      <div className="max-w-5xl mx-auto p-12 text-center text-xs text-stone-500">
        <Sparkles className="w-6 h-6 animate-spin text-amber-600 mx-auto mb-2" />
        <span>Loading relational Ayurveda knowledge graph...</span>
      </div>
    );
  }

  const filteredNodes = graphData.nodes.filter((node) => {
    const matchesType = typeFilter === 'all' || node.type === typeFilter;
    const matchesSearch =
      !searchQuery ||
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate connected edges and nodes for selected node
  const connectedEdges = selectedNode
    ? graphData.edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
    : [];

  const connectedNodes = selectedNode
    ? connectedEdges.map(e => {
        const otherId = e.source === selectedNode.id ? e.target : e.source;
        const otherNode = graphData.nodes.find(n => n.id === otherId);
        return {
          node: otherNode,
          relation: e.relation,
          isOutgoing: e.source === selectedNode.id
        };
      }).filter(item => Boolean(item.node))
    : [];

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                Relational Knowledge Architecture
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Ayurveda Regulatory & IPR Knowledge Graph</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Explore interconnected pathways across: Product &rarr; Classification &rarr; Regulation &rarr; IP Type &rarr; Authority &rarr; Law &rarr; Authoritative Source.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-500 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl">
            {graphData.nodes.length} Nodes &bull; {graphData.edges.length} Relational Edges
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-stone-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
          </span>
          {['all', 'product', 'classification', 'regulation', 'ip_type', 'authority', 'law', 'source'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
                typeFilter === t
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-7 pr-2.5 py-1.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2 top-2" />
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Node Explorer Canvas */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Interactive Nodes ({filteredNodes.length})
            </h3>
            <span className="text-[11px] text-stone-400">Click any entity to inspect statutory linkages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredNodes.map((node) => {
              const style = NODE_COLORS[node.type] || NODE_COLORS.law;
              const isSelected = selectedNode?.id === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    style.bg
                  } ${
                    isSelected
                      ? `ring-2 ring-blue-500 ${style.border} shadow-sm font-semibold`
                      : `${style.border} hover:shadow-xs opacity-90 hover:opacity-100`
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="font-bold text-stone-900 leading-snug">{node.label}</span>
                    <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0 mt-1`} />
                  </div>
                  
                  <div className="flex items-center justify-between gap-1 text-[10px] text-stone-500 mt-2 pt-1 border-t border-stone-200/50">
                    <span className="capitalize font-mono">{node.type.replace('_', ' ')}</span>
                    <span className="uppercase font-semibold">
                      {node.jurisdiction === 'india' ? '🇮🇳 India' : node.jurisdiction === 'international' ? '🌎 Intl' : '🇮🇳/🌎 Both'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Panel */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          {selectedNode ? (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="border-b border-stone-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {selectedNode.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase font-bold">
                    {selectedNode.jurisdiction}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mt-1.5">
                  {selectedNode.label}
                </h3>
              </div>

              {/* Details */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-stone-700 leading-relaxed">
                <span className="font-bold text-stone-900 block mb-1">Statutory Definition / Scope:</span>
                {selectedNode.details}
              </div>

              {/* Connected Relationships */}
              <div>
                <span className="font-bold uppercase tracking-wider text-stone-500 block mb-2 text-[11px]">
                  Direct Relational Connections ({connectedNodes.length})
                </span>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {connectedNodes.map((item, idx) => {
                    const otherStyle = NODE_COLORS[item.node!.type] || NODE_COLORS.law;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedNode(item.node!)}
                        className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-blue-700 font-semibold italic">
                            {item.isOutgoing ? `&rarr; ${item.relation}` : `&larr; ${item.relation} of`}
                          </span>
                          <span className="text-[10px] text-stone-400 capitalize">
                            {item.node!.type.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="font-bold text-stone-900">{item.node!.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 p-8">
              <Info className="w-10 h-10 mb-2 text-stone-300" />
              <p>Select any node on the left to inspect its relational graph connections.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
