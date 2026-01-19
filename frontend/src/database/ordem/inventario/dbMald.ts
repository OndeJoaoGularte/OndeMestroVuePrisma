import type { Maldicao } from "@/types/ordem/models";

// Maldições de ARMAS
export const DB_ARMA_MALDS: Maldicao[] = [
  { id: 'mald_arma_sanguinaria', nome: 'Sanguinária', descricao: 'Ao causar dano, o alvo sangra (1d6 acumulativo). Elemento: Sangue.' },
  { id: 'mald_arma_vibrante', nome: 'Vibrante', descricao: 'Gaste 2 PE para realizar um ataque extra. Elemento: Energia.' },
  { id: 'mald_arma_lancinante', nome: 'Lancinante', descricao: 'Soma seu Intelecto no dano. Elemento: Conhecimento.' },
];

// Maldições de PROTEÇÃO
export const DB_PROTECAO_MALDS: Maldicao[] = [
  { id: 'mald_prot_abjurada', nome: 'Abjurada', descricao: '+2 em testes de resistência. Elemento: Conhecimento.' },
  { id: 'mald_prot_regenerativa', nome: 'Regenerativa', descricao: 'Cura 2 PV por rodada. Elemento: Sangue.' },
];

// Maldições de ACESSÓRIO
export const DB_ACESSORIO_MALDS: Maldicao[] = [
  { id: 'mald_aces_escudo_mental', nome: 'Escudo Mental', descricao: '+5 em testes de Vontade contra efeitos mentais. Elemento: Conhecimento.' },
];