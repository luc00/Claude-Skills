import { 
  ClaudeSkill, 
  ClaudePlatform, 
  ProjectAnalysisResult, 
  SkillRecommendation,
  PriorityLevel 
} from '../types/skills';
import { CLAUDE_SKILLS_DATABASE } from '../data/skillsData';

/**
 * Normalizza il testo rimuovendo punteggiatura e convertendo in minuscolo
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calcola il punteggio di corrispondenza per una skill rispetto alla descrizione del progetto
 */
export function calculateSkillMatchScore(
  skill: ClaudeSkill,
  cleanQuery: string,
  targetPlatform?: ClaudePlatform,
  explicitTechStack: string[] = []
): { score: number; matchedKeywords: string[] } {
  let score = 0;
  const matchedKeywords: string[] = [];

  // 1. Corrispondenza con parole chiave consigliate (alta priorità)
  for (const keyword of skill.recommendedFor) {
    const cleanKw = normalizeText(keyword);
    if (cleanQuery.includes(cleanKw)) {
      score += 25;
      matchedKeywords.push(keyword);
    }
  }

  // 2. Corrispondenza con i tag della skill
  for (const tag of skill.tags) {
    const cleanTag = normalizeText(tag);
    if (cleanQuery.includes(cleanTag) && !matchedKeywords.includes(tag)) {
      score += 15;
      matchedKeywords.push(tag);
    }
  }

  // 3. Corrispondenza con lo stack esplicito fornito
  for (const tech of explicitTechStack) {
    const cleanTech = normalizeText(tech);
    if (skill.tags.some(t => cleanTech.includes(normalizeText(t)) || normalizeText(t).includes(cleanTech))) {
      score += 20;
    }
  }

  // 4. Bonus se la piattaforma di destinazione corrisponde (solo se c'è già una minima correlazione)
  if (score > 0 && targetPlatform && skill.platforms.includes(targetPlatform)) {
    score += 10;
  }

  // 5. Corrispondenza nella descrizione o nel nome della skill
  const skillNameClean = normalizeText(skill.name);
  if (cleanQuery.includes(skillNameClean)) {
    score += 30;
  }

  return { 
    score: Math.min(score, 100), 
    matchedKeywords: Array.from(new Set(matchedKeywords)) 
  };
}

/**
 * Motiva perché una specifica skill è consigliata per il progetto analizzato
 */
export function generateSkillWhyExplanation(
  skill: ClaudeSkill, 
  matchedKeywords: string[], 
  cleanQuery: string
): string {
  if (matchedKeywords.length > 0) {
    const kwList = matchedKeywords.slice(0, 3).map(k => `"${k}"`).join(', ');
    return `Rilevato bisogno correlato a ${kwList} nel tuo progetto. ${skill.whyUseIt}`;
  }
  return skill.whyUseIt;
}

/**
 * Spiega cosa farà la skill nello specifico contesto del progetto
 */
export function generateSkillProjectImpact(skill: ClaudeSkill): string {
  return skill.whatItDoes.join(' ');
}

/**
 * Motore analizzatore di progetti e raccomandazione skill (euristico offline)
 */
