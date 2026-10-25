import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  normalizeText, 
  calculateSkillMatchScore, 
  analyzeProjectLocally,
  generateClaudeMd,
  generateMcpConfig
} from './skillRecommender';
import { CLAUDE_SKILLS_DATABASE } from '../data/skillsData';

test('normalizeText strips punctuation and handles whitespace and casing', () => {
  const raw = '  Three.js, WebGL & 3D Interactive!!  ';
  const clean = normalizeText(raw);
  assert.equal(clean, 'three js webgl 3d interactive');
});

test('calculateSkillMatchScore scores 3D skill highly when 3D keywords are present', () => {
  const threeSkill = CLAUDE_SKILLS_DATABASE.find(s => s.id === 'threejs-3d')!;
  assert.ok(threeSkill, 'threejs-3d skill must exist in database');

  const query = 'voglio creare una scena 3d webgl con threejs e shader';
  const match = calculateSkillMatchScore(threeSkill, query, 'claude-code', ['Three.js']);

  assert.ok(match.score >= 50, `Expected score >= 50, got ${match.score}`);
  assert.ok(match.matchedKeywords.length > 0, 'Should match keywords');
});

test('calculateSkillMatchScore gives low score when keywords do not match', () => {
  const threeSkill = CLAUDE_SKILLS_DATABASE.find(s => s.id === 'threejs-3d')!;
  const query = 'sviluppo una semplice api rest per la gestione di fatture in formato pdf';
  const match = calculateSkillMatchScore(threeSkill, query, 'claude-desktop', []);

  assert.equal(match.score, 0, 'Should have 0 score for unrelated topic');
});

test('analyzeProjectLocally recommends postgres, rest and tailwind for fullstack saas', () => {
  const query = 'Voglio creare una SaaS web app con React, PostgreSQL, API REST e Tailwind CSS';
  const result = analyzeProjectLocally(query, 'claude-code', ['React', 'PostgreSQL']);

  assert.ok(result.recommendedSkills.length > 0, 'Must return recommendations');
  const skillIds = result.recommendedSkills.map(r => r.skillId);

  assert.ok(
    skillIds.includes('postgres-drizzle') || skillIds.includes('rest-fastapi') || skillIds.includes('tailwind-ui'),
    'Should recommend relevant full-stack skills'
  );

  const topRec = result.recommendedSkills[0];
  assert.ok(topRec.whyRecommend.length > 10, 'Must have reason why recommend');
  assert.ok(topRec.whatItDoesForProject.length > 10, 'Must explain what it does');
});

test('generateClaudeMd creates structured documentation with all active skills', () => {
  const selectedSkills = CLAUDE_SKILLS_DATABASE.slice(0, 3);
  const md = generateClaudeMd(selectedSkills, 'E-Commerce Platform');

  assert.ok(md.includes('# CLAUDE.md'), 'Must have header');
  assert.ok(md.includes('E-Commerce Platform'), 'Must mention project title');
  for (const s of selectedSkills) {
    assert.ok(md.includes(s.name), `Must include skill ${s.name}`);
  }
});

test('generateMcpConfig outputs valid JSON containing mcpServers', () => {
  const mcpSkills = CLAUDE_SKILLS_DATABASE.filter(s => s.category === 'mcp');
  const jsonString = generateMcpConfig(mcpSkills);
  
  const parsed = JSON.parse(jsonString);
  assert.ok(parsed.mcpServers, 'Should have mcpServers root key');
  assert.ok(Object.keys(parsed.mcpServers).length > 0, 'Should contain server configurations');
});
