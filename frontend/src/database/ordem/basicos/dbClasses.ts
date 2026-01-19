import type { Classe } from '@/types/ordem/models'

export const DB_CLASSES: Classe[] = [
  {
    id: 'classe_combatente',
    nome: 'Combatente',
    descricao:
      'Além de treinar seu corpo, o combatente também é perito em liderar seus aliados em batalha e em cuidar de seu equipamento de combate, sempre preparado para assumir a linha de frente quando a coisa fica feia.',
    pericias:
      'Luta ou Pontaria (uma das duas) e Fortitude ou Reflexos (uma das duas), mais uma quantidade de perícias à sua escolha igual a 1 + Intelecto.',
    proficiencias: 'Armas simples, armas táticas e proteções leves.',
    habilidades: [
      {
        id: 'hab_ataque_especial',
        nome: 'Ataque Especial',
        origem: 'Classe',
        descricao:
          'Quando faz um ataque, você pode gastar 2 PE para receber +5 no teste de ataque ou na rolagem de dano. Conforme avança de Nível, você pode gastar +1 PE para receber mais bônus de +5. Você pode aplicar cada bônus de +5 em ataque ou dano. No Nível 5, você pode gastar 3 PE para receber +10 (+5 e +5). No Nível 11, você pode gastar 4 PE para receber +15. No Nível 17, você pode gastar 5 PE para para receber +20.',
      },
    ],
    base_pv: 20,
    base_ps: 12,
    base_pe: 2,
    bonus_pv: 4,
    bonus_ps: 3,
    bonus_pe: 2,
  },
  {
    id: 'classe_especialista',
    nome: 'Especialista',
    descricao:
      'O que une todos os especialistas é sua incrível capacidade de aprender e improvisar usando seu intelecto e conhecimento avançado, que pode tirar o grupo todo dos mais diversos tipos de enrascadas.',
    pericias: 'Uma quantidade de perícias à sua escolha igual a 7 + Intelecto.',
    proficiencias: 'Armas simples e proteções leves.',
    habilidades: [
      {
        id: 'hab_ecletico',
        nome: 'Eclético',
        origem: 'Classe',
        descricao:
          'Quando faz um teste de uma perícia, você pode gastar 2 PE para receber os benefícios de ser treinado nesta perícia. No Nível 8, você pode gastar 4 PE para receber os benefícios de ser veterano. No Nível 15, você pode gastar 6 PE para receber os benefícios de ser expert.',
      },
      {
        id: 'hab_perito',
        nome: 'Perito',
        origem: 'Classe',
        descricao:
          'Escolha duas perícias nas quais você é treinado (exceto Luta e Pontaria). Quando faz um teste de uma dessas perícias, você pode gastar 2 PE para somar +1d6 no resultado do teste. Conforme avança de Nível, você pode gastar +1 PE para para aumentar o dado de bônus. No Nível 5, você pode gastar 3 PE para somar +1d8. No Nível 11, você pode gastar 4 PE para somar +1d10. No Nível 17, você pode gastar 5 PE para somar +1d12.',
      },
    ],
    base_pv: 16,
    base_ps: 16,
    base_pe: 3,
    bonus_pv: 3,
    bonus_ps: 4,
    bonus_pe: 3,
  },
  {
    id: 'classe_ocultista',
    nome: 'Ocultista',
    descricao:
      'Ocultistas aplicam seu conhecimento acadêmico e suas capacidades de conjuração de rituais em missões para investigar e combater o paranormal em todas as suas formas, principalmente quando munição convencional não é o suficiente para lidar com a tarefa.',
    pericias:
      'Ocultismo e Vontade, mais uma quantidade de perícias a sua escolha igual a 3 + Intelecto',
    proficiencias: 'Armas simples.',
    habilidades: [
      {
        id: 'hab_escolhido_pelo_outro_lado',
        nome: 'Escolhido Pelo Outro Lado',
        origem: 'Classe',
        descricao:
          'Você teve uma experiência paranormal e foi marcado pelo Outro Lado, absorvendo o conhecimento e poder necessários para realizar rituais. Você pode lançar rituais de 1º círculo. À medida que aumenta seu Nível, pode lançar rituais de círculos maiores (2º círculo no Nível 5, 3º círculo no Nível 11 e 4º círculo no Nível 17). Você começa com três rituais de 1º círculo. Sempre que avança de Nível, aprende um ritual de qualquer círculo que possa lançar. Esses rituais não contam no seu limite de rituais conhecidos.',
      },
    ],
    base_pv: 12,
    base_ps: 20,
    base_pe: 4,
    bonus_pv: 2,
    bonus_ps: 5,
    bonus_pe: 4,
  },
]
