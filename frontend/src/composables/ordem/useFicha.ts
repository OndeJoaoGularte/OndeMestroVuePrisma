import { ref, computed, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid' // Instale: npm i uuid @types/uuid
import { MOCK_SHEET } from '@/mocks/data'

// Importação dos Tipos
import type {
  CharacterSheet,
  Atributo,
  Pericia,
  Habilidade,
  BaseItem,
  ProtecaoBase,
  Modificacao,
  Maldicao,
  ItemInstancia, // <--- NOME CORRETO
  HabilidadeInstancia,
  ArmaBase, // <--- NOVO
} from '@/types/ordem/models'

// Importação dos Bancos de Dados
import {
  DB_ARMA_MODS,
  DB_PROTECAO_MODS,
  DB_ACESSORIO_MODS,
} from '@/database/ordem/inventario/dbMod'
import {
  DB_ARMA_MALDS,
  DB_PROTECAO_MALDS,
  DB_ACESSORIO_MALDS,
} from '@/database/ordem/inventario/dbMald'
import { DB_CLASSES } from '@/database/ordem/basicos/dbClasses'
import { DB_TRILHAS } from '@/database/ordem/basicos/dbTrilhas'
import { DB_ORIGENS } from '@/database/ordem/basicos/dbOrigens'

// =========================================
// TYPES LOCAIS E AUXILIARES
// =========================================

interface AddItemData {
  baseItem: BaseItem
  nomePersonalizado?: string
  equipado: boolean
  quantidade: number
  danoPersonalizado?: string
  criticoPersonalizado?: string
}

// Tipo enriquecido para uso no frontend (Visualização)
// Ele extende o ItemInstancia mas já traz os objetos de Mods/Maldições resolvidos para exibir na tela
export type ItemProcessado = ItemInstancia & {
  modificacoesObjetos: Modificacao[]
  maldicoesObjetos: Maldicao[]
  // Campos calculados para combate
  atributoAtaque?: Atributo
  periciaAtaque?: string
}

const STORAGE_KEY = 'ficha_ativa_ordem'

// =========================================
// ESTADO GLOBAL
// =========================================

const carregarEstadoInicial = (): CharacterSheet => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      return { ...MOCK_SHEET, ...parsed }
    } catch (e) {
      console.error('Erro ao ler ficha salva', e)
    }
  }
  return JSON.parse(JSON.stringify(MOCK_SHEET))
}

const character = ref<CharacterSheet>(carregarEstadoInicial())
const snackbar = ref({ show: false, text: '', color: 'success' })

