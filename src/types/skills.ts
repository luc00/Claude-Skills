export type SkillCategory = 
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'database'
  | 'ai-data'
  | 'testing'
  | 'security'
  | 'productivity'
  | 'mcp';

export type ClaudePlatform = 
  | 'claude-code'
  | 'claude-desktop'
  | 'claude-projects'
  | 'web';

export type TokenImpact = 'low' | 'medium' | 'high';
export type Complexity = 'beginner' | 'intermediate' | 'advanced';
export type PriorityLevel = 'essential' | 'recommended' | 'optional';

export interface ClaudeSkill {
  id: string;
  name: string;
  shortName: string;
  category: SkillCategory;
  platforms: ClaudePlatform[];
  badge: string;
  shortDescription: string;
  whatItDoes: string[];
  whyUseIt: string;
  whenToAvoid: string;
  tokenImpact: TokenImpact;
  complexity: Complexity;
  toolsProvided: string[];
  samplePrompt: string;
  setupSnippet: string;
  configType: 'claude-md' | 'mcp-json' | 'skill-file' | 'system-prompt';
  tags: string[];
  recommendedFor: string[];
  synergySkills: string[];
  isTrending?: boolean;
  trendingRank?: number;
  trendingReason?: string;
}

export interface SkillRecommendation {
  skillId: string;
  priority: PriorityLevel;
  matchScore: number;
  whyRecommend: string;
  whatItDoesForProject: string;
  activationSnippet: string;
  practicalTips: string;
}

export interface ProjectAnalysisResult {
  projectSummary: string;
  projectCategory: string;
  detectedTechStack: string[];
  recommendedSkills: SkillRecommendation[];
  architecturalAdvice: string;
  suggestedClaudeConfig: string;
  synergyNotes: string[];
  modelUsed: string;
  executionMode: 'fast' | 'deep' | 'search' | 'offline';
}

export interface ProjectPreset {
  id: string;
  title: string;
  description: string;
  icon: string;
  techStack: string[];
  sampleDescription: string;
  targetPlatform: ClaudePlatform;
}

export interface ClaudePersonalProject {
  id: string;
  name: string;
  description: string;
  lastSynced: string;
  platform: ClaudePlatform;
  activeSkillsCount: number;
}

export interface ClaudeAccount {
  id?: string;
  isConnected: boolean;
  authType: 'api-key' | 'claude-code-cli' | 'session';
  accountName: string;
  email?: string;
  tier: 'Claude Free' | 'Claude Pro' | 'Claude Team' | 'Anthropic Tier 2' | 'Enterprise';
  selectedModel: string;
  connectedAt: string;
  syncedProjectsCount: number;
  activeMcpServersCount: number;
  keyMasked?: string;
  avatarInitials?: string;
  organization?: string;
  savedSkillsIds?: string[];
  personalProjects?: ClaudePersonalProject[];
}

export interface ClaudeModelInfo {
  id: string;
  name: string;
  contextWindow: string;
  description: string;
  recommendedFor: string;
}
