import type { BaseItem } from '@/types/ordem/models';

export const DB_BASE_ITEMS: BaseItem[] = [
  // --- ARMAS ---
  { 
    id: 'arma_pistola', 
    nome: 'Pistola', 
    tipo: 'Arma',
    subtipo: 'Simples',
    estilo: 'Distância', 
    teste_ataque: 'Pontaria',
    distancia_subtipo: 'Fogo',
    empunhadura: 'Leve',
    dano: '1d6',
    critico: '19/x2',
    tipo_dano: 'Balístico',
    alcance: 'Curto',
    espacos: 1, 
    categoria: 1, 
    descricao: 'Uma arma de fogo curta e leve, ideal para defesa pessoal.'
  },
  { 
    id: 'arma_katana', 
    nome: 'Katana', 
    tipo: 'Arma',
    subtipo: 'Tática',
    estilo: 'Corpo a Corpo',
    teste_ataque: 'Luta',
    distancia_subtipo: null, 
    empunhadura: 'Duas Mãos',
    dano: '1d10',
    critico: '19/x2',
    tipo_dano: 'Corte',
    alcance: 'Pessoal',
    espacos: 2, 
    categoria: 1, 
    descricao: 'Espada curva de um fio só, tradicional dos samurais.'
  },
  { 
    id: 'arma_fuzil_assalto', 
    nome: 'Fuzil de Assalto', 
    tipo: 'Arma',
    subtipo: 'Tática',
    estilo: 'Distância',
    teste_ataque: 'Pontaria',
    distancia_subtipo: 'Fogo', 
    empunhadura: 'Duas Mãos',
    dano: '2d10',
    critico: '19/x3',
    tipo_dano: 'Balístico',
    alcance: 'Médio',
    espacos: 2, 
    categoria: 2, 
    descricao: 'Arma automática de alto calibre.'
  },

  // --- PROTEÇÕES ---
  { 
    id: 'prot_colete_leve', 
    nome: 'Colete Leve', 
    tipo: 'Protecao',
    defesa: 2,
    resistencia_dano: 0,
    penalidade_pericia: 0, // <--- ADICIONADO (Obrigatório no model)
    espacos: 2, 
    categoria: 1, 
    descricao: 'Colete de kevlar simples.' 
  },
  { 
    id: 'prot_protecao_pesada', 
    nome: 'Proteção Pesada', 
    tipo: 'Protecao',
    defesa: 5,
    resistencia_dano: 2, // Exemplo de RD base física
    penalidade_pericia: 5, // <--- Penalidade comum de proteções pesadas
    espacos: 5, 
    categoria: 3, 
    descricao: 'Traje tático completo da SWAT ou militar.' 
  },

  // --- ACESSÓRIOS ---
  {
    id: 'aces_bandoleira',
    nome: 'Bandoleira',
    tipo: 'Acessorio',
    espacos: 1,
    categoria: 1,
    descricao: 'Correia de couro para portar armas ou itens.'
  },
  {
    id: 'aces_vestimenta',
    nome: 'Vestimenta',
    tipo: 'Acessorio',
    espacos: 1,
    categoria: 1,
    descricao: 'Roupas ou joias que dão bônus em perícias (definido ao criar).'
  },

  // --- ITENS GERAIS ---
  { 
    id: 'item_lanterna', 
    nome: 'Lanterna', 
    tipo: 'Geral', // <--- CORRIGIDO (Model pede 'Geral')
    subtipo: 'ItemOperacional', // <--- CORRIGIDO
    espacos: 1, 
    categoria: 0, 
    descricao: 'Ilumina o caminho em cone.' 
  },
  { 
    id: 'item_selo_kian', 
    nome: 'Selo de Kian', 
    tipo: 'Geral', // <--- CORRIGIDO
    subtipo: 'Artefato', // <--- CORRIGIDO
    espacos: 1,
    categoria: 3,
    descricao: 'Um selo de osso que emana uma aura de Conhecimento.'
  },

  // --- MUNIÇÃO ---
  {
    id: 'mun_balas_curtas',
    nome: 'Balas Curtas',
    tipo: 'Municao',
    tipo_municao: 'Balas Curtas',
    espacos: 1,
    categoria: 0,
    descricao: 'Caixa com munição para pistolas e submetralhadoras.'
  }
];