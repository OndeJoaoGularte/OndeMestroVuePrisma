import type { Habilidade } from '@/types/ordem/models';

export const DB_PODERES_CLASSE: Habilidade[] = [
  // --- COMBATENTE ---
  { 
    id: 'pod_comb_golpe_pesado', 
    nome: 'Golpe Pesado', 
    origem: 'Poder de Classe', 
    descricao: 'O dano de suas armas corpo a corpo aumenta em um dado do mesmo tipo.',
    classe: 'classe_combatente' // <--- O link com a classe
  },
  { 
    id: 'pod_comb_tiro_certeiro', 
    nome: 'Tiro Certeiro', 
    origem: 'Poder de Classe', 
    descricao: 'Você soma sua Agilidade nas rolagens de dano com armas de disparo.',
    classe: 'classe_combatente'
  },

  // --- OCULTISTA ---
  { 
    id: 'pod_ocul_camuflar_ocultismo', 
    nome: 'Camuflar Ocultismo', 
    origem: 'Poder de Classe', 
    descricao: 'Você pode usar Ocultismo para criar ilusões visuais.',
    classe: 'classe_ocultista'
  },

  // --- ESPECIALISTA ---
  { 
    id: 'pod_esp_ninja_urbano', 
    nome: 'Ninja Urbano', 
    origem: 'Poder de Classe', 
    descricao: 'Você pode se mover seu deslocamento normal enquanto se esgueira.',
    classe: 'classe_especialista'
  },
];