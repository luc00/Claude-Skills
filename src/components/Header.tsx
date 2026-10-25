import React from 'react';
import { 
  Layers, 
  Download, 
  Search,
  User
} from 'lucide-react';
import { ClaudeAccount } from '../types/skills';
import { ClaudeLogo } from './ClaudeLogo';

interface HeaderProps {
  activeTab: 'advisor' | 'catalog' | 'user-zone' | 'stack';
  setActiveTab: (tab: 'advisor' | 'catalog' | 'user-zone' | 'stack') => void;
  stackCount: number;
  onOpenStack: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  account: ClaudeAccount | null;
  onOpenAccountModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stackCount,
  onOpenStack,
  searchQuery,
  setSearchQuery,
  account,
  onOpenAccountModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#302D2A] bg-[#191716]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand with OFFICIAL CLAUDE AI LOGO */}
          <div 
            onClick={() => setActiveTab('advisor')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* Authentic Claude AI Symbol */}
            <div className="w-9 h-9 rounded-xl bg-[#252220] border border-[#383431] flex items-center justify-center shadow-sm group-hover:border-[#D97757]/50 transition-colors">
              <ClaudeLogo size={22} color="#D97757" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-medium text-[#F5F2EC] tracking-tight">
                  Claude <span className="text-[#C4BEB6] font-normal">Skills Architect</span>
                </span>
              </div>
              <p className="text-[11px] text-[#857F78] hidden sm:block">
                Configura le skill e i server MCP ideali per il tuo progetto
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Understated, calm Claude navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#22201E] border border-[#302D2A] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'advisor'
                  ? 'bg-[#D97757] text-white shadow-sm font-semibold'
                  : 'text-[#A39E96] hover:text-[#F5F2EC] hover:bg-[#2A2724]'
              }`}
            >
              Consigliere Progetto
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#D97757] text-white shadow-sm font-semibold'
                  : 'text-[#A39E96] hover:text-[#F5F2EC] hover:bg-[#2A2724]'
              }`}
            >
              Catalogo Skill & MCP
            </button>

            <button
              onClick={() => setActiveTab('user-zone')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'user-zone'
                  ? 'bg-[#D97757] text-white shadow-sm font-semibold'
                  : 'text-[#A39E96] hover:text-[#F5F2EC] hover:bg-[#2A2724]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#D97757] group-hover:text-white" />
              <span>Zona Accesso Utente</span>
            </button>
          </nav>

          {/* Right Actions: Account Connection, Search & Stack Drawer */}
          <div className="flex items-center gap-2.5">
            
            {/* Search */}
            <div className="relative hidden xl:block w-44">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#706B65]" />
              <input
                type="text"
                placeholder="Cerca tra le skill..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                className="w-full bg-[#22201E] border border-[#302D2A] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#F5F2EC] placeholder-[#706B65] focus:outline-none focus:border-[#D97757]"
              />
            </div>

            {/* CLAUDE ACCOUNT CONNECTION */}
            <button
              onClick={onOpenAccountModal}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                account?.isConnected
                  ? 'bg-[#22201E] border-[#383431] text-[#E0DBD3] hover:border-[#D97757]'
                  : 'bg-[#D97757] hover:bg-[#C25E3E] border-transparent text-white font-semibold'
              }`}
              aria-label={account?.isConnected ? 'Gestisci Account Claude' : 'Collega Account Claude'}
            >
              {account?.isConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{account.accountName}</span>
                  <span className="hidden sm:inline text-[11px] text-[#A39E96]">
                    • {account.tier}
                  </span>
                </>
              ) : (
                <>
                  <ClaudeLogo size={14} color="#FFFFFF" />
                  <span>Collega Claude</span>
                </>
              )}
            </button>

            {/* Active Skill Stack Button */}
            <button
              onClick={onOpenStack}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#22201E] border border-[#302D2A] hover:border-[#3E3A36] rounded-xl text-xs font-medium text-[#E0DBD3] transition-all group"
              aria-label={`Mio Stack: ${stackCount} skill selezionate`}
            >
              <Download className="w-3.5 h-3.5 text-[#D97757]" />
              <span className="hidden sm:inline">Stack</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#2E2B28] group-hover:bg-[#D97757] group-hover:text-white text-[#C4BEB6] font-semibold text-[11px] rounded-full transition-colors">
                {stackCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[#292624] overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
              activeTab === 'advisor' ? 'bg-[#D97757] text-white font-medium' : 'text-[#8E8882]'
            }`}
          >
            Advisor
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-[#D97757] text-white font-medium' : 'text-[#8E8882]'
            }`}
          >
            Catalogo
          </button>
          <button
            onClick={() => setActiveTab('user-zone')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
              activeTab === 'user-zone' ? 'bg-[#D97757] text-white font-medium' : 'text-[#8E8882]'
            }`}
          >
            Zona Accesso
          </button>
        </div>

      </div>
    </header>
  );
};
