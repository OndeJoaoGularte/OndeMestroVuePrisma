// frontend/src/mocks/data.ts
import { v4 as uuidv4 } from 'uuid';
import type { CharacterSheet, Pericia } from '@/types/ordem/models';
import pinkyImageUrl from '@/assets/pinky.png'; 

// Lista padrão de perícias (Zeradas) para a ficha não nascer "quebrada"
const PERICIAS_PADRAO: Pericia[] = [
  { id: 'acrobacia', nome: 'Acrobacia', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'adestramento', nome: 'Adestramento', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'artes', nome: 'Artes', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'atletismo', nome: 'Atletismo', atributo_base: 'FOR', treino: 0, outros: 0, descricao: '' },
  { id: 'atualidades', nome: 'Atualidades', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'ciencias', nome: 'Ciências', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'crime', nome: 'Crime', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'diplomacia', nome: 'Diplomacia', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'enganacao', nome: 'Enganação', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'fortitude', nome: 'Fortitude', atributo_base: 'VIG', treino: 0, outros: 0, descricao: '' },
  { id: 'furtividade', nome: 'Furtividade', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'iniciativa', nome: 'Iniciativa', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'intimidacao', nome: 'Intimidação', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'intuicao', nome: 'Intuição', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'investigacao', nome: 'Investigação', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'luta', nome: 'Luta', atributo_base: 'FOR', treino: 0, outros: 0, descricao: '' },
  { id: 'medicina', nome: 'Medicina', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'ocultismo', nome: 'Ocultismo', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'percepcao', nome: 'Percepção', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'pilotagem', nome: 'Pilotagem', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'pontaria', nome: 'Pontaria', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'profissao', nome: 'Profissão', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'reflexos', nome: 'Reflexos', atributo_base: 'AGI', treino: 0, outros: 0, descricao: '' },
  { id: 'religiao', nome: 'Religião', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
  { id: 'sobrevivencia', nome: 'Sobrevivência', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'tatica', nome: 'Tática', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'tecnologia', nome: 'Tecnologia', atributo_base: 'INT', treino: 0, outros: 0, descricao: '' },
  { id: 'vontade', nome: 'Vontade', atributo_base: 'PRE', treino: 0, outros: 0, descricao: '' },
];

export const MOCK_SHEET: CharacterSheet = {
  id: uuidv4(),
  name: 'Novo Agente',
  nomeJogador: '',
  playerId: '',
  campaignId: null,

  // --- Mecânica ---
  nex: 5,
  level: 1,
  patente: 'Recruta',

  classe: '', // Vazio
  trilha: null,
  origem: null, // Mudado de origemId para origem

  // Atributos (Padrão 1)
  agilidade: 1,
  forca: 1,
  intelecto: 1,
  presenca: 1,
  vigor: 1,

  // Barras
  pv_max: 0, pv_atual: 0,
  ps_max: 0, ps_atual: 0,
  pe_max: 0, pe_atual: 0,
  pp_max: 0, pp_atual: 0,

  // Base
  base_pv: 0, base_ps: 0, base_pe: 0, base_pp: 0,

  // Derivados
  deslocamento: '9m',
  pe_turno: 1,
  dt_rituais: 0,
  dt_explosivos: 0,

  // Defesas
  defesa_passiva: 10,
  defesa_esquiva: 0,
  defesa_bloqueio: 0,
  defesa_protecao: 0,
  defesa_bonus: 0,

  // Listas
  pericias: PERICIAS_PADRAO,
  inventario: [],
  habilidades: [],
  rituais: [],
  resistencias: [],
  condicoes: [],

  // Carga
  prestigio: 0,
  credito: 'Baixo',
  carga_atual: 0,
  carga_max: 5,

  // Perfil
  imageUrl: pinkyImageUrl,
  dataNascimento: '',
  idadeEnvelhecida: 0,
  elemento: 'Nenhum',

  historia: '',
  aparencia: '',
  personalidade: '',
  anotacoes: '',
  favoritos: '',
  primeiroEncontro: '',
  doencasFobias: '',
  manias: '',
  piorPesadelo: ''
};