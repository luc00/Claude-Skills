import { ClaudeSkill, ProjectPreset } from '../types/skills';

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'Tutte le Skill', icon: 'Layers' },
  { id: 'trending', label: '🔥 In Tendenza', icon: 'Sparkles' },
  { id: 'mcp', label: 'Server & Tools MCP', icon: 'Network' },
  { id: 'productivity', label: 'Claude Code & CLI', icon: 'Terminal' },
  { id: 'frontend', label: 'Frontend & UI', icon: 'Layout' },
  { id: 'backend', label: 'Backend & API', icon: 'Server' },
  { id: 'database', label: 'Database & SQL', icon: 'Database' },
  { id: 'ai-data', label: 'AI, Data & Scraping', icon: 'Cpu' },
  { id: 'testing', label: 'Testing & Qualità', icon: 'CheckCircle' },
  { id: 'security', label: 'Sicurezza & Audit', icon: 'ShieldCheck' },
  { id: 'devops', label: 'DevOps & Cloud', icon: 'Cloud' },
] as const;

export const CLAUDE_SKILLS_DATABASE: ClaudeSkill[] = [
  // ==========================================
  // TOP TRENDING CLAUDE TOOLS & AGENTS (2025/2026)
  // ==========================================
  {
    id: 'claude-code-cli',
    name: 'Claude Code CLI Autonomous Agent & Workflow',
    shortName: 'Claude Code CLI Agent',
    category: 'productivity',
    platforms: ['claude-code'],
    badge: 'Official Agent',
    isTrending: true,
    trendingRank: 1,
    trendingReason: 'Strumento ufficiale #1 di Anthropic per coding autonomo da terminale, test veloci e git workflow',
    shortDescription: 'Regole e flussi per il nuovo agente a riga di comando Claude Code: comandi slash, CLAUDE.md e modifiche multi-file chirurgiche.',
    whatItDoes: [
      'Ottimizza l\'uso dei comandi slash (/compact, /review, /init, /cost, /bug) per risparmiare token e tempo.',
      'Guida Claude Code nell\'ispezione di file, test in background ed esecuzione comandi di compilazione prima di chiudere il task.',
      'Struttura il file CLAUDE.md nella radice del progetto per dare a Claude la bussola architetturale ideale.',
      'Previene modifiche distruttive e produce diff git puliti e controllabili.'
    ],
    whyUseIt: 'È il modo più rapido ed efficiente per programmare con Claude direttamente all\'interno del tuo terminale di sviluppo.',
    whenToAvoid: 'Se utilizzi esclusivamente la web chat classica su claude.ai senza accesso al terminale locale.',
    tokenImpact: 'low',
    complexity: 'beginner',
    toolsProvided: ['CLAUDE.md Architect', 'Slash Commands Guide', 'Subagent Router', 'Git Diff Auditor'],
    samplePrompt: 'Claude, crea un file CLAUDE.md completo con le convenzioni di test, build e architettura per il nostro progetto.',
    configType: 'claude-md',
    setupSnippet: `# File CLAUDE.md nella root del progetto:
## Comandi di Sviluppo
- Avvio server dev: npm run dev
- Compilazione TypeScript: npm run build
- Esecuzione test: npm test
- Validazione lint: npm run lint

## Linee Guida Architetturali
- TypeScript rigoroso, nessun uso di 'any'.
- Separare sempre logica pura da componenti visivi.
- Esegui 'npm test' prima di completare ogni singola modifica.`,
    tags: ['claude code', 'cli', 'terminale', 'agente', 'claude.md', 'produttività', 'anthropic', 'tendenza'],
    recommendedFor: ['claude code', 'terminale', 'cli', 'claude.md', 'sviluppo locale', 'agente autonomo'],
    synergySkills: ['mcp-filesystem', 'unit-testing', 'claude-extended-thinking']
  },
  {
    id: 'claude-extended-thinking',
    name: 'Claude 3.7 Sonnet Extended Thinking Mode',
    shortName: 'Extended Thinking 3.7',
    category: 'productivity',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects', 'web'],
    badge: 'Reasoning Engine',
    isTrending: true,
    trendingRank: 2,
    trendingReason: 'Nuovo paradigma di ragionamento ibrido Anthropic: fino a 64k token di catena di pensiero per problemi complessi',
    shortDescription: 'Configurazione del budget di ragionamento profondo (Extended Thinking) per pianificazione architetturale e debugging di algoritmi critici.',
    whatItDoes: [
      'Attiva e calibra il budget di token di pensiero (thinking_budget: 1024 - 32000) in base alla difficoltà del task.',
      'Costringe Claude a condurre una verifica interna passo-passo prima di generare la risposta finale.',
      'Risolve bug complessi di concorrenza, race conditions e ottimizzazioni matematiche complesse.',
      'Fornisce un\'analisi strutturata con ipotesi, verifiche empiriche e selezione della strategia ottima.'
    ],
    whyUseIt: 'Elimina gli errori frettolosi e permette a Claude 3.7 Sonnet di riflettere a fondo su architetture software delicate.',
    whenToAvoid: 'Per compiti semplici come cambiare un colore CSS, piccoli refactoring o risposte rapide da 2 righe.',
    tokenImpact: 'high',
    complexity: 'intermediate',
    toolsProvided: ['Thinking Budget Estimator', 'Self-Critique Loop', 'Decomposition Matrix'],
    samplePrompt: 'Claude, usa Extended Thinking con un budget elevato per progettare il sistema di riconciliazione delle transazioni bancarie.',
    configType: 'system-prompt',
    setupSnippet: `// Configurazione Extended Thinking via Anthropic API o Claude Code:
{
  "model": "claude-3-7-sonnet-20250219",
  "max_tokens": 16000,
  "thinking": {
    "type": "enabled",
    "budget_tokens": 8000
  }
}`,
    tags: ['extended thinking', 'ragionamento', 'claude 3.7', 'sonnet', 'deep research', 'pensiero', 'tendenza'],
    recommendedFor: ['ragionamento profondo', 'architettura complessa', 'algoritmi', 'claude 3.7', 'debugging critico'],
    synergySkills: ['claude-code-cli', 'mcp-core-protocol']
  },
  {
    id: 'mcp-core-protocol',
    name: 'Model Context Protocol (MCP) Standard & Architecture',
    shortName: 'MCP Protocol Standard',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'Open Standard',
    isTrending: true,
    trendingRank: 3,
    trendingReason: 'Lo standard open-source universale creato da Anthropic per connettere LLM a qualsiasi tool e dato aziendale',
    shortDescription: 'Guida all\'architettura Model Context Protocol: configurazione di server stdio/SSE, autorizzazione sicura e composizione di tool.',
    whatItDoes: [
      'Insegna la struttura dei file claude_desktop_config.json e le regole di sicurezza per server locali e remoti.',
      'Permette a Claude di scoprire dinamicamente gli strumenti disponibili (tools discovery) e i template di prompt.',
      'Gestisce il ciclo di vita delle connessioni JSON-RPC 2.0 tramite stdio o Server-Sent Events (SSE).',
      'Assicura la protezione dei dati limitando l\'accesso ai soli percorsi autorizzati.'
    ],
    whyUseIt: 'È l\'infrastruttura fondamentale su cui si basano tutte le integrazioni moderne di Claude con database, browser, terminale e file.',
    whenToAvoid: 'Se non colleghi Claude a nessun tool o servizio esterno.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['MCP Config Builder', 'JSON-RPC Validator', 'Server Composition Pattern'],
    samplePrompt: 'Claude, guidami nella configurazione del file claude_desktop_config.json per abilitare Postgres, Brave Search e il Filesystem locale.',
    configType: 'mcp-json',
    setupSnippet: `// claude_desktop_config.json:
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost:5432/db"]
    }
  }
}`,
    tags: ['mcp', 'protocol', 'anthropic', 'standard', 'server', 'desktop', 'tendenza'],
    recommendedFor: ['mcp', 'model context protocol', 'configurazione mcp', 'claude desktop', 'tools'],
    synergySkills: ['mcp-filesystem', 'mcp-postgres', 'mcp-brave-search']
  },
  {
    id: 'anthropic-computer-use',
    name: 'Anthropic Computer Use API (Mouse, Tastiera, Schermo)',
    shortName: 'Computer Use API',
    category: 'productivity',
    platforms: ['claude-code', 'claude-desktop'],
    badge: 'Vision & Control',
    isTrending: true,
    trendingRank: 4,
    trendingReason: 'Capacità rivoluzionaria di Anthropic: Claude guarda lo schermo del PC, muove il mouse e scrive sulla tastiera',
    shortDescription: 'Integrazione ufficiale Computer Use: coordinate di coordinate dello schermo, screenshot live, input tastiera e testing end-to-end.',
    whatItDoes: [
      'Permette a Claude di osservare l\'interfaccia grafica tramite screenshot catturati a risoluzione nativa.',
      'Muove il cursore (mouse_move), esegue click (left_click, right_click) e trascinamenti (drag).',
      'Digita testi e combinazioni di tasti speciali su qualsiasi applicazione desktop o browser.',
      'Valida il comportamento di bottoni, finestre modali e animazioni direttamente in ambiente reale.'
    ],
    whyUseIt: 'Consente a Claude di collaudare le tue applicazioni web esattamente come farebbe un utente umano, individuando glitch grafici impossibili da trovare solo leggendo il codice.',
    whenToAvoid: 'Task che richiedono solo elaborazione di dati testuali o script di backend senza interfaccia grafica.',
    tokenImpact: 'high',
    complexity: 'advanced',
    toolsProvided: ['Screen Coordinate Mapper', 'Action Dispatcher', 'Visual Assertion Engine'],
    samplePrompt: 'Claude, fai un test interattivo di Computer Use sulla pagina di login: compila i campi, clicca Invio e verifica che appaia la dashboard.',
    configType: 'skill-file',
    setupSnippet: `// Schema Computer Use Tool:
{
  "type": "computer_20241022",
  "name": "computer",
  "display_width_px": 1024,
  "display_height_px": 768,
  "display_number": 1
}`,
    tags: ['computer use', 'visione', 'mouse', 'tastiera', 'screenshot', 'automazione gui', 'anthropic', 'tendenza'],
    recommendedFor: ['computer use', 'controllo mouse', 'screenshot', 'test ui', 'automazione browser'],
    synergySkills: ['mcp-puppeteer', 'unit-testing']
  },
  {
    id: 'mcp-postgres',
    name: 'MCP PostgreSQL & Neon Database Inspector',
    shortName: 'MCP Postgres DB',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    isTrending: true,
    trendingRank: 5,
    trendingReason: 'Server MCP più scaricato al mondo: permette a Claude di interrogare database SQL ed esaminare schemi in tempo reale',
    shortDescription: 'Connessione diretta tra Claude e database PostgreSQL/Neon per esplorare tabelle, eseguire query di sola lettura e ottimizzare indici.',
    whatItDoes: [
      'Estrae l\'elenco completo delle tabelle, colonne, indici e vincoli relazionali del tuo database.',
      'Esegue query di selezione per diagnosticare incongruenze o analizzare dati reali.',
      'Genera piani EXPLAIN ANALYZE per trovare colli di bottiglia e consigliare indici mancanti.',
      'Permette a Claude di scrivere codice ORM con precisione millimetrica conoscendo la struttura reale del DB.'
    ],
    whyUseIt: 'Dimentica di copiare a mano gli schemi SQL nelle chat: Claude visualizza e interroga il database in tempo reale.',
    whenToAvoid: 'Database di produzione senza account di sola lettura protetto.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['query', 'list_tables', 'describe_table'],
    samplePrompt: 'Claude, connettiti a Postgres tramite MCP, elenca le 5 query più pesanti e proponi gli indici per velocizzarle.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/dbname"]
    }
  }
}`,
    tags: ['mcp', 'postgres', 'sql', 'database', 'neon', 'schema', 'tendenza'],
    recommendedFor: ['mcp postgres', 'database reale', 'query sql', 'analisi db', 'postgres mcp', 'neon'],
    synergySkills: ['postgres-drizzle', 'mcp-filesystem']
  },
  {
    id: 'mcp-puppeteer',
    name: 'MCP Puppeteer Interactive Browser & Vision',
    shortName: 'MCP Puppeteer Browser',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    isTrending: true,
    trendingRank: 6,
    trendingReason: 'Browser Chromium automatizzato per far navigare Claude sul web, scattare screenshot e ispezionare il DOM',
    shortDescription: 'Consente a Claude di aprire pagine web locali o remote, scattare screenshot, compilare form e leggere la console del browser.',
    whatItDoes: [
      'Apre qualsiasi URL (ad es. http://localhost:3000) e cattura screenshot dell\'interfaccia utente.',
      'Simula interazioni (click, scroll, compilazione campi, hover).',
      'Intercetta errori JavaScript nella console ed errori di rete 404/500.',
      'Verifica visivamente il risultato delle modifiche CSS/HTML senza richiedere l\'intervento manuale.'
    ],
    whyUseIt: 'Consente a Claude di visualizzare con i propri occhi il sito che sta programmando e risolvere autonomamente i problemi di stile.',
    whenToAvoid: 'Progetti puramente backend o CLI che non hanno alcun frontend web.',
    tokenImpact: 'high',
    complexity: 'advanced',
    toolsProvided: ['puppeteer_navigate', 'puppeteer_screenshot', 'puppeteer_click', 'puppeteer_fill'],
    samplePrompt: 'Claude, apri http://localhost:3000 con Puppeteer, cattura uno screenshot della navbar e controlla se ci sono errori.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}`,
    tags: ['mcp', 'puppeteer', 'browser', 'screenshot', 'visione', 'testing ui', 'tendenza'],
    recommendedFor: ['puppeteer', 'screenshot', 'ispezione visiva', 'browser mcp', 'testing'],
    synergySkills: ['tailwind-ui', 'unit-testing']
  },
  {
    id: 'mcp-brave-search',
    name: 'MCP Brave & Web Search Grounding',
    shortName: 'MCP Live Web Search',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    isTrending: true,
    trendingRank: 7,
    trendingReason: 'Ricerche web live ad alta affidabilità per consultare documentazione software aggiornata e changelog ufficiali',
    shortDescription: 'Abilita ricerche in tempo reale su Brave Search per consultare documentazione recentissima, API appena pubblicate e correzioni di bug.',
    whatItDoes: [
      'Esegue query di ricerca sul web per trovare documentazione appena rilasciata.',
      'Supera i limiti della data di taglio dell\'addestramento per versioni software recenti (es. Tailwind v4, React 19).',
      'Trova soluzioni a bug ed errori insoliti dai changelog e dai forum di sviluppatori.',
      'Fornisce citazioni e link esatti alle fonti per massima verificabilità.'
    ],
    whyUseIt: 'Elimina le allucinazioni sulle librerie che sono cambiate recentemente, garantendo che Claude usi sempre le API più moderne.',
    whenToAvoid: 'Se il progetto usa uno stack classico immutato da anni.',
    tokenImpact: 'medium',
    complexity: 'beginner',
    toolsProvided: ['brave_web_search', 'brave_local_search'],
    samplePrompt: 'Claude, cerca sul web le ultime novità di Next.js App Router e la sintassi corretta per le Server Actions.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}`,
    tags: ['mcp', 'web search', 'ricerca web', 'brave', 'documentazione', 'tendenza'],
    recommendedFor: ['ricerca web', 'documentazione aggiornata', 'librerie recenti', 'mcp search'],
    synergySkills: ['mcp-puppeteer', 'mcp-filesystem']
  },
  {
    id: 'mcp-memory',
    name: 'MCP Persistent Knowledge Graph & Memory',
    shortName: 'MCP Memory Graph',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    isTrending: true,
    trendingRank: 8,
    trendingReason: 'Memoria persistente a lungo termine: Claude ricorda le tue convenzioni e decisioni di design tra chat diverse',
    shortDescription: 'Grafico della conoscenza locale che memorizza preferenze, regole architetturali e decisioni aziendali attraverso molteplici sessioni.',
    whatItDoes: [
      'Salva entità, relazioni e osservazioni in un database a grafo locale sul tuo computer.',
      'Permette a Claude di ricordare convenzioni di stile, librerie preferite e vincoli tra sessioni differenti.',
      'Evita di dover ripetere il contesto del team all\'inizio di ogni nuova conversazione.',
      'Costruisce nel tempo una mappa coerente dell\'architettura del tuo software.'
    ],
    whyUseIt: 'Trasforma Claude in un compagno di lavoro che cresce con il progetto e non dimentica le scelte concordate.',
    whenToAvoid: 'Chat usa-e-getta o domande generiche non correlate a progetti a lungo termine.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['create_entities', 'read_graph', 'search_nodes', 'create_relations'],
    samplePrompt: 'Claude, memorizza nel knowledge graph che per le date usiamo sempre il formato ISO-8601 UTC.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}`,
    tags: ['mcp', 'memory', 'memoria', 'knowledge graph', 'persistenza', 'regole', 'tendenza'],
    recommendedFor: ['memoria', 'ricordare preferenze', 'knowledge graph', 'lungo termine', 'mcp memory'],
    synergySkills: ['mcp-filesystem', 'claude-code-cli']
  },
  {
    id: 'mcp-github',
    name: 'MCP GitHub Server (Issues, Pull Requests & Code Search)',
    shortName: 'MCP GitHub Server',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    isTrending: true,
    trendingRank: 9,
    trendingReason: 'Integrazione ufficiale GitHub: Claude crea PR, revisiona diff di codice e commenta issue direttamente dalla chat',
    shortDescription: 'Integrazione diretta con repository GitHub per cercare funzioni nell\'organizzazione, gestire issue, creare Pull Request e analizzare commit.',
    whatItDoes: [
      'Permette a Claude di cercare codice, simboli e file attraverso tutti i repository della tua organizzazione GitHub.',
      'Crea, commenta e chiude Issue e Pull Request con note di rilascio e descrizioni accurate.',
      'Legge file da branch remoti senza dover effettuare un checkout locale.',
      'Esegue revisioni di codice automatizzate su diff complessi.'
    ],
    whyUseIt: 'Automatizza il ciclo di lavoro: Claude legge una issue, implementa la modifica e invia la Pull Request pronta per il merge.',
    whenToAvoid: 'Progetti offline senza repository Git su GitHub.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['search_repositories', 'create_issue', 'create_pull_request', 'get_file_contents'],
    samplePrompt: 'Claude, leggi la issue #89 su GitHub, implementa il fix e apri una pull request con la descrizione del cambiamento.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_GITHUB_TOKEN>"
      }
    }
  }
}`,
    tags: ['mcp', 'github', 'git', 'pr', 'pull request', 'issue', 'repository', 'tendenza'],
    recommendedFor: ['github', 'mcp github', 'issue', 'pull request', 'code review', 'git'],
    synergySkills: ['mcp-filesystem', 'github-actions']
  },
  {
    id: 'anthropic-metaprompt',
    name: 'Anthropic Metaprompting & XML System Architect',
    shortName: 'Metaprompt Architect',
    category: 'productivity',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects', 'web'],
    badge: 'Prompt Engineering',
    isTrending: true,
    trendingRank: 10,
    trendingReason: 'La metodologia ufficiale di Anthropic per creare system prompt perfetti usando tag XML e zero allucinazioni',
    shortDescription: 'Tecniche formali di prompt engineering per Claude: strutturazione XML semantica (<context>, <instructions>, <rules>), few-shot e vincoli stringenti.',
    whatItDoes: [
      'Struttura i prompt con tag XML chiari per separare istruzioni, contesto, vincoli ed esempi di output.',
      'Elimina le allucinazioni forzando Claude a citare passaggi esatti prima di formulare conclusioni.',
      'Definisce formati di risposta rigorosi (JSON schemas, Markdown pulito, CSV).',
      'Calibra il tono, la concisione e la precisione tecnica delle risposte.'
    ],
    whyUseIt: 'Migliora la qualità e l\'affidabilità delle risposte di Claude del 300% rispetto a prompt discorsivi generici.',
    whenToAvoid: 'Per chat casuali di una sola frase.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['XML Schema Formatter', 'Few-Shot Template Engine', 'Anti-Hallucination Guard'],
    samplePrompt: 'Claude, genera un system prompt usando tag XML per un assistente finanziario con vincoli severi su calcoli e fonti.',
    configType: 'system-prompt',
    setupSnippet: `// Struttura System Prompt Anthropic con XML:
