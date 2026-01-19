// frontend/src/mocks/data.ts
import { v4 as uuidv4 } from 'uuid'; // Instale 'uuid' e '@types/uuid'
import type { CharacterSheet, InventarioItem, Habilidade, Pericia, Ritual } from '@/types/ordem/models';
import pinkyImageUrl from '@/assets/pinky.png';

// Um mock completo das perícias
const MOCK_PERICIAS: Pericia[] = [
  // AGI
  { id: 'acrobacia', nome: 'Acrobacia', atributo_base: 'AGI', treino: 0, outros: 0, descricao: 'Testes de Acrobacia são usados para passar por espaços apertados, se equilibrar e realizar acrobacias.' },
  { id: 'crime', nome: 'Crime', atributo_base: 'AGI', treino: 5, outros: 0, descricao: 'Usado para abrir fechaduras, sabotar mecanismos e bater carteiras.' },
  { id: 'furtividade', nome: 'Furtividade', atributo_base: 'AGI', treino: 10, outros: 0, descricao: 'Move-se silenciosamente ou se esconde.' },
  { id: 'pilotagem', nome: 'Pilotagem', atributo_base: 'AGI', treino: 0, outros: 0, descricao: 'Conduz veículos terrestres em alta velocidade ou em manobras arriscadas.' },
  { id: 'pontaria', nome: 'Pontaria', atributo_base: 'AGI', treino: 5, outros: 0, descricao: 'Usado para ataques com armas de fogo ou de arremesso.' },
  { id: 'reflexos', nome: 'Reflexos', atributo_base: 'AGI', treino: 0, outros: 0, descricao: 'Testes de resistência para evitar efeitos de área, armadilhas e agarrões.' },
  // FOR
  { id: 'atletismo', nome: 'Atletismo', atributo_base: 'FOR', treino: 5, outros: 0, descricao: 'Usado para escalar, nadar, saltar e levantar peso.' },
  { id: 'luta', nome: 'Luta', atributo_base: 'FOR', treino: 10, outros: 0, descricao: 'Usado para ataques corpo a corpo.' },
  // INT
  { id: 'artes', nome: 'Artes', atributo_base: 'INT', treino: 0, outros: 0, descricao: 'Usado para criar obras de arte ou avaliar seu valor.' },
  { id: 'ciencias', nome: 'Ciências', atributo_base: 'INT', treino: 5, outros: 0, descricao: 'Analisa substâncias, cria compostos químicos e lembra de fatos científicos.' },
  { id: 'investigacao', nome: 'Investigação', atributo_base: 'INT', treino: 10, outros: 0, descricao: 'Procura por pistas escondidas e informações.' },
  { id: 'medicina', nome: 'Medicina', atributo_base: 'INT', treino: 0, outros: 0, descricao: 'Trata ferimentos e doenças.' },
  { id: 'ocultismo', nome: 'Ocultismo', atributo_base: 'INT', treino: 10, outros: 0, descricao: 'Identifica criaturas, rituais e itens paranormais.' },
  { id: 'profissao', nome: 'Profissão', atributo_base: 'INT', treino: 0, outros: 0, descricao: 'Exerce uma profissão (deve ser especificada).' },
  { id: 'sobrevivencia', nome: 'Sobrevivência', atributo_base: 'INT', treino: 0, outros: 0, descricao: 'Encontra rastros, caça e se orienta em ambientes selvagens.' },
  { id: 'tecnologia', nome: 'Tecnologia', atributo_base: 'INT', treino: 5, outros: 0, descricao: 'Opera, conserta ou sabota dispositivos eletrônicos.' },
  // PRE
  { id: 'atualidades', nome: 'Atualidades', atributo_base: 'PRE', treino: 0, outros: 0, descricao: 'Sabe sobre eventos recentes, notícias e cultura popular.' },
  { id: 'diplomacia', nome: 'Diplomacia', atributo_base: 'PRE', treino: 0, outros: 0, descricao: 'Influencia socialmente, persuade e acalma ânimos.' },
  { id: 'enganacao', nome: 'Enganação', atributo_base: 'PRE', treino: 0, outros: 0, descricao: 'Mente, se disfarça e esconde intenções.' },
  { id: 'intimidacao', nome: 'Intimidação', atributo_base: 'PRE', treino: 5, outros: 0, descricao: 'Coage e assusta para obter o que quer.' },
  { id: 'intuicao', nome: 'Intuição', atributo_base: 'PRE', treino: 5, outros: 0, descricao: 'Percebe se alguém está mentindo ou escondendo algo.' },
  { id: 'percepcao', nome: 'Percepção', atributo_base: 'PRE', treino: 10, outros: 0, descricao: 'Nota detalhes, ouve sons sutis e percebe ameaças escondidas.' },
  { id: 'religiao', nome: 'Religião', atributo_base: 'PRE', treino: 0, outros: 0, descricao: 'Conhece sobre teologia, cultos e símbolos religiosos.' },
  { id: 'vontade', nome: 'Vontade', atributo_base: 'PRE', treino: 5, outros: 0, descricao: 'Testes de resistência para resistir a efeitos mentais.' },
  // VIG
  { id: 'fortitude', nome: 'Fortitude', atributo_base: 'VIG', treino: 5, outros: 0, descricao: 'Testes de resistência para resistir a efeitos físicos (cansaço, veneno).' },
  { id: 'iniciativa', nome: 'Iniciativa', atributo_base: 'VIG', treino: 10, outros: 0, descricao: 'Define a ordem de ação no combate.' },
];

