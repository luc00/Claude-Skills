import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Plus, 
  Terminal, 
  HelpCircle, 
  AlertTriangle, 
  Cpu, 
  Code, 
  MessageSquare, 
  Zap, 
  Download 
} from 'lucide-react';
import { ClaudeSkill } from '../types/skills';

interface SkillModalProps {
  skill: ClaudeSkill | null;
  onClose: () => void;
  onAddSkillToStack: (skill: ClaudeSkill) => void;
  onRemoveSkillFromStack: (skillId: string) => void;
  isSkillInStack: (skillId: string) => boolean;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  onClose,
  onAddSkillToStack,
  onRemoveSkillFromStack,
  isSkillInStack
}) => {
  if (!skill) return null;

  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const inStack = isSkillInStack(skill.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(skill.setupSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
    >
      <div className="bg-[#23211F] border border-[#3A3734] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between text-[#F5F2EC]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#3A3734] flex items-start justify-between gap-4 sticky top-0 bg-[#23211F]/95 backdrop-blur-md z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#D97757]/15 border border-[#D97757]/40 text-[#D97757]">
                {skill.badge}
              </span>
              {skill.isTrending && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D97757]/20 border border-[#D97757] text-[#D97757]">
                  <span>🔥</span>
                  <span>In Tendenza #{skill.trendingRank}</span>
                </span>
              )}
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                skill.tokenImpact === 'low' 
                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800' 
                  : skill.tokenImpact === 'medium'
                  ? 'bg-[#D97757]/15 text-[#D97757] border border-[#D97757]/40'
                  : 'bg-rose-950/70 text-rose-400 border border-rose-800'
              }`}>
                Impatto Token: {skill.tokenImpact.toUpperCase()}
              </span>
              <span className="text-[10px] text-[#8E8882] bg-[#1B1917] px-2 py-0.5 rounded border border-[#393633]">
                Livello: {skill.complexity}
              </span>
            </div>

            <h3 id="skill-modal-title" className="text-xl font-serif font-medium text-[#F5F2EC]">
              {skill.name}
            </h3>
            <p className="text-xs text-[#8E8882]">
              {skill.shortDescription}
            </p>

            {skill.isTrending && skill.trendingReason && (
              <div className="bg-[#2D1F1A] border border-[#D97757]/40 rounded-xl p-3 text-xs text-[#E8A58F] flex items-start gap-2.5 mt-2">
                <span className="text-sm shrink-0">🔥</span>
                <p className="text-xs leading-relaxed">
                  <strong className="text-[#F5F2EC] font-semibold">Perché è in tendenza al momento:</strong> {skill.trendingReason}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#C4BEB6] hover:text-[#F5F2EC] bg-[#2A2725] hover:bg-[#34312E] rounded-lg transition-colors"
            aria-label="Chiudi finestra dettagli skill"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-[#C4BEB6]">
          
          {/* Section 1: Cosa fa */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#F5F2EC] flex items-center gap-2 uppercase tracking-wide">
              <Cpu className="w-4 h-4 text-[#D97757]" />
              <span>Cosa Fa Esattamente Questa Skill</span>
            </h4>
            <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-4 space-y-2">
              <ul className="space-y-2">
                {skill.whatItDoes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] mt-1.5 shrink-0" />
                    <span className="leading-relaxed text-[#F5F2EC]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Perché usarla & Quando NON usarla */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#D97757] flex items-center gap-1.5 uppercase tracking-wide">
                <Zap className="w-3.5 h-3.5 text-[#D97757]" />
                <span>Perché Attivarla</span>
              </h4>
              <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-3.5 leading-relaxed text-[#C4BEB6] h-full">
                {skill.whyUseIt}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Quando NON Usarla</span>
              </h4>
              <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-3.5 leading-relaxed text-[#C4BEB6] h-full">
                {skill.whenToAvoid}
              </div>
            </div>

          </div>

          {/* Section 3: Tools and Capabilities provided */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#F5F2EC] flex items-center gap-1.5 uppercase tracking-wide">
              <Terminal className="w-3.5 h-3.5 text-[#8E8882]" />
              <span>Strumenti & Helper Forniti a Claude</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.toolsProvided.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#1B1917] border border-[#393633] text-[11px] text-[#C4BEB6] rounded-lg font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Sample Prompt */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#D97757] flex items-center gap-1.5 uppercase tracking-wide">
              <MessageSquare className="w-3.5 h-3.5 text-[#D97757]" />
              <span>Esempio di Prompt Ottimale per Claude</span>
            </h4>
            <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-3.5 text-[#F5F2EC] italic font-mono text-[11px] leading-relaxed">
              "{skill.samplePrompt}"
            </div>
          </div>

          {/* Section 5: Setup Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#F5F2EC] flex items-center gap-1.5 uppercase tracking-wide">
                <Code className="w-3.5 h-3.5 text-[#8E8882]" />
                <span>Configurazione di Attivazione ({skill.configType})</span>
              </h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#2C2927] hover:bg-[#34312E] text-[#F5F2EC] text-[11px] rounded border border-[#393633] transition-colors"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copia Configurazione</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-[#171615] border border-[#312E2C] rounded-xl p-4 text-[11px] font-mono text-[#F5F2EC] overflow-x-auto whitespace-pre-wrap max-h-48 leading-relaxed">
              {skill.setupSnippet}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#3A3734] bg-[#1E1C1A] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2A2725] hover:bg-[#34312E] text-[#C4BEB6] text-xs rounded-xl transition-colors"
          >
            Chiudi
          </button>

          <button
            onClick={() => {
              if (inStack) {
                onRemoveSkillFromStack(skill.id);
              } else {
                onAddSkillToStack(skill);
              }
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              inStack
                ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-300'
                : 'bg-[#D97757] hover:bg-[#C25E3E] text-white shadow-lg shadow-[#B8583B]/25'
            }`}
          >
            {inStack ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Presente nel tuo Stack</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Aggiungi al mio Stack</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
