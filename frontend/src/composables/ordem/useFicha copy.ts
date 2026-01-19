import { ref, computed, watch, onMounted } from 'vue'
import { MOCK_SHEET } from '@/mocks/data'

// Importação dos Tipos
import type {
  CharacterSheet,
  Atributo,
  Pericia,
  Habilidade,
  BaseItem,
  ArmaBase,
  ProtecaoBase,
  Modificacao,
  Maldicao,
  InventarioItem // Adicionado para tipagem correta
} from '@/types/ordem/models'

// Importação dos Bancos de Dados
import { DB_BASE_ITEMS } from '@/database/ordem/inventario/dbItems'
import { DB_ARMA_MODS, DB_PROTECAO_MODS, DB_ACESSORIO_MODS } from '@/database/ordem/inventario/dbMod'
import { DB_ARMA_MALDS, DB_PROTECAO_MALDS, DB_ACESSORIO_MALDS } from '@/database/ordem/inventario/dbMald'
import { DB_CLASSES } from '@/database/ordem/basicos/dbClasses'
import { DB_TRILHAS } from '@/database/ordem/basicos/dbTrilhas'
import { DB_ORIGENS } from '@/database/ordem/basicos/dbOrigens'

// =========================================
// TYPES LOCAIS (Para evitar any)
// =========================================
interface AddItemData {
  baseItem: BaseItem;
  nomePersonalizado?: string;
  equipado: boolean;
  quantidade: number;
  danoPersonalizado?: string;
  criticoPersonalizado?: string;
  atributoAtaque?: Atributo;
  periciaAtaque?: string;
}

// Tipo para a arma processada no computed 'armasEquipadas'
type ArmaEquipada = ArmaBase & {
  instanceId: string;
  equipado: boolean;
  modificacoes: Modificacao[];
  maldicoes: Maldicao[];
  // Propriedades opcionais que podem vir do InventarioItem customizado
  atributoAtaque?: Atributo; 
  periciaAtaque?: string;
}

// =========================================
// ESTADO GLOBAL (FORA DA FUNÇÃO)
// =========================================
const STORAGE_KEY = 'ficha_ativa_ordem'