<role>Sei un Senior Architect specializzato in Claude AI e MCP.</role>
<context>Il progetto è un'applicazione ad alta sicurezza con React e PostgreSQL.</context>
<rules>
  - Rispondi sempre in formato JSON convalidate.
  - Non usare mai librerie deprecate.
  - Cita la motivazione di ogni scelta architetturale.
</rules>`,
    tags: ['prompt engineering', 'metaprompt', 'xml', 'system prompt', 'anthropic', 'tendenza'],
    recommendedFor: ['prompt engineering', 'system prompt', 'xml tags', 'istruzioni precise', 'zero allucinazioni'],
    synergySkills: ['claude-code-cli', 'claude-extended-thinking']
  },

  // ==========================================
  // CLOUD, MCP CONNECTORS & PRODUCTIVITY
  // ==========================================
  {
    id: 'mcp-filesystem',
    name: 'MCP Filesystem Server (Accesso File Locale)',
    shortName: 'MCP Filesystem',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    shortDescription: 'Permette a Claude di leggere, modificare e creare file e cartelle direttamente sul tuo computer con piena sicurezza.',
    whatItDoes: [
      'Fornisce a Claude gli strumenti per esplorare la directory del progetto, leggere codice e applicare modifiche.',
      'Permette la ricerca di file tramite pattern glob e la lettura mirata di specifici intervalli di righe.',
      'Scrive file di configurazione, documentazione o codice direttamente nella cartella di lavoro.',
      'Garantisce accesso sicuro delimitato esclusivamente alle cartelle consentite dall\'utente.'
    ],
    whyUseIt: 'È la skill e il protocollo fondamentale per trasformare Claude da un semplice generatore di testo in un vero programmatore che lavora sui tuoi file.',
    whenToAvoid: 'Se stai usando solo la chat web di Claude senza Claude Desktop o Claude Code locale.',
    tokenImpact: 'medium',
    complexity: 'beginner',
    toolsProvided: ['read_file', 'write_file', 'list_directory', 'directory_tree', 'search_files'],
    samplePrompt: 'Claude, leggi il file package.json e crea un nuovo file README.md documentando tutti i comandi disponibili.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/percorso/del/tuo/progetto"]
    }
  }
}`,
    tags: ['mcp', 'filesystem', 'file', 'desktop', 'locale', 'strumenti'],
    recommendedFor: ['mcp', 'file', 'locale', 'desktop', 'lettura file', 'modifica file', 'cartelle'],
    synergySkills: ['mcp-github', 'claude-code-cli']
  },
  {
    id: 'mcp-slack-discord',
    name: 'MCP Slack & Discord Notifications Server',
    shortName: 'MCP Slack & Discord',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    shortDescription: 'Consente a Claude di inviare notifiche, messaggi formattati e report automatici su canali Slack e server Discord.',
    whatItDoes: [
      'Invia alert istantanei ai canali aziendali al termine di lunghe compilazioni o test automatici.',
      'Posta sintesi giornaliere, changelog di versione o notifiche di release su Slack.',
      'Formatta messaggi con blocchi ricchi (Slack Blocks Kit o Discord Embeds).',
      'Supporta bot interattivi che rispondono a menzioni nei canali del team.'
    ],
    whyUseIt: 'Collega i risultati dell\'agente Claude al luogo di lavoro dove il team collabora quotidianamente.',
    whenToAvoid: 'Progetti personali one-off senza team di collaborazione.',
    tokenImpact: 'low',
    complexity: 'beginner',
    toolsProvided: ['post_slack_message', 'post_discord_webhook', 'send_alert_channel'],
    samplePrompt: 'Claude, invia un messaggio formattato nel canale Slack #releases con il changelog delle ultime modifiche.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "<YOUR_SLACK_BOT_TOKEN>"
      }
    }
  }
}`,
    tags: ['mcp', 'slack', 'discord', 'notifiche', 'chat', 'bot', 'comunicazione'],
    recommendedFor: ['slack', 'discord', 'notifiche team', 'mcp slack', 'collaborazione'],
    synergySkills: ['mcp-github', 'claude-code-cli']
  },
  {
    id: 'mcp-google-workspace',
    name: 'MCP Google Workspace & Drive Server',
    shortName: 'MCP Google Workspace',
    category: 'mcp',
    platforms: ['claude-desktop', 'claude-code'],
    badge: 'MCP Protocol',
    shortDescription: 'Integrazione diretta con Google Drive, Documenti, Fogli di calcolo (Sheets) e Gmail per sincronizzazione dati.',
    whatItDoes: [
      'Cerca e legge documenti e fogli di calcolo archiviati su Google Drive.',
      'Compila tabelle su Google Sheets con dati aggregati o risultati di elaborazioni.',
      'Sincronizza bozze e riepiloghi in Documenti Google pronti per la condivisione con stakeholder.',
      'Opera con OAuth client sicuro e permessi granulari.'
    ],
    whyUseIt: 'Permette a Claude di attingere direttamente ai documenti aziendali e aggiornare fogli di calcolo senza esportare file a mano.',
    whenToAvoid: 'Se il team non utilizza la suite Google Workspace.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['read_sheet', 'write_sheet_row', 'search_drive_files', 'get_doc_content'],
    samplePrompt: 'Claude, leggi le righe del foglio Google Sheets "Preventivi 2025" e genera un report con i totali per cliente.',
    configType: 'mcp-json',
    setupSnippet: `{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-workspace"],
      "env": {
        "GOOGLE_WORKSPACE_CREDENTIALS": "<PATH_TO_CREDENTIALS_JSON>"
      }
    }
  }
}`,
    tags: ['mcp', 'google drive', 'sheets', 'docs', 'workspace', 'documenti'],
    recommendedFor: ['google drive', 'fogli google', 'sheets', 'workspace', 'documenti aziendali'],
    synergySkills: ['pandas-numpy', 'doc-extraction']
  },

  // ==========================================
  // FRONTEND, UI & DESIGN
  // ==========================================
  {
    id: 'tailwind-ui',
    name: 'Modern Tailwind CSS & UI Design System',
    shortName: 'Tailwind Design System',
    category: 'frontend',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects', 'web'],
    badge: 'UI & Styling',
    shortDescription: 'Regole per interfacce pulite in stile Claude/Anthropic: zero-pill discipline, contrasti WCAG e tipografia raffinata.',
    whatItDoes: [
      'Impedisce a Claude di produrre design "AI Slop" generico con troppi gradienti viola o pulsanti a pillola.',
      'Imposta scale tipografiche coerenti, ritmo verticale modulare e spacing a 4/8pt.',
      'Include supporto nativo dark/light mode con classi semantiche Tailwind v4 / v3.',
      'Ottimizza stati hover, focus-visible, active e layout responsive mobile-first.'
    ],
    whyUseIt: 'Fornisce un look and feel caldo, editoriale e distintivo da SaaS di alto livello.',
    whenToAvoid: 'Se stai sviluppando un\'applicazione puramente console/CLI o backend headless senza frontend.',
    tokenImpact: 'low',
    complexity: 'beginner',
    toolsProvided: ['Design System Tokens', 'Accessible Color Palettes', 'Responsive Grid Patterns'],
    samplePrompt: 'Claude, disegna una dashboard SaaS con layout a sidebar, tabelle dense ed estetica minimal moderna.',
    configType: 'claude-md',
    setupSnippet: `// Nel tuo CLAUDE.md:
