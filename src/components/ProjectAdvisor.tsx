import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Check, 
  Copy, 
  Plus, 
  Terminal, 
  Network, 
  Cpu, 
  Search, 
  BrainCircuit, 
  Layers, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  Code,
  Download,
  Info,
  UserCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ClaudeLogo } from './ClaudeLogo';
import { Claude3DElement } from './Claude3DElement';
import { ClaudeSkill, ClaudePlatform, ProjectAnalysisResult, SkillRecommendation, ClaudeAccount } from '../types/skills';
import { PROJECT_PRESETS, CLAUDE_SKILLS_DATABASE } from '../data/skillsData';

interface ProjectAdvisorProps {
  onAddSkillToStack: (skill: ClaudeSkill) => void;
  onRemoveSkillFromStack: (skillId: string) => void;
  isSkillInStack: (skillId: string) => boolean;
  onViewSkillDetails: (skill: ClaudeSkill) => void;
  onOpenStack: () => void;
  account: ClaudeAccount | null;
  onOpenAccountModal: () => void;
}

export const ProjectAdvisor: React.FC<ProjectAdvisorProps> = ({
  onAddSkillToStack,
  onRemoveSkillFromStack,
  isSkillInStack,
  onViewSkillDetails,
  onOpenStack,
  account,
  onOpenAccountModal
}) => {
  const [projectInput, setProjectInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<ClaudePlatform>('claude-code');
  const [analysisMode, setAnalysisMode] = useState<'fast' | 'deep' | 'search'>('fast');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProjectAnalysisResult | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (analysisResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [analysisResult]);

  // Load preset into textarea
  const handleSelectPreset = (preset: typeof PROJECT_PRESETS[0]) => {
    setProjectInput(preset.sampleDescription);
    setSelectedPlatform(preset.targetPlatform);
  };

  const handleRunAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectInput.trim()) return;

    setIsLoading(true);
    setErrorNotice(null);

    try {
      const response = await fetch('/api/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription: projectInput,
          targetPlatform: selectedPlatform,
          mode: analysisMode
        })
      });

      if (!response.ok) {
        throw new Error(`Errore server: ${response.statusText}`);
      }

      const data: ProjectAnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Errore durante l\'analisi del progetto:', err);
      setErrorNotice(err.message || 'Si è verificato un errore durante l\'analisi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const getSkillObject = (skillId: string): ClaudeSkill | undefined => {
    return CLAUDE_SKILLS_DATABASE.find(s => s.id === skillId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-[#F5F2EC]">
      
      {/* Hero Header Section with 3D Claude Emblem */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
        <div className="text-center lg:text-left space-y-3.5 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#23211F] border border-[#3A3734] rounded-full text-xs font-semibold text-[#D97757]">
            <ClaudeLogo size={14} className="text-[#D97757]" />
            <span>Claude Skills & Architecture Advisor</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#F5F2EC] tracking-tight leading-tight">
            Quali skill attivare per il tuo progetto su <span className="text-[#D97757] italic">Claude AI</span>?
          </h1>
          <p className="text-sm sm:text-base text-[#C4BEB6] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Descrivi cosa vuoi costruire. L'Advisor analizza il tuo stack, ti consiglia le skill e i server MCP ideali, spiegando con precisione <strong className="text-[#F5F2EC]">perché attivarli</strong> e <strong className="text-[#F5F2EC]">cosa fanno</strong> per rendere il tuo lavoro facile su Claude.
          </p>

          {/* Claude Account Connection Banner */}
          {account?.isConnected ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#23211F] border border-[#393633] rounded-full text-xs text-[#C4BEB6]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Connesso come <strong className="text-[#F5F2EC]">{account.accountName}</strong> ({account.tier})</span>
              <span className="text-[#706B65]">•</span>
              <span className="text-[#D97757] font-semibold">{account.selectedModel.split('-').slice(0, 3).join(' ')}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#23211F] border border-[#D97757]/30 rounded-full text-xs text-[#C4BEB6]">
              <span>Hai un account Claude?</span>
              <button
                onClick={onOpenAccountModal}
                className="text-[#D97757] font-bold hover:underline cursor-pointer"
              >
                Collegati per sincronizzare i progetti
              </button>
            </div>
          )}
        </div>

          <Claude3DElement 
            size="md" 
          />
      </div>

      {/* Main Analysis Input Box styled like Claude.ai's chat input */}
      <div className="bg-[#23211F] border border-[#3A3734] focus-within:border-[#D97757]/80 rounded-2xl p-5 sm:p-6 shadow-2xl transition-all space-y-4">
        <form onSubmit={handleRunAnalysis} className="space-y-4">
          
          {/* Prompt Text Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8E8882]">
              <label htmlFor="project-desc" className="font-semibold text-[#F5F2EC] flex items-center gap-2">
                <span>Descrivi il tuo progetto</span>
                <span className="font-normal text-[#8E8882]">(obiettivi, framework, database, logica di business)</span>
              </label>
              <span>{projectInput.length} caratteri</span>
            </div>
            
            <textarea
              id="project-desc"
              rows={4}
              value={projectInput}
              onChange={e => setProjectInput(e.target.value)}
              placeholder="Es: Voglio creare una SaaS web app con React e Next.js, backend con API REST, database PostgreSQL con Drizzle ORM, autenticazione sicura, interfaccia Tailwind CSS e test unitari automatici..."
              className="w-full bg-[#1B1917] border border-[#3A3734] rounded-xl p-4 text-sm text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757] transition-all leading-relaxed"
            />
          </div>

          {/* Quick Preset Badges */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-[#8E8882] block">
              Oppure seleziona un'architettura tipica:
            </span>
            <div className="flex flex-wrap gap-2">
              {PROJECT_PRESETS.map(preset => (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="px-3 py-1.5 bg-[#1B1917] border border-[#353230] hover:border-[#D97757]/60 rounded-lg text-xs text-[#C4BEB6] hover:text-[#F5F2EC] transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]" />
                  <span>{preset.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Claude Prompt Bottom Bar (Platform target, Depth, Round Terracotta Send Button) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#312E2C]">
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Target Platform Selector */}
              <div className="flex items-center gap-1.5 bg-[#1B1917] border border-[#353230] rounded-xl px-2.5 py-1.5 text-xs">
                <span className="text-[11px] text-[#8E8882]">Target:</span>
                <select
                  value={selectedPlatform}
                  onChange={e => setSelectedPlatform(e.target.value as ClaudePlatform)}
                  className="bg-transparent text-[#F5F2EC] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="claude-code" className="bg-[#23211F]">Claude Code (CLI)</option>
                  <option value="claude-desktop" className="bg-[#23211F]">Claude Desktop (MCP)</option>
                  <option value="claude-projects" className="bg-[#23211F]">Claude.ai Projects</option>
                  <option value="web" className="bg-[#23211F]">Chat Standard</option>
                </select>
              </div>

              {/* Analysis Depth Selector */}
              <div className="flex items-center gap-1 bg-[#1B1917] border border-[#353230] rounded-xl p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setAnalysisMode('fast')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                    analysisMode === 'fast'
                      ? 'bg-[#2D2320] text-[#D97757] font-bold'
                      : 'text-[#8E8882] hover:text-[#C4BEB6]'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setAnalysisMode('deep')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                    analysisMode === 'deep'
                      ? 'bg-[#2D2320] text-[#D97757] font-bold'
                      : 'text-[#8E8882] hover:text-[#C4BEB6]'
                  }`}
                >
                  Approfondita
                </button>
                <button
                  type="button"
                  onClick={() => setAnalysisMode('search')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                    analysisMode === 'search'
                      ? 'bg-[#2D2320] text-[#D97757] font-bold'
                      : 'text-[#8E8882] hover:text-[#C4BEB6]'
                  }`}
                >
                  Ecosistema Web
                </button>
              </div>
            </div>

            {/* Submit Action: Claude's iconic terracotta circular action button */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isLoading || !projectInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#D97757] hover:bg-[#C25E3E] disabled:opacity-40 disabled:hover:bg-[#D97757] text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analisi architettura in corso...</span>
                  </>
                ) : (
                  <>
                    <ClaudeLogo size={16} className="text-white" />
                    <span>Consiglia le Skill</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>

          </div>

        </form>

        {errorNotice && (
          <div className="p-3 bg-red-950/70 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorNotice}</span>
          </div>
        )}
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div ref={resultsRef} className="space-y-8 animate-fadeIn pt-4">
          
          {/* Summary Banner */}
          <div className="bg-[#23211F] border border-[#D97757]/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h2 className="text-lg font-serif font-bold text-[#F5F2EC]">
                  Piano di Skill Consigliate per il Progetto
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-[#1B1917] border border-[#393633] text-[#C4BEB6] rounded-lg">
                  Architettura Claude Ottimizzata
                </span>
                <button
                  onClick={onOpenStack}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#D97757]/15 border border-[#D97757]/40 text-[#D97757] hover:bg-[#D97757]/25 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Vedi Bundle Completo</span>
                </button>
              </div>
            </div>

            <p className="text-sm text-[#C4BEB6] leading-relaxed">
              {analysisResult.architecturalAdvice}
            </p>

            {analysisResult.detectedTechStack && analysisResult.detectedTechStack.length > 0 && (
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                <span className="text-xs text-[#8E8882] font-medium">Competenze Rilevate:</span>
                {analysisResult.detectedTechStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#1B1917] border border-[#393633] text-[11px] text-[#C4BEB6] rounded-md font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Skills Grid (Explaining WHY and WHAT THEY DO) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#F5F2EC] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D97757]" />
                <span>Skill e Server MCP Consigliati ({analysisResult.recommendedSkills.length})</span>
              </h3>
              <span className="text-xs text-[#8E8882]">
                Ordinate per rilevanza e sinergia
              </span>
            </div>

            <div className="space-y-4">
              {analysisResult.recommendedSkills.map((rec, index) => {
                const fullSkill = getSkillObject(rec.skillId);
                const skillName = fullSkill?.name || rec.skillId;
                const inStack = isSkillInStack(rec.skillId);

                return (
                  <div
                    key={rec.skillId || index}
                    className={`bg-[#23211F] border rounded-2xl p-5 sm:p-6 transition-all shadow-md ${
                      rec.priority === 'essential'
                        ? 'border-[#D97757]/60 bg-gradient-to-b from-[#23211F] to-[#2B221E]'
                        : rec.priority === 'recommended'
                        ? 'border-[#393633] hover:border-[#D97757]/50'
                        : 'border-[#33302D]'
                    }`}
                  >
                    <div className="space-y-4">
                      
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#8E8882]">
                              #{index + 1}
                            </span>
                            <h4 className="text-base font-serif font-bold text-[#F5F2EC]">
                              {skillName}
                            </h4>

                            {/* Priority Badge in Claude aesthetic */}
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                rec.priority === 'essential'
                                  ? 'bg-[#D97757]/20 border-[#D97757]/50 text-[#D97757]'
                                  : rec.priority === 'recommended'
                                  ? 'bg-[#8E8882]/20 border-[#8E8882]/40 text-[#C4BEB6]'
                                  : 'bg-[#1B1917] border-[#393633] text-[#8E8882]'
                              }`}
                            >
                              {rec.priority === 'essential'
                                ? 'Essenziale'
                                : rec.priority === 'recommended'
                                ? 'Consigliata'
                                : 'Opzionale'}
                            </span>

                            {fullSkill?.isTrending && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-[#D97757]/15 border border-[#D97757]/60 text-[#D97757] rounded-full">
                                <span>🔥</span>
                                <span>#{fullSkill.trendingRank} Trend</span>
                              </span>
                            )}

                            {fullSkill && (
                              <span className="text-[10px] font-medium px-2 py-0.5 bg-[#1B1917] border border-[#393633] text-[#C4BEB6] rounded">
                                {fullSkill.badge}
                              </span>
                            )}
                          </div>

                          {fullSkill && (
                            <p className="text-xs text-[#8E8882]">
                              {fullSkill.shortDescription}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons: Add to Stack & View Details */}
                        <div className="flex items-center gap-2">
                          {fullSkill && (
                            <button
                              onClick={() => onViewSkillDetails(fullSkill)}
                              className="px-2.5 py-1.5 bg-[#1B1917] hover:bg-[#2C2927] text-[#C4BEB6] text-xs rounded-lg transition-colors flex items-center gap-1 border border-[#393633]"
                            >
                              <span>Dettagli</span>
                              <ChevronRight className="w-3 h-3 text-[#8E8882]" />
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (!fullSkill) return;
                              if (inStack) {
                                onRemoveSkillFromStack(fullSkill.id);
                              } else {
                                onAddSkillToStack(fullSkill);
                              }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
                                <span>Aggiungi allo Stack</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* KEY SECTION: WHY ACTIVATE IT (PERCHÉ ATTIVARLA) */}
                      <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#D97757]">
                          <HelpCircle className="w-3.5 h-3.5 text-[#D97757]" />
                          <span className="uppercase tracking-wide">PERCHÉ ATTIVARLA PER QUESTO PROGETTO:</span>
                        </div>
                        <p className="text-xs text-[#F5F2EC] leading-relaxed pl-5">
                          {rec.whyRecommend}
                        </p>
                      </div>

                      {/* KEY SECTION: WHAT IT DOES (COSA FA) */}
                      <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#C4BEB6]">
                          <Cpu className="w-3.5 h-3.5 text-[#D97757]" />
                          <span className="uppercase tracking-wide">COSA FA (Capacità e Strumenti forniti a Claude):</span>
                        </div>
                        <p className="text-xs text-[#C4BEB6] leading-relaxed pl-5">
                          {rec.whatItDoesForProject}
                        </p>
                      </div>

                      {/* Ready Activation Snippet */}
                      {rec.activationSnippet && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-[#8E8882]">
                            <span className="font-mono flex items-center gap-1.5 text-[11px]">
                              <Code className="w-3.5 h-3.5 text-[#706B65]" />
                              Configurazione rapida ({fullSkill?.configType || 'CLAUDE.md'}):
                            </span>
                            <button
                              onClick={() => handleCopySnippet(rec.activationSnippet, rec.skillId)}
                              className="flex items-center gap-1 text-[11px] text-[#D97757] hover:text-[#E28768] py-0.5 px-2 rounded bg-[#1B1917] border border-[#393633] hover:bg-[#2A2725] transition-colors"
                            >
                              {copiedSnippetId === rec.skillId ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copiato!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copia Snippet</span>
                                </>
                              )}
                            </button>
                          </div>
                          
                          <pre className="bg-[#171615] border border-[#312E2C] rounded-lg p-3 text-[11px] font-mono text-[#F5F2EC] overflow-x-auto whitespace-pre-wrap max-h-36">
                            {rec.activationSnippet}
                          </pre>
                        </div>
                      )}

                      {/* Practical Tips & Token Impact */}
                      {rec.practicalTips && (
                        <div className="text-[11px] text-[#8E8882] flex items-center gap-2 pt-1 border-t border-[#312E2C]">
                          <Info className="w-3 h-3 text-[#706B65] shrink-0" />
                          <span>{rec.practicalTips}</span>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Synergy Notes */}
          {analysisResult.synergyNotes && analysisResult.synergyNotes.length > 0 && (
            <div className="bg-[#23211F] border border-[#393633] rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#F5F2EC] flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#D97757]" />
                <span>Linee Guida di Architettura & Sinergia</span>
              </h4>
              <ul className="space-y-2">
                {analysisResult.synergyNotes.map((note, idx) => (
                  <li key={idx} className="text-xs text-[#C4BEB6] flex items-start gap-2">
                    <span className="text-[#D97757] font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
