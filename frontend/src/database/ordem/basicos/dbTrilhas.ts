import type { Trilha } from '@/types/ordem/models'

export const DB_TRILHAS: Trilha[] = [
  // TRILHAS DE COMBATENTE
  {
    id: 'trilha_agente',
    classeId: 'classe_combatente',
    nome: 'Agente Secreto',
    descricao:
      'Às vezes, um governo precisa lidar com um problema de forma discreta — por precisar operar fora de sua jurisdição, para não assustar a população ou por vários outros motivos. Quando esse é o caso, usam-se agentes secretos, indivíduos treinados para trabalhar sozinhos ou em pequenos grupos, que contam apenas com suas próprias habilidades, determinação e sorrisos carismáticos. Você se tornou um desses agentes e, por suas capacidades, foi escolhido para a missão mais confidencial de todas — trabalhar com a Ordo Realitas para proteger a humanidade contra o Outro Lado.',
    habilidades: [
      {
        id: 'hab_agente_2',
        lvl: 2,
        nome: 'Carteirada',
        descricao:
          'Escolha uma perícia entre Diplomacia ou Enganação. Você recebe treinamento na perícia escolhida ou, se já for treinado, recebe +2 nela. Como parte do esforço conjunto da sua agência e da Ordem, no início de cada missão você recebe documentos que lhe fornecem privilégios jurídicos especiais. Esses documentos podem incluir a sua identidade verdadeira ou não, e podem ser individuais ou incluir os demais membros da sua equipe (conforme apropriado à missão). Os benefícios específicos desses documentos ficam a critério do mestre, mas em geral incluem acesso a locais restritos ou proibidos, permissão para portar armas de fogo e autoridade para assumir a jurisdição de investigações da polícia. Pessoas comuns não conseguem perceber que seus documentos são falsos, mas membros de agências de segurança ou indivíduos veteranos em Crime podem desconfiar de sua veracidade. Os documentos contam como itens operacionais que não ocupam espaço — mas cuidado para não perdê-los em locais onde novos não podem ser fornecidos!',
        origem: 'Trilha',
      },
      {
        id: 'hab_agente_8',
        lvl: 8,
        nome: 'O Sorriso',
        descricao:
          'Em seu trabalho como agente, você aprendeu que se manter contido com um sorriso “sincero” e palavras gentis são ferramentas muito eficientes em uma investigação. Você recebe +2 em Diplomacia e Enganação e, quando falha em um teste de uma dessas perícias, pode gastar 2 PE para repetir a rolagem (apenas uma vez por teste), mas deve aceitar o novo resultado, mesmo que seja pior que o primeiro. Por fim, uma vez por cena, você pode fazer um teste de Diplomacia para acalmar a si mesmo.',
        origem: 'Trilha',
      },
      {
        id: 'hab_agente_13',
        lvl: 13,
        nome: 'Método Investigativo',
        descricao:
          'Acostumado a vasculhar locais em segredo, você aprendeu a ser rápido ou “controlar a situação” antes que coisas ruins aconteçam. A urgência de qualquer cena de investigação em que você esteja presente aumenta em 1 rodada. Além disso, quando o mestre faz uma rolagem na tabela de eventos de investigação, você pode gastar 2 PE para transformar o resultado em “sem evento”. Você pode usar este efeito mais de uma vez na mesma cena, mas a cada uso adicional seu custo aumenta em +2 PE.',
        origem: 'Trilha',
      },
      {
        id: 'hab_agente_20',
        lvl: 20,
        nome: 'Multifacetado',
        descricao:
          'Viver sob vários disfarces tem sido útil, mas você faz isso há tanto tempo que talvez nem se lembre mais quem é de verdade. Essas habilidades que surgem quando você precisa foram aprendidas em disfarces anteriores, ou são apenas sua mente buscando uma saída? Uma vez por cena, você pode gastar 5 pontos de Sanidade para receber todas as habilidades de até NEX 65% de uma trilha de combatente ou especialista à sua escolha (você deve cumprir quaisquer pré-requisitos específicos da trilha). Você pode usar essas habilidades até o fim da cena, mas não pode escolher a mesma trilha mais de uma vez na mesma missão. Os pontos de Sanidade gastos para ativar essa habilidade só podem ser recuperados ao fim da missão.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_aniquilador1',
    classeId: 'classe_combatente',
    nome: 'Aniquilador',
    descricao:
      'Você é treinado para abater alvos com eficiência e velocidade. Suas armas são suas melhores amigas e você cuida tão bem delas quanto de seus companheiros de equipe. Talvez até melhor',
    habilidades: [
      {
        id: 'hab_aniquilador_2',
        lvl: 2,
        nome: 'A Favorita',
        descricao:
          'Escolha uma arma para ser sua favorita, como katana ou fuzil de assalto. A categoria da arma escolhida é reduzida em I.',
        origem: 'Trilha',
      },
      {
        id: 'hab_aniquilador_8',
        lvl: 8,
        nome: 'Técnica Secreta',
        descricao:
          'A categoria da arma favorita passa a ser reduzida em II. Quando faz um ataque com ela, você pode gastar 2 PE para executar um dos efeitos abaixo como parte do ataque. Você pode adicionar mais efeitos gastando +2 PE por efeito adicional. <br> <b>Amplo:</b> O ataque pode atingir um alvo adicional em seu alcance e adjacente ao original (use o mesmo teste de ataque para ambos). <br> <b>Destruidor:</b> Aumenta o multiplicador de crítico da arma em +1.',
        origem: 'Trilha',
      },
      {
        id: 'hab_aniquilador_13',
        lvl: 13,
        nome: 'Técnica Sublime',
        descricao:
          'Você adiciona os seguintes efeitos à lista de sua Técnica Secreta: <br> <b>Letal:</b> Aumenta a margem de ameaça em +2. Você pode escolher este efeito duas vezes para aumentar a margem de ameaça em +5. <br> <b>Perfurante:</b> Ignora até 5 pontos de resistência a dano de qualquer tipo do alvo.',
        origem: 'Trilha',
      },
      {
        id: 'hab_aniquilador_20',
        lvl: 20,
        nome: 'Máquina de Matar',
        descricao:
          'A categoria da arma favorita passa a ser reduzida em III, ela recebe +2 na margem de ameaça e seu dano aumenta em um dado do mesmo tipo.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_cacador',
    classeId: 'classe_combatente',
    nome: 'Caçador',
    descricao:
      'Em um mundo cheio de predadores sobrenaturais, você decidiu não ser mais uma presa. Valendo-se de relatos de segunda mão, notícias de jornais e relatórios de incidentes inexplicáveis, você reúne informações sobre como caçar as coisas que espreitam na escuridão.',
    habilidades: [
      {
        id: 'hab_cacador_2',
        lvl: 2,
        nome: 'Rastrear o Paranormal',
        descricao:
          'Você estudou criaturas paranormais o suficiente para saber como identificar seus sinais e seguir seus rastros. Você recebe treinamento em Sobrevivência ou, se já for treinado nesta perícia, recebe +2 nela. Além disso, pode usar essa perícia no lugar de Ocultismo para identificar criaturas e no lugar de Investigação e Percepção para perceber e encontrar rastros, pistas e criaturas que tenham traços paranormais.',
        origem: 'Trilha',
      },
      {
        id: 'hab_cacador_8',
        lvl: 8,
        nome: 'Estudar Fraquezas',
        descricao:
          'Você acredita que todo ser, mesmo aqueles do Outro Lado, tem uma fraqueza. E você vai encontrá-la… você precisa! Você pode gastar uma ação de interlúdio estudando as fraquezas de um ser específico, como uma criatura paranormal ou um membro de um culto. Para isso, você precisa de uma pista diretamente ligada ao ser, como uma parte do seu corpo ou de suas vestes. Ao fim dos estudos, você recebe uma informação útil sobre o ser. Isso pode ser uma característica relevante (“a criatura é do elemento Sangue”) ou uma informação sobre seus hábitos (“apesar de matar qualquer coisa, ela parece preferir idosos”). Além das informações, para cada pista você recebe +1 em testes de perícia contra a criatura até o fim da missão. Cada pista fornece apenas uma informação e, a critério do mestre, informações diferentes podem exigir pistas específicas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_cacador_13',
        lvl: 13,
        nome: 'Atacar das Sombras',
        descricao:
          'Você aprende a usar as sombras contra o Paranormal. Você não sofre a penalidade de -1d20 em testes de Furtividade por se mover ao seu deslocamento normal e, se estiver usando uma arma que não faça barulho (como uma faca ou um arco), a penalidade que você sofre em Furtividade por atacar na mesma rodada é reduzida para -1d20. Além disso, sua visibilidade inicial em cenas de furtividade (veja p. 92) é sempre 1 ponto abaixo da inicial (podendo ser negativa).',
        origem: 'Trilha',
      },
      {
        id: 'hab_cacador_20',
        lvl: 20,
        nome: 'Estudar a Presa',
        descricao:
          'Você sabe que eles são mais fortes e que para derrotá-los precisará revelar todos os seus segredos. Quando usa Estudar Fraquezas contra uma criatura paranormal ou um cultista, você pode transformar o tipo desse ser em sua “presa”. Contra seres desse tipo, você recebe +O em testes de perícia, +1 na margem de ameaça e no multiplicador de crítico e resistência a dano 5. Você só pode ter um tipo de ser como presa ao mesmo tempo.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_comandante',
    classeId: 'classe_combatente',
    nome: 'Comandante de Campo',
    descricao:
      'Sem um oficial uma batalha não passa de uma briga de bar. Você é treinado para coordenar e auxiliar seus companheiros em combate, tomando decisões rápidas e tirando melhor proveito da situação e do talento de seus aliados.',
    habilidades: [
      {
        id: 'hab_comandante_2',
        lvl: 2,
        nome: 'Inspirar Confiança',
        descricao:
          'Sua liderança inspira seus aliados. Você pode gastar uma reação e 2 PE para fazer um aliado em alcance curto rolar novamente um teste recém realizado.',
        origem: 'Trilha',
      },
      {
        id: 'hab_comandante_8',
        lvl: 8,
        nome: 'Estrategista',
        descricao:
          'Você pode direcionar aliados em alcance curto. Gaste uma ação padrão e 1 PE por aliado que quiser direcionar (limitado pelo seu Intelecto). No próximo turno dos aliados afetados, eles ganham uma ação de movimento adicional.',
        origem: 'Trilha',
      },
      {
        id: 'hab_comandante_13',
        lvl: 13,
        nome: 'Brecha na Guarda',
        descricao:
          'Uma vez por rodada, quando um aliado causar dano em um inimigo que esteja em seu alcance curto, você pode gastar uma reação e 2 PE para que você ou outro aliado em alcance curto faça um ataque adicional contra o mesmo inimigo. Além disso, o alcance de inspirar confiança e estrategista aumenta para médio.',
        origem: 'Trilha',
      },
      {
        id: 'hab_comandante_20',
        lvl: 20,
        nome: 'Oficial Comandante',
        descricao:
          'Você pode gastar uma ação padrão e 5 PE para que cada aliado que você possa ver em alcance médio receba uma ação padrão adicional no próximo turno dele.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_guerreiro',
    classeId: 'classe_combatente',
    nome: 'Guerreiro',
    descricao:
      'Você treinou sua musculatura e movimentos a ponto de transformar seu corpo em uma verdadeira arma. Com golpes corpo a corpo tão poderosos quanto uma bala, você enfrenta inimigos sem medo.',
    habilidades: [
      {
        id: 'hab_guerreiro_2',
        lvl: 2,
        nome: 'Técnica Letal',
        descricao:
          'Você recebe um aumento de +2 na margem de ameaça com todos os seus ataques corpo a corpo.',
        origem: 'Trilha',
      },
      {
        id: 'hab_guerreiro_8',
        lvl: 8,
        nome: 'Revidar',
        descricao:
          'Sempre que bloquear um ataque, você pode gastar uma reação e 2 PE para fazer um ataque corpo a corpo no inimigo que o atacou.',
        origem: 'Trilha',
      },
      {
        id: 'hab_guerreiro_13',
        lvl: 13,
        nome: 'Força Opressora',
        descricao:
          'Quando acerta um ataque corpo a corpo, você pode gastar 1 PE para realizar uma manobra derrubar ou empurrar contra o alvo do ataque como ação livre. Se escolher empurrar, recebe um bônus de +5 para cada 10 pontos de dano que causou no alvo. Se escolher derrubar e vencer no teste oposto, você pode gastar 1 PE para fazer um ataque adicional contra o alvo caído.',
        origem: 'Trilha',
      },
      {
        id: 'hab_guerreiro_20',
        lvl: 20,
        nome: 'Potência Máxima',
        descricao:
          'Quando usa seu Ataque Especial com armas corpo a corpo, todos os bônus numéricos são dobrados. Por exemplo, se usar 5 PE para receber +5 no ataque e +15 no dano, você recebe +10 no ataque e +30 no dano.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_monstruoso',
    classeId: 'classe_combatente',
    nome: 'Monstruoso',
    descricao:
      'Muito se fala sobre os ocultistas escolherem o caminho de tornarem sua mente uma porta para o paranormal, na tentativa de usá-lo contra ele mesmo, mas de vez em quando, um combatente é corajoso ou insano o bastante para fazer o mesmo com seu corpo. Você propositalmente desfigura e altera seu corpo para que as Entidades o invadam com maior intensidade; contudo, para sua infelicidade, os métodos para isso costumam ser brutais. Combatentes dessa trilha que chegam aos níveis mais altos de exposição inevitavelmente perdem o controle e se tornam inimigos da Ordem. Especial: esta trilha usa a “Progressão de NEX” apresentada na regra opcional Nível de Experiência e Nível de Exposição (p. 98), mesmo que esta regra em si não esteja sendo usada. O personagem recebe todas as alterações apropriadas ao seu NEX descritas na progressão e, se a regra de Nível de Experiência estiver em uso, recebe o dobro de NEX sempre que se expõe ao paranormal.',
    habilidades: [
      {
        id: 'hab_monstruoso_2',
        lvl: 2,
        nome: 'Ser Amaldiçoado',
        descricao:
          'Em suas veias corre uma maldição paranormal que aos poucos o está transformando em um monstro. Você se torna treinado em Ocultismo (se já for treinado, em vez disso recebe +2 nessa perícia). Escolha um elemento paranormal entre Sangue, Morte, Conhecimento ou Energia. Uma vez por dia, você precisa executar uma etapa ritualística desse elemento (por exemplo, beber sangue humano para Sangue, inalar cinzas de mortos para Morte, tatuar palavras que causam medo para Conhecimento ou receber choques de cabos elétricos para Energia). Se fizer isso, até o fim do dia você recebe os efeitos descritos a seguir, conforme o elemento escolhido. Caso contrário, você sofre de fome e sede nesse dia (OPRPG, p. 292). Por fim, se adquirir afinidade com um elemento, deverá escolher aquele selecionado para esta habilidade. <br> <b> SANGUE </b> Suas presas ficam protuberantes e seus olhos se tornam vermelhos. Você recebe resistência a balístico e Sangue 5 e faro e, quando faz um contra-ataque bem-sucedido, soma seu Vigor na rolagem de dano, mas sofre -1d20 em Ciências e Intuição. <br> <b> MORTE </b> Você fica pálido e seu metabolismo se torna bem mais lento. Você recebe resistência a perfuração e Morte 5 e imunidade a fadiga e soma sua Força em seu total de pontos de vida, mas sofre -1d20 em Diplomacia e Enganação. <br> <b> CONHECIMENTO </b> Seus olhos são banhados em um dourado sobrenatural. Você recebe resistência a balístico e Conhecimento 5 e visão no escuro e soma seu Intelecto na Defesa, mas sofre -1d20 em Atletismo e Acrobacia. <br> <b> ENERGIA </b> Sua pele ganha cicatrizes de queimaduras elétricas com múltiplas cores. Você recebe resistência a corte, eletricidade, fogo e Energia 5 e soma sua Agilidade na RD recebida por um bloqueio bem-sucedido, mas sofre -1d20 em Investigação e Percepção.',
        origem: 'Trilha',
      },
      {
        id: 'hab_monstruoso_8',
        lvl: 8,
        nome: 'Ser Macabro',
        descricao:
          'Conforme sua humanidade é substituída pela Entidade, as mudanças em seu corpo e mente se intensificam. A resistência a dano que você recebe por executar a etapa ritualística de seu elemento aumenta para 10, enquanto a penalidade em perícias aumenta para -2O. Por fim, quando executa sua etapa ritualística, você recebe os efeitos adicionais incluídos na descrição de seu elemento, a seguir. <br> <b> SANGUE </b> Você veste poucas roupas, expondo o máximo de sua pele sensível ao ambiente que puder. Seu corpo já está repleto de cicatrizes e feridas, muitas causadas por você mesmo para saborear a dor. Devorar qualquer coisa que não seja carne ou sangue não é capaz de conter sua fome. Você pode usar Força para calcular seus pontos de esforço (em vez de Presença). Além disso, pode gastar uma ação de movimento e 1 ou mais PE (limitado por sua Força) para recuperar 1d8 PV por PE gasto. <br> <b> MORTE </b> Roupas modernas e complexas não parecem fazer sentido pra você. Seus trajes são anacrônicos e simples, às vezes adornado de cristais, esqueletos de pequenas criaturas pendurados, pedras, raízes e plantas mortas. Você recebe +O em Intimidação e pode usar Vigor para calcular seus pontos de esforço (em vez de Presença). Além disso, morre se iniciar quatro turnos morrendo na mesma cena (e não apenas três) e não precisa mais comer ou beber para viver, mas ainda sofre da fome paranormal causada por essa trilha. <br> <b> CONHECIMENTO </b> Você está sempre vestindo joias de ouro puro ou roupas com ouro em suas linhas. Seu corpo está quase inteiramente coberto de palavras que evocam medo, como famosas últimas frases ou pedidos de socorro. Você já sabe que é superior a todos eles. Seu Intelecto aumenta em +1. Além disso, você pode usar Intelecto como atributo-chave para Enganação e para calcular seus pontos de esforço (em vez de Presença). <br> <b> ENERGIA </b> Você está sempre vestindo roupas complexas e modernas, com luzes brilhantes e dispositivos conectados a baterias e à sua pele para receber pequenos choques estimulantes. Você pode usar Agilidade como atributo-chave para calcular seus pontos de esforço (em vez de Presença). Além disso, quando acerta um ataque corpo a corpo, pode gastar 1 ou mais PE (limitado por sua Agilidade). Se fizer isso, seu ataque causa +1d6 pontos de dano de Energia para cada 1 PE gasto.',
        origem: 'Trilha',
      },
      {
        id: 'hab_monstruoso_13',
        lvl: 13,
        nome: 'Ser Assustador',
        descricao:
          'Como um parasita, você sente a Entidade andar por todo o seu corpo, fazendo de você uma morada. A resistência a dano que você recebe por executar a etapa ritualística de seu elemento aumenta para 15, mas sua Presença é reduzida permanentemente em 1. Por fim, quando executa sua etapa ritualística, você recebe os seguintes efeitos adicionais associados ao seu elemento. <br> <b> SANGUE </b> Você dilacerou seus próprios órgãos sensitivos, como olhos, nariz e orelhas, para que possa sentir com total intensidade o sabor e a dor da sua existência. Arames farpados e lâminas enroladas em seu corpo permitem que você não pare de sentir. A esse ponto, a palavra “não” já parece ser um conceito inútil para suas decisões: você está disposto a aceitar tudo, provar de tudo, sofrer tudo. Você tem 50% de chance de ignorar o dano adicional de um acerto crítico ou ataque furtivo. Além disso, recebe uma arma natural de mordida (dano 1d8, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, você pode gastar 1 PE para fazer um ataque corpo a corpo extra com a mordida. <br> <b> MORTE </b> O Lodo preto da Morte faz parte do seu consumo diário, ele se espalha pelo seu organismo apodrecendo seu sistema, mantendo-o vivo através da morte. Não é incomum você ser considerado um “acumulador de lixo”: é difícil diferenciar um animal vivo de um galho morto, pois perante a Morte todas as coisas são iguais. No início de cada turno em que estiver morrendo, você pode fazer um teste de Vigor (DT 15). Se passar, encerra a condição morrendo e acorda com 1 PV. Além disso, sempre que faz um acerto crítico em combate ou reduz um inimigo a 0 PV, você recupera 2 PE. <br> <b> CONHECIMENTO </b> Você injeta e ingere ouro líquido esporadicamente e não há mais espaço para tatuagens. Ler, reler e escrever novos registros faz parte da sua rotina extremamente organizada e metódica. Você pode deixar de ser treinado em uma de suas perícias para receber um número de dados de bônus igual ao seu Intelecto. Até o fim da cena, sempre que fizer um teste, você pode gastar um desses dados de bônus para receber +O nesse teste. Você recupera todas as perícias treinadas perdidas dessa forma ao final de seu próximo interlúdio. <br> <b> ENERGIA </b> A intensidade dos choques aumenta, além de ter conectado em suas veias pequenos tubos para gotejamento de ácido. Respirar através de uma máscara de gás para inalar alucinógenos a todo momento deixa tudo mais divertido, colorido e caótico. Sua resistência a dano passa a se aplicar também a dano químico. Além disso, você pode extrair energia de fontes elétricas; para isso, deve gastar uma ação de movimento e tocar uma fonte de eletricidade. Você recupera uma quantidade de PE conforme o tipo de fonte: 1d4 PE para um dispositivo portátil, como um tablet ou celular, 2d4 PE para um dispositivo grande, como uma moto ou um carro elétrico, e 4d4 para uma fonte do tamanho de uma casa. Usar este efeito descarrega completamente a fonte e sobrecarrega seus circuitos, que se tornam incapazes de transmitir energia.',
        origem: 'Trilha',
      },
      {
        id: 'hab_monstruoso_20',
        lvl: 20,
        nome: 'Ser Aterrorizante',
        descricao:
          'Você foi transformado no habitat perfeito para a entidade que reside no interior de seu corpo e mente. Os efeitos por executar sua etapa ritualística se tornam permanentes (mas você ainda precisa executá-la para evitar sentir fome e sede) e você passa a ser considerado uma criatura paranormal para efeitos de habilidades e itens. Além disso, a resistência a dano que você recebe por essa trilha aumenta para 20 e você recebe os seguintes efeitos adicionais associados ao seu elemento. <br> <b>SANGUE</b> Você se move como uma criatura bestial; não existe sensibilidade ou empatia. Apenas o instinto e a necessidade de consumir mais. Se o resultado é devorar, essa é a decisão correta. Pensamentos são esporádicos e raros, como pequenos sustos de humanidade que são engolidos pelo fluxo que banha o Outro Lado. Seu Intelecto diminui em -1 e sua Força aumenta em +1. Sempre que causa dano com sua mordida em um ser, você recupera 5 PV (esse ganho também é multiplicado em um acerto crítico). Além disso, você aprende o ritual Forma Monstruosa. Entretanto, seu desejo de assumir essa forma pode sobrepujar sua própria vontade; sempre que sofre dano, você deve fazer um teste de Vontade (DT 10 + o dano sofrido). Se falhar e não estiver sob efeito de Forma Monstruosa, sua próxima ação padrão deve ser conjurar esse ritual (se não puder, você perde a ação). <br> <b>MORTE</b> Você está morto, mas ainda é forçado a existir. Sua aparência é a de um cadáver apodrecido, todos os seus órgãos foram consumidos pela Morte e, por dedicar sua existência inteira à entidade, você se tornou imortal. Preso na eternidade de cada segundo, você ainda é arrastado pela Realidade pela percepção alheia, pois mesmo que sua mente tenha se tornado o próprio tempo, todas as coisas precisam de um fim. Sua Presença diminui em -1 e seu Vigor aumenta em +1. Você recebe imunidade a dano de Morte e se torna imortal (se morrer, você volta à vida no dia seguinte, sendo “restaurado” pelo Lodo). Entretanto, se for reduzido a 0 PV por dano de fogo ou Energia, seu Lodo é destruído e você não retorna à vida. Por fim, você aprende o ritual Fim Inevitável. <br> <b>CONHECIMENTO</b> Sua boca desapareceu após você costurá-la com fios dourados, pois ninguém é digno do seu ensinamento. Seus olhos aumentaram e ficaram mais profundos, com escleras negras. Todos os seus membros se alongaram e ficaram mais finos. Suas tatuagens e textos se converteram em sigilos do Outro Lado. A verdade que você deve esquecer está atrás de uma porta dourada, e você consegue enxergá-la, mas sabe que ao abri-la, irá perder tudo. Sua Força diminui em -1 e seu Intelecto aumenta em +1. Além disso, você recebe Percepção às Cegas e aprende um ritual de Conhecimento de 4º círculo a sua escolha. Entretanto, sempre que conjura esse ritual, você perde a memória de tudo que vivenciou desde o início da cena. <br> <b>ENERGIA</b> Tudo faz parte de você e você é tudo. Você se tornou uma metamorfose ambulante, assumindo uma forma plasmática que não pode ser descrita nem como líquida, sólida ou gasosa. Seu corpo flutua alguns centímetros acima do chão e não é mais possível segurar objetos, afinal tudo que você toca também se torna parte de você enquanto está em contato. Seus traços físicos mudam constantemente e você não pode ser mais descrito com apenas uma aparência definitiva. Decisões lógicas não fazem mais parte da sua vida, o Caos é inevitável. Sua Força diminui em -1 e sua Agilidade aumenta em +1. Você pode pairar a 1,5m do chão com deslocamento 12m (o que permite que ignore terreno difícil e o torna imune a dano por queda), pode passar por qualquer espaço por onde uma criatura Minúscula poderia passar e se torna imune a condições de paralisia de origem física (como ser agarrado ou enredado). Por fim, você aprende o ritual Deflagração de Energia. Entretanto, você não pode mais se beneficiar de itens vestidos e, por não ter corpo físico, só consegue manipular objetos com sua mente; você pode manipular um objeto dessa forma por vez, e apenas objetos que poderia manipular com suas duas mãos.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_operacoes',
    classeId: 'classe_combatente',
    nome: 'Operações Especiais',
    descricao:
      'Você é um combatente eficaz. Suas ações são calculadas e otimizadas, sempre antevendo os movimentos inimigos e se posicionando da maneira mais inteligente no campo de batalha.',
    habilidades: [
      {
        id: 'hab_operacoes_2',
        lvl: 2,
        nome: 'Iniciativa Aprimorada',
        descricao:
          'Você recebe +5 em Iniciativa e uma ação de movimento adicional na primeira rodada.',
        origem: 'Trilha',
      },
      {
        id: 'hab_operacoes_8',
        lvl: 8,
        nome: 'Ataque Extra',
        descricao:
          'Uma vez por rodada, quando faz um ataque, você pode gastar 2 PE para fazer um ataque adicional.',
        origem: 'Trilha',
      },
      {
        id: 'hab_operacoes_13',
        lvl: 13,
        nome: 'Surto de Adrenalina',
        descricao:
          'Uma vez por rodada, você pode gastar 5 PE para realizar uma ação padrão ou de movimento adicional.',
        origem: 'Trilha',
      },
      {
        id: 'hab_operacoes_20',
        lvl: 20,
        nome: 'Sempre Alerta',
        descricao: 'Você recebe uma ação padrão adicional no início de cada cena de combate.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_tropa',
    classeId: 'classe_combatente',
    nome: 'Tropa de Choque',
    descricao:
      'Você é duro na queda. Treinou seu corpo para resistir a traumas físicos, tornando-o praticamente inquebrável, e por isso não teme se colocar entre seus aliados e o perigo.',
    habilidades: [
      {
        id: 'hab_tropa_2',
        lvl: 2,
        nome: 'Casca Grossa',
        descricao:
          'Você recebe +1 PV para cada 1 LVL e, quando faz um bloqueio, soma seu Vigor na resistência a dano recebida.',
        origem: 'Trilha',
      },
      {
        id: 'hab_tropa_8',
        lvl: 8,
        nome: 'Cai Dentro',
        descricao:
          'Sempre que um oponente em alcance curto ataca um de seus aliados, você pode gastar uma reação e 1 PE para fazer com que esse oponente faça um teste de Vontade (DT Vig). Se falhar, o oponente deve atacar você em vez de seu aliado. Este poder só funciona se você puder ser efetivamente atacado e estiver no alcance do ataque (por exemplo, adjacente a um oponente atacando em corpo a corpo ou dentro do alcance de uma arma de ataque à distância). Um oponente que passe no teste de Vontade não pode ser afetado por seu poder Cai Dentro até o final da cena.',
        origem: 'Trilha',
      },
      {
        id: 'hab_tropa_13',
        lvl: 13,
        nome: 'Duro de Matar',
        descricao:
          'Ao sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade. Em LVL 17, você pode usar esta habilidade para reduzir dano paranormal.',
        origem: 'Trilha',
      },
      {
        id: 'hab_tropa_20',
        lvl: 20,
        nome: 'Inquebrável',
        descricao:
          'Enquanto estiver machucado, você recebe +5 na Defesa e resistência a dano 5. Enquanto estiver morrendo, em vez do normal, você não fica indefeso e ainda pode realizar ações. Você ainda segue as regras de morte normalmente',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  // TRILHAS DE Especialista
  {
    id: 'trilha_atirador',
    classeId: 'classe_especialista',
    nome: 'Atirador de Elite',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_atirador_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_atirador_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_atirador_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_atirador_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_bibliotecario',
    classeId: 'classe_especialista',
    nome: 'Bibliotecário',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_bibliotecario_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_bibliotecario_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_bibliotecario_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_bibliotecario_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_infiltrador',
    classeId: 'classe_especialista',
    nome: 'Infiltrador',
    descricao:
      'Você é um perito em infiltração e sabe neutralizar alvos desprevenidos sem causar alarde. Combinando talento acrobático, destreza manual e conhecimento técnico você é capaz de superar qualquer barreira de defesa, mesmo quando a missão parece impossível.',
    habilidades: [
      {
        id: 'hab_infiltrador_2',
        lvl: 2,
        nome: 'Ataque Furtivo',
        descricao:
          'Você sabe atingir os pontos vitais de um inimigo distraído. Uma vez por rodada, quando atinge um alvo desprevenido com um ataque corpo a corpo ou em alcance curto, ou um alvo que você esteja flanqueando, você pode gastar 1 PE para causar +1d6 pontos de dano do mesmo tipo da arma. Em NEX 40% o dano adicional aumenta para +2d6, em NEX 65% aumenta para +3d6 e em NEX 99% aumenta para +4d6.',
        origem: 'Trilha',
      },
      {
        id: 'hab_infiltrador_8',
        lvl: 8,
        nome: 'Gatuno',
        descricao:
          'Você recebe +5 em Atletismo e Crime e pode percorrer seu deslocamento normal quando se esconder sem penalidade (veja a perícia Furtividade).',
        origem: 'Trilha',
      },
      {
        id: 'hab_infiltrador_13',
        lvl: 13,
        nome: 'Assassinar',
        descricao:
          'Você pode gastar uma ação de movimento e 3 PE para analisar um alvo em alcance curto. Até o fim de seu próximo turno, seu primeiro Ataque Furtivo que causar dano a ele tem seus dados de dano extras dessa habilidade dobrados. Além disso, se sofrer dano de seu ataque, o alvo fica inconsciente ou morrendo, à sua escolha (Fortitude DT Agi evita).',
        origem: 'Trilha',
      },
      {
        id: 'hab_infiltrador_20',
        lvl: 20,
        nome: 'Sombra Fugaz',
        descricao:
          'Quando faz um teste de Furtividade após atacar ou fazer outra ação chamativa, você pode gastar 3 PE para não sofrer a penalidade de -3d20 no teste.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_medico',
    classeId: 'classe_especialista',
    nome: 'Médico de Campo',
    descricao:
      'Você é treinado em técnicas de primeiros socorros e tratamento de emergência, o que torna você um membro valioso para qualquer grupo de agentes. Ao contrário dos profissionais de saúde convencionais, você está acostumado com o campo de batalha e sabe tomar decisões rápidas no meio do caos. Especial: para escolher esta trilha, você precisa ser treinado em Medicina. Para usar as habilidades desta trilha, você precisa possuir um kit de medicina.',
    habilidades: [
      {
        id: 'hab_medico_2',
        lvl: 2,
        nome: 'Paramédico',
        descricao:
          'Você pode usar uma ação padrão e 2 PE para curar 2d10 pontos de vida de si mesmo ou de um aliado adjacente. Você pode curar +1d10 PV respectivamente em NEX 40%, 65% e 99%, gastando +1 PE por dado adicional de cura.',
        origem: 'Trilha',
      },
      {
        id: 'hab_medico_8',
        lvl: 8,
        nome: 'Equipe de Trauma',
        descricao:
          'Você pode usar uma ação padrão e 2 PE para remover uma condição negativa (exceto morrendo) de um aliado adjacente.',
        origem: 'Trilha',
      },
      {
        id: 'hab_medico_13',
        lvl: 13,
        nome: 'Resgate',
        descricao:
          'Uma vez por rodada, se estiver em alcance curto de um aliado machucado ou morrendo, você pode se aproximar do aliado com uma ação livre (desde que seja capaz de fazê-lo usando seu deslocamento normal). Além disso, sempre que curar PV ou remover condições do aliado, você e o aliado recebem +5 na Defesa até o início de seu próximo turno. Por fim, para você, o total de espaços ocupados por carregar um personagem é reduzido pela metade.',
        origem: 'Trilha',
      },
      {
        id: 'hab_medico_20',
        lvl: 20,
        nome: 'Reanimação',
        descricao:
          'Uma vez por cena, você pode gastar uma ação completa e 10 PE para trazer de volta à vida um personagem que tenha morrido na mesma cena (exceto morte por dano massivo).',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_muambeiro',
    classeId: 'classe_especialista',
    nome: 'Muambeiro',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_muambeiro_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_muambeiro_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_muambeiro_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_muambeiro_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_negociador',
    classeId: 'classe_especialista',
    nome: 'Negociador',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_negociador_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_negociador_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_negociador_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_negociador_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_perseverante',
    classeId: 'classe_especialista',
    nome: 'Perseverante',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_perseverante_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_perseverante_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_perseverante_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_perseverante_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_tecnico',
    classeId: 'classe_especialista',
    nome: 'Técnico',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_tecnico_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_tecnico_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_tecnico_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_tecnico_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  // TRILHAS DE Ocultista
  {
    id: 'trilha_conduite',
    classeId: 'classe_ocultista',
    nome: 'Conduite',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_conduite_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_conduite_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_conduite_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_conduite_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_exorcista',
    classeId: 'classe_ocultista',
    nome: 'Exorcista',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_exorcista_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_exorcista_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_exorcista_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_exorcista_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_flagelador',
    classeId: 'classe_ocultista',
    nome: 'Flagelador',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_flagelador_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_flagelador_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_flagelador_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_flagelador_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_graduado',
    classeId: 'classe_ocultista',
    nome: 'Graduado',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_graduado_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_graduado_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_graduado_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_graduado_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_intuitivo',
    classeId: 'classe_ocultista',
    nome: 'Intuitivo',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_intuitivo_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_intuitivo_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_intuitivo_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_intuitivo_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_lamina',
    classeId: 'classe_ocultista',
    nome: 'Lâmina Paranormal',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_lamina_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_lamina_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_lamina_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_lamina_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_parapsicologo',
    classeId: 'classe_ocultista',
    nome: 'Parapsicólogo',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_parapsicologo_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_parapsicologo_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_parapsicologo_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_parapsicologo_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 0,
  },
  {
    id: 'trilha_possuido',
    classeId: 'classe_ocultista',
    nome: 'Possuído',
    descricao:
      'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
    habilidades: [
      {
        id: 'hab_possuido_2',
        lvl: 2,
        nome: 'Mira de Elite',
        descricao:
          'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.',
        origem: 'Trilha',
      },
      {
        id: 'hab_possuido_8',
        lvl: 8,
        nome: 'Disparo Letal',
        descricao:
          'Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.',
        origem: 'Trilha',
      },
      {
        id: 'hab_possuido_13',
        lvl: 13,
        nome: 'Disparo Impactante',
        descricao:
          'Quando ataca com uma arma de fogo, você pode gastar 2 PE e, em vez de causar dano, fazer uma manobra entre derrubar, desarmar, empurrar ou quebrar.',
        origem: 'Trilha',
      },
      {
        id: 'hab_possuido_20',
        lvl: 20,
        nome: 'Atirar para Matar',
        descricao:
          'Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.',
        origem: 'Trilha',
      },
    ],
    base_pp: 3,
  },
]