## Frontend Design Constitution
- Usa Tailwind CSS con contrasti decisi e tipografia sans-serif geometrica o serif calda.
- Evita pill-shaped badges ovunque; preferisci micro-tag rettangolari con bordi definiti.
- Assicura supporto completo a viewport mobile (390px) e desktop (1440px).`,
    tags: ['tailwind', 'css', 'ui', 'ux', 'responsive', 'dark-mode', 'design', 'anthropic style'],
    recommendedFor: ['frontend', 'react', 'nextjs', 'vue', 'dashboard', 'saas', 'landing', 'css', 'tailwind', 'interfaccia'],
    synergySkills: ['a11y-audit', 'react-perf']
  },
  {
    id: 'react-perf',
    name: 'React 19 & Architecture Optimizer',
    shortName: 'React 19 Architecture',
    category: 'frontend',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Performance',
    shortDescription: 'Best practice per React 19, Server Components, Concurrent Mode e gestione dello stato senza memory leak.',
    whatItDoes: [
      'Guida Claude nell\'uso corretto degli hook moderni di React (useActionState, useOptimistic, useTransition).',
      'Previene ri-render inutili tramite scomposizione granulare e isolamento dello stato.',
      'Organizza la cartella /components per feature e separa la logica pura in custom hooks riutilizzabili.',
      'Gestisce correttamente cleanup di effetti, WebSocket e cancellazione di chiamate fetch asincrone.'
    ],
    whyUseIt: 'Garantisce che il codice React scritto da Claude sia privo di memory leak e pattern obsoleti.',
    whenToAvoid: 'Se il progetto usa Vue, Svelte, Angular o vanilla JavaScript.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['Component Scaffolders', 'Performance Profiling Rules', 'State Decoupler'],
    samplePrompt: 'Claude, rifattorizza questo componente React gigante separando la logica di fetching e la gestione stato.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/react-perf.md:
- Preferisci custom hooks per isolare logica e side-effects.
- Utilizza React 19 useActionState e useOptimistic per interazioni veloci.
- Evita inline object creation nei dependency array di useEffect.`,
    tags: ['react', 'react 19', 'performance', 'hooks', 'typescript', 'frontend'],
    recommendedFor: ['react', 'next.js', 'nextjs', 'spa', 'vite', 'typescript frontend'],
    synergySkills: ['tailwind-ui', 'unit-testing']
  },
  {
    id: 'a11y-audit',
    name: 'Web Accessibility & WCAG Standards',
    shortName: 'Accessibility WCAG',
    category: 'frontend',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Accessibility',
    shortDescription: 'Accessibilità nativa, alberi semantici ARIA, navigazione da tastiera e compatibilità screen-reader.',
    whatItDoes: [
      'Garantisce che ogni bottone, link e input abbia un etichetta semantica accessibile (aria-label o etichetta visibile).',
      'Assicura navigazione completa da tastiera con focus ring chiari e gestione del tabIndex.',
      'Permette agli strumenti di automazione e testing (come Playwright o Puppeteer) di interagire facilmente con l\'albero DOM.',
      'Valida i rapporti di contrasto del testo rispetto allo sfondo secondo le linee guida WCAG 2.1 AA.'
    ],
    whyUseIt: 'Rende l\'app inclusiva e conforme alle leggi, e rende i test automatizzati di Claude incredibilmente più stabili.',
    whenToAvoid: 'Script di utilità interna o prototipi rapidi one-off senza interfaccia utente finale.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['ARIA Checker', 'Keyboard Trap Preventer', 'Contrast Ratio Validator'],
    samplePrompt: 'Claude, verifica l\'accessibilità di questo form modale e assicurati che si possa chiudere con Escape.',
    configType: 'claude-md',
    setupSnippet: `// In CLAUDE.md:
## Accessibility Standards
- Usa elementi semantici nativi (<button>, <input>, <nav>, <dialog>) invece di div cliccabili.
- Ogni pulsante con solo icona deve avere aria-label univoco.
- Mantieni gli anelli di focus visibili (:focus-visible).`,
    tags: ['a11y', 'accessibility', 'wcag', 'aria', 'tastiera', 'screen reader'],
    recommendedFor: ['accessibilità', 'a11y', 'wcag', 'form', 'modal', 'pubblico'],
    synergySkills: ['tailwind-ui', 'unit-testing']
  },
  {
    id: 'threejs-3d',
    name: 'Three.js 3D Interactive WebGL Engine',
    shortName: 'Three.js 3D WebGL',
    category: 'frontend',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: '3D Graphics',
    shortDescription: 'Guida procedurale per creare scene 3D WebGL fluide, modelli compositi PBR e controlli ergonomici.',
    whatItDoes: [
      'Insegna a Claude come assemblare modelli 3D compositi (da 3 a 12 parti distinte) senza primitive banali singole.',
      'Configura illuminazione da studio PBR con RoomEnvironment, PMREMGenerator e ACESFilmicToneMapping.',
      'Gestisce il fallback software WebGL (SwiftShader) per evitare lag su CPU headless.',
      'Garantisce 60fps costanti, smorzamento esponenziale (damped camera) e dock comandi richiudibile.'
    ],
    whyUseIt: 'Essenziale se vuoi creare configuratori 3D, grafici dimensionali interattivi o showcase di prodotti immersivi.',
    whenToAvoid: 'Non necessaria se la tua web app ha unicamente tabelle, dashboard 2D standard o testi.',
    tokenImpact: 'medium',
    complexity: 'advanced',
    toolsProvided: ['WebGL Setup Helper', 'PBR Material Generators', 'Procedural Textures', 'Camera Damping Math'],
    samplePrompt: 'Claude, crea una scena Three.js con un nucleo tecnologico rotante, materiali metallici PBR e dock comandi in basso.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/threejs.md:
### Three.js Guidelines:
- Usa sempre modelli compositi (3-12 parti) assemblati in un THREE.Group.
- Inizializza RoomEnvironment con PMREMGenerator per riflessioni metalliche realistiche.
- Pre-alloca vettori matematici fuori dal loop requestAnimationFrame.`,
    tags: ['three.js', 'webgl', '3d', 'canvas', 'pbr', 'shader', 'animazioni'],
    recommendedFor: ['3d', 'threejs', 'three.js', 'webgl', 'grafica 3d', 'visualizzatore', 'render'],
    synergySkills: ['tailwind-ui', 'unit-testing']
  },

  // ==========================================
  // BACKEND, APIS & ARCHITECTURE
  // ==========================================
  {
    id: 'rest-fastapi',
    name: 'FastAPI / Express Clean Architecture',
    shortName: 'Clean REST API',
    category: 'backend',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Backend Architecture',
    shortDescription: 'Architettura REST modulare, validazione dati, gestione centralizzata degli errori e documentazione OpenAPI.',
    whatItDoes: [
      'Struttura le API in livelli chiari: Controller / Route -> Service Layer -> Repository / Data Layer.',
      'Applica validazione rigorosa dei parametri di input tramite Pydantic (Python) o Zod / TypeBox (TypeScript).',
      'Implementa middleware di logging, rate limiting, CORS e gestione unificata delle eccezioni HTTP.',
      'Genera documentazione Swagger/OpenAPI automatica con tipizzazione sincronizzata.'
    ],
    whyUseIt: 'Impedisce a Claude di scrivere enormi funzioni monolitiche in un singolo file di route, rendendo le API pulite e manutenibili.',
    whenToAvoid: 'Se stai costruendo un semplice script da riga di comando o un\'app statica senza server.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['Schema Validator', 'Service Layer Scaffold', 'Unified Error Middleware'],
    samplePrompt: 'Claude, crea gli endpoint REST per l\'autenticazione utente e la gestione tenant seguendo la Clean Architecture.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/rest-api.md:
- Separa sempre la logica di business dalle route Express/FastAPI.
- Valida il body di ogni richiesta con Zod o Pydantic prima di procedere.
- Ritorna formati di errore standardizzati con codice, messaggio e dettagli.`,
    tags: ['rest', 'api', 'express', 'fastapi', 'backend', 'node', 'python', 'zod'],
    recommendedFor: ['backend', 'api', 'fastapi', 'express', 'server', 'node.js', 'rest', 'microservizi', 'endpoint'],
    synergySkills: ['postgres-drizzle', 'owasp-security']
  },
  {
    id: 'postgres-drizzle',
    name: 'PostgreSQL & Drizzle / Prisma ORM',
    shortName: 'Postgres & ORM',
    category: 'database',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Database',
    shortDescription: 'Progettazione schemi relazionali, migrazioni sicure, indici performanti e query type-safe.',
    whatItDoes: [
      'Progetta schemi normalizzati con chiavi primarie UUID o BigInt, vincoli di integrità e foreign key corrette.',
      'Genera migrazioni Drizzle o Prisma senza perdita di dati (up/down migrations).',
      'Ottimizza le query con JOIN appropriati ed evita il temuto problema N+1.',
      'Suggerisce indici su colonne ad alta cardinalità utilizzate in clausole WHERE o ORDER BY.'
    ],
    whyUseIt: 'Garantisce database robusti, relazioni corrette e query che non mandano in crash il server quando il volume dati cresce.',
    whenToAvoid: 'Se usi database puramente documentali o storage key-value in memoria.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['Schema Migration Generator', 'Query Plan Explainer', 'Index Optimizer'],
    samplePrompt: 'Claude, disegna lo schema del database con tabelle users, organizations e subscriptions usando Drizzle ORM.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/database.md:
- Definisci sempre relazioni esplicite e vincoli onDelete: cascade dove opportuno.
- Aggiungi indici compositi su filtri frequenti.
- Esegui migrazioni sempre tramite script dedicati, mai alter table al volo in produzione.`,
    tags: ['postgres', 'postgresql', 'drizzle', 'prisma', 'sql', 'database', 'migrazioni'],
    recommendedFor: ['database', 'sql', 'postgres', 'postgresql', 'drizzle', 'prisma', 'orm', 'tabelle', 'dati relazionali'],
    synergySkills: ['rest-fastapi', 'redis-caching']
  },
  {
    id: 'redis-caching',
    name: 'Redis Cache & Session Management',
    shortName: 'Redis Caching & Queues',
    category: 'database',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Caching & Speed',
    shortDescription: 'Strategie di cache distribuita (Cache-Aside, Write-Through), rate limiting a token bucket e code BullMQ.',
    whatItDoes: [
      'Imposta pattern Cache-Aside con TTL intelligenti e invalidazione su mutazione dati.',
      'Protegge le API da abusi implementando rate limiter scorrevoli basati su IP o utente.',
      'Gestisce sessioni utente veloci e distribuisce job asincroni pesanti tramite BullMQ.',
      'Implementa lock distribuiti con Redlock per prevenire condizioni di concorrenza su risorse condivise.'
    ],
    whyUseIt: 'Accelera i tempi di risposta delle API fino a 20x e previene sovraccarichi del database principale.',
    whenToAvoid: 'Applicazioni a basso traffico o prototipi rapidi dove una memoria in-process è sufficiente.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['Cache-Aside Helper', 'Rate Limiter Middleware', 'Queue Worker Boilerplate'],
    samplePrompt: 'Claude, implementa un middleware di rate limiting con Redis per proteggere l\'endpoint di generazione AI da 10 req/min.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/redis.md:
- Imposta sempre un TTL di scadenza su ogni chiave salvata in Redis.
- Usa chiavi con prefisso logico (es: "cache:user:123").
- Usa pipeline o transazioni MULTI per operazioni atomiche.`,
    tags: ['redis', 'cache', 'rate limiting', 'sessioni', 'code', 'bullmq', 'performance'],
    recommendedFor: ['redis', 'caching', 'rate limiting', 'code di lavoro', 'sessioni', 'velocità'],
    synergySkills: ['rest-fastapi', 'postgres-drizzle']
  },

  // ==========================================
  // AI, DATA SCIENCE & RAG
  // ==========================================
  {
    id: 'pandas-numpy',
    name: 'Python Pandas, Polars & Data Analysis',
    shortName: 'Pandas & Analytics',
    category: 'ai-data',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Data Science',
    shortDescription: 'Manipolazione vettorializzata di DataFrame, aggregazioni veloci, pulizia dati e calcolo statistico.',
    whatItDoes: [
      'Insegna a Claude a evitare cicli for lenti su DataFrame, usando metodi vettorializzati e groupby ad alte prestazioni.',
      'Pulisce dati sporchi: gestione di valori mancanti (NaN/None), conversioni di tipi di dato, parsing date e fusi orari.',
      'Calcola correlazioni, distribuzioni, medie mobili e metriche aziendali (retention, cohort, LTV).',
      'Supporta esportazioni in formati veloci (Parquet, Arrow, CSV compresso).'
    ],
    whyUseIt: 'Scrive codice di data analysis 100x più veloce ed elegante, evitando le tipiche lentezze nell\'iterazione sui dati.',
    whenToAvoid: 'Se il progetto è focalizzato solo su CSS o sviluppo frontend.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['Vectorized Operation Patterns', 'Data Cleansing Boilerplate', 'Memory Profile Tips'],
    samplePrompt: 'Claude, analizza questo dataset di vendite: raggruppa per mese e categoria e trova i prodotti con margine più alto.',
    configType: 'claude-md',
    setupSnippet: `// In CLAUDE.md:
## Data Science Guidelines
- Non iterare mai su righe con iterrows(). Usa operazioni vettorializzate Pandas o Polars.
- Tipizza le colonne numeriche con float32 o int32 per ridurre il consumo di RAM.`,
    tags: ['pandas', 'numpy', 'polars', 'python', 'data science', 'analytics', 'statistica'],
    recommendedFor: ['data science', 'pandas', 'numpy', 'analisi dati', 'analytics', 'dataset', 'statistiche'],
    synergySkills: ['doc-extraction', 'vector-rag']
  },
  {
    id: 'doc-extraction',
    name: 'Document & PDF Intelligence Extractor',
    shortName: 'PDF & Doc Intelligence',
    category: 'ai-data',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Document Parsing',
    shortDescription: 'Estrazione strutturata di testo, tabelle e metadati da file PDF, DOCX, contratti e fatture.',
    whatItDoes: [
      'Utilizza librerie specializzate per estrarre sia testo grezzo che tabelle strutturate.',
      'Pulisce artefatti visivi, numeri di pagina e intestazioni ripetute dai documenti.',
      'Converte fatture e report in schemi JSON convalidati per l\'archiviazione a database.',
      'Suddivide documenti lunghi in chunk logici con sovrapposizione per pipeline RAG.'
    ],
    whyUseIt: 'Perfetto per costruire assistenti che leggono bandi, contratti, bilanci, fatture o documentazione tecnica.',
    whenToAvoid: 'Progetti che non elaborano documenti esterni o file non strutturati.',
    tokenImpact: 'medium',
    complexity: 'intermediate',
    toolsProvided: ['Table Extractor Snippets', 'Text Chunking Algorithms', 'Invoice Normalizer'],
    samplePrompt: 'Claude, crea un parser per estrarre tabella degli articoli, totale imponibile e IVA da queste fatture PDF.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/document-parser.md:
- Isola le tabelle mantenendo l'allineamento delle colonne.
- Mantieni traccia del numero di pagina di provenienza per ogni paragrafo.`,
    tags: ['pdf', 'documenti', 'estrazione', 'fatture', 'tabelle', 'ocr', 'testo'],
    recommendedFor: ['pdf', 'documenti', 'estrazione testo', 'fatture', 'contratti', 'parser', 'report'],
    synergySkills: ['pandas-numpy', 'vector-rag']
  },
  {
    id: 'vector-rag',
    name: 'Vector Embeddings & Semantic Search (RAG)',
    shortName: 'Vector RAG Engine',
    category: 'ai-data',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'RAG & AI Search',
    shortDescription: 'Strategie di chunking semantico, embedding vettoriali e ricerca ibrida (BM25 + Cosine Similarity).',
    whatItDoes: [
      'Imposta strategie di chunking ottimali con overlap intelligente per non spezzare il contesto.',
      'Integra database vettoriali leggeri o enterprise (ChromaDB, pgvector, Qdrant, Pinecone).',
      'Implementa ricerca ibrida: combina parole chiave esatte e similarità semantica vettoriale.',
      'Applica ri-classificazione (Reranking) per massimizzare la precisione dei risultati forniti a Claude.'
    ],
    whyUseIt: 'Evita allucinazioni collegando Claude alla tua knowledge base privata con risposte precise e citazioni.',
    whenToAvoid: 'Se tutti i tuoi dati stanno comodamente all\'interno della finestra di contesto standard di Claude.',
    tokenImpact: 'high',
    complexity: 'advanced',
    toolsProvided: ['Chunking Engine', 'pgvector Queries', 'Hybrid Search Orchestrator'],
    samplePrompt: 'Claude, progetta una pipeline RAG con PostgreSQL pgvector per indicizzare il manuale aziendale e rispondere con citazioni.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/rag.md:
- Salva sempre metadati (document_id, page, source_url) accanto ai vettori.
- Combina filtri scalari con indici HNSW o IVFFlat in Postgres.
- Includi sempre le fonti nelle risposte per consentire la verifica umana.`,
    tags: ['rag', 'embeddings', 'vettori', 'pgvector', 'ricerca semantica', 'ai', 'knowledge base'],
    recommendedFor: ['rag', 'embeddings', 'ricerca semantica', 'knowledge base', 'vettoriale', 'pgvector'],
    synergySkills: ['postgres-drizzle', 'doc-extraction']
  },
  {
    id: 'playwright-scraping',
    name: 'Playwright Headless Web Scraper & Automation',
    shortName: 'Playwright Scraper',
    category: 'ai-data',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Scraping & Bots',
    shortDescription: 'Scraping robusto di Single Page Application, evasione antibot, estrazione DOM e download file.',
    whatItDoes: [
      'Esegue browser Chromium/Firefox in modalità headless per visualizzare pagine caricate dinamicamente via React/Vue.',
      'Attende selettori critici con wait_for_selector evitando timeout fragili basati su sleep fisse.',
      'Gestisce paginazione infinita, click su tab "Carica altri" e scrolling dinamico.',
      'Estrae tabelle, link e metadati in file JSON o database.'
    ],
    whyUseIt: 'Permette a Claude di estrarre dati da siti web moderni protetti da JavaScript dove le librerie statiche come BeautifulSoup falliscono.',
    whenToAvoid: 'Se il sito target offre API REST o GraphQL pubbliche e documentate.',
    tokenImpact: 'high',
    complexity: 'intermediate',
    toolsProvided: ['Stealth Browser Scaffold', 'Dynamic Pagination Loop', 'Selector Resiliency Checker'],
    samplePrompt: 'Claude, crea uno script Playwright per estrarre l\'elenco dei prodotti con nome, prezzo e disponibilità da questo e-commerce.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/scraping.md:
- Usa sempre waitForSelector con stato 'visible'.
- Imposta User-Agent realistici e viewport standard (1920x1080).
- Salva dati a intervalli regolari per non perdere progressi.`,
    tags: ['playwright', 'scraping', 'web', 'automazione', 'crawler', 'python', 'node'],
    recommendedFor: ['scraping', 'crawler', 'playwright', 'estrazione web', 'dati dinamici'],
    synergySkills: ['pandas-numpy', 'mcp-puppeteer']
  },

  // ==========================================
  // TESTING, QA & SECURITY
  // ==========================================
  {
    id: 'unit-testing',
    name: 'Fast Unit & Integration Testing (node:test / Vitest)',
    shortName: 'Unit & Logic Tests',
    category: 'testing',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Testing & QA',
    shortDescription: 'Test ultra-veloci a feedback immediato per logica pura, funzioni matematiche e trasformazioni dati.',
    whatItDoes: [
      'Insegna a Claude a separare la logica di calcolo e di business dai componenti UI/DOM.',
      'Scrive test deterministici con il runner nativo di Node (node:test e node:assert/strict) o Vitest in millisecondi.',
      'Copre i casi limite (edge cases), valori nulli, array vuoti e input malformati.',
      'Garantisce che nessun refactoring rompa le funzionalità esistenti prima del commit.'
    ],
    whyUseIt: 'Riduce gli errori del 90%, consentendo a Claude di verificare autonomamente il proprio codice senza aprire il browser per ogni modifica.',
    whenToAvoid: 'Nessun motivo valido per evitarlo; raccomandata per qualsiasi progetto di produzione serio!',
    tokenImpact: 'low',
    complexity: 'beginner',
    toolsProvided: ['node:test Runner Snippets', 'Mock Function Helper', 'Assertion Pattern Library'],
    samplePrompt: 'Claude, crea una suite di test unitari con node:test per validare il calcolo delle tasse e gli sconti nel carrello.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/testing.md:
- Scrivi test puri privi di dipendenze DOM per funzioni di calcolo.
- Usa node:test e node:assert/strict per esecuzione istantanea senza build step.
- Verifica sempre: casi limite, input vuoti, stringhe malformate.`,
    tags: ['testing', 'unit test', 'vitest', 'node:test', 'qa', 'qualità', 'assert'],
    recommendedFor: ['test', 'testing', 'unit test', 'vitest', 'qualità', 'bug free', 'refactor'],
    synergySkills: ['claude-code-cli', 'tailwind-ui']
  },
  {
    id: 'owasp-security',
    name: 'OWASP Top 10 Security Guard & JWT Defense',
    shortName: 'OWASP Security Guard',
    category: 'security',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'Security & Audit',
    shortDescription: 'Protezione contro SQL Injection, XSS, CSRF, gestione sicura di cookie HTTP-only e segreti.',
    whatItDoes: [
      'Blocca fughe di chiavi API nel codice client o nei commit Git, raccomandando variabili server-side.',
      'Valida gli input utente contro cross-site scripting (XSS) e iniezioni SQL/NoSQL.',
      'Imposta intestazioni HTTP di sicurezza (Content-Security-Policy, HSTS, X-Frame-Options, Referrer-Policy).',
      'Configura sessioni e token JWT sicuri con flag HttpOnly, SameSite e Secure.'
    ],
    whyUseIt: 'Protegge la tua applicazione da attacchi informatici comuni prima di andare online o subire violazioni di dati.',
    whenToAvoid: 'Solo per prototipi didattici locali non connessi ad alcuna rete o database reale.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['Security Headers Middleware', 'Sanitization Checklist', 'JWT Validator'],
    samplePrompt: 'Claude, fai un audit di sicurezza su questo controller di login e verifica la protezione da attacchi brute force e XSS.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/security.md:
- Non esporre mai chiavi o segreti nel bundle browser.
- Salva token di autenticazione in cookie con flag HttpOnly e SameSite=Lax.
- Sanitizza e valida ogni parametro in ingresso.`,
    tags: ['security', 'sicurezza', 'owasp', 'jwt', 'xss', 'sql injection', 'audit', 'headers'],
    recommendedFor: ['sicurezza', 'security', 'autenticazione', 'auth', 'login', 'jwt', 'owasp', 'audit'],
    synergySkills: ['rest-fastapi', 'postgres-drizzle']
  },

  // ==========================================
  // DEVOPS & CLOUD
  // ==========================================
  {
    id: 'docker-cloudrun',
    name: 'Docker Multi-Stage & Cloud Deployment',
    shortName: 'Docker & Containerization',
    category: 'devops',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'DevOps & Containers',
    shortDescription: 'Dockerfile multi-stage compatti, file .dockerignore rigorosi e configurazioni Cloud Run / ECS / K8s.',
    whatItDoes: [
      'Crea Dockerfile multi-stage con immagini base alpine/distroless inferiori a 100MB.',
      'Configura utenti non-root (security non-root user) per conformità di sicurezza nei container.',
      'Configura health check, variabili d\'ambiente e gestione di segreti di runtime.',
      'Produce manifest per distribuzioni su Google Cloud Run, AWS ECS o Docker Compose.'
    ],
    whyUseIt: 'Garantisce che il software funzioni allo stesso identico modo sul tuo computer e sui server cloud di produzione.',
    whenToAvoid: 'Se utilizzi piattaforme serverless con build automatica gestita.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['Multi-Stage Dockerfile Scaffold', 'Healthcheck Checker', 'Docker Compose Network Setup'],
    samplePrompt: 'Claude, crea un Dockerfile multi-stage per questa app Node.js con utente non-root e immagine base minimale.',
    configType: 'skill-file',
    setupSnippet: `// In .claude/skills/docker.md:
- Separa sempre stage di build da stage di produzione finale.
- Non eseguire mai processi come utente root all'interno del container.
- Escludi node_modules e segreti con un file .dockerignore rigoroso.`,
    tags: ['docker', 'devops', 'cloud', 'container', 'cloud run', 'deployment', 'compose'],
    recommendedFor: ['docker', 'deploy', 'container', 'cloud run', 'devops', 'produzione'],
    synergySkills: ['github-actions', 'rest-fastapi']
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions CI/CD Pipeline Architect',
    shortName: 'GitHub Actions CI/CD',
    category: 'devops',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects'],
    badge: 'CI/CD Automation',
    shortDescription: 'Workflow automatici per test su ogni PR, caching delle dipendenze, analisi statica e deploy continuo.',
    whatItDoes: [
      'Configura pipeline che eseguono automaticamente lint, typecheck e test unitari ad ogni push o pull request.',
      'Imposta il caching intelligente di npm o pip per dimezzare i tempi di esecuzione della pipeline.',
      'Gestisce il deploy automatico in ambienti di staging e produzione con approvazioni manuali opzionali.',
      'Blocca il merge di codice rotto o insicuro sul ramo principale (main).'
    ],
    whyUseIt: 'Permette a Claude e al tuo team di fare commit con fiducia, sapendo che ogni regressione verrà intercettata all\'istante.',
    whenToAvoid: 'Progetti one-off senza repository Git remoto.',
    tokenImpact: 'low',
    complexity: 'intermediate',
    toolsProvided: ['Workflow YAML Scaffold', 'Dependency Cache Keys', 'Release Pipeline Matrix'],
    samplePrompt: 'Claude, scrivi una GitHub Action che esegue test, build e lint in parallelo su ogni Pull Request verso main.',
    configType: 'skill-file',
    setupSnippet: `# .github/workflows/ci.yml:
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build`,
    tags: ['ci/cd', 'github actions', 'automazione', 'pipeline', 'devops', 'deploy'],
    recommendedFor: ['github actions', 'ci/cd', 'pipeline', 'automazione test', 'deploy continuo'],
    synergySkills: ['unit-testing', 'docker-cloudrun']
  },
  {
    id: 'seo-opengraph',
    name: 'Claude Modern SEO & OpenGraph Social Cards',
    shortName: 'SEO & OpenGraph Cards',
    category: 'frontend',
    platforms: ['claude-code', 'claude-desktop', 'claude-projects', 'web'],
    badge: 'SEO & Growth',
    shortDescription: 'Meta tag dinamici, schede OpenGraph / Twitter Cards, dati strutturati Schema.org (JSON-LD) e sitemap.',
    whatItDoes: [
      'Genera meta tag HTML completi (<title>, <meta description>, og:image, twitter:card).',
      'Configura schede di condivisione social ad alto impatto per LinkedIn, X e WhatsApp.',
      'Crea markup Schema.org JSON-LD per rich snippet su Google (SoftwareApplication, Article, FAQ).',
      'Assicura canonical URL corretti ed evita problemi di contenuti duplicati.'
    ],
    whyUseIt: 'Massimizza il posizionamento sui motori di ricerca e rende i link della tua app accattivanti quando condivisi sui social.',
    whenToAvoid: 'Applicazioni interne ad uso privato protette da login.',
    tokenImpact: 'low',
    complexity: 'beginner',
    toolsProvided: ['JSON-LD Generator', 'OpenGraph Validator', 'Sitemap Builder'],
    samplePrompt: 'Claude, genera i meta tag SEO e Schema.org JSON-LD per la landing page della nostra applicazione SaaS.',
    configType: 'claude-md',
    setupSnippet: `// Nel tag <head> o nel layout Next.js:
<title>Titolo Ottimizzato — Brand</title>
<meta name="description" content="Descrizione accattivante entro 155 caratteri." />
<meta property="og:title" content="Titolo Ottimizzato — Brand" />
<meta property="og:image" content="https://example.com/og-banner.png" />
<meta name="twitter:card" content="summary_large_image" />`,
    tags: ['seo', 'opengraph', 'social cards', 'schema.org', 'json-ld', 'marketing'],
    recommendedFor: ['seo', 'opengraph', 'social', 'condivisione', 'schema.org', 'marketing'],
    synergySkills: ['tailwind-ui', 'a11y-audit']
  }
];

export const PROJECT_PRESETS: ProjectPreset[] = [
  {
    id: 'claude-code-autonomous',
    title: 'Claude Code Autonomous Agent & Terminal Suite',
    description: 'Ambiente di sviluppo da terminale con Claude Code CLI, CLAUDE.md, test veloci e controllo Git.',
    icon: 'Terminal',
    techStack: ['Claude Code CLI', 'CLAUDE.md', 'node:test', 'TypeScript', 'MCP Filesystem'],
    targetPlatform: 'claude-code',
    sampleDescription: 'Voglio configurare un ambiente di lavoro avanzato con Claude Code CLI: creare un file CLAUDE.md ottimale per guidare l\'agente, orchestrare test automatici veloci in background prima dei commit e velocizzare lo sviluppo da terminale.'
  },
  {
    id: 'saas-fullstack',
    title: 'SaaS Web App Full-Stack con Claude 3.7',
    description: 'React / Next.js con PostgreSQL Neon, API REST, estetica Tailwind curata e Extended Thinking.',
    icon: 'Layers',
    techStack: ['React / Next.js', 'PostgreSQL / Drizzle', 'Tailwind CSS', 'Extended Thinking', 'Docker'],
    targetPlatform: 'claude-code',
    sampleDescription: 'Voglio creare una SaaS web app moderna con React e Next.js, backend con API REST, database relazionale PostgreSQL gestito con Drizzle ORM, autenticazione JWT sicura, interfaccia utente raffinata con Tailwind CSS e test unitari automatici.'
  },
  {
    id: 'mcp-desktop-poweruser',
    title: 'Claude Desktop Power Workflow (MCP Suite)',
    description: 'Integrazione MCP completa con File System locale, ispezione Postgres, GitHub, Brave Search e Memoria.',
    icon: 'Cpu',
    techStack: ['MCP Filesystem', 'MCP Postgres', 'MCP GitHub', 'MCP Web Search', 'MCP Memory'],
    targetPlatform: 'claude-desktop',
    sampleDescription: 'Voglio configurare Claude Desktop con i server Model Context Protocol (MCP) per interagire direttamente con i miei file di progetto in locale, fare query al database PostgreSQL aziendale, aprire pull request su GitHub e mantenere la memoria delle mie scelte.'
  },
  {
    id: 'ai-scraper-research',
    title: 'Autonomous Scraper & AI Agent con Puppeteer',
    description: 'Web scraper con Puppeteer / Playwright, estrazione dati da SPA, pulizia con Pandas e ricerca web live.',
    icon: 'Globe',
    techStack: ['MCP Puppeteer', 'Python / Pandas', 'Brave Search', 'Document Extraction'],
    targetPlatform: 'claude-desktop',
    sampleDescription: 'Ho bisogno di uno scraper e agente di ricerca web con Puppeteer headless che naviga cataloghi dinamici, estrae tabelle e prezzi, pulisce e normalizza i dati con Pandas e li indicizza per interrogazione semantica.'
  },
  {
    id: 'enterprise-security-api',
    title: 'High-Security REST API & Microservices',
    description: 'API backend resiliente con FastAPI/Express, rate limiting Redis, conformità OWASP e CI/CD.',
    icon: 'Shield',
    techStack: ['FastAPI / Express', 'Redis', 'PostgreSQL', 'Docker', 'GitHub Actions', 'OWASP'],
    targetPlatform: 'claude-code',
    sampleDescription: 'Devo costruire un\'architettura API REST aziendale ad alta sicurezza e traffico, con validazione rigorosa dei dati, caching distribuito e rate limiting con Redis, audit OWASP per prevenire vulnerabilità e pipeline CI/CD automatizzata su GitHub Actions.'
  }
];
