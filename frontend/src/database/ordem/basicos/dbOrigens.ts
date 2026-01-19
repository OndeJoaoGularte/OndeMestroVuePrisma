import type { Origem } from '@/types/ordem/models'

export const DB_ORIGENS: Origem[] = [
  {
    id: 'professor',
    nome: 'Professor',
    descricao:
      'Você leciona em uma escola ou universidade, ensinando ciências, artes ou outro campo do saber. Sua profissão é uma das mais nobres de todas e o colocou em contato com muitas pessoas e conhecimentos. Em algum momento, o colocou em contato também com o paranormal. Agora, trabalhando na Ordem, seus alunos são criaturas do Outro Lado, e você planeja reprovar todos esse ano.',
    pericias: ['Ciências', 'Intuição'],
    habilidade: {
      id: 'hab_origem_professor',
      nome: 'Aula de Campo',
      origem: 'Origem',
      descricao:
        'Você sabe extrair o melhor das pessoas. Uma vez por cena, pode gastar uma ação padrão e 2 PE para fornecer +1 em um atributo de outro personagem em alcance curto até o fim da cena.',
    },
  },
  {
    id: 'blaster',
    nome: 'Blaster',
    descricao:
      'Também chamado de técnico em detonação, você foi responsável por conduzir e inspecionar explosivos, seja em área militar, construção civil, mineração ou em extração de petróleo marinho. Você sabe usar o ambiente, ângulos e estruturas para garantir que seus explosivos, sejam improvisados ou profissionais, causem o maior estrago possível.',
    pericias: ['Ciências', 'Profissão'],
    habilidade: {
      id: 'hab_origem_blaster',
      nome: 'Explosão Solidária',
      origem: 'Origem',
      descricao:
        'Seus explosivos que provocam dano causam +2d6 pontos de dano. Além disso, você pode gastar 2 PE e uma ação de interlúdio para melhorar um explosivo, aumentando a DT para resistir a ele em +5. Só é possível melhorar o mesmo explosivo uma vez.',
    },
  },
  {
    id: 'ginasta',
    nome: 'Ginasta',
    descricao:
      'Desde muito jovem, você passou a maior parte de sua vida em ginásios (ou talvez em antigos templos monásticos) praticando as mais difíceis acrobacias. Sua preparação foi árdua e dolorosa, mas aprimorou seu corpo, sua técnica e sua disciplina. Recrutado pela Ordo Realitas, essas se tornaram suas principais ferramentas para enfrentar o Outro lado. E com elas, você planeja fazer as criaturas paranormais sofrerem muito mais do que você sofreu em seus treinos.',
    pericias: ['Acrobacia', 'Reflexos'],
    habilidade: {
      id: 'hab_origem_ginasta',
      nome: 'Mobilidade Acrobática',
      origem: 'Origem',
      descricao: 'Você recebe +2 na Defesa e seu deslocamento aumenta em +3m.',
    },
  },
  {
    id: 'cientista_forense',
    nome: 'Cientista Forense',
    descricao:
      'Você trabalhava coletando provas para a resolução de crimes, seja para a polícia, seja para uma empresa privada de investigação. Usava métodos e técnicas adquiridos através de uma graduação em uma área científica ou médica, além de cursos específicos. Recrutado para a Ordem por seus conhecimentos técnicos, seu trabalho não mudou muito - mas o tipo de que você investiga, sim.',
    pericias: ['Ciências', 'Investigação'],
    habilidade: {
      id: 'hab_origem_cientista_forense',
      nome: 'Investigação Científica',
      origem: 'Origem',
      descricao:
        'Uma vez por cena de investigação, você pode gastar uma ação livre para procurar pistas, usando Ciências no lugar da perícia que seria usada para tentar encontrar a pista em questão.',
    },
  },
  {
    id: 'jornalista',
    nome: 'Jornalista',
    descricao:
      'Uma espécie ameaçada de extinção, você atuava investigando notícias para um jornal, rede de televisão, blog, canal do YouTube... Você se juntou à Ordem porque descobriu algo relacionado ao paranormal, ou foi recrutado para investigar um caso específico. Seja como for, continua buscando a verdade - não mais para informar as pessoas, mas sim para protegê-las.',
    pericias: ['Atualidades', 'Investigação'],
    habilidade: {
      id: 'hab_origem_jornalista',
      nome: 'Fontes Confiáveis',
      origem: 'Origem',
      descricao:
        'Uma vez por sessão de jogo, você pode gastar 1 PE para contatar suas fontes - pessoas com acesso a informações nas quais você confia. Isso permite que você role novamente um teste já realizado para encontrar uma pista, com +5 de bônus, ou receba outra informação relevante (a critério do mestre).',
    },
  },
  {
    id: 'escritor',
    nome: 'Escritor',
    descricao:
      'Você ganhava a vida inventando mundos, pessoas e histórias - em outra palavras, escrevendo ficção. Em certo momento, seu trabalho tocou ou foi tocado pelo paranormal Talvez as suas histórias tenham gerado Medo, talvez a inspiração para ela viesse do Outro Lado desde o início. Recrutado pela Ordem, você agora luta para que a vida real tenha o final feliz que seus livros não tiveram.',
    pericias: ['Artes', 'Atualidades'],
    habilidade: {
      id: 'hab_origem_escritor',
      nome: 'Bagagem de Leitura',
      origem: 'Origem',
      descricao:
        'Por seu trabalho, você já leu - e aprendeu - de tudo um pouco. Uma vez por cena, pode gastar 2 PE para se tornar treinado em uma perícia qualquer até o fim da cena.',
    },
  },
  {
    id: 'revoltado',
    nome: 'Revoltado',
    descricao:
      'Alguma coisa aconteceu em sua juventude que fez com que você se rebelasse contra o mundo ao seu redor. Talvez seus parentes tenham sido ausentes, por escolha ou por algum evento trágico, talvez outra perda tenha marcado seu coração. Qualquer que seja a razão, você possui iguais doses de rebeldia e independência e, acima de tudo, aprendeu a se virar sozinho. Recrutado pela Ordem, você luta por vingança - ou para que outros não passem pelo que você passou.',
    pericias: ['Furtividade', 'Vontade'],
    habilidade: {
      id: 'hab_origem_revoltado',
      nome: 'Antes Só',
      origem: 'Origem',
      descricao:
        'Você recebe +1 na Defesa, em testes de perícias e em seu limite de PE por turno se estiver sem nenhum aliado em alcance curto.',
    },
  },
  {
    id: 'body_builder',
    nome: 'Body Builder',
    descricao:
      'Valendo-se de esforço e determinação incomparáveis, você buscou o desenvolvimento máximo dos seus músculos por meio de exercícios físicos intensos e regulares, além de uma rotina de alimentação que demandou o máximo de autocontrole.',
    pericias: ['Atletismo', 'Fortitude'],
    habilidade: {
      id: 'hab_origem_body_builder',
      nome: 'Saindo da Jaula',
      origem: 'Origem',
      descricao:
        'O êxtase de ir além dos limites do seu corpo é inebriante. Quando faz um teste usando Força ou Vigor (exceto Luta) você pode gastar 2 PE para receber +5 nesse teste.',
    },
  },
  {
    id: 'gauderio_abutre',
    nome: 'Gaudério Abutre',
    descricao:
      'Você fez parte dos valorosos Gaudérios Abutres. Mesmo longe do motoclube, ainda segue o lema "A gente morre por quem a gente ama".',
    pericias: ['Luta', 'Pilotagem'],
    habilidade: {
      id: 'hab_origem_gauderio_abutre',
      nome: 'Fraternidade Gaudéria',
      origem: 'Origem',
      descricao:
        'Uma vez por rodada, quando um aliado adjacente é alvo de um ataque ou efeito, você pode gastar 1 PE para trocar de lugar com este aliado e se tornar o alvo deste ataque ou efeito. Se fizer isso, em seu próximo turno você recebe +2 em testes de ataque contra o agressor.',
    },
  },
  {
    id: 'duble',
    nome: 'Dublê',
    descricao:
      'Você sempre combinou um gosto por alta velocidade, manobras ousadas e esportes radicais com uma total falta de noção do perigo. Sua busca incessante por adrenalina o fez seguir carreira de dublê, uma profissão que lhe permitiu enfrentar o risco das mais diversas formas. Agora à serviço da Ordem, você enfim enfrentará o Medo verdadeiro e poderá colocar sua coragem - e suas peripécias - à prova como nunca.',
    pericias: ['Pilotagem', 'Reflexos'],
    habilidade: {
      id: 'hab_origem_duble',
      nome: 'Destemido',
      origem: 'Origem',
      descricao:
        'Quando faz um teste de perícia para o qual uma falha terá como consequência direta dano ou uma condição negativa, você recebe +5 nesse teste.',
    },
  },
  {
    id: 'personal_trainer',
    nome: 'Personal Trainer',
    descricao:
      'Dedicado a aprender e ensinar sobre saúde corporal, você se tornou um modelo a ser seguido. Você ocupava seus dias elaborando treinos, ministrando aulas e acompanhando o desenvolvimento dos alunos, além de estar em constante processo de atualização para transformar indivíduos em pessoas saudáveis e até mesmo em atletas.',
    pericias: ['Atletismo', 'Ciências'],
    habilidade: {
      id: 'hab_origem_personal_trainer',
      nome: 'Todo Mundo Pagando 10',
      origem: 'Origem',
      descricao:
        'Você pode gastar uma ação de movimento e 2 PE para motivar sua equipe. Enquanto você estiver consciente, você e seus aliados em alcance curto recebem +2 em testes de perícia que usam Força e Agilidade (exceto Luta e Pontaria) até o fim da cena.',
    },
  },
]
