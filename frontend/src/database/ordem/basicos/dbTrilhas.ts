import type { Trilha } from '@/types/ordem/models';

export const DB_TRILHAS: Trilha[] = [
  {
    id: 'trilha_aniquilador',
    classeId: 'classe_combatente',
    nome: 'Aniquilador',
    descricao: 'Focado em causar o máximo de dano possível, o Aniquilador é uma força bruta no campo de batalha.',
    habilidade: {
      id: 'hab_aniquilador',
      nome: 'A Favorita',
      origem: 'Trilha',
      descricao: 'Você escolhe uma arma. O dano dessa arma aumenta em um dado do mesmo tipo.'
    },
    base_pp: 0
  },
  {
    id: 'trilha_comandante',
    classeId: 'classe_combatente',
    nome: 'Comandante de Campo',
    descricao: 'Focado em causar o máximo de dano possível, o Aniquilador é uma força bruta no campo de batalha.',
    habilidade: {
      id: 'hab_comandante',
      nome: 'Voz de Comando',
      origem: 'Trilha',
      descricao: 'Gasta 2 PE para dar +2 em testes de perícia para aliados.'
    },
    base_pp: 0
  },
  
  {
    id: 'trilha_flagelador',
    classeId: 'classe_ocultista',
    nome: 'Flagelador',
    descricao: 'Focado em causar o máximo de dano possível, o Aniquilador é uma força bruta no campo de batalha.',
    habilidade: {
      id: 'hab_flagelador',
      nome: 'Absorver Dor',
      origem: 'Trilha',
      descricao: 'Você pode gastar 2 PE para absorver o dano de um aliado adjacente.'
    },
    base_pp: 0
  },
  {
    id: 'trilha_graduado',
    classeId: 'classe_ocultista',
    nome: 'Graduado',
    descricao: 'Focado em causar o máximo de dano possível, o Aniquilador é uma força bruta no campo de batalha.',
    habilidade: {
      id: 'hab_graduado',
      nome: 'Conhecimento Aplicado',
      origem: 'Trilha',
      descricao: 'Você pode usar seu Intelecto em vez de Presença para testes de Ocultismo.'
    },
    base_pp: 0
  },
  {
    id: 'trilha_possuido',
    classeId: 'classe_ocultista',
    nome: 'Possuído',
    descricao: 'Focado em causar o máximo de dano possível, o Aniquilador é uma força bruta no campo de batalha.',
    habilidade: {
      id: 'hab_possuido',
      nome: 'Conhecimento Aplicado',
      origem: 'Trilha',
      descricao: 'Você pode usar seu Intelecto em vez de Presença para testes de Ocultismo.'
    },
    base_pp: 3
  },

];