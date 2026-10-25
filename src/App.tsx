import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectAdvisor } from './components/ProjectAdvisor';
import { SkillCatalog } from './components/SkillCatalog';
import { SkillModal } from './components/SkillModal';
import { SkillStackDrawer } from './components/SkillStackDrawer';
import { ClaudeConnectModal } from './components/ClaudeConnectModal';
import { ClaudeUserZone } from './components/ClaudeUserZone';
import { ClaudeSkill, ClaudeAccount } from './types/skills';
import { CLAUDE_SKILLS_DATABASE } from './data/skillsData';
import { createDefaultConnectedAccount } from './utils/claudeAccount';
import { 
  Layers, 
  Download, 
  Terminal, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  UserCheck,
  User
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'advisor' | 'catalog' | 'user-zone' | 'stack'>('advisor');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Initial default stack with foundational development skills
  const [stack, setStack] = useState<ClaudeSkill[]>(() => {
    return CLAUDE_SKILLS_DATABASE.filter(s => 
      s.id === 'claude-code-cli' || s.id === 'tailwind-ui' || s.id === 'unit-testing'
    );
  });

  // Claude Account State (connected by default or easily configured)
  const [account, setAccount] = useState<ClaudeAccount | null>(() => {
    const saved = localStorage.getItem('claude_connected_account');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    // Pre-connected authentic account for instant seamless experience
    return createDefaultConnectedAccount('lucquixada@gmail.com', 'session');
  });

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [selectedSkillForModal, setSelectedSkillForModal] = useState<ClaudeSkill | null>(null);
  const [isStackDrawerOpen, setIsStackDrawerOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      localStorage.setItem('claude_connected_account', JSON.stringify(account));
    } else {
      localStorage.removeItem('claude_connected_account');
    }
  }, [account]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(prev => (prev === message ? null : prev));
    }, 3000);
  };

  const handleAddSkillToStack = (skill: ClaudeSkill) => {
    if (!stack.some(s => s.id === skill.id)) {
      setStack(prev => [...prev, skill]);
      showToast(`Skill "${skill.name}" aggiunta al tuo stack!`);
    }
  };

  const handleRemoveSkillFromStack = (skillId: string) => {
    const removedSkill = stack.find(s => s.id === skillId);
    setStack(prev => prev.filter(s => s.id !== skillId));
    if (removedSkill) {
      showToast(`Skill "${removedSkill.name}" rimossa dallo stack.`);
    }
  };

  const isSkillInStack = (skillId: string) => {
    return stack.some(s => s.id === skillId);
  };

  const handleClearStack = () => {
    setStack([]);
    showToast('Tutte le skill sono state rimosse dallo stack.');
  };

  const handleConnectAccount = (newAccount: ClaudeAccount) => {
    setAccount(newAccount);
    setIsAccountModalOpen(false);
    showToast(`Account Claude collegato: ${newAccount.accountName} (${newAccount.tier})`);
  };

  const handleDisconnectAccount = () => {
    setAccount(null);
    setIsAccountModalOpen(false);
    showToast('Account Claude disconnesso.');
  };

  const handleUpdateModel = (modelId: string) => {
    if (account) {
      setAccount({ ...account, selectedModel: modelId });
      showToast(`Modello Claude aggiornato: ${modelId.split('-').slice(0, 3).join(' ')}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1917] text-[#F5F2EC] flex flex-col font-sans selection:bg-[#D97757] selection:text-white">
      
      {/* Top Navigation Bar in Claude Theme */}
      <Header
        activeTab={activeTab === 'stack' ? 'advisor' : activeTab}
        setActiveTab={setActiveTab}
        stackCount={stack.length}
        onOpenStack={() => setIsStackDrawerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        account={account}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#23211F] border border-[#D97757] text-[#F5F2EC] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-slideUp">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main View Switcher */}
      <main className="flex-1">
        
        {/* Tab 1: Project Advisor (Default Hero Journey) */}
        {activeTab === 'advisor' && (
          <div className="space-y-10 pb-16">
            <ProjectAdvisor
              onAddSkillToStack={handleAddSkillToStack}
              onRemoveSkillFromStack={handleRemoveSkillFromStack}
              isSkillInStack={isSkillInStack}
              onViewSkillDetails={skill => setSelectedSkillForModal(skill)}
              onOpenStack={() => setIsStackDrawerOpen(true)}
              account={account}
              onOpenAccountModal={() => setIsAccountModalOpen(true)}
            />

            {/* Quick Navigation Cards in Claude Warm Theme */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* User Access Zone Card */}
                <div 
                  onClick={() => setActiveTab('user-zone')}
                  className="bg-[#23211F] border border-[#393633] hover:border-[#D97757]/60 rounded-2xl p-6 cursor-pointer group transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#D97757]/15 border border-[#D97757]/40 text-[#D97757]">
                      <User className="w-5 h-5" />
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#706B65] group-hover:text-[#D97757] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#F5F2EC] group-hover:text-[#D97757] transition-colors">
                    Zona Personale & Accesso Utente Claude AI
                  </h3>
                  <p className="text-xs text-[#8E8882] mt-1 leading-relaxed">
                    Gestisci il tuo profilo Claude, sincronizza i tuoi progetti, commuta tra account multipli e configura i tuoi server MCP.
                  </p>
                </div>

                {/* Full Catalog Card */}
                <div 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-[#23211F] border border-[#393633] hover:border-[#D97757]/60 rounded-2xl p-6 cursor-pointer group transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#D97757]/15 border border-[#D97757]/40 text-[#D97757]">
                      <Layers className="w-5 h-5" />
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#706B65] group-hover:text-[#D97757] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#F5F2EC] group-hover:text-[#D97757] transition-colors">
                    Esplora il Catalogo Completo ({CLAUDE_SKILLS_DATABASE.length} Skill & MCP)
                  </h3>
                  <p className="text-xs text-[#8E8882] mt-1 leading-relaxed">
                    Filtra per categoria (Frontend, Backend, Database, Scraping, Sicurezza) o strumenti in tendenza ed esporta il tuo stack in 1 click.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab: Dedicated Claude User Access Zone */}
        {activeTab === 'user-zone' && (
          <div className="pb-16">
            <ClaudeUserZone
              currentUser={account}
              onUpdateUser={acc => {
                setAccount(acc);
                showToast(`Profilo attivo: ${acc.accountName} (${acc.tier})`);
              }}
              onDisconnect={handleDisconnectAccount}
              onOpenConnectModal={() => setIsAccountModalOpen(true)}
              stack={stack}
              onOpenStack={() => setIsStackDrawerOpen(true)}
              onSelectProjectForAdvisor={() => {
                setActiveTab('advisor');
                showToast('Progetto selezionato per l\'analisi');
              }}
            />
          </div>
        )}

        {/* Tab 2: Full Catalog */}
        {activeTab === 'catalog' && (
          <div className="pb-16">
            <SkillCatalog
              onAddSkillToStack={handleAddSkillToStack}
              onRemoveSkillFromStack={handleRemoveSkillFromStack}
              isSkillInStack={isSkillInStack}
              onViewSkillDetails={skill => setSelectedSkillForModal(skill)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        )}

      </main>

      {/* Global Claude Account Connection Modal */}
      <ClaudeConnectModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        account={account}
        onConnectAccount={handleConnectAccount}
        onDisconnectAccount={handleDisconnectAccount}
        onUpdateModel={handleUpdateModel}
        stack={stack}
      />

      {/* Global Skill Detail Modal */}
      <SkillModal
        skill={selectedSkillForModal}
        onClose={() => setSelectedSkillForModal(null)}
        onAddSkillToStack={handleAddSkillToStack}
        onRemoveSkillFromStack={handleRemoveSkillFromStack}
        isSkillInStack={isSkillInStack}
      />

      {/* Global Active Skill Stack Drawer */}
      <SkillStackDrawer
        isOpen={isStackDrawerOpen}
        onClose={() => setIsStackDrawerOpen(false)}
        stack={stack}
        onRemoveSkill={handleRemoveSkillFromStack}
        onClearStack={handleClearStack}
        onViewSkillDetails={skill => setSelectedSkillForModal(skill)}
        account={account}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Footer in Claude Theme */}
      <footer className="border-t border-[#292624] bg-[#161514] py-8 text-center text-xs text-[#8E8882] space-y-2">
        <p className="font-serif font-medium text-[#C4BEB6]">
          Claude Skills Architect — La guida definitiva per scegliere e orchestrare le skill su Claude AI & Claude Code.
        </p>
        <p className="text-[11px] text-[#706B65]">
          Ispirato all'estetica e al design language di Anthropic Claude. Supporta Claude Code CLI, Claude Desktop (MCP Protocol) e Claude Projects.
        </p>
        <p className="text-[11px] text-[#706B65] pt-2 border-t border-[#23211F] tracking-wide font-normal">
          created by Luancer & Co
        </p>
      </footer>

    </div>
  );
}
