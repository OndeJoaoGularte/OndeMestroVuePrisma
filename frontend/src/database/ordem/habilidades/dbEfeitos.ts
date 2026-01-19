import type { Efeito } from '@/types/ordem/models';

export const DB_EFEITOS: Efeito[] = [
  // Efeito SEM elemento
  {
    id: 'ef_exposto',
    nome: 'Exposto',
    descricao: 'Você entrou em contato com uma entidade de Medo.',
    habilidade: {
      id: 'hab_ef_exposto',
      nome: 'Exposto',
      origem: 'Efeito Paranormal',
      descricao: 'Você pode usar seu Intelecto em vez de Presença para testes de Ocultismo.',
      // Sem elemento aqui
    }
  },
  // Efeito COM elemento
  {
    id: 'ef_perturbado',
    nome: 'Perturbado',
    descricao: 'Sua mente foi tocada pelo Conhecimento.',
    habilidade: {
      id: 'hab_ef_perturbado',
      nome: 'Mente Perturbada',
      origem: 'Efeito Paranormal',
      descricao: 'Você recebe -2 em Vontade, mas +5 em Identificar Criaturas.',
      elemento: 'Conhecimento' // <--- Elemento opcional aqui
    }
  },
   {
    id: 'ef_chamuscado',
    nome: 'Chamuscado',
    descricao: 'Marcas de queimadura paranormal.',
    habilidade: {
      id: 'hab_ef_chamuscado',
      nome: 'Pele em Brasa',
      origem: 'Efeito Paranormal',
      descricao: 'Seu sangue ferve. +2 em Iniciativa.',
      elemento: 'Energia'
    }
  }
];