export function analyzeProjectLocally(
  projectDescription: string,
  targetPlatform?: ClaudePlatform,
  explicitTechStack: string[] = []
): ProjectAnalysisResult {
  const cleanQuery = normalizeText(projectDescription);
  const scoredSkills: { skill: ClaudeSkill; score: number; keywords: string[] }[] = [];

  for (const skill of CLAUDE_SKILLS_DATABASE) {
    const match = calculateSkillMatchScore(skill, cleanQuery, targetPlatform, explicitTechStack);
    if (match.score > 0) {
      scoredSkills.push({
        skill,
        score: match.score,
        keywords: match.matchedKeywords
      });
    }
  }

  // Se nessuna skill ha fatto match (es. input molto breve o astratto), includiamo le skill fondamentali generiche
  if (scoredSkills.length === 0) {
    const defaults = ['claude-code-cli', 'unit-testing', 'tailwind-ui'];
    for (const defId of defaults) {
      const sk = CLAUDE_SKILLS_DATABASE.find(s => s.id === defId);
      if (sk) {
        scoredSkills.push({ skill: sk, score: 50, keywords: ['standard-workflow'] });
      }
    }
  }

  // Ordina per punteggio decrescente
  scoredSkills.sort((a, b) => b.score - a.score);

  // Mappa in raccomandazioni strutturate
  const recommendations: SkillRecommendation[] = scoredSkills.slice(0, 7).map(({ skill, score, keywords }) => {
    let priority: PriorityLevel = 'optional';
    if (score >= 60) priority = 'essential';
    else if (score >= 35) priority = 'recommended';

    return {
      skillId: skill.id,
      priority,
      matchScore: score,
      whyRecommend: generateSkillWhyExplanation(skill, keywords, cleanQuery),
      whatItDoesForProject: generateSkillProjectImpact(skill),
      activationSnippet: skill.setupSnippet,
      practicalTips: `Impatto token stimato: ${skill.tokenImpact.toUpperCase()} | Livello: ${skill.complexity}. Ricordati di attivarla nel file ${skill.configType}.`
    };
  });

  // Genera file CLAUDE.md di esempio suggerito
  const activeSkills = recommendations.map(r => CLAUDE_SKILLS_DATABASE.find(s => s.id === r.skillId)!).filter(Boolean);
  const suggestedClaudeConfig = generateClaudeMd(activeSkills, 'Il Tuo Progetto');

  // Individua tech stack rilevato
  const detectedTechStack = Array.from(
    new Set(
      scoredSkills
        .flatMap(s => s.keywords)
        .filter(k => k.length > 2)
    )
  );

  return {
    projectSummary: projectDescription.length > 150 
      ? projectDescription.substring(0, 147) + '...' 
      : projectDescription,
    projectCategory: detectedTechStack.length > 0 ? detectedTechStack.slice(0, 3).join(' / ') : 'General Development',
    detectedTechStack,
    recommendedSkills: recommendations,
    architecturalAdvice: `Configurazione ottimizzata per ${targetPlatform || 'Claude'}. Si consiglia di attivare per prime le skill con priorità ESSENZIALE per stabilire l'architettura base, poi quelle RACCOMANDATE durante lo sviluppo delle feature.`,
    suggestedClaudeConfig,
    synergyNotes: [
      'Mantieni le istruzioni delle skill nel file CLAUDE.md per Claude Code, oppure nei singoli file .claude/skills/*.md per caricarle on-demand.',
      'Per Claude Desktop, carica i server MCP nel file claude_desktop_config.json per dare a Claude accesso immediato ai file e al DB.',
      'Evita di sovraccaricare il contesto iniziale con troppe skill ad alto impatto di token: attiva solo quelle rilevanti per la fase attuale.'
    ],
    modelUsed: 'Heuristic Match Engine v1.0 (Built-in Local)',
    executionMode: 'offline'
  };
}

/**
 * Genera il contenuto del file CLAUDE.md pronto all'uso partendo da una lista di skill
 */
export function generateClaudeMd(skills: ClaudeSkill[], projectTitle: string = 'Progetto Claude'): string {
  const date = new Date().toLocaleDateString('it-IT');
  let output = `# CLAUDE.md — Linee Guida di Architettura & Skill per ${projectTitle}
*Generato automaticamente da Claude Skills Architect il ${date}*

## Panoramica del Progetto
Questo documento definisce le skill attive, le convenzioni di codice e i vincoli operativi per Claude AI e Claude Code.

## Skill Attivate (${skills.length})
`;

  for (const skill of skills) {
    output += `\n### [SKILL: ${skill.name}] (${skill.badge})\n`;
    output += `**Cosa fa:** ${skill.whatItDoes[0]}\n`;
    output += `**Perché è attiva:** ${skill.whyUseIt}\n`;
    output += `**Linee guida per Claude:**\n`;
    output += `${skill.setupSnippet}\n`;
  }

  output += `\n## Regole Operative Globali
- Esegui sempre verifiche con test unitari e compilazione prima di confermare le modifiche.
- Mantieni modifiche chirurgiche senza riscrivere file interi se non necessario.
- Non usare 'any' in TypeScript e mantieni contrasti WCAG e semantica accessibile.\n`;

  return output;
}

/**
 * Genera configurazione JSON per MCP Servers (claude_desktop_config.json)
 */
export function generateMcpConfig(skills: ClaudeSkill[]): string {
  const mcpSkills = skills.filter(s => s.category === 'mcp' || s.configType === 'mcp-json');
  const serversObj: Record<string, any> = {};

  for (const s of mcpSkills) {
    try {
      const parsed = JSON.parse(s.setupSnippet);
      if (parsed.mcpServers) {
        Object.assign(serversObj, parsed.mcpServers);
      }
    } catch (e) {
      // Fallback
      serversObj[s.id] = {
        command: "npx",
        args: ["-y", `@modelcontextprotocol/server-${s.id}`]
      };
    }
  }

  return JSON.stringify({ mcpServers: serversObj }, null, 2);
}

/**
 * Genera System Prompt per Claude Projects su claude.ai
 */
export function generateSystemPrompt(skills: ClaudeSkill[]): string {
  let prompt = `Sei l'assistente senior specializzato per questo progetto.\n\n`;
  prompt += `Segui rigorosamente le seguenti skill e vincoli operativi:\n\n`;

  skills.forEach((s, idx) => {
    prompt += `${idx + 1}. **${s.name}**:\n`;
    prompt += `   - Funzione: ${s.whatItDoes.join(' ')}\n`;
    prompt += `   - Direttiva: ${s.whyUseIt}\n\n`;
  });

  prompt += `Rispondi sempre con codice pulito, testabile e strutturato secondo queste best practice.`;
  return prompt;
}
