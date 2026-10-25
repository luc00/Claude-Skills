import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Code, 
  Terminal, 
  Layers,
  AlertCircle,
  Zap,
  CheckCircle
} from 'lucide-react';
import { ClaudeSkill, ClaudeAccount } from '../types/skills';
import { generateClaudeMd, generateMcpConfig, generateSystemPrompt } from '../utils/skillRecommender';

interface SkillStackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stack: ClaudeSkill[];
  onRemoveSkill: (skillId: string) => void;
  onClearStack: () => void;
  onViewSkillDetails: (skill: ClaudeSkill) => void;
  account: ClaudeAccount | null;
  onOpenAccountModal: () => void;
}

export const SkillStackDrawer: React.FC<SkillStackDrawerProps> = ({
  isOpen,
  onClose,
  stack,
  onRemoveSkill,
  onClearStack,
  onViewSkillDetails,
  account,
  onOpenAccountModal
}) => {
  if (!isOpen) return null;

  const [exportFormat, setExportFormat] = useState<'claude-md' | 'mcp-json' | 'system-prompt'>('claude-md');
  const [copied, setCopied] = useState(false);
  const [synced, setSynced] = useState(false);

  // Compute total token impact
  const highCount = stack.filter(s => s.tokenImpact === 'high').length;
  const medCount = stack.filter(s => s.tokenImpact === 'medium').length;
  const overallImpact = highCount > 1 ? 'ALTO' : (highCount === 1 || medCount >= 3) ? 'MEDIO' : 'OTTIMALE';

  const exportContent = React.useMemo(() => {
    if (exportFormat === 'claude-md') {
      return generateClaudeMd(stack, 'Il Tuo Progetto');
    } else if (exportFormat === 'mcp-json') {
      return generateMcpConfig(stack);
    } else {
      return generateSystemPrompt(stack);
    }
  }, [stack, exportFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = 'CLAUDE.md';
    let mime = 'text/markdown';
    if (exportFormat === 'mcp-json') {
      filename = 'claude_desktop_config.json';
      mime = 'application/json';
    } else if (exportFormat === 'system-prompt') {
      filename = 'claude_project_instructions.txt';
      mime = 'text/plain';
    }

    const blob = new Blob([exportContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDirectSync = async () => {
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stack-drawer-title"
    >
      <div className="w-full max-w-xl bg-[#23211F] border-l border-[#3A3734] h-full flex flex-col justify-between shadow-2xl text-[#F5F2EC]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#3A3734] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D97757]/15 border border-[#D97757]/40 flex items-center justify-center">
              <Download className="w-4 h-4 text-[#D97757]" />
            </div>
            <div>
              <h3 id="stack-drawer-title" className="text-base font-serif font-bold text-[#F5F2EC]">
                Il Tuo Stack di Skill ({stack.length})
              </h3>
              <p className="text-xs text-[#8E8882]">
                Configurazione pronta per Claude Code & Claude Desktop
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {stack.length > 0 && (
              <button
                onClick={onClearStack}
                className="text-xs text-rose-400 hover:text-rose-300 p-1.5 hover:bg-[#2C2927] rounded-lg transition-colors"
                title="Svuota tutto lo stack"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#C4BEB6] hover:text-[#F5F2EC] bg-[#2A2725] hover:bg-[#34312E] rounded-lg transition-colors"
              aria-label="Chiudi pannello stack"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs text-[#C4BEB6]">
          
          {/* Claude Account Sync Notice */}
          {account?.isConnected ? (
            <div className="bg-[#1C1A19] border border-[#D97757]/40 rounded-xl p-3.5 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F2EC]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Account Claude Connesso ({account.accountName})</span>
                </div>
                <p className="text-[11px] text-[#8E8882]">
                  Puoi sincronizzare direttamente le modifiche sul tuo profilo Claude.
                </p>
              </div>

              <button
                onClick={handleDirectSync}
                className="px-3 py-1.5 bg-[#D97757] hover:bg-[#C25E3E] text-white font-bold text-[11px] rounded-lg transition-colors shrink-0 flex items-center gap-1"
              >
                {synced ? <CheckCircle className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                <span>{synced ? 'Sincronizzato!' : 'Sincronizza Ora'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#1C1A19] border border-[#393633] rounded-xl p-3 flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#8E8882]">Vuoi inviare le skill direttamente a Claude?</span>
              <button
                onClick={onOpenAccountModal}
                className="text-[11px] text-[#D97757] font-bold hover:underline shrink-0"
              >
                Collega Account Claude
              </button>
            </div>
          )}

          {/* Token Overhead Meter in Claude palette */}
          <div className="bg-[#1B1917] border border-[#393633] rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#8E8882] block">
                Carico Stimato di Contesto:
              </span>
              <span className={`text-xs font-bold ${
                overallImpact === 'OTTIMALE' ? 'text-emerald-400' : overallImpact === 'MEDIO' ? 'text-[#D97757]' : 'text-rose-400'
              }`}>
                {overallImpact} ({stack.length} skill attive)
              </span>
            </div>
            <span className="text-[10px] text-[#8E8882] text-right max-w-[180px]">
              {overallImpact === 'OTTIMALE' 
                ? 'Consumo token minimo, risposte rapide.'
                : 'Bilanciato per progetti complessi.'}
            </span>
          </div>

          {/* Active Skills List */}
          {stack.length === 0 ? (
            <div className="text-center py-10 space-y-2 border border-dashed border-[#393633] rounded-xl p-4">
              <Layers className="w-8 h-8 text-[#706B65] mx-auto" />
              <p className="text-[#C4BEB6] font-medium">Nessuna skill nel tuo stack attuale</p>
              <p className="text-[#8E8882] text-[11px]">
                Aggiungi skill dall'Advisor o dal Catalogo per generare i file di configurazione automatici.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="font-semibold text-[#F5F2EC] block text-[11px] uppercase tracking-wider">
                Skill Incluse nel Bundle:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {stack.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2.5 bg-[#1B1917] border border-[#393633] rounded-xl group"
                  >
                    <div 
                      onClick={() => onViewSkillDetails(skill)} 
                      className="cursor-pointer space-y-0.5 flex-1 pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F5F2EC] text-xs hover:text-[#D97757] transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-[#23211F] text-[#8E8882] rounded border border-[#393633]">
                          {skill.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E8882] line-clamp-1">
                        {skill.shortDescription}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveSkill(skill.id)}
                      className="text-[#8E8882] hover:text-rose-400 p-1.5 rounded transition-colors"
                      title="Rimuovi dallo stack"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Format Selector Tabs */}
          {stack.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F2EC] text-[11px] uppercase tracking-wider">
                  Scegli il Formato di Esportazione:
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setExportFormat('claude-md')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    exportFormat === 'claude-md'
                      ? 'bg-[#2A2320] border-[#D97757] text-[#D97757] font-bold shadow-sm'
                      : 'bg-[#1B1917] border-[#393633] text-[#8E8882] hover:text-[#F5F2EC]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>CLAUDE.md</span>
                  </div>
                  <span className="text-[9px] text-[#8E8882] block mt-0.5">Claude Code CLI</span>
                </button>

                <button
                  onClick={() => setExportFormat('mcp-json')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    exportFormat === 'mcp-json'
                      ? 'bg-[#2A2320] border-[#D97757] text-[#D97757] font-bold shadow-sm'
                      : 'bg-[#1B1917] border-[#393633] text-[#8E8882] hover:text-[#F5F2EC]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Code className="w-3.5 h-3.5" />
                    <span>MCP JSON</span>
                  </div>
                  <span className="text-[9px] text-[#8E8882] block mt-0.5">Claude Desktop</span>
                </button>

                <button
                  onClick={() => setExportFormat('system-prompt')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    exportFormat === 'system-prompt'
                      ? 'bg-[#2A2320] border-[#D97757] text-[#D97757] font-bold shadow-sm'
                      : 'bg-[#1B1917] border-[#393633] text-[#8E8882] hover:text-[#F5F2EC]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Prompt Web</span>
                  </div>
                  <span className="text-[9px] text-[#8E8882] block mt-0.5">Claude Projects</span>
                </button>
              </div>

              {/* Code Preview Box */}
              <div className="relative">
                <pre className="bg-[#171615] border border-[#312E2C] rounded-xl p-4 text-[11px] font-mono text-[#F5F2EC] overflow-x-auto whitespace-pre-wrap max-h-56 leading-relaxed">
                  {exportContent}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Actions Footer */}
        {stack.length > 0 && (
          <div className="p-4 border-t border-[#3A3734] bg-[#1E1C1A] flex items-center justify-between gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2A2725] hover:bg-[#34312E] text-[#F5F2EC] rounded-xl text-xs font-semibold transition-colors border border-[#393633]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copiato negli Appunti!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copia Configurazione</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D97757] hover:bg-[#C25E3E] text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#B8583B]/25"
            >
              <Download className="w-4 h-4" />
              <span>Scarica File</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
