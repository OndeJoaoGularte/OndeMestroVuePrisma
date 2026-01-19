import type { Ritual } from '@/types/ordem/models';

export const DB_RITUAIS: Ritual[] = [
  // --- 1º CÍRCULO ---
  {
    id: 'rit_cicatrizacao',
    nome: 'Cicatrização',
    elemento: 'Sangue',
    circulo: 1,
    execucao: 'Padrão',
    alcance: 'Toque',
    alvo: '1 ser',
    duracao: 'Instantânea',
    resistencia: 'Nenhuma',
    descricao: 'O alvo recupera 3d8+3 PV. Acelera a regeneração de tecidos.'
  },
  {
    id: 'rit_decadencia',
    nome: 'Decadência',
    elemento: 'Morte',
    circulo: 1,
    execucao: 'Padrão',
    alcance: 'Curto',
    alvo: '1 ser',
    duracao: 'Instantânea',
    resistencia: 'Fortitude reduz à metade',
    descricao: 'O alvo sofre 2d8+2 pontos de dano de Morte. Se o alvo falhar no teste de resistência, fica Fraco por uma rodada.'
  },
  {
    id: 'rit_compreensao',
    nome: 'Compreensão Paranormal',
    elemento: 'Conhecimento',
    circulo: 1,
    execucao: 'Padrão',
    alcance: 'Toque',
    alvo: '1 ser',
    duracao: 'Cena',
    resistencia: 'Vontade anula (inofensivo)',
    descricao: 'Você entende qualquer língua falada ou escrita, inclusive códigos e sigilos.'
  },
  {
    id: 'rit_eletrocussao',
    nome: 'Eletrocussão',
    elemento: 'Energia',
    circulo: 1,
    execucao: 'Padrão',
    alcance: 'Curto',
    alvo: '1 ser',
    duracao: 'Instantânea',
    resistencia: 'Reflexos reduz à metade',
    descricao: 'Um arco voltaico atinge o alvo causando 3d6 de dano de Eletricidade. Se o alvo usar metal, sofre -5 no teste.'
  },

  // --- 2º CÍRCULO ---
  {
    id: 'rit_tela_ruido',
    nome: 'Tela de Ruído',
    elemento: 'Energia',
    circulo: 2,
    execucao: 'Reação',
    alcance: 'Pessoal',
    alvo: 'Você',
    duracao: 'Instantânea',
    resistencia: 'Nenhuma',
    descricao: 'Você recebe 30 PV temporários contra o dano que ativou a reação.'
  },
  {
    id: 'rit_odio_incontrolavel',
    nome: 'Ódio Incontrolável',
    elemento: 'Sangue',
    circulo: 2,
    execucao: 'Padrão',
    alcance: 'Curto',
    alvo: '1 ser',
    duracao: 'Cena',
    resistencia: 'Vontade anula',
    descricao: 'O alvo é tomado por fúria. Recebe +2 em ataque e dano corpo a corpo, mas não pode fazer ações que exijam calma/concentração (rituais, etc).'
  }
];