export function useFichaOrdem() {
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (JSON.stringify(parsed) !== JSON.stringify(character.value)) {
          character.value = { ...character.value, ...parsed }
        }
      } catch (e) {
        console.error(e)
      }
    }
    inicializarAtributosSelecionados()
  })

  watch(
    character,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true },
  )

  // =========================================
  // 1. DADOS ESTÁTICOS
  // =========================================
  const opcoesFiltroAtributo: Atributo[] = ['AGI', 'FOR', 'INT', 'PRE', 'VIG']
  const opcoesAtributo: Atributo[] = ['AGI', 'FOR', 'INT', 'PRE', 'VIG']

  const opcoesTreino = ref([
    { title: 'Não Treinado (0)', value: 0 },
    { title: 'Treinado (+5)', value: 5 },
    { title: 'Veterano (+10)', value: 10 },
    { title: 'Expert (+15)', value: 15 },
  ])

  const opcoesFiltroHabilidades = ref([
    'Classe',
    'Origem',
    'Peso da Idade',
    'Trilha',
    'Poder de Classe',
    'Poder Paranormal',
    'Efeito Paranormal',
  ])

  const opcoesFiltroRitual = ref(['Sangue', 'Morte', 'Conhecimento', 'Energia'])
  const opcoesFiltroCirculo = ref([1, 2, 3, 4])
  const opcoesCredito = ref(['Baixo', 'Médio', 'Alto', 'Ilimitado'])
  const opcoesElementos = ref(['Nenhum', 'Sangue', 'Morte', 'Conhecimento', 'Energia'])
  const opcoesPatentes = ref([
    'Recruta',
    'Operador',
    'Agente Especial',
    'Oficial de Operações',
    'Agente de Elite',
  ])

  // =========================================
  // 2. FILTROS DA UI
  // =========================================
  const searchPericia = ref('')
  const filtroAtributos = ref<Atributo[]>([])
  const selectedAtributos = ref<Record<string, Atributo>>({})

  const searchItem = ref('')
  const searchHabilidade = ref('')
  const filtroHabilidades = ref<string[]>([])
  const searchRitual = ref('')
  const filtroRitualElemento = ref<string[]>([])
  const filtroRitualCirculo = ref<number[]>([])

  // =========================================
  // 3. COMPUTED: INVENTÁRIO INTELIGENTE
  // =========================================

  // Maps apenas para resolver IDs de Mods/Maldições para Objetos (para exibir nome/descrição)
  const armaModMap = computed(() => new Map(DB_ARMA_MODS.map((m) => [m.id, m])))
  const protecaoModMap = computed(() => new Map(DB_PROTECAO_MODS.map((m) => [m.id, m])))
  const acessorioModMap = computed(() => new Map(DB_ACESSORIO_MODS.map((m) => [m.id, m])))

  const armaMaldMap = computed(() => new Map(DB_ARMA_MALDS.map((m) => [m.id, m])))
  const protecaoMaldMap = computed(() => new Map(DB_PROTECAO_MALDS.map((m) => [m.id, m])))
  const acessorioMaldMap = computed(() => new Map(DB_ACESSORIO_MALDS.map((m) => [m.id, m])))

  const personagemInventarioCompleto = computed<ItemProcessado[]>(() => {
    if (!character.value?.inventario) return []

    return character.value.inventario.map((invItem) => {
      // invItem JÁ É o objeto completo (ItemInstancia), pois fizemos a cópia ao adicionar.
      // Não precisamos buscar em baseItemMap.

      const processado: ItemProcessado = {
        ...invItem,
        modificacoesObjetos: [],
        maldicoesObjetos: [],
        atributoAtaque: 'FOR', // Padrão
        periciaAtaque: 'Luta', // Padrão
      }

      // 1. Resolver Mods e Maldições (IDs -> Objetos)
      if (invItem.tipo === 'Arma') {
        processado.modificacoesObjetos = invItem.modificacoesIds
          .map((id) => armaModMap.value.get(id))
          .filter(Boolean) as Modificacao[]
        processado.maldicoesObjetos = invItem.maldicoesIds
          .map((id) => armaMaldMap.value.get(id))
          .filter(Boolean) as Maldicao[]

        // Definir lógica de ataque baseada no item
        processado.periciaAtaque = invItem.teste_ataque || 'Luta'
        if (invItem.teste_ataque === 'Pontaria') processado.atributoAtaque = 'AGI'
        if (invItem.teste_ataque === 'Ocultismo') processado.atributoAtaque = 'INT'
      } else if (invItem.tipo === 'Protecao') {
        processado.modificacoesObjetos = invItem.modificacoesIds
          .map((id) => protecaoModMap.value.get(id))
          .filter(Boolean) as Modificacao[]
        processado.maldicoesObjetos = invItem.maldicoesIds
          .map((id) => protecaoMaldMap.value.get(id))
          .filter(Boolean) as Maldicao[]
      } else if (invItem.tipo === 'Acessorio') {
        processado.modificacoesObjetos = invItem.modificacoesIds
          .map((id) => acessorioModMap.value.get(id))
          .filter(Boolean) as Modificacao[]
        processado.maldicoesObjetos = invItem.maldicoesIds
          .map((id) => acessorioMaldMap.value.get(id))
          .filter(Boolean) as Maldicao[]
      }

      return processado
    })
  })

  const filtroCategorias = ref<string[]>([])
  const opcoesFiltroCategoria = ['Arma', 'Protecao', 'Acessorio', 'Municao', 'Geral']

  const inventarioFiltrado = computed(() => {
    let lista = personagemInventarioCompleto.value

    // 1. Filtro de Texto
    if (searchItem.value) {
      lista = lista.filter((item) =>
        item.nome.toLowerCase().includes(searchItem.value.toLowerCase())
      )
    }

    // 2. Filtro de Categoria (Igual ao de Habilidades)
    if (filtroCategorias.value.length > 0) {
      lista = lista.filter((item) => filtroCategorias.value.includes(item.tipo))
    }

    return lista
  })

  // 1. Filtrar APENAS Armas e forçar a tipagem para ArmaBase
  const armasEquipadas = computed(() => {
    return personagemInventarioCompleto.value.filter(
      (item) => item.tipo === 'Arma'
    ) as (ItemProcessado & ArmaBase)[] 
    // ^-- O 'as' garante ao TS que esses itens têm propriedades de Arma (dano, critico)
  })

  // 2. Filtrar APENAS Proteções e forçar a tipagem para ProtecaoBase
  const protecoesEquipadas = computed(() => {
    return personagemInventarioCompleto.value.filter(
      (item) => item.tipo === 'Protecao'
    ) as (ItemProcessado & ProtecaoBase)[]
    // ^-- O 'as' garante ao TS que esses itens têm defesa e resistencia_dano
  })

  const itensPorCategoria = computed(() => {
    const contagem: number[] = [0, 0, 0, 0] // 1. Tipagem explícita
    for (const item of personagemInventarioCompleto.value) {
      if (typeof item.categoria === 'number' && item.categoria >= 1 && item.categoria <= 4) {
        const index = item.categoria - 1
        // 2. Garantia de acesso
        if (contagem[index] !== undefined) {
          contagem[index]++
        }
      }
    }
    return contagem
  })

  // =========================================
  // 4. LISTAS FILTRADAS
  // =========================================
  const periciasFiltradas = computed(() => {
    let list = character.value?.pericias || []
    if (searchPericia.value)
      list = list.filter((p) => p.nome.toLowerCase().includes(searchPericia.value.toLowerCase()))
    if (filtroAtributos.value.length)
      list = list.filter((p) => filtroAtributos.value.includes(p.atributo_base))
    return list
  })

  const habilidadesFiltradas = computed(() => {
    let list = character.value?.habilidades || []
    if (searchHabilidade.value)
      list = list.filter((h) => h.nome.toLowerCase().includes(searchHabilidade.value.toLowerCase()))
    if (filtroHabilidades.value.length)
      list = list.filter((h) => h.origem && filtroHabilidades.value.includes(h.origem))

    // Ordenação
    const getSortOrder = (origem: string | undefined) => {
      if (!origem) return 99
      // Substituímos 'any' por 'Record<string, number>'
      const map: Record<string, number> = {
        Classe: 1,
        Origem: 2,
        Trilha: 3,
        'Poder de Classe': 4,
        'Poder Paranormal': 5,
        'Efeito Paranormal': 6,
      }
      return map[origem] || 99
    }
    // Adicionei (a.origem || '') para evitar erro se origem for undefined
    return [...list].sort((a, b) => getSortOrder(a.origem) - getSortOrder(b.origem))
  })

  const rituaisFiltrados = computed(() => {
    let list = character.value?.rituais || []
    if (searchRitual.value)
      list = list.filter((r) => r.nome.toLowerCase().includes(searchRitual.value.toLowerCase()))
    if (filtroRitualElemento.value.length)
      list = list.filter((r) => filtroRitualElemento.value.includes(r.elemento))
    if (filtroRitualCirculo.value.length)
      list = list.filter((r) => filtroRitualCirculo.value.includes(r.circulo))
    return list
  })

  // =========================================
  // 5. INFO GERAL E DERIVADOS
  // =========================================
  const limitesPorPatente = computed(() => {
    const p = character.value?.patente
    if (p === 'Recruta') return [2, 0, 0, 0]
    if (p === 'Operador') return [3, 1, 0, 0]
    if (p === 'Agente Especial') return [3, 2, 1, 0]
    if (p === 'Oficial de Operações') return [3, 3, 2, 1]
    if (p === 'Agente de Elite') return [3, 3, 3, 2]
    return [0, 0, 0, 0]
  })

  const defesaPassivaCalculada = computed(() => {
    if (!character.value) return 0
    const agi = Number(character.value.agilidade) || 0
    let defProtecao = 0

    // Soma defesas de itens equipados
    protecoesEquipadas.value.forEach((p) => {
      // AQUI ESTÁ A CORREÇÃO:
      // Dizemos ao TS: "Confie em mim, se está nessa lista, é uma ProtecaoBase"
      const protecao = p as unknown as ProtecaoBase
      defProtecao += protecao.defesa || 0
    })

    const manual = Number(character.value.defesa_protecao) || 0
    const outros = Number(character.value.defesa_bonus) || 0
    return 10 + agi + defProtecao + manual + outros
  })

  const classeNome = computed(
    () => DB_CLASSES.find((c) => c.id === character.value.classe)?.nome || 'Nenhuma',
  )
  const trilhaNome = computed(
    () => DB_TRILHAS.find((t) => t.id === character.value.trilha)?.nome || 'Nenhuma',
  )
  const classeTrilhaNome = computed(
    () => `${classeNome.value} ${trilhaNome.value !== 'Nenhuma' ? '- ' + trilhaNome.value : ''}`,
  )
  const origemNome = computed(
    () => DB_ORIGENS.find((o) => o.id === character.value.origem)?.nome || 'Nenhuma',
  )

  const idadeCalculada = computed(() => {
      if (!character.value) return 0
      const parseDate = (dateStr: string): Date | null => {
        if (!dateStr || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return null
        const parts = dateStr.split('/').map(Number)
        if (parts[0] === undefined || parts[1] === undefined || parts[2] === undefined) return null
        return new Date(parts[2], parts[1] - 1, parts[0])
      }
      const dataAtual = '15/01/2023'
      const birthDate = parseDate(character.value.dataNascimento || '')
      const currentDate = parseDate(dataAtual)
      if (!birthDate || !currentDate) return '?'
      let idadeBase = currentDate.getFullYear() - birthDate.getFullYear()
      const m = currentDate.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
        idadeBase--
      }
      const envelhecido = Number(character.value.idadeEnvelhecida) || 0
      return idadeBase + envelhecido
    })

  const opcoesTrilhaFiltradas = computed(() =>
    DB_TRILHAS.filter((t) => t.classeId === character.value.classe),
  )

  // =========================================
  // 6. WATCHERS (Regras de Classe/Origem)
  // =========================================

  // Patente automática por prestígio
  watch(
    () => character.value.prestigio,
    (val) => {
      if (val < 20) character.value.patente = 'Recruta'
      else if (val < 50) character.value.patente = 'Operador'
      else if (val < 100) character.value.patente = 'Agente Especial'
      else if (val < 200) character.value.patente = 'Oficial de Operações'
      else character.value.patente = 'Agente de Elite'
    },
  )

  // Mudança de Classe
  watch(
    () => character.value.classe,
    (novoId) => {
      if (!novoId) return
      const cls = DB_CLASSES.find((c) => c.id === novoId)
      if (!cls) return

      // Atualiza status base
      character.value.base_pv = cls.base_pv
      character.value.base_ps = cls.base_ps
      character.value.base_pe = cls.base_pe

      // Remove habilidades antigas de Classe e Trilha
      character.value.habilidades = character.value.habilidades.filter(
        (h) => h.origem !== 'Classe' && h.origem !== 'Trilha',
      )

      // Adiciona novas (gerando IDs únicos)
      cls.habilidades.forEach((h) => {
        character.value.habilidades.unshift({ ...h, instanceId: uuidv4(), baseHabilidadeId: h.id })
      })

      // Reseta trilha se incompatível
      const trilhaAtual = DB_TRILHAS.find((t) => t.id === character.value.trilha)
      if (trilhaAtual && trilhaAtual.classeId !== novoId) character.value.trilha = null
    },
  )

  // Mudança de Trilha
  watch(() => character.value.trilha, (novoId, antigoId) => {
      
      // 1. LIMPEZA: Remove habilidade da trilha anterior (se houver)
      if (antigoId) {
          const trilhaAntiga = DB_TRILHAS.find(t => t.id === antigoId)
          if (trilhaAntiga) {
              character.value.habilidades = character.value.habilidades.filter(
                  h => h.baseHabilidadeId !== trilhaAntiga.habilidade.id
              )
          }
      }

      // 2. ADIÇÃO: Adiciona nova habilidade e Configura PP
      if (novoId) {
          const novaTrilha = DB_TRILHAS.find(t => t.id === novoId)
          
          if (novaTrilha) {
              // Verifica se já não tem essa habilidade para evitar duplicação (o bug dos 5x)
              const jaPossui = character.value.habilidades.some(
                  h => h.baseHabilidadeId === novaTrilha.habilidade.id
              )

              if (!jaPossui) {
                  character.value.habilidades.push({
                      ...novaTrilha.habilidade,
                      instanceId: uuidv4(),
                      baseHabilidadeId: novaTrilha.habilidade.id,
                      origem: 'Trilha'
                  })
              }

              // Configura PP (Pontos de Possessão)
              if (novaTrilha.base_pp && novaTrilha.base_pp > 0) {
                  character.value.pp_max = novaTrilha.base_pp
                  // Se for a primeira vez selecionando, enche a barra
                  if (!character.value.pp_atual) { 
                      character.value.pp_atual = novaTrilha.base_pp 
                  }
              } else {
                  character.value.pp_max = 0
              }
          }
      } else {
          // Se desmarcou a trilha, zera PP
          character.value.pp_max = 0
      }
  }, { immediate: true })

  // Mudança de Origem
  watch(() => character.value.origem, (novoId, antigoId) => {
      
      // 1. LIMPEZA: Remove habilidade da origem anterior
      if (antigoId) {
          const origemAntiga = DB_ORIGENS.find(o => o.id === antigoId)
          if (origemAntiga) {
              character.value.habilidades = character.value.habilidades.filter(
                  h => h.baseHabilidadeId !== origemAntiga.habilidade.id
              )
          }
      }

      // 2. ADIÇÃO: Adiciona nova habilidade
      if (novoId) {
          const novaOrigem = DB_ORIGENS.find(o => o.id === novoId)
          
          if (novaOrigem) {
              // Verifica duplicidade para evitar bugs
              const jaPossui = character.value.habilidades.some(
                  h => h.baseHabilidadeId === novaOrigem.habilidade.id
              )

              if (!jaPossui) {
                  character.value.habilidades.push({
                      ...novaOrigem.habilidade,
                      instanceId: uuidv4(), // Gera ID único para a ficha
                      baseHabilidadeId: novaOrigem.habilidade.id,
                      origem: 'Origem' // Tag para o filtro funcionar
                  })
              }

              // 3. BONUS: Treina automaticamente as perícias da origem
              if (novaOrigem.pericias) {
                  novaOrigem.pericias.forEach(nomePericia => {
                      const pericia = character.value.pericias.find(p => p.nome === nomePericia)
                      // Só treina se ainda for 0 (Não Treinado) para não sobrescrever Veterano/Expert
                      if (pericia && pericia.treino === 0) {
                          pericia.treino = 5
                      }
                  })
              }
          }
      }
  }, { immediate: true })

  // Recalculo de Barras (PV/PS/PE)
  watch(
    [
      () => character.value.classe,
      () => character.value.vigor,
      () => character.value.presenca,
      () => character.value.level,
    ],
    () => {
      const cls = DB_CLASSES.find((c) => c.id === character.value.classe)
      if (!cls) return

      const niv = Number(character.value.level) || 1
      const vig = Number(character.value.vigor) || 0
      const pre = Number(character.value.presenca) || 0

      // Fórmulas de Ordem
      character.value.pv_max = cls.base_pv + vig + (niv - 1) * (cls.bonus_pv + vig)
      character.value.ps_max = cls.base_ps + (niv - 1) * cls.bonus_ps
      character.value.pe_max = cls.base_pe + pre + (niv - 1) * (cls.bonus_pe + pre)

      // DT Rituais (10 + PE/Turno + PRE)
      const peTurno = character.value.pe_turno || 1
      character.value.dt_rituais = 10 + peTurno + pre
    },
    { immediate: true },
  )

  // =========================================
  // 7. ACTIONS (MÉTODOS)
  // =========================================
  const getAtributoBonus = (attr: Atributo) => {
    const map = {
      AGI: character.value.agilidade,
      FOR: character.value.forca,
      INT: character.value.intelecto,
      PRE: character.value.presenca,
      VIG: character.value.vigor,
    }
    return Number(map[attr]) || 0
  }

  const calcularBonusPericia = (p: Pericia) => (Number(p.treino) || 0) + (Number(p.outros) || 0)

  const rolarPericia = (p: Pericia) => {
    const attr = selectedAtributos.value[p.id] || p.atributo_base
    const dados = getAtributoBonus(attr)
    const bonus = calcularBonusPericia(p)

    const rolagens = []
    const qtd = dados <= 0 ? 2 : dados
    for (let i = 0; i < qtd; i++) rolagens.push(Math.floor(Math.random() * 20) + 1)

    let final = 0
    if (dados <= 0) final = Math.min(...rolagens)
    else final = Math.max(...rolagens)

    const total = final + bonus

    let msg = `${p.nome} (${attr}): [${rolagens.join(', ')}] + ${bonus} = ${total}`
    if (dados <= 0) msg += ' (Desvantagem)'

    snackbar.value = {
      show: true,
      text: msg,
      color: final === 20 ? 'purple' : final === 1 ? 'red' : 'success',
    }
  }

  const handleSaveIdade = (d: { nascimento: string; envelhecido: number }) => {
    character.value.dataNascimento = d.nascimento
    character.value.idadeEnvelhecida = d.envelhecido
  }

  const inicializarAtributosSelecionados = () => {
    if (!character.value) return
    const m: Record<string, Atributo> = {}
    character.value.pericias.forEach((p) => (m[p.id] = p.atributo_base))
    selectedAtributos.value = m
  }

  // ADICIONAR HABILIDADE (Cria instância)
  const adicionarHabilidade = (h: Habilidade) => {
    const nova: HabilidadeInstancia = { ...h, instanceId: uuidv4(), baseHabilidadeId: h.id }
    character.value.habilidades.push(nova)
    snackbar.value = { show: true, text: 'Habilidade adicionada!', color: 'success' }
  }

  const removerHabilidade = (id: string) => {
    const idx = character.value.habilidades.findIndex((h) => h.instanceId === id)
    if (idx > -1) character.value.habilidades.splice(idx, 1)
  }

  const atualizarHabilidade = (h: HabilidadeInstancia) => {
    const idx = character.value.habilidades.findIndex((x) => x.instanceId === h.instanceId)
    if (idx > -1) character.value.habilidades[idx] = h
  }

  // ADICIONAR ITEM (Clona e Cria instância)
  const adicionarItem = (dados: AddItemData) => {
    // Usamos 'as ItemInstancia' no final para forçar o TypeScript a aceitar
    // que este objeto híbrido corresponde ao tipo da união.
    const novoItem = {
      ...dados.baseItem,

      instanceId: uuidv4(),
      baseItemId: dados.baseItem.id,
      equipado: dados.equipado,
      modificacoesIds: [],
      maldicoesIds: [],

      nome: dados.nomePersonalizado || dados.baseItem.nome,

      // Lógica ternária para preencher apenas se for arma (mas salvando string vazia se não for)
      dano: dados.danoPersonalizado || (dados.baseItem.tipo === 'Arma' ? dados.baseItem.dano : ''),
      critico:
        dados.criticoPersonalizado ||
        (dados.baseItem.tipo === 'Arma' ? dados.baseItem.critico : ''),
    } as ItemInstancia // <--- AQUI A CORREÇÃO

    character.value.inventario.push(novoItem)
    snackbar.value = { show: true, text: `${novoItem.nome} adicionado!`, color: 'success' }
  }

  const removerItem = (id: string) => {
    const idx = character.value.inventario.findIndex((i) => i.instanceId === id)
    if (idx > -1) character.value.inventario.splice(idx, 1)
  }

  const atualizarItem = (itemEditado: ItemInstancia) => {
    const index = character.value.inventario.findIndex((i) => i.instanceId === itemEditado.instanceId)
    if (index > -1) {
      character.value.inventario[index] = itemEditado
      snackbar.value = { show: true, text: 'Item atualizado com sucesso!', color: 'success' }
    }
  }

  const rolarAtaque = (arma: ItemProcessado) => {
    const attrKey = arma.atributoAtaque || 'FOR'
    const dados = getAtributoBonus(attrKey)
    const periciaNome = arma.periciaAtaque || 'Luta'
    const pericia = character.value.pericias.find((p) => p.nome === periciaNome)
    const bonus = pericia ? calcularBonusPericia(pericia) : 0

    const rolagens = []
    const qtd = dados <= 0 ? 2 : dados
    for (let i = 0; i < qtd; i++) rolagens.push(Math.floor(Math.random() * 20) + 1)

    let final = 0
    if (dados <= 0) final = Math.min(...rolagens)
    else final = Math.max(...rolagens)

    const total = final + bonus

    // Detecta critico (COM PROTEÇÃO DE TIPO)
    let margem = 20

    // Verifica se é ARMA antes de tentar acessar .critico
    if (arma.tipo === 'Arma' && arma.critico) {
      const match = arma.critico.match(/(\d+)/)
      if (match) margem = parseInt(match[0])
    }

    const isCrit = final >= margem
    snackbar.value = {
      show: true,
      text: `Ataque ${arma.nome}: [${rolagens.join(', ')}] + ${bonus} = ${total} ${isCrit ? '(CRÍTICO!)' : ''}`,
      color: isCrit ? 'purple' : 'success',
    }
  }

  // Helpers visuais
  const getAtributoColor = (a: string) => {
    const map: Record<string, string> = {
      AGI: 'blue',
      FOR: 'red',
      INT: 'purple',
      PRE: 'green',
      VIG: 'yellow',
    }
    return map[a] || 'grey'
  }
  const getRitualColor = (e: string) => {
    const map: Record<string, string> = {
      Sangue: 'red-darken-2',
      Energia: 'purple-darken-2',
      Morte: 'grey-darken-3',
      Conhecimento: 'yellow-darken-3',
    }
    return map[e] || 'grey'
  }
  const getHabilidadeColor = (o: string) => {
    const map: Record<string, string> = {
      Classe: 'red',
      Origem: 'green',
      Trilha: 'orange',
      'Poder Paranormal': 'indigo',
    }
    return map[o] || 'grey'
  }

  return {
    character,
    snackbar,
    // Filtros
    searchPericia,
    filtroAtributos,
    selectedAtributos,
    searchItem,
    searchHabilidade,
    filtroHabilidades,
    searchRitual,
    filtroRitualElemento,
    filtroRitualCirculo,
    // Opções
    opcoesFiltroAtributo,
    opcoesAtributo,
    opcoesTreino,
    opcoesFiltroHabilidades,
    opcoesFiltroRitual,
    opcoesFiltroCirculo,
    opcoesCredito,
    opcoesElementos,
    opcoesPatentes,
    opcoesTrilhaFiltradas,
    // Computed
    personagemInventarioCompleto,
    filtroCategorias,
    opcoesFiltroCategoria,
    inventarioFiltrado,
    armasEquipadas,
    protecoesEquipadas,
    itensPorCategoria,
    periciasFiltradas,
    habilidadesFiltradas,
    rituaisFiltrados,
    limitesPorPatente,
    defesaPassivaCalculada,
    classeNome,
    trilhaNome,
    classeTrilhaNome,
    origemNome,
    idadeCalculada,
    // Actions
    getAtributoBonus,
    calcularBonusPericia,
    rolarPericia,
    handleSaveIdade,
    getAtributoColor,
    getRitualColor,
    getHabilidadeColor,
    adicionarHabilidade,
    atualizarHabilidade,
    removerHabilidade,
    adicionarItem,
    removerItem,
    atualizarItem,
    rolarAtaque,
  }
}
