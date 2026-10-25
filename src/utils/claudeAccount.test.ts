import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  validateAnthropicApiKey, 
  maskApiKey, 
  createDefaultConnectedAccount,
  buildClaudeProjectSyncBundle,
  CLAUDE_MODELS_LIST
} from './claudeAccount';
import { CLAUDE_SKILLS_DATABASE } from '../data/skillsData';

test('maskApiKey properly masks middle characters of Anthropic key', () => {
  const key = 'sk-ant-api03-abcdef1234567890xyz';
  const masked = maskApiKey(key);
  assert.ok(masked.startsWith('sk-ant-api'));
  assert.ok(masked.endsWith('0xyz'));
  assert.ok(masked.includes('••••'));
});

test('validateAnthropicApiKey validates correct prefix and length', () => {
  const validKey = 'sk-ant-api03-abcdef1234567890abcdef1234';
  const result = validateAnthropicApiKey(validKey);
  assert.equal(result.valid, true);
  assert.ok(result.maskedKey);

  const invalidPrefix = 'sk-proj-something-else-123456789012345';
  const invalidResult = validateAnthropicApiKey(invalidPrefix);
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.reason?.includes('sk-ant-'));

  const tooShort = 'sk-ant-short';
  assert.equal(validateAnthropicApiKey(tooShort).valid, false);
});

test('createDefaultConnectedAccount initializes valid connected account with Pro tier', () => {
  const account = createDefaultConnectedAccount('testuser@example.com', 'api-key');
  assert.equal(account.isConnected, true);
  assert.equal(account.email, 'testuser@example.com');
  assert.equal(account.accountName, 'testuser');
  assert.equal(account.tier, 'Claude Pro');
  assert.equal(account.selectedModel, 'claude-3-7-sonnet-20250219');
});

test('buildClaudeProjectSyncBundle includes all active skills', () => {
  const skills = CLAUDE_SKILLS_DATABASE.slice(0, 3);
  const bundle = buildClaudeProjectSyncBundle(skills, 'E-Commerce App');
  assert.equal(bundle.skillsCount, 3);
  assert.equal(bundle.projectName, 'E-Commerce App');
  assert.equal(bundle.status, 'success');
});

test('CLAUDE_MODELS_LIST contains Claude 3.7 Sonnet as recommended model', () => {
  const sonnet = CLAUDE_MODELS_LIST.find(m => m.id === 'claude-3-7-sonnet-20250219');
  assert.ok(sonnet, 'Claude 3.7 Sonnet must be available');
  assert.ok(sonnet.name.includes('3.7'));
});
