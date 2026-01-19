import type { Modificacao } from '@/types/ordem/models';

// Armas
export const DB_ARMA_MODS: Modificacao[] = [
  { id: 'mod_arma_mira_laser', nome: 'Mira Laser', descricao: '+2 em testes de Pontaria.' },
  { id: 'mod_arma_calibre_grosso', nome: 'Calibre Grosso', descricao: '+1 dado de dano do mesmo tipo.' },
  { id: 'mod_arma_silenciador', nome: 'Silenciador', descricao: '+5 em Furtividade ao disparar.' },
  { id: 'mod_arma_ergnomica', nome: 'Ergonômica', descricao: 'Pode ser sacada como ação livre (se tiver Saque Rápido, gasta -1 PE em habilidades de arma).' },
];

// Proteções
export const DB_PROTECAO_MODS: Modificacao[] = [
  { id: 'mod_prot_blindada', nome: 'Blindada', descricao: '+2 na Defesa fornecida.' },
  { id: 'mod_prot_reforcada', nome: 'Reforçada', descricao: '+2 RD a dano Físico.' },
];

// Acessórios
export const DB_ACESSORIO_MODS: Modificacao[] = [
  { id: 'mod_aces_discreto', nome: 'Discreto', descricao: 'Pode ser escondido com +10 em Crime.' },
  { id: 'mod_aces_instrumental', nome: 'Instrumental', descricao: 'Conta como kit de perícia para reduzir penalidade.' },
];