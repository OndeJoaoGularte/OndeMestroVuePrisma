import type { Habilidade } from '@/types/ordem/models';

export const DB_PESO_IDADE: Habilidade[] = [
  { 
    id: 'id_adulto', 
    nome: 'Adulto', 
    origem: 'Peso da Idade', 
    descricao: 'Você não recebe penalidades nem benefícios adicionais.' 
  },
  { 
    id: 'id_maduro', 
    nome: 'Maduro', 
    origem: 'Peso da Idade', 
    descricao: 'Você recebe +1 em um Atributo mental (Inteligência ou Presença) e -1 em um Atributo físico (Força, Agilidade ou Vigor). Além disso, ganha 1 perícia treinada extra à sua escolha.' 
  },
  { 
    id: 'id_idoso', 
    nome: 'Idoso', 
    origem: 'Peso da Idade', 
    descricao: 'Você recebe +1 em dois Atributos mentais e -1 em todos os Atributos físicos. Além disso, ganha 2 perícias treinadas extras e um Poder Paranormal ou de Classe (sem pré-requisitos).' 
  }
];