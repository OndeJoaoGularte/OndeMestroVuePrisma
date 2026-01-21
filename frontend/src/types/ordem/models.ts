// frontend/src/types/ordem/models.ts

// ==========================================
// 1. DADOS DE USUÁRIO E CAMPANHA
// ==========================================

export interface User {
  id: string
  email: string
  username: string
}

export interface Campaign {
  id: string
  name: string
  masterId: string
}

// ==========================================
// 2. ESTRUTURAS BÁSICAS DO SISTEMA (Templates)
// ==========================================
// Estas interfaces definem como os dados vêm "de fábrica" (Livro/DB).

// --- CLASSE, ORIGEM E TRILHA ---

export interface Classe {
  id: string
  descricao: string
  pericias: string
  proficiencias: string
  nome: 'Combatente' | 'Especialista' | 'Ocultista'

  habilidades: Habilidade[]

  base_pv: number
  base_ps: number
  base_pe: number

  bonus_pv: number
  bonus_ps: number
  bonus_pe: number
}

export interface Origem {
  id: string
  nome: string
  descricao: string
  pericias: string[]
  habilidade: Habilidade
}

export interface HabilidadeTrilha extends Habilidade {
  lvl: number
}

// 3. A Trilha
export interface Trilha {
  id: string
  classeId: string
  nome: string
  descricao: string
  habilidades: HabilidadeTrilha[] 
  
  base_pp: number
}

// --- PERÍCIAS ---

export type Atributo = 'AGI' | 'FOR' | 'INT' | 'PRE' | 'VIG'

export interface Pericia {
  id: string
  nome: string
  descricao: string
  atributo_base: Atributo
  treino: 0 | 5 | 10 | 15
  outros: number
}

// --- HABILIDADES E RITUAIS (Bases) ---

export interface Habilidade {
  id: string
  nome: string
  descricao: string
  origem:
    | 'Classe'
    | 'Origem'
    | 'Peso da Idade'
    | 'Trilha'
    | 'Poder de Classe'
    | 'Poder Paranormal'
    | 'Efeito Paranormal'
  elemento?: 'Sangue' | 'Morte' | 'Energia' | 'Conhecimento' | string
  classe?: string
}

export interface Efeito {
  id: string
  nome: string
  descricao: string
  habilidade: Habilidade
}

export interface Ritual {
  id: string
  nome: string
  elemento: 'Nenhum' | 'Sangue' | 'Morte' | 'Conhecimento' | 'Energia'
  circulo: 1 | 2 | 3 | 4
  execucao: string
  alcance: string
  alvo: string
  duracao: string
  resistencia: string
  descricao: string
}

// --- ITENS (Bases do Catálogo) ---

export interface ItemBase {
  id: string // ID do catálogo (ex: "faca-db")
  nome: string
  descricao?: string
  espacos: number
  categoria: number
}

export interface ArmaBase extends ItemBase {
  tipo: 'Arma'
  subtipo: 'Simples' | 'Tática' | 'Pesada'
  estilo: 'Corpo a Corpo' | 'Distância'
  teste_ataque: 'Luta' | 'Pontaria' | 'Ocultismo'
  distancia_subtipo: 'Arremesso' | 'Disparo' | 'Fogo' | null
  empunhadura: 'Leve' | 'Uma Mão' | 'Duas Mãos'

  // Strings para permitir liberdade (ex: "1d6", "1d6 + 2", "1d8/x3")
  dano: string
  critico: string
  tipo_dano: string // ex: "Perfurante"
  alcance: string // ex: "Curto", "9m"
}

export interface ProtecaoBase extends ItemBase {
  tipo: 'Protecao'
  defesa: number
  resistencia_dano: number // Apenas informativo ou base
  penalidade_pericia: number
}

export interface MunicaoBase extends ItemBase {
  tipo: 'Municao'
  tipo_municao:
    | 'Balas Curtas'
    | 'Balas Longas'
    | 'Cartuchos'
    | 'Combustível'
    | 'Flechas'
    | 'Foguetes'
}

export interface AcessorioBase extends ItemBase {
  tipo: 'Acessorio'
  // Pode ter campos extras de bônus no futuro
}

export interface ExplosivoBase extends ItemBase {
  tipo: 'Explosivo'
  dano: string
  alcance: string
  dt?: string
}

export interface ItemGeralBase extends ItemBase {
  tipo: 'Geral'
  subtipo?: 'ItemOperacional' | 'ItemParanormal' | 'Artefato'
}

export interface Modificacao {
  id: string;
  nome: string;
  descricao: string;
}

export interface Maldicao {
  id: string;
  nome: string;
  descricao: string;
}

// União de todos os tipos base para facilitar tipagem
export type BaseItem =
  | ArmaBase
  | ProtecaoBase
  | MunicaoBase
  | AcessorioBase
  | ExplosivoBase
  | ItemGeralBase

