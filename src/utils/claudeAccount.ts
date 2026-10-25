import { ClaudeAccount, ClaudeModelInfo, ClaudeSkill } from '../types/skills';

export const CLAUDE_MODELS_LIST: ClaudeModelInfo[] = [
  {
    id: 'claude-3-7-sonnet-20250219',
    name: 'Claude 3.7 Sonnet (Consigliato)',
    contextWindow: '200K token',
    description: 'Il modello di punta di Anthropic con modalità di ragionamento ibrido (hybrid thinking) e massima precisione nel codice.',
    recommendedFor: 'Architettura, codice complesso, refactoring e debugging profondo'
  },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Claude 3.5 Haiku',
    contextWindow: '200K token',
    description: 'Modello ultra-veloce ed economico per task quotidiani, completamento codice rapido e script leggeri.',
    recommendedFor: 'Bassa latenza, utility script e test rapidi'
  },
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    contextWindow: '200K token',
    description: 'Modello profondo per analisi semantiche complesse, sintesi di documenti lunghi e ricerca accademica.',
    recommendedFor: 'Ricerche approfondite, scrittura e sintesi documenti'
  }
];

export function maskApiKey(key: string): string {
  const clean = key.trim();
  if (clean.length < 12) return 'sk-ant-••••••••';
  const prefix = clean.substring(0, 10);
  const suffix = clean.substring(clean.length - 4);
  return `${prefix}••••${suffix}`;
}

export function validateAnthropicApiKey(key: string): { valid: boolean; reason?: string; maskedKey?: string } {
  const clean = key.trim();
  if (!clean) {
    return { valid: false, reason: 'La chiave API non può essere vuota.' };
  }
  // Anthropic API keys typically start with sk-ant-api or sk-ant-
  if (!clean.startsWith('sk-ant-')) {
    return { 
      valid: false, 
      reason: 'Formato chiave non valido. Le chiavi Anthropic iniziano con "sk-ant-api..." o "sk-ant-...".' 
    };
  }
  if (clean.length < 25) {
    return { valid: false, reason: 'La chiave API inserita è troppo corta.' };
  }

  return {
    valid: true,
    maskedKey: maskApiKey(clean)
  };
}

export const DEFAULT_PRESET_USERS: ClaudeAccount[] = [
  {
    id: 'user-lucquixada',
    isConnected: true,
    authType: 'session',
    accountName: 'lucquixada',
    email: 'lucquixada@gmail.com',
    tier: 'Claude Pro',
    selectedModel: 'claude-3-7-sonnet-20250219',
    connectedAt: '2026-03-24T09:30:00.000Z',
    syncedProjectsCount: 2,
    activeMcpServersCount: 4,
    keyMasked: 'sk-ant-api03-••••-98a2',
    avatarInitials: 'LQ',
    organization: 'Personal Workspace',
    savedSkillsIds: ['claude-code-cli', 'tailwind-ui', 'unit-testing'],
    personalProjects: [
      {
        id: 'proj-1',
        name: 'SaaS Web App Next.js',
        description: 'Piattaforma cloud con auth JWT, PostgreSQL Drizzle e Tailwind UI',
        lastSynced: '2 ore fa',
        platform: 'claude-code',
        activeSkillsCount: 4
      },
      {
        id: 'proj-2',
        name: 'E-commerce Microservices',
        description: 'Architettura Node.js e Docker con worker asincroni',
        lastSynced: 'Ieri',
        platform: 'claude-desktop',
        activeSkillsCount: 3
      }
    ]
  },
  {
    id: 'user-anthropic-dev',
    isConnected: true,
    authType: 'api-key',
    accountName: 'anthropic-developer',
    email: 'developer@anthropic-console.com',
    tier: 'Anthropic Tier 2',
    selectedModel: 'claude-3-7-sonnet-20250219',
    connectedAt: '2026-03-22T14:15:00.000Z',
    syncedProjectsCount: 3,
    activeMcpServersCount: 6,
    keyMasked: 'sk-ant-api03-••••-41fd',
    avatarInitials: 'AD',
    organization: 'Anthropic API Labs',
    savedSkillsIds: ['claude-code-cli', 'postgresql-drizzle', 'security-scanner'],
    personalProjects: [
      {
        id: 'proj-3',
        name: 'Agentic Research Pipeline',
        description: 'Pipeline di analisi dati con Claude 3.7 Sonnet e MCP Postgres',
        lastSynced: '3 ore fa',
        platform: 'claude-code',
        activeSkillsCount: 5
      }
    ]
  },
  {
    id: 'user-team-lead',
    isConnected: true,
    authType: 'claude-code-cli',
    accountName: 'studio-lead',
    email: 'techlead@designstudio.it',
    tier: 'Claude Team',
    selectedModel: 'claude-3-5-haiku-20241022',
    connectedAt: '2026-03-20T11:00:00.000Z',
    syncedProjectsCount: 4,
    activeMcpServersCount: 5,
    keyMasked: 'claude-code-session-token',
    avatarInitials: 'TL',
    organization: 'Design & Code Studio',
    savedSkillsIds: ['tailwind-ui', 'threejs-webgl', 'unit-testing'],
    personalProjects: [
      {
        id: 'proj-4',
        name: 'Design System 2026',
        description: 'Libreria componenti accessibili e animazioni Three.js',
        lastSynced: '4 ore fa',
        platform: 'claude-projects',
        activeSkillsCount: 4
      }
    ]
  }
];

export function createDefaultConnectedAccount(
  email: string = 'lucquixada@gmail.com', 
  authType: ClaudeAccount['authType'] = 'session',
  tier: ClaudeAccount['tier'] = 'Claude Pro',
  customName?: string
): ClaudeAccount {
  const name = customName || email.split('@')[0] || 'Claude User';
  const id = `user-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString(36)}`;
  const initials = name.substring(0, 2).toUpperCase();

  return {
    id,
    isConnected: true,
    authType,
    accountName: name,
    email,
    tier,
    selectedModel: 'claude-3-7-sonnet-20250219',
    connectedAt: new Date().toISOString(),
    syncedProjectsCount: 1,
    activeMcpServersCount: 4,
    keyMasked: authType === 'api-key' ? 'sk-ant-api03-••••-98a2' : undefined,
    avatarInitials: initials,
    organization: `${name}'s Claude Workspace`,
    savedSkillsIds: ['claude-code-cli', 'tailwind-ui', 'unit-testing'],
    personalProjects: [
      {
        id: `proj-${Date.now()}`,
        name: 'Nuovo Progetto Claude',
        description: 'Progetto configurato con skill e server MCP personalizzati',
        lastSynced: 'Appena creato',
        platform: 'claude-code',
        activeSkillsCount: 3
      }
    ]
  };
}

export function buildClaudeProjectSyncBundle(skills: ClaudeSkill[], projectName: string = 'Il Mio Progetto') {
  return {
    projectName,
    syncedAt: new Date().toISOString(),
    skillsCount: skills.length,
    activeSkills: skills.map(s => ({
      id: s.id,
      name: s.name,
      badge: s.badge,
      configType: s.configType
    })),
    status: 'success',
    instructionsPushed: true
  };
}