// Inicializa tentando pegar do storage, senão usa o Mock
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
  return MOCK_SHEET
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
  // 1. DADOS ESTÁTICOS E OPÇÕES (UI DATA)
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
    'Classe', 'Origem', 'Peso da Idade', 'Trilha',
    'Poder de Classe', 'Poder Paranormal', 'Efeito Paranormal',
  ])

  const opcoesFiltroRitual = ref(['Sangue', 'Morte', 'Conhecimento', 'Energia'])
  const opcoesFiltroCirculo = ref([1, 2, 3, 4])
  const opcoesCredito = ref(['Baixo', 'Médio', 'Alto', 'Ilimitado'])
  const opcoesElementos = ref(['Nenhum', 'Sangue', 'Morte', 'Conhecimento', 'Energia'])
  const opcoesPatentes = ref([
    'Recruta', 'Operador', 'Agente Especial', 'Oficial de Operações', 'Agente de Elite',
  ])

  // =========================================
  // 2. ESTADO DE FILTROS DA UI
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
  // 3. MAPAS DE PERFORMANCE (LOOKUPS)
  // =========================================
  const baseItemMap = computed(() => new Map(DB_BASE_ITEMS.map((item) => [item.id, item])))
  const armaModMap = computed(() => new Map(DB_ARMA_MODS.map((mod) => [mod.id, mod])))
  const protecaoModMap = computed(() => new Map(DB_PROTECAO_MODS.map((mod) => [mod.id, mod])))
  const acessorioModMap = computed(() => new Map(DB_ACESSORIO_MODS.map((mod) => [mod.id, mod])))
  const armaMaldMap = computed(() => new Map(DB_ARMA_MALDS.map((mald) => [mald.id, mald])))
  const protecaoMaldMap = computed(() => new Map(DB_PROTECAO_MALDS.map((mald) => [mald.id, mald])))
  const acessorioMaldMap = computed(() => new Map(DB_ACESSORIO_MALDS.map((mald) => [mald.id, mald])))

  // =========================================
  // 4. COMPUTED PROPERTIES
  // =========================================

  const personagemInventarioCompleto = computed(() => {
    if (!character.value || !character.value.inventario) return []
    return character.value.inventario
      .map((invItem) => {
        const baseItem = baseItemMap.value.get(invItem.baseItemId)
        if (!baseItem) return null

        // Mescla dados do banco com dados da instância (incluindo overrides personalizados)
        const itemHydrated = {
          ...baseItem,
          ...invItem, // Sobrescreve campos base se existirem na instância (ex: nomePersonalizado se mapeado)
          instanceId: invItem.id,
          equipado: invItem.equipado,
          // Garante arrays
          modificacoes: [] as Modificacao[],
          maldicoes: [] as Maldicao[],
        }

        switch (baseItem.tipo) {
          case 'Arma':
            itemHydrated.modificacoes = invItem.modificacoesIds
              .map((id) => armaModMap.value.get(id)).filter(Boolean) as Modificacao[]
            itemHydrated.maldicoes = invItem.maldicoesIds
              .map((id) => armaMaldMap.value.get(id)).filter(Boolean) as Maldicao[]
            break
          case 'Protecao':
            itemHydrated.modificacoes = invItem.modificacoesIds
              .map((id) => protecaoModMap.value.get(id)).filter(Boolean) as Modificacao[]
            itemHydrated.maldicoes = invItem.maldicoesIds
              .map((id) => protecaoMaldMap.value.get(id)).filter(Boolean) as Maldicao[]
            break
          case 'Acessorio':
            itemHydrated.modificacoes = invItem.modificacoesIds
              .map((id) => acessorioModMap.value.get(id)).filter(Boolean) as Modificacao[]
            itemHydrated.maldicoes = invItem.maldicoesIds
              .map((id) => acessorioMaldMap.value.get(id)).filter(Boolean) as Maldicao[]
            break
        }
        return itemHydrated
      })
      .filter(Boolean) as (BaseItem & {
        instanceId: string
        equipado: boolean
        modificacoes: Modificacao[]
        maldicoes: Maldicao[]
        // Campos opcionais de combate
        atributoAtaque?: Atributo
        periciaAtaque?: string
      })[]
  })

  const inventarioFiltrado = computed(() => {
    const inventario = personagemInventarioCompleto.value
    if (!searchItem.value) return inventario
    return inventario.filter((item) =>
      item.nome.toLowerCase().includes(searchItem.value.toLowerCase()),
    )
  })

  const armasEquipadas = computed(() => {
    return personagemInventarioCompleto.value.filter(
      (item) => item.tipo === 'Arma' && item.equipado,
    ) as ArmaEquipada[]
  })

  const protecoesEquipadas = computed(() => {
    return personagemInventarioCompleto.value.filter(
      (item) => item.tipo === 'Protecao' && item.equipado,
    ) as (ProtecaoBase & { instanceId: string; equipado: boolean; modificacoes: Modificacao[] })[]
  })

  const itensPorCategoria = computed(() => {
    const contagem = [0, 0, 0, 0]
    for (const item of personagemInventarioCompleto.value) {
      if (item.categoria >= 1 && item.categoria <= 4) {
        const index = item.categoria - 1
        if (contagem[index] !== undefined) {
          contagem[index]++
        }
      }
    }
    return contagem
  })

  const periciasFiltradas = computed(() => {
    const pericias = character.value?.pericias
    if (!pericias) return []
    let filtradas = [...pericias]
    if (searchPericia.value) {
      filtradas = filtradas.filter((p) =>
        p.nome.toLowerCase().includes(searchPericia.value.toLowerCase()),
      )
    }
    if (filtroAtributos.value.length > 0) {
      filtradas = filtradas.filter((p) => filtroAtributos.value.includes(p.atributo_base))
    }
    return filtradas
  })

  const habilidadesFiltradas = computed(() => {
    let lista = character.value?.habilidades || []
    if (searchHabilidade.value) {
      lista = lista.filter((h) =>
        h.nome.toLowerCase().includes(searchHabilidade.value.toLowerCase()),
      )
    }
    if (filtroHabilidades.value.length > 0) {
      lista = lista.filter((h) => h.origem && filtroHabilidades.value.includes(h.origem))
    }
    const getSortOrder = (origem: string) => {
      switch (origem) {
        case 'Classe': return 1
        case 'Origem': return 2
        case 'Peso da Idade': return 3
        case 'Trilha': return 4
        case 'Poder de Classe': return 5
        case 'Poder Paranormal': return 6
        case 'Efeito Paranormal': return 7
        default: return 99
      }
    }
    lista.sort((a, b) => getSortOrder(a.origem) - getSortOrder(b.origem))
    return lista
  })

  const rituaisFiltrados = computed(() => {
    const rituais = character.value?.rituais
    if (!rituais) return []
    let filtrados = [...rituais]
    if (searchRitual.value) {
      filtrados = filtrados.filter((r) =>
        r.nome.toLowerCase().includes(searchRitual.value.toLowerCase()),
      )
    }
    if (filtroRitualElemento.value.length > 0) {
      filtrados = filtrados.filter((r) => filtroRitualElemento.value.includes(r.elemento))
    }
    if (filtroRitualCirculo.value.length > 0) {
      filtrados = filtrados.filter((r) => filtroRitualCirculo.value.includes(r.circulo))
    }
    return filtrados
  })

  // --- INFO DO PERSONAGEM ---
  const limitesPorPatente = computed(() => {
    const patente = character.value?.patente
    if (!patente) return [0, 0, 0, 0]
    switch (patente) {
      case 'Recruta': return [2, 0, 0, 0]
      case 'Operador': return [3, 1, 0, 0]
      case 'Agente Especial': return [3, 2, 1, 0]
      case 'Oficial de Operações': return [3, 3, 2, 1]
      case 'Agente de Elite': return [3, 3, 3, 2]
      default: return [0, 0, 0, 0]
    }
  })

  const defesaPassivaCalculada = computed(() => {
    if (!character.value) return 0
    const agi = Number(character.value.agilidade) || 0
    const protecao = Number(character.value.defesa_protecao) || 0
    const outros = Number(character.value.defesa_bonus) || 0
    return 10 + agi + protecao + outros
  })

  const classeTrilhaNome = computed(() => {
    if (!character.value) return ''
    const classeObj = DB_CLASSES.find((c) => c.id === character.value.classe)
    const classeNome = classeObj ? classeObj.nome : 'Classe'
    const trilhaObj = DB_TRILHAS.find((t) => t.id === character.value.trilha)
    const trilhaNome = trilhaObj ? trilhaObj.nome : ''
    return `${classeNome} ${trilhaNome}`.trim()
  })

  const classeNome = computed(() => {
    if (!character.value) return 'Nenhuma'
    const classe = DB_CLASSES.find((c) => c.id === character.value.classe)
    return classe ? classe.nome : 'Nenhuma'
  })

  const trilhaNome = computed(() => {
    if (!character.value) return 'Nenhuma'
    const trilha = DB_TRILHAS.find((t) => t.id === character.value.trilha)
    return trilha ? trilha.nome : 'Nenhuma'
  })

  const origemNome = computed(() => {
    if (!character.value) return 'Nenhuma'
    const origem = DB_ORIGENS.find((o) => o.id === character.value.origemId)
    return origem ? origem.nome : 'Nenhuma'
  })

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

  const opcoesTrilhaFiltradas = computed(() => {
    const classeIdSelecionada = character.value.classe
    return DB_TRILHAS.filter((trilha) => trilha.classeId === classeIdSelecionada)
  })

  // =========================================
  // 5. WATCHERS (REGRAS DE NEGÓCIO)
  // =========================================

  watch(
    computed(() => character.value.prestigio),
    (newPrestigio: number) => {
      if (newPrestigio < 20) character.value.patente = 'Recruta'
      else if (newPrestigio < 50) character.value.patente = 'Operador'
      else if (newPrestigio < 100) character.value.patente = 'Agente Especial'
      else if (newPrestigio < 200) character.value.patente = 'Oficial de Operações'
      else character.value.patente = 'Agente de Elite'
    },
    { immediate: true },
  )

  watch(
    computed(() => character.value.classe),
    (novaClasseId) => {
      if (!novaClasseId) return
      const novaClasse = DB_CLASSES.find((c) => c.id === novaClasseId)
      if (!novaClasse) return

      character.value.base_pv = novaClasse.base_pv
      character.value.base_ps = novaClasse.base_ps
      character.value.base_pe = novaClasse.base_pe

      character.value.habilidades = character.value.habilidades.filter(
        (h) => h.origem !== 'Classe' && h.origem !== 'Trilha',
      )
      for (const novaHabilidade of novaClasse.habilidades) {
        character.value.habilidades.unshift(novaHabilidade)
      }
      
      const trilhaAtual = DB_TRILHAS.find((t) => t.id === character.value.trilha)
      if (trilhaAtual && trilhaAtual.classeId !== novaClasseId) {
        character.value.trilha = null
      }
    },
  )

  watch(
    computed(() => character.value.trilha),
    (novaTrilhaId, antigaTrilhaId) => {
      if (antigaTrilhaId) {
        const trilhaAntiga = DB_TRILHAS.find((t) => t.id === antigaTrilhaId)
        if (trilhaAntiga) {
          const index = character.value.habilidades.findIndex(
            (h) => h.id === trilhaAntiga.habilidade.id,
          )
          if (index > -1) character.value.habilidades.splice(index, 1)
        }
      }
      if (novaTrilhaId) {
        const novaTrilha = DB_TRILHAS.find((t) => t.id === novaTrilhaId)
        if (novaTrilha) {
          if (!character.value.habilidades.some((h) => h.id === novaTrilha.habilidade.id)) {
            character.value.habilidades.push(novaTrilha.habilidade)
          }
        }
      }
      if (!character.value) return
      const trilha = DB_TRILHAS.find((t) => t.id === character.value.trilha)
      if (!trilha || !trilha.base_pp) {
        character.value.pp_max = 0
        character.value.pp_atual = 0
        return
      }
      const novoMaxPP = trilha.base_pp
      character.value.pp_max = novoMaxPP
      if (
        character.value.pp_atual === 0 ||
        character.value.pp_atual > novoMaxPP
      ) {
        character.value.pp_atual = novoMaxPP
      }
    },
  )

  watch(
    computed(() => character.value.origemId),
    (novaOrigemId, antigaOrigemId) => {
      if (antigaOrigemId) {
        const idParaRemover = `origem_${antigaOrigemId}`
        const index = character.value.habilidades.findIndex((h) => h.id === idParaRemover)
        if (index > -1) {
          character.value.habilidades.splice(index, 1)
        }
      }

      if (novaOrigemId) {
        const origem = DB_ORIGENS.find((o) => o.id === novaOrigemId)
        if (origem) {
          const poderOrigem: Habilidade = {
            id: `origem_${origem.id}`,
            nome: origem.habilidade.nome,
            descricao: origem.habilidade.descricao,
            origem: 'Origem',
          }
          if (!character.value.habilidades.some((h) => h.id === poderOrigem.id)) {
            character.value.habilidades.push(poderOrigem)
          }

          for (const periciaNome of origem.pericias) {
            const pericia = character.value.pericias.find((p) => p.nome === periciaNome)
            if (pericia && pericia.treino < 5) {
              pericia.treino = 5
            }
          }
        }
      }
    },
    { immediate: true },
  )

  watch(
    [() => character.value.classe, () => character.value.vigor, () => character.value.level],
    () => {
      if (!character.value) return
      const classe = DB_CLASSES.find((c) => c.id === character.value.classe)
      if (!classe) return
      const base = classe.base_pv
      const vigor = Number(character.value.vigor) || 0
      const level = Number(character.value.level) || 1
      const bonus_pv_por_nivel = classe.bonus_pv + vigor
      const novoMaxPV = base + vigor + (level - 1) * bonus_pv_por_nivel
      character.value.pv_max = novoMaxPV

      if (character.value.pv_atual === 0 && novoMaxPV > 0) {
        character.value.pv_atual = novoMaxPV
      }
    },
    { immediate: true },
  )

  watch(
    [() => character.value.classe, () => character.value.level],
    () => {
      if (!character.value) return
      const classe = DB_CLASSES.find((c) => c.id === character.value.classe)
      if (!classe) return
      const base = classe.base_ps
      const level = Number(character.value.level) || 1
      const bonus_ps_por_nivel = classe.bonus_ps
      const novoMaxPS = base + (level - 1) * bonus_ps_por_nivel
      character.value.ps_max = novoMaxPS

      if (character.value.ps_atual === 0 && novoMaxPS > 0) {
        character.value.ps_atual = novoMaxPS
      }
    },
    { immediate: true },
  )

  watch(
    [() => character.value.classe, () => character.value.presenca, () => character.value.level],
    () => {
      if (!character.value) return
      const classe = DB_CLASSES.find((c) => c.id === character.value.classe)
      if (!classe) return
      const base = classe.base_pe
      const presenca = Number(character.value.presenca) || 0
      const level = Number(character.value.level) || 1
      const bonus_pe_por_nivel = classe.bonus_pe + presenca
      const novoMaxPE = base + presenca + (level - 1) * bonus_pe_por_nivel
      character.value.pe_max = novoMaxPE

      if (character.value.pe_atual === 0 && novoMaxPE > 0) {
        character.value.pe_atual = novoMaxPE
      }
    },
    { immediate: true },
  )

  // =========================================
  // 6. ACTIONS (MÉTODOS)
  // =========================================
  const getAtributoBonus = (atributo: Atributo): number => {
    if (!character.value) return 0
    switch (atributo) {
      case 'AGI': return Number(character.value.agilidade) || 0
      case 'FOR': return Number(character.value.forca) || 0
      case 'INT': return Number(character.value.intelecto) || 0
      case 'PRE': return Number(character.value.presenca) || 0
      case 'VIG': return Number(character.value.vigor) || 0
      default: return 0
    }
  }

  const calcularBonusPericia = (pericia: Pericia): number => {
    const bonusTreino = Number(pericia.treino) || 0
    const bonusOutros = Number(pericia.outros) || 0
    return bonusTreino + bonusOutros
  }

  const rolarPericia = (pericia: Pericia) => {
    const atributoSelecionado = selectedAtributos.value[pericia.id] || pericia.atributo_base
    const numeroDeDados = getAtributoBonus(atributoSelecionado)
    const bonusPericia = calcularBonusPericia(pericia)
    
    // CORREÇÃO: const em vez de let, pois a referência do array não muda
    const rolagens: number[] = []
    let rolagemBase = 0
    let rolagensTexto = ''

    if (numeroDeDados <= 0) {
      rolagens.push(Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1)
      rolagemBase = Math.min(...rolagens)
      rolagensTexto = `[${rolagens.join(', ')}] (Pega Menor)`
    } else {
      for (let i = 0; i < numeroDeDados; i++) {
        rolagens.push(Math.floor(Math.random() * 20) + 1)
      }
      rolagemBase = Math.max(...rolagens)
      rolagensTexto = `[${rolagens.join(', ')}]`
    }
    const resultadoFinal = rolagemBase + bonusPericia
    snackbar.value.text = `${rolagensTexto} + ${bonusPericia} = ${resultadoFinal}`
    snackbar.value.color = rolagemBase === 20 ? 'green' : rolagemBase === 1 ? 'red' : 'success'
    snackbar.value.show = true
  }

  const handleSaveIdade = (dados: { nascimento: string; envelhecido: number }) => {
    character.value.dataNascimento = dados.nascimento
    character.value.idadeEnvelhecida = dados.envelhecido
  }

  const getAtributoColor = (atributo: Atributo) => {
    switch (atributo) {
      case 'AGI': return 'blue'
      case 'FOR': return 'red'
      case 'INT': return 'purple'
      case 'PRE': return 'green'
      case 'VIG': return 'yellow'
      default: return 'grey'
    }
  }

  const getRitualColor = (elemento: string) => {
    switch (elemento) {
      case 'Sangue': return 'red-darken-2'
      case 'Energia': return 'purple-darken-2'
      case 'Morte': return 'grey-darken-3'
      case 'Conhecimento': return 'yellow-darken-3'
      default: return 'grey'
    }
  }

  const getHabilidadeColor = (origem: string) => {
    switch (origem) {
      case 'Classe': return 'red-lighten-1'
      case 'Origem': return 'green-lighten-1'
      case 'Peso da Idade': return 'orange-darken-3'
      case 'Trilha': return 'yellow-darken-1'
      case 'Poder de Classe': return 'blue-lighten-1'
      case 'Poder Paranormal': return 'indigo'
      case 'Efeito Paranormal': return 'grey-lighten-1'
      default: return 'grey'
    }
  }

  const inicializarAtributosSelecionados = () => {
    if (!character.value) return
    const mapa: Record<string, Atributo> = {}
    for (const pericia of character.value.pericias) {
      mapa[pericia.id] = pericia.atributo_base
    }
    selectedAtributos.value = mapa
  }

  const adicionarHabilidade = (habilidade: Habilidade) => {
    const existe = character.value.habilidades.some((h) => h.id === habilidade.id)
    if (existe) {
      snackbar.value = {
        show: true,
        text: 'Você já possui esta habilidade exata.',
        color: 'warning',
      }
      return
    }
    character.value.habilidades.push({ ...habilidade })
    snackbar.value = { show: true, text: `${habilidade.nome} adicionada!`, color: 'success' }
  }

  const removerHabilidade = (id: string) => {
    const index = character.value.habilidades.findIndex((h) => h.id === id)
    if (index > -1) {
      const item = character.value.habilidades[index]
      if (item) {
        const nome = item.nome
        character.value.habilidades.splice(index, 1)
        snackbar.value = { show: true, text: `${nome} removido.`, color: 'info' }
      }
    }
  }

  const atualizarHabilidade = (habilidadeEditada: Habilidade) => {
    const index = character.value.habilidades.findIndex((h) => h.id === habilidadeEditada.id)
    if (index > -1) {
      character.value.habilidades[index] = habilidadeEditada
      snackbar.value = { show: true, text: 'Habilidade atualizada!', color: 'success' }
    }
  }

  // CORREÇÃO: Tipagem 'AddItemData' em vez de 'any'
  const adicionarItem = (dados: AddItemData) => {
    const novoItem: InventarioItem = {
      // Campos básicos
      id: crypto.randomUUID(),
      baseItemId: dados.baseItem.id,
      equipado: dados.equipado,
      modificacoesIds: [],
      maldicoesIds: [],
      
      // Overrides / Campos customizáveis
      nomePersonalizado: dados.nomePersonalizado,
      danoPersonalizado: dados.danoPersonalizado,
      criticoPersonalizado: dados.criticoPersonalizado,
      
      // ATENÇÃO: Se o InventarioItem no models.ts não tiver esses campos abaixo,
      // você deve adicioná-los lá ou removê-los aqui. 
      // Estou assumindo que você já atualizou o models.ts para suportar 
      // salvar qual atributo e perícia essa arma específica usa.
      // Caso contrário, salve em "anotacoes" ou crie campos novos.
      // atributoAtaque: dados.atributoAtaque, 
      // periciaAtaque: dados.periciaAtaque
    }

    character.value.inventario.push(novoItem)
    snackbar.value = { show: true, text: `${dados.baseItem.nome} adicionado!`, color: 'success' }
  }

  const removerItem = (instanceId: string) => {
    const index = character.value.inventario.findIndex((i) => i.id === instanceId)
    if (index > -1) {
      character.value.inventario.splice(index, 1)
    }
  }

  // CORREÇÃO: Tipagem 'ArmaEquipada' em vez de 'any'
  const rolarAtaque = (arma: ArmaEquipada) => {
    // 1. Descobrir Atributo (Ex: AGI = 3)
    const attrKey = arma.atributoAtaque || 'FOR' 
    const dadosAtributo = getAtributoBonus(attrKey)

    // 2. Descobrir Bônus da Perícia (Ex: Pontaria = +10)
    const periciaNome = arma.periciaAtaque || 'Luta'
    const pericia = character.value.pericias.find((p) => p.nome === periciaNome)
    const bonusPericia = pericia ? calcularBonusPericia(pericia) : 0

    // 3. Rolar os Dados 
    // CORREÇÃO: const em vez de let
    const rolagens: number[] = []
    const qtdDados = dadosAtributo <= 0 ? 2 : dadosAtributo 

    for (let i = 0; i < qtdDados; i++) {
      rolagens.push(Math.floor(Math.random() * 20) + 1)
    }

    // Regra do Atributo 0 (Azar)
    let dadoFinal = 0
    if (dadosAtributo <= 0) {
      dadoFinal = Math.min(...rolagens)
    } else {
      dadoFinal = Math.max(...rolagens)
    }

    const resultadoFinal = dadoFinal + bonusPericia

    // 4. Feedback Visual
    const critRange = parseInt(arma.critico) || 20
    const isCrit = dadoFinal >= critRange
    const isDesastre = dadoFinal === 1

    snackbar.value = {
      show: true,
      text: `Ataque (${arma.nome}): [${rolagens.join(', ')}] + ${bonusPericia} = ${resultadoFinal} ${isCrit ? 'CRÍTICO!' : ''}`,
      color: isCrit ? 'purple' : isDesastre ? 'red' : 'success',
    }
  }

  return {
    character,
    snackbar,
    searchPericia,
    filtroAtributos,
    searchItem,
    searchHabilidade,
    filtroHabilidades,
    searchRitual,
    filtroRitualElemento,
    filtroRitualCirculo,
    selectedAtributos,
    opcoesFiltroAtributo,
    opcoesAtributo,
    opcoesTreino,
    opcoesFiltroHabilidades,
    opcoesFiltroRitual,
    opcoesFiltroCirculo,
    opcoesCredito,
    opcoesElementos,
    opcoesPatentes,
    personagemInventarioCompleto,
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
    opcoesTrilhaFiltradas,
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
    rolarAtaque,
  }
}