// ==========================================
// 3. ESTRUTURAS INSTANCIADAS (Na Ficha do Jogador)
// ==========================================
// Aqui a mágica acontece. Estes objetos são CÓPIAS dos bases,
// permitindo edição total sem afetar o catálogo.

// --- INVENTÁRIO INSTANCIADO ---
// O tipo é uma interseção do ItemBase com campos de controle.
// Isso significa que 'ItemInstancia' TEM 'nome', 'dano', etc. diretamente editáveis.
export type ItemInstancia = BaseItem & {
  instanceId: string // UUID único na ficha (ex: "minha-faca-favorita")
  baseItemId?: string // Referência opcional ao original (para "resetar" se quiser)

  equipado: boolean

  // Ids de modificações aplicadas (para lógica visual ou cálculos futuros)
  modificacoesIds: string[]
  maldicoesIds: string[]
}

// --- HABILIDADES E RITUAIS INSTANCIADOS ---
export interface HabilidadeInstancia extends Habilidade {
  instanceId: string
  baseHabilidadeId?: string
  // Campos extras de controle se necessário
}

export interface RitualInstancia extends Ritual {
  instanceId: string
  baseRitualId?: string
  // Ex: Custo pode mudar por afinidade, jogador edita aqui
  custoAtual?: number
}

// --- RESISTÊNCIAS E CONDIÇÕES ---

export type TipoDano =
  | 'Físico'
  | 'Balístico'
  | 'Corte'
  | 'Impacto'
  | 'Perfurante'
  | 'Eletricidade'
  | 'Fogo'
  | 'Frio'
  | 'Química'
  | 'Mental'
  | 'Sangue'
  | 'Morte'
  | 'Energia'
  | 'Conhecimento'
  | 'Medo'

export interface ResistenciaManual {
  id: string // UUID para chaves de lista
  tipo: TipoDano | string // Permite string livre se o jogador inventar um dano
  valor: number
}

export interface Condicao {
  id: string // ex: "sangrando"
  nome: string
  descricao: string
  ativa: boolean // O botão de "Check" na UI
}

// ==========================================
// 4. A FICHA DE PERSONAGEM (CharacterSheet)
// ==========================================

export interface CharacterSheet {
  id: string
  name: string
  nomeJogador?: string

  playerId: string
  campaignId: string | null

  // --- Aba "Mecânica" ---
  nex: number
  level: number // Geralmente vinculado ao NEX, mas bom ter separado se quiser
  patente: string

  classe: string // Nome ou ID da classe
  trilha: string | null // Nome ou ID
  origem: string | null

  // Atributos
  agilidade: number
  forca: number
  intelecto: number
  presenca: number
  vigor: number

  // Barras de Vida/Sanidade/Esforço
  pv_max: number
  pv_atual: number
  ps_max: number
  ps_atual: number
  pe_max: number
  pe_atual: number

  // Pontos de Prestígio (caso use regra de base_pp da trilha ou patente)
  pp_max: number
  pp_atual: number

  // Valores Base (cálculo inicial da classe)
  base_pv: number
  base_ps: number
  base_pe: number
  base_pp: number // Vindo da Trilha Possuído ou Patente

  // Status Derivados
  deslocamento: string
  pe_turno: number
  dt_rituais: number
  dt_explosivos: number

  // Defesas (Calculadas ou Manuais)
  defesa_passiva: number
  defesa_esquiva: number
  defesa_bloqueio: number
  defesa_protecao: number // Soma das armaduras
  defesa_bonus: number // Outros

  // --- Listas de Dados do Jogador ---

  pericias: Pericia[]

  // "Meus Rituais": Objetos completos e editáveis
  rituais: RitualInstancia[]

  // "Minhas Habilidades": Objetos completos e editáveis (Classe + Origem + Poderes)
  habilidades: HabilidadeInstancia[]

  // "Meu Inventário": Objetos completos e editáveis
  inventario: ItemInstancia[]

  // Armazenamento manual de resistências
  resistencias: ResistenciaManual[]

  // Lista de condições (Ativas ou não)
  condicoes: Condicao[]

  // Controle de Carga
  prestigio: number // Valor numérico
  credito: string // "Baixo", "Médio", "Alto"
  carga_atual: number
  carga_max: number

  // --- Aba "Perfil" / Roleplay ---
  imageUrl: string | null
  dataNascimento: string | null
  idadeEnvelhecida: number

  elemento: string // Afinidade principal

  historia: string | null
  aparencia: string | null
  personalidade: string | null
  anotacoes: string | null
  favoritos: string | null
  primeiroEncontro: string | null
  doencasFobias: string | null
  manias: string | null
  piorPesadelo: string | null
}
