import React, { useState } from 'react';
import { 
  User, 
  Key, 
  Terminal, 
  ShieldCheck, 
  RefreshCw, 
  LogOut, 
  Plus, 
  Check, 
  Cpu, 
  Zap, 
  Layers, 
  FolderPlus, 
  Folder, 
  ExternalLink, 
  CheckCircle, 
  ChevronRight,
  UserCheck,
  Server,
  ArrowRight,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { ClaudeAccount, ClaudePersonalProject, ClaudeSkill } from '../types/skills';
import { ClaudeLogo } from './ClaudeLogo';
import { Claude3DElement } from './Claude3DElement';
import { DEFAULT_PRESET_USERS, createDefaultConnectedAccount, CLAUDE_MODELS_LIST } from '../utils/claudeAccount';

interface ClaudeUserZoneProps {
  currentUser: ClaudeAccount | null;
  onUpdateUser: (user: ClaudeAccount) => void;
  onDisconnect: () => void;
  onOpenConnectModal: () => void;
  stack: ClaudeSkill[];
  onOpenStack: () => void;
  onSelectProjectForAdvisor: (description: string) => void;
}

export const ClaudeUserZone: React.FC<ClaudeUserZoneProps> = ({
  currentUser,
  onUpdateUser,
  onDisconnect,
  onOpenConnectModal,
  stack,
  onOpenStack,
  onSelectProjectForAdvisor
}) => {
  const [storedUsers, setStoredUsers] = useState<ClaudeAccount[]>(() => {
    const saved = localStorage.getItem('claude_all_saved_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_PRESET_USERS;
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'mcp' | 'switch-account'>('overview');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  
  // New Project Form state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Switch to another saved user
  const handleSwitchUser = (user: ClaudeAccount) => {
    onUpdateUser(user);
    setActiveTab('overview');
  };

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || !currentUser) return;

    const newProj: ClaudePersonalProject = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'Progetto configurato con skill Claude',
      lastSynced: 'Adesso',
      platform: 'claude-code',
      activeSkillsCount: stack.length || 3
    };

    const updatedUser: ClaudeAccount = {
      ...currentUser,
      personalProjects: [...(currentUser.personalProjects || []), newProj],
      syncedProjectsCount: (currentUser.personalProjects?.length || 0) + 1
    };

    onUpdateUser(updatedUser);
    setNewProjectName('');
    setNewProjectDesc('');
    setIsAddingProject(false);
  };

  const handleSyncToClaude = async () => {
    setIsSyncing(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-[#F5F2EC]">
      
      {/* Hero / Identity Access Banner with 3D Claude Element */}
      <div className="bg-[#23211F] border border-[#3A3734] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background ambient gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left: User Info & Account Status */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B1917] border border-[#3A3734] rounded-full text-xs font-semibold text-[#D97757]">
              <ClaudeLogo size={14} className="text-[#D97757]" />
              <span>Zona Personale & Accesso Account Claude AI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#F5F2EC] tracking-tight leading-tight">
              {currentUser?.isConnected ? (
                <>
                  Benvenuto, <span className="text-[#D97757] italic">{currentUser.accountName}</span>
                </>
              ) : (
                <>
                  Accedi con il tuo <span className="text-[#D97757] italic">Account Claude</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#C4BEB6] leading-relaxed">
              {currentUser?.isConnected 
                ? 'Questo è il tuo spazio riservato per gestire i progetti, sincronizzare le skill con Claude 3.7 Sonnet e orchestrare i tuoi server MCP locali o cloud.'
                : 'Collega la tua sessione Claude.ai, la tua API Key Anthropic o il token Claude Code CLI per attivare e sincronizzare automaticamente le skill sui tuoi progetti.'}
            </p>

            {/* Quick Actions & Status Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {currentUser?.isConnected ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1B1917] border border-[#353230] rounded-xl text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[#E0DBD3] font-medium">{currentUser.email || currentUser.accountName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D97757]/20 text-[#D97757] border border-[#D97757]/40">
                      {currentUser.tier}
                    </span>
                  </div>

                  <button
                    onClick={handleSyncToClaude}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#D97757] hover:bg-[#C25E3E] text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sincronizzazione...</span>
                      </>
                    ) : syncSuccess ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                        <span>Sincronizzato con Successo!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Sincronizza {stack.length} Skill su Claude</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('switch-account')}
                    className="px-3 py-1.5 bg-[#1B1917] hover:bg-[#2C2927] border border-[#353230] text-[#C4BEB6] hover:text-[#F5F2EC] text-xs font-medium rounded-xl transition-colors"
                  >
                    Cambia Utente
                  </button>
                </>
              ) : (
                <button
                  onClick={onOpenConnectModal}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#D97757] hover:bg-[#C25E3E] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#D97757]/20 active:scale-95"
                >
                  <ClaudeLogo size={16} className="text-white" />
                  <span>Accedi al tuo Account Claude AI</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          </div>

          {/* Right: The 3D Claude Element without background */}
          <div className="shrink-0 flex flex-col items-center justify-center p-4">
            <Claude3DElement 
              size="lg" 
            />
          </div>

        </div>

      </div>

      {/* Navigation Sub-Tabs in Claude Style */}
      <div className="flex items-center gap-2 border-b border-[#312E2C] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-[#23211F] text-[#F5F2EC] border border-[#3A3734] font-semibold'
              : 'text-[#8E8882] hover:text-[#C4BEB6]'
          }`}
        >
          <User className="w-3.5 h-3.5 text-[#D97757]" />
          <span>Panoramica Account</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'projects'
              ? 'bg-[#23211F] text-[#F5F2EC] border border-[#3A3734] font-semibold'
              : 'text-[#8E8882] hover:text-[#C4BEB6]'
          }`}
        >
          <Folder className="w-3.5 h-3.5 text-[#D97757]" />
          <span>I Tuoi Progetti Claude ({currentUser?.personalProjects?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('mcp')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'mcp'
              ? 'bg-[#23211F] text-[#F5F2EC] border border-[#3A3734] font-semibold'
              : 'text-[#8E8882] hover:text-[#C4BEB6]'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-[#D97757]" />
          <span>Server MCP Rilevati ({currentUser?.activeMcpServersCount || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('switch-account')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'switch-account'
              ? 'bg-[#23211F] text-[#F5F2EC] border border-[#3A3734] font-semibold'
              : 'text-[#8E8882] hover:text-[#C4BEB6]'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 text-[#D97757]" />
          <span>Profili & Multi-Account ({storedUsers.length})</span>
        </button>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Identità e Credenziali */}
          <div className="bg-[#23211F] border border-[#3A3734] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-serif font-medium text-[#F5F2EC] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D97757]" />
              <span>Dettagli Sessione Claude</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-[#1B1917] p-3 rounded-xl border border-[#33302D] space-y-1">
                <span className="text-[10px] text-[#8E8882] block">Metodo di Autenticazione:</span>
                <span className="font-semibold text-[#F5F2EC]">
                  {currentUser?.authType === 'session' ? 'Sessione Claude.ai Diretta' : currentUser?.authType === 'api-key' ? 'Anthropic API Key' : 'Claude Code CLI Local'}
                </span>
              </div>

              <div className="bg-[#1B1917] p-3 rounded-xl border border-[#33302D] space-y-1">
                <span className="text-[10px] text-[#8E8882] block">Piano Account:</span>
                <span className="font-semibold text-[#F5F2EC] flex items-center gap-2">
                  <span>{currentUser?.tier || 'Claude Pro'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-400">Attivo</span>
                </span>
              </div>

              <div className="bg-[#1B1917] p-3 rounded-xl border border-[#33302D] space-y-1">
                <span className="text-[10px] text-[#8E8882] block">Modello Preferito:</span>
                <span className="font-semibold text-[#D97757]">
                  {currentUser?.selectedModel ? currentUser.selectedModel.split('-').slice(0, 3).join(' ') : 'Claude 3.7 Sonnet'}
                </span>
              </div>

              {currentUser?.keyMasked && (
                <div className="bg-[#1B1917] p-3 rounded-xl border border-[#33302D] space-y-1">
                  <span className="text-[10px] text-[#8E8882] block">Token / Chiave Mascherata:</span>
                  <span className="font-mono text-[#C4BEB6]">{currentUser.keyMasked}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={onOpenConnectModal}
                className="text-xs text-[#D97757] font-semibold hover:underline"
              >
                Modifica Credenziali
              </button>
              <button
                onClick={onDisconnect}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                Disconnetti
              </button>
            </div>
          </div>

          {/* Card 2: Skill Stack Attivo per questo Utente */}
          <div className="bg-[#23211F] border border-[#3A3734] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-medium text-[#F5F2EC] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D97757]" />
                <span>Il Tuo Stack di Skill ({stack.length})</span>
              </h3>
              <button
                onClick={onOpenStack}
                className="text-xs text-[#D97757] font-medium hover:underline"
              >
                Gestisci
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
              {stack.map(skill => (
                <div key={skill.id} className="p-2.5 bg-[#1B1917] border border-[#33302D] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#F5F2EC] block">{skill.name}</span>
                    <span className="text-[10px] text-[#8E8882]">{skill.badge}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#252220] text-[#D97757]">
                    {skill.configType}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSyncToClaude}
              disabled={isSyncing}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#D97757]/15 hover:bg-[#D97757]/25 border border-[#D97757]/40 text-[#D97757] rounded-xl text-xs font-semibold transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Sincronizza Tutto lo Stack su Claude</span>
            </button>
          </div>

          {/* Card 3: Progetti Recenti */}
          <div className="bg-[#23211F] border border-[#3A3734] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-medium text-[#F5F2EC] flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#D97757]" />
                <span>Progetti Sincronizzati</span>
              </h3>
              <button
                onClick={() => setIsAddingProject(true)}
                className="p-1 rounded bg-[#1B1917] hover:bg-[#2C2927] border border-[#33302D] text-[#D97757]"
                title="Aggiungi Progetto"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {(currentUser?.personalProjects || []).slice(0, 3).map(proj => (
                <div 
                  key={proj.id} 
                  onClick={() => onSelectProjectForAdvisor(proj.description)}
                  className="p-3 bg-[#1B1917] hover:bg-[#252220] border border-[#33302D] rounded-xl cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F5F2EC]">{proj.name}</span>
                    <span className="text-[10px] text-[#8E8882]">{proj.lastSynced}</span>
                  </div>
                  <p className="text-[11px] text-[#8E8882] line-clamp-1">{proj.description}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="w-full text-center text-xs text-[#8E8882] hover:text-[#F5F2EC] pt-1 block"
            >
              Vedi tutti i progetti →
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif font-medium text-[#F5F2EC]">
                I Tuoi Progetti Personali su Claude
              </h3>
              <p className="text-xs text-[#8E8882]">
                Seleziona un progetto per analizzarlo con l'Advisor o sincronizzare le skill ideali.
              </p>
            </div>

            <button
              onClick={() => setIsAddingProject(!isAddingProject)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D97757] hover:bg-[#C25E3E] text-white text-xs font-semibold rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nuovo Progetto</span>
            </button>
          </div>

          {/* New Project Form */}
          {isAddingProject && (
            <form onSubmit={handleCreateNewProject} className="bg-[#23211F] border border-[#D97757]/40 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-semibold text-[#F5F2EC]">Aggiungi Progetto al Tuo Account</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome del progetto (es: FinTech Mobile App)"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  className="bg-[#1B1917] border border-[#3A3734] rounded-xl px-3 py-2 text-xs text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757]"
                />
                <input
                  type="text"
                  placeholder="Descrizione / Stack (es: React Native, GraphQL, PostgreSQL, JWT)"
                  value={newProjectDesc}
                  onChange={e => setNewProjectDesc(e.target.value)}
                  className="bg-[#1B1917] border border-[#3A3734] rounded-xl px-3 py-2 text-xs text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProject(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#8E8882] hover:text-[#F5F2EC]"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D97757] hover:bg-[#C25E3E] text-white font-semibold rounded-lg text-xs"
                >
                  Salva Progetto
                </button>
              </div>
            </form>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(currentUser?.personalProjects || []).map(proj => (
              <div
                key={proj.id}
                className="bg-[#23211F] border border-[#3A3734] hover:border-[#D97757]/60 rounded-2xl p-5 space-y-3 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#D97757]/15 border border-[#D97757]/30 flex items-center justify-center text-[#D97757]">
                    <Folder className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-[#8E8882] font-mono">{proj.lastSynced}</span>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-[#F5F2EC] group-hover:text-[#D97757] transition-colors">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-[#8E8882] mt-1 line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#312E2C] flex items-center justify-between text-xs">
                  <span className="text-[#8E8882] text-[11px]">
                    {proj.activeSkillsCount} skill collegate
                  </span>
                  <button
                    onClick={() => onSelectProjectForAdvisor(proj.description)}
                    className="text-[#D97757] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>Analizza con Advisor</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MCP Servers */}
      {activeTab === 'mcp' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-serif font-medium text-[#F5F2EC]">
              Server Model Context Protocol (MCP) Rilevati
            </h3>
            <p className="text-xs text-[#8E8882]">
              Configurazione attiva nel tuo file claude_desktop_config.json o Claude Code CLI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'postgres-mcp-server', desc: 'Ispezione schemi SQL e query dirette per database PostgreSQL', status: 'Connesso', tools: 12 },
              { name: 'puppeteer-scraper-mcp', desc: 'Automazione browser, scraping dinamico e acquisizione screenshot', status: 'Connesso', tools: 8 },
              { name: 'filesystem-mcp-provider', desc: 'Accesso controllato ai file locali del progetto', status: 'Connesso', tools: 6 },
              { name: 'brave-search-mcp', desc: 'Ricerche web in tempo reale e consultazione documentazione esterna', status: 'In attesa', tools: 4 }
            ].map((mcp, idx) => (
              <div key={idx} className="bg-[#23211F] border border-[#3A3734] rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-xs text-[#F5F2EC]">{mcp.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 border border-emerald-800 text-emerald-400">
                    {mcp.status}
                  </span>
                </div>
                <p className="text-xs text-[#8E8882]">{mcp.desc}</p>
                <div className="pt-2 text-[11px] text-[#706B65]">
                  <span>{mcp.tools} tool esposti a Claude</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Multi-Account Switcher */}
      {activeTab === 'switch-account' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-medium text-[#F5F2EC]">
                Gestione Profili & Utenti Claude
              </h3>
              <p className="text-xs text-[#8E8882]">
                Passa istantaneamente da un profilo di lavoro all'altro con le proprie skill e progetti.
              </p>
            </div>

            <button
              onClick={onOpenConnectModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D97757] hover:bg-[#C25E3E] text-white text-xs font-semibold rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Collega Nuovo Utente</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storedUsers.map(user => {
              const isSelected = currentUser?.email === user.email || currentUser?.accountName === user.accountName;
              return (
                <div
                  key={user.id || user.email}
                  className={`bg-[#23211F] border rounded-2xl p-5 space-y-4 transition-all ${
                    isSelected
                      ? 'border-[#D97757] shadow-lg shadow-[#D97757]/10 bg-gradient-to-b from-[#23211F] to-[#2B2320]'
                      : 'border-[#3A3734] hover:border-[#4A4642]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D97757]/20 border border-[#D97757]/50 flex items-center justify-center text-[#D97757] font-bold text-sm">
                        {user.avatarInitials || user.accountName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[#F5F2EC] block">{user.accountName}</span>
                        <span className="text-[11px] text-[#8E8882]">{user.email}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 border border-emerald-800 text-emerald-400">
                        Attivo
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-[#8E8882] space-y-1 pt-1 border-t border-[#312E2C]">
                    <div className="flex justify-between">
                      <span>Piano:</span>
                      <span className="text-[#F5F2EC] font-medium">{user.tier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Metodo:</span>
                      <span className="text-[#F5F2EC]">{user.authType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progetti:</span>
                      <span className="text-[#F5F2EC]">{user.personalProjects?.length || 0}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSwitchUser(user)}
                    disabled={isSelected}
                    className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1B1917] text-[#8E8882] border border-[#33302D] cursor-default'
                        : 'bg-[#D97757] hover:bg-[#C25E3E] text-white shadow'
                    }`}
                  >
                    {isSelected ? 'Profilo Corrente' : 'Passa a questo Utente'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