const MOCK_INVENTARIO: InventarioItem[] = [
    { 
    id: uuidv4(), 
    baseItemId: 'arma_pistola', // ID da biblioteca de itens
    equipado: true,
    modificacoesIds: ['mod_mira_laser'], // ID da biblioteca de mods
    maldicoesIds: []
  },
  // A Katana do Kian, que TEM uma maldição
  { 
    id: uuidv4(), 
    baseItemId: 'arma_katana',
    equipado: true,
    modificacoesIds: [],
    maldicoesIds: ['mald_sanguinaria'] // ID da biblioteca de maldições
  },
  // O Colete do Kian
  { 
    id: uuidv4(), 
    baseItemId: 'prot_colete_leve',
    equipado: true,
    modificacoesIds: [],
    maldicoesIds: []
  },
  // A Lanterna do Kian
  { 
    id: uuidv4(), 
    baseItemId: 'item_lanterna',
    equipado: false,
    modificacoesIds: [],
    maldicoesIds: []
  },
];

// O Personagem Mockado
const MOCK_HABILIDADES: Habilidade[] = [
  
];

const MOCK_RITUAIS: Ritual[] = [
  {
    id: uuidv4(),
    nome: 'Cicatrização',
    elemento: 'Sangue',
    circulo: 1,
    execucao: 'Padrão',
    alcance: 'Toque',
    alvo: '1 ser',
    duracao: 'Instantânea',
    resistencia: 'Nenhuma',
    descricao: 'Cura 2d8+2 pontos de vida do alvo.'
  },
  {
    id: uuidv4(),
    nome: 'Amaldiçoar Arma',
    elemento: 'Energia',
    circulo: 1,
    execucao: 'Movimento',
    alcance: 'Toque',
    alvo: '1 arma',
    duracao: 'Cena',
    resistencia: 'Nenhuma',
    descricao: 'A arma amaldiçoada causa +1d6 de dano de Energia.'
  }
];

// O Personagem Mockado (ATUALIZADO)
export const MOCK_SHEET: CharacterSheet = {
  // --- Dados Antigos ---
  id: 'sheet-joui-jouki-123',
  name: 'Pinky Dahlia', // "Agente"
  playerId: 'user-mestre-001',
  campaignId: 'campanha-segredo-na-ilha',
  
  nex: 5,
  level: 1,
  pe_turno: 1,
  deslocamento: '9 m / 6q',
  classe: 'classe_ocultista',
  origemId: 'professor',
  
  agilidade: 2,
  forca: 1,
  intelecto: 4,
  presenca: 3,
  vigor: 2,
  
  pv_max: 45,
  pv_atual: 40,
  ps_max: 60,
  ps_atual: 55,
  pe_max: 55,
  pe_atual: 50,
  pp_max: 0,
  pp_atual: 0,

  base_pv: 15,
  base_ps: 15,
  base_pe: 7,
  base_pp: 0,
  
  defesa_passiva: 12,
  defesa_esquiva: 17,
  defesa_bloqueio: 5,
  defesa_protecao: 0,
  defesa_bonus: 0,
  patente: 'Recruta',
  
  pericias: MOCK_PERICIAS,
  inventario: MOCK_INVENTARIO,
  prestigio: 10,
  credito: 'Médio',
  carga_atual: 2,
  carga_max: 5,
  
  // --- [NOVO] Dados do "Perfil" ---
  imageUrl: pinkyImageUrl, // Placeholder
  dataNascimento: '21/01/2000',
  idadeEnvelhecida: 0, // "Envelheceu 3 anos"
  
  trilha: 'trilha_graduado',
  elemento: 'Nenhum',
  
  historia: 'Durante toda sua infância, Pinky se destacava por suas incríveis habilidades em dança, vencendo inúmeras competições e ganhando prêmios. Por influência de sua mãe, Layla Dahlia, uma cantora renomada na indústria musical, a carreira de Pinky não demorou muito até ser forjada e aclamada, tornando-se uma cantora e dançarina tão famosa e respeitada quanto sua mãe. Ao longo de seus anos de fama, Dahlia experienciou a cena mais aterrorizante e traumática de sua vida: o corpo de Layla encontrado sem vida em volta de uma poça enorme de sangue, e ao seu lado, uma criatura enorme, coberta de carne e sangue, nunca antes vista e incapaz de descrevê-la, ao observar o cenário em que se encontrava, a cantora acaba desmaiando e perdendo sua consciência. A fim de evitar polêmicas, a família optou por noticiar a morte de Layla como infarto. Pinky possui apenas pequenos flashbacks desse momento, porém desconfia que sua mãe realmente tenha morrido da forma que foi divulgada. Após investigações, a agente Nathália Chesin optou por recrutar Pinky para a Ordem devido à exposição que teve e suas excelentes habilidades e controle corporal. Eventualmente, quando descoberto seu potencial e aptidão com o Outro Lado, Pinky passou a ser treinada pelo ocultista Charles Miner, além de ainda fazer grande sucesso com suas músicas e apresentações nas horas vagas.',
  aparencia: 'linda',
  personalidade: 'Pinky possui uma personalidade peculiar, apesar de ser incrivelmente carismática e lidar bem com o público, ela é extremamente vaidosa e é obcecada por estar bonita o tempo todo.',
  anotacoes: 'saudade da agatha',
  favoritos: 'joao',
  primeiroEncontro: 'mataram mamis',
  doencasFobias: '',
  manias: '',
  piorPesadelo: '',
  
  habilidades: MOCK_HABILIDADES,
  rituais: MOCK_RITUAIS
};