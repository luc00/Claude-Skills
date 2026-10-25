import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  Check, 
  ChevronRight, 
  Filter, 
  Tag, 
  Terminal, 
  Laptop, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Server, 
  Layout, 
  SlidersHorizontal 
} from 'lucide-react';
import { ClaudeSkill, SkillCategory, ClaudePlatform } from '../types/skills';
import { CLAUDE_SKILLS_DATABASE, SKILL_CATEGORIES } from '../data/skillsData';

interface SkillCatalogProps {
  onAddSkillToStack: (skill: ClaudeSkill) => void;
  onRemoveSkillFromStack: (skillId: string) => void;
  isSkillInStack: (skillId: string) => boolean;
  onViewSkillDetails: (skill: ClaudeSkill) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const SkillCatalog: React.FC<SkillCatalogProps> = ({
  onAddSkillToStack,
  onRemoveSkillFromStack,
  isSkillInStack,
  onViewSkillDetails,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  const [platformFilter, setPlatformFilter] = useState<ClaudePlatform | 'all'>('all');
  const [tokenImpactFilter, setTokenImpactFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredSkills = useMemo(() => {
    let result = CLAUDE_SKILLS_DATABASE.filter(skill => {
      // Trending filter
      if (selectedCategory === 'trending') {
        if (!skill.isTrending) return false;
      } else if (selectedCategory !== 'all' && skill.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (platformFilter !== 'all' && !skill.platforms.includes(platformFilter)) {
        return false;
      }
      // Token impact filter
      if (tokenImpactFilter !== 'all' && skill.tokenImpact !== tokenImpactFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = skill.name.toLowerCase().includes(q);
        const matchesDesc = skill.shortDescription.toLowerCase().includes(q);
        const matchesTags = skill.tags.some(t => t.toLowerCase().includes(q));
        const matchesTools = skill.toolsProvided.some(t => t.toLowerCase().includes(q));
        const matchesReason = skill.trendingReason?.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesTags || matchesTools || !!matchesReason;
      }
      return true;
    });

    if (selectedCategory === 'trending') {
      result = [...result].sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
    }

    return result;
  }, [selectedCategory, platformFilter, tokenImpactFilter, searchQuery]);

  const trendingCount = useMemo(() => {
    return CLAUDE_SKILLS_DATABASE.filter(s => s.isTrending).length;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#F5F2EC]">
      
      {/* Title & Filter Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#F5F2EC] tracking-tight">
              Catalogo Completo delle Skill & Tools Claude
            </h2>
            <p className="text-xs sm:text-sm text-[#C4BEB6] mt-1.5">
              Tutte le skill, server Model Context Protocol (MCP) e strumenti sincronizzati per Claude 3.7 Sonnet, Claude Code CLI e Claude Desktop.
            </p>
          </div>

          {/* Quick trending button */}
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'trending' ? 'all' : 'trending')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border ${
              selectedCategory === 'trending'
                ? 'bg-[#D97757] text-white border-transparent shadow-md shadow-[#D97757]/20'
                : 'bg-[#23211F] text-[#F5F2EC] hover:text-white border-[#3A3734] hover:border-[#D97757]/60'
            }`}
          >
            <span>🔥</span>
            <span>In Tendenza Ora ({trendingCount})</span>
          </button>
        </div>

        {/* Search & Top Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Main Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#706B65]" />
            <input
              type="text"
              placeholder="Cerca per nome, tag, strumento (es: postgres, claude code, mcp)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#23211F] border border-[#393633] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757]"
            />
          </div>

          {/* Secondary Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform filter */}
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value as any)}
              className="bg-[#23211F] border border-[#393633] rounded-xl px-3 py-2 text-xs text-[#C4BEB6] focus:outline-none focus:border-[#D97757]"
            >
              <option value="all">Tutte le Piattaforme</option>
              <option value="claude-code">Solo Claude Code CLI</option>
              <option value="claude-desktop">Solo Claude Desktop (MCP)</option>
              <option value="claude-projects">Solo Claude Projects Web</option>
            </select>

            {/* Token impact filter */}
            <select
              value={tokenImpactFilter}
              onChange={e => setTokenImpactFilter(e.target.value as any)}
              className="bg-[#23211F] border border-[#393633] rounded-xl px-3 py-2 text-xs text-[#C4BEB6] focus:outline-none focus:border-[#D97757]"
            >
              <option value="all">Tutti i consumi token</option>
              <option value="low">Token: Basso</option>
              <option value="medium">Token: Medio</option>
              <option value="high">Token: Alto</option>
            </select>
          </div>

        </div>

        {/* Category Pills Bar in Claude Warm Aesthetic */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {SKILL_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const isTrendCat = cat.id === 'trending';

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#D97757] text-white font-semibold shadow-sm'
                    : isTrendCat
                    ? 'bg-[#291E1A] border border-[#D97757]/50 text-[#D97757] hover:bg-[#34241F]'
                    : 'bg-[#23211F] border border-[#393633] text-[#C4BEB6] hover:text-[#F5F2EC] hover:bg-[#2C2927]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-16 bg-[#23211F] border border-[#393633] rounded-2xl p-8 space-y-3">
          <Layers className="w-10 h-10 text-[#706B65] mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#F5F2EC]">Nessuna skill trovata</h3>
          <p className="text-xs text-[#8E8882] max-w-md mx-auto">
            Nessuna skill corrisponde ai filtri di ricerca selezionati. Prova a resettare i filtri o usa parole chiave diverse.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setPlatformFilter('all');
              setTokenImpactFilter('all');
            }}
            className="px-4 py-2 bg-[#2C2927] text-[#F5F2EC] text-xs rounded-lg hover:bg-[#34312E] transition-colors border border-[#393633]"
          >
            Resetta tutti i filtri
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map(skill => {
            const inStack = isSkillInStack(skill.id);

            return (
              <div
                key={skill.id}
                className={`bg-[#23211F] border rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/20 group ${
                  skill.isTrending 
                    ? 'border-[#D97757]/40 hover:border-[#D97757] bg-gradient-to-b from-[#252220] to-[#201D1B]' 
                    : 'border-[#393633] hover:border-[#D97757]/60'
                }`}
              >
                <div className="space-y-3.5">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#1B1917] border border-[#393633] text-[#C4BEB6]">
                        {skill.badge}
                      </span>
                      {skill.isTrending && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D97757]/20 border border-[#D97757]/50 text-[#D97757]">
                          <span>🔥</span>
                          <span>#{skill.trendingRank} In Tendenza</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Token badge */}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        skill.tokenImpact === 'low' 
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800' 
                          : skill.tokenImpact === 'medium'
                          ? 'bg-[#D97757]/15 text-[#D97757] border border-[#D97757]/40'
                          : 'bg-rose-950/70 text-rose-400 border border-rose-800'
                      }`}>
                        {skill.tokenImpact === 'low' ? 'Low Token' : skill.tokenImpact === 'medium' ? 'Med Token' : 'High Token'}
                      </span>

                      {/* Complexity */}
                      <span className="text-[10px] text-[#8E8882] bg-[#1B1917] px-1.5 py-0.5 rounded border border-[#393633]">
                        {skill.complexity}
                      </span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#F5F2EC] group-hover:text-[#D97757] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-[#8E8882] mt-1 line-clamp-2 leading-relaxed">
                      {skill.shortDescription}
                    </p>
                  </div>

                  {/* Trending Reason Spotlight if trending */}
                  {skill.isTrending && skill.trendingReason && (
                    <div className="bg-[#2D1F1A]/80 border border-[#D97757]/40 rounded-xl p-2.5 text-xs text-[#E8A58F] flex items-start gap-2">
                      <span className="text-xs shrink-0 mt-0.5">📈</span>
                      <p className="text-[11px] leading-relaxed">
                        <strong className="text-[#F5F2EC] font-semibold">In Tendenza:</strong> {skill.trendingReason}
                      </p>
                    </div>
                  )}

                  {/* Cosa Fa Snapshot */}
                  <div className="space-y-1 bg-[#1B1917] p-2.5 rounded-xl border border-[#312E2C]">
                    <span className="text-[10px] font-bold text-[#F5F2EC] block uppercase tracking-wide">
                      Cosa Fa:
                    </span>
                    <p className="text-xs text-[#C4BEB6] line-clamp-2 leading-relaxed">
                      {skill.whatItDoes[0]}
                    </p>
                  </div>

                  {/* Perché Usarla Snapshot */}
                  <div className="space-y-1 bg-[#1B1917] p-2.5 rounded-xl border border-[#312E2C]">
                    <span className="text-[10px] font-bold text-[#D97757] block uppercase tracking-wide">
                      Perché Attivarla:
                    </span>
                    <p className="text-xs text-[#C4BEB6] line-clamp-2 leading-relaxed">
                      {skill.whyUseIt}
                    </p>
                  </div>

                  {/* Platform support icons */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {skill.platforms.map(p => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-[#1B1917] text-[#8E8882] border border-[#393633]">
                        {p === 'claude-code' ? 'Claude Code' : p === 'claude-desktop' ? 'MCP Desktop' : 'Claude Projects'}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[#312E2C]">
                  <button
                    onClick={() => onViewSkillDetails(skill)}
                    className="text-xs text-[#C4BEB6] hover:text-[#F5F2EC] flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-[#2C2927] transition-colors"
                  >
                    <span>Dettagli completi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (inStack) {
                        onRemoveSkillFromStack(skill.id);
                      } else {
                        onAddSkillToStack(skill);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      inStack
                        ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-300'
                        : 'bg-[#D97757] hover:bg-[#C25E3E] text-white font-bold shadow-sm'
                    }`}
                  >
                    {inStack ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Nello Stack</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Aggiungi</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
