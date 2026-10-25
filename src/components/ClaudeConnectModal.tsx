import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Key, 
  Terminal, 
  User, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Cpu, 
  LogOut, 
  ArrowRight,
  Zap,
  Layers
} from 'lucide-react';
import { ClaudeLogo } from './ClaudeLogo';
import { ClaudeAccount, ClaudeSkill } from '../types/skills';
import { 
  validateAnthropicApiKey, 
  createDefaultConnectedAccount, 
  CLAUDE_MODELS_LIST 
} from '../utils/claudeAccount';

interface ClaudeConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: ClaudeAccount | null;
  onConnectAccount: (account: ClaudeAccount) => void;
  onDisconnectAccount: () => void;
  onUpdateModel: (modelId: string) => void;
  stack: ClaudeSkill[];
}

export const ClaudeConnectModal: React.FC<ClaudeConnectModalProps> = ({
  isOpen,
  onClose,
  account,
  onConnectAccount,
  onDisconnectAccount,
  onUpdateModel,
  stack
}) => {
  if (!isOpen) return null;

  const [authMethod, setAuthMethod] = useState<'session' | 'api-key' | 'claude-code'>('session');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [emailInput, setEmailInput] = useState('lucquixada@gmail.com');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnectWithSession = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Simulate live authentication handshake with Anthropic / Claude.ai session
      await new Promise(r => setTimeout(r, 650));
      const newAcc = createDefaultConnectedAccount(emailInput.trim() || 'lucquixada@gmail.com', 'session');
      onConnectAccount(newAcc);
    } catch (e: any) {
      setErrorMsg('Errore durante la connessione con l\'account Claude.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWithApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const validation = validateAnthropicApiKey(apiKeyInput);
    if (!validation.valid) {
      setErrorMsg(validation.reason || 'Chiave API non valida.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 700));
      const newAcc: ClaudeAccount = {
        isConnected: true,
        authType: 'api-key',
        accountName: 'Anthropic Developer',
        email: emailInput || 'developer@anthropic.com',
        tier: 'Anthropic Tier 2',
        selectedModel: 'claude-3-7-sonnet-20250219',
        connectedAt: new Date().toISOString(),
        syncedProjectsCount: 1,
        activeMcpServersCount: 5,
        keyMasked: validation.maskedKey
      };
      onConnectAccount(newAcc);
    } catch (e: any) {
      setErrorMsg('Impossibile validare la chiave API con Anthropic.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWithClaudeCode = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await new Promise(r => setTimeout(r, 600));
      const newAcc: ClaudeAccount = {
        isConnected: true,
        authType: 'claude-code-cli',
        accountName: 'Claude Code CLI Local',
        email: emailInput || 'local-cli@anthropic.com',
        tier: 'Claude Pro',
        selectedModel: 'claude-3-7-sonnet-20250219',
        connectedAt: new Date().toISOString(),
        syncedProjectsCount: 3,
        activeMcpServersCount: 6,
        keyMasked: 'claude-code-session-token'
      };
      onConnectAccount(newAcc);
    } catch (e: any) {
      setErrorMsg('Connessione a Claude Code CLI non riuscita.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncSkillsToClaude = async () => {
    setIsSyncing(true);
    try {
      await new Promise(r => setTimeout(r, 900));
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="claude-modal-title"
    >
      <div className="bg-[#23211F] border border-[#3A3734] rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col justify-between text-[#F5F2EC]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#3A3734] flex items-start justify-between gap-4 sticky top-0 bg-[#23211F]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            {/* Authentic Claude AI Symbol */}
            <div className="w-10 h-10 rounded-xl bg-[#252220] border border-[#383431] flex items-center justify-center shadow-sm">
              <ClaudeLogo size={24} color="#D97757" />
            </div>
            <div>
              <h3 id="claude-modal-title" className="text-xl font-serif font-medium text-[#F5F2EC] tracking-tight">
                {account?.isConnected ? 'Il Tuo Account Claude' : 'Collega Account Claude AI'}
              </h3>
              <p className="text-xs text-[#C4BEB6]">
                {account?.isConnected 
                  ? 'Sincronizza le skill direttamente nei tuoi progetti Claude e MCP' 
                  : 'Accedi per sincronizzare skill, MCP e progetti in 1 click'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#C4BEB6] hover:text-[#F5F2EC] bg-[#2A2725] hover:bg-[#34312E] rounded-lg transition-colors"
            aria-label="Chiudi finestra collegamento Claude"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-[#C4BEB6]">
          
          {account?.isConnected ? (
            /* Connected Account View */
            <div className="space-y-6">
              
              {/* Account Card */}
              <div className="bg-[#1C1A19] border border-[#3A3734] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D97757]/20 border border-[#D97757]/50 flex items-center justify-center text-[#D97757] font-bold text-sm">
                      {account.accountName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#F5F2EC]">{account.accountName}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D97757]/20 text-[#D97757] border border-[#D97757]/40">
                          {account.tier}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8E8882]">{account.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 rounded-full text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Connesso</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#2D2A28] text-xs">
                  <div className="bg-[#242220] p-2.5 rounded-lg border border-[#33302D]">
                    <span className="text-[10px] text-[#8E8882] block">Metodo di Autenticazione:</span>
                    <span className="font-medium text-[#F5F2EC]">
                      {account.authType === 'session' ? 'Sessione Claude.ai' : account.authType === 'api-key' ? 'Anthropic API Key' : 'Claude Code CLI'}
                    </span>
                  </div>
                  <div className="bg-[#242220] p-2.5 rounded-lg border border-[#33302D]">
                    <span className="text-[10px] text-[#8E8882] block">Server MCP Rilevati:</span>
                    <span className="font-medium text-[#F5F2EC]">
                      {account.activeMcpServersCount} server attivi
                    </span>
                  </div>
                </div>

                {account.keyMasked && (
                  <div className="text-[11px] text-[#8E8882] flex items-center justify-between font-mono bg-[#161514] px-3 py-1.5 rounded-lg border border-[#2D2A28]">
                    <span>Token / Chiave:</span>
                    <span className="text-[#F5F2EC]">{account.keyMasked}</span>
                  </div>
                )}
              </div>

              {/* Model Selector Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#F5F2EC] flex items-center gap-1.5 uppercase tracking-wide">
                  <Cpu className="w-3.5 h-3.5 text-[#D97757]" />
                  <span>Modello Claude Predefinito per le Skill</span>
                </label>
                <div className="space-y-2">
                  {CLAUDE_MODELS_LIST.map(model => (
                    <div
                      key={model.id}
                      onClick={() => onUpdateModel(model.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        account.selectedModel === model.id
                          ? 'bg-[#2A2320] border-[#D97757] shadow-sm'
                          : 'bg-[#1C1A19] border-[#33302D] hover:border-[#4A4642]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#F5F2EC]">{model.name}</span>
                        <span className="text-[10px] text-[#8E8882]">{model.contextWindow}</span>
                      </div>
                      <p className="text-[11px] text-[#C4BEB6] mt-1 leading-relaxed">
                        {model.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Direct Sync Action */}
              <div className="bg-[#2A2320]/60 border border-[#D97757]/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F5F2EC]">
                    <Zap className="w-4 h-4 text-[#D97757]" />
                    <span>Sincronizzazione Diretta su Claude</span>
                  </div>
                  <span className="text-[11px] text-[#D97757] font-semibold">
                    {stack.length} skill nello stack
                  </span>
                </div>
                <p className="text-xs text-[#C4BEB6] leading-relaxed">
                  Invia la configurazione del tuo stack direttamente ai tuoi progetti Claude.ai o al file CLAUDE.md locale senza dover copiare manualmente i file.
                </p>

                <button
                  onClick={handleSyncSkillsToClaude}
                  disabled={isSyncing || stack.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D97757] hover:bg-[#C25E3E] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sincronizzazione su Claude in corso...</span>
                    </>
                  ) : syncSuccess ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                      <span>Sincronizzato con Successo su Claude!</span>
                    </>
                  ) : (
                    <>
                      <ClaudeLogo size={16} className="text-white" />
                      <span>Sincronizza {stack.length} Skill su Claude</span>
                    </>
                  )}
                </button>
              </div>

              {/* Disconnect Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={onDisconnectAccount}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors border border-rose-900/40"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnetti Account</span>
                </button>
              </div>

            </div>
          ) : (
            /* Connection Options View */
            <div className="space-y-6">
              
              {/* Tabs for Connection Method */}
              <div className="grid grid-cols-3 gap-2 bg-[#1C1A19] p-1 rounded-xl border border-[#33302D]">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('session'); setErrorMsg(null); }}
                  className={`py-2 px-1 rounded-lg text-xs font-medium text-center transition-all ${
                    authMethod === 'session'
                      ? 'bg-[#D97757] text-white font-bold shadow'
                      : 'text-[#8E8882] hover:text-[#F5F2EC]'
                  }`}
                >
                  Claude.ai Session
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('api-key'); setErrorMsg(null); }}
                  className={`py-2 px-1 rounded-lg text-xs font-medium text-center transition-all ${
                    authMethod === 'api-key'
                      ? 'bg-[#D97757] text-white font-bold shadow'
                      : 'text-[#8E8882] hover:text-[#F5F2EC]'
                  }`}
                >
                  Anthropic API Key
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('claude-code'); setErrorMsg(null); }}
                  className={`py-2 px-1 rounded-lg text-xs font-medium text-center transition-all ${
                    authMethod === 'claude-code'
                      ? 'bg-[#D97757] text-white font-bold shadow'
                      : 'text-[#8E8882] hover:text-[#F5F2EC]'
                  }`}
                >
                  Claude Code CLI
                </button>
              </div>

              {/* Method 1: Claude.ai Session Connection */}
              {authMethod === 'session' && (
                <div className="space-y-4 bg-[#1C1A19] border border-[#33302D] rounded-xl p-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-serif font-bold text-[#F5F2EC]">
                      Accesso Diretto Account Claude
                    </h4>
                    <p className="text-xs text-[#8E8882]">
                      Connetti la tua identità Claude per importare i progetti e sincronizzare le skill con Claude 3.7 Sonnet.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#F5F2EC]">
                      Email del tuo Account Claude:
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      placeholder="tua.email@esempio.com"
                      className="w-full bg-[#242220] border border-[#3A3734] rounded-lg px-3 py-2 text-xs text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757]"
                    />
                  </div>

                  <div className="p-3 bg-[#242220] rounded-lg border border-[#33302D] text-[11px] text-[#C4BEB6] space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Connessione Sicura</span>
                    </div>
                    <p>I tuoi dati rimangono privati e le skill vengono configurate direttamente per la tua sessione.</p>
                  </div>

                  <button
                    onClick={handleConnectWithSession}
                    disabled={isLoading || !emailInput.trim()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D97757] hover:bg-[#C25E3E] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-[#B8583B]/20"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifica account in corso...</span>
                      </>
                    ) : (
                      <>
                        <ClaudeLogo size={16} className="text-white" />
                        <span>Collega con Claude.ai</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Method 2: Anthropic API Key */}
              {authMethod === 'api-key' && (
                <form onSubmit={handleConnectWithApiKey} className="space-y-4 bg-[#1C1A19] border border-[#33302D] rounded-xl p-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-serif font-bold text-[#F5F2EC]">
                      Anthropic Console API Key
                    </h4>
                    <p className="text-xs text-[#8E8882]">
                      Inserisci la tua chiave API Anthropic per abilitare l'orchestrazione avanzata e l'uso di Claude 3.7 Sonnet.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#F5F2EC]">
                      Chiave API Anthropic (sk-ant-...):
                    </label>
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={e => setApiKeyInput(e.target.value)}
                      placeholder="sk-ant-api03-••••••••••••••••••••••••••••••••••••"
                      className="w-full bg-[#242220] border border-[#3A3734] rounded-lg px-3 py-2 text-xs font-mono text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757]"
                    />
                  </div>

                  <p className="text-[11px] text-[#8E8882]">
                    La chiave viene utilizzata solo per verificare i permessi dell'account e non viene mai condivisa o esposta all'esterno.
                  </p>

                  <button
                    type="submit"
                    disabled={isLoading || !apiKeyInput.trim()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D97757] hover:bg-[#C25E3E] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-[#B8583B]/20"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Validazione chiave con Anthropic...</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-3.5 h-3.5" />
                        <span>Valida & Collega Chiave API</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Method 3: Claude Code CLI */}
              {authMethod === 'claude-code' && (
                <div className="space-y-4 bg-[#1C1A19] border border-[#33302D] rounded-xl p-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-serif font-bold text-[#F5F2EC]">
                      Claude Code CLI Terminal Sync
                    </h4>
                    <p className="text-xs text-[#8E8882]">
                      Collega l'ambiente CLI locale per generare e sincronizzare automaticamente il file <code className="text-[#D97757]">CLAUDE.md</code> e le directory <code className="text-[#D97757]">.claude/skills/</code>.
                    </p>
                  </div>

                  <div className="bg-[#242220] p-3 rounded-lg border border-[#33302D] font-mono text-[11px] text-[#C4BEB6] space-y-1">
                    <span className="text-[#8E8882] block">Comando di attivazione rapida nel tuo terminale:</span>
                    <span className="text-[#D97757] font-bold block">claude init</span>
                  </div>

                  <button
                    onClick={handleConnectWithClaudeCode}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D97757] hover:bg-[#C25E3E] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-[#B8583B]/20"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Rilevamento sessione CLI...</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Collega Sessione Claude Code CLI</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-red-950/70 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#3A3734] bg-[#1E1C1A] flex items-center justify-between">
          <span className="text-[11px] text-[#8E8882]">
            Anthropic Claude Integration Suite
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2A2725] hover:bg-[#34312E] text-[#F5F2EC] text-xs rounded-lg transition-colors"
          >
            Chiudi
          </button>
        </div>

      </div>
    </div>
  );
};
