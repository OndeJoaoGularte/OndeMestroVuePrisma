<template>
  <v-card class="d-flex flex-column profile-card" variant="outlined">
    <v-card-title class="d-flex align-center justify-space-between py-2 bg-surface-light flex-0-0">
      <span class="text-subtitle-2 font-weight-bold text-uppercase">
        <v-icon start size="default">{{ showInv ? 'mdi-bag-personal' : 'mdi-auto-fix' }}</v-icon>
        {{ showInv ? 'Inventário' : 'Habilidades' }}
      </span>
      <v-btn size="default" variant="tonal" :color="showInv ? 'indigo' : 'brown'" @click="showInv = !showInv">
        {{ showInv ? 'Ver Habilidades' : 'Ver Inventário' }}
        <v-icon end>{{ showInv ? 'mdi-auto-fix' : 'mdi-bag-personal' }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-0 d-flex flex-column flex-grow-1 overflow-hidden">
      <v-window v-model="showInv" class="h-100">
        
        <v-window-item :value="false" class="h-100">
          <div class="d-flex flex-column h-100">
            <div style="flex: 1 1 auto; overflow: hidden" class="d-flex flex-column">
              
              <div v-if="!showRituais" class="d-flex flex-column h-100">
                <div class="pa-2 flex-grow-0">
                  <v-row dense align="center">
                    <v-col>
                      <v-text-field v-model="searchHabilidade" placeholder="Pesquisar habilidade..." variant="outlined"
                        density="compact" prepend-inner-icon="mdi-magnify" hide-details clearable></v-text-field>
                    </v-col>
                    <v-col cols="auto">
                      <v-btn icon="mdi-plus" size="small" variant="tonal" color="primary"
                        @click="emit('open:add-habilidade')"></v-btn>
                    </v-col>
                  </v-row>
                  <v-chip-group v-model="filtroHabilidades" show-arrows multiple class="mt-2">
                    <v-chip v-for="filtro in opcoesFiltroHabilidades" :key="filtro" :value="filtro" filter
                      size="x-small">{{ filtro }}</v-chip>
                  </v-chip-group>
                </div>

                <v-divider></v-divider>

                <div class="overflow-y-auto flex-grow-1">
                  <v-expansion-panels variant="accordion">
                    <v-expansion-panel v-for="hab in habilidadesFiltradas" :key="hab.id">
                      <v-expansion-panel-title>
                        <template v-slot:default>
                          <v-row no-gutters align="center">
                            <v-col cols="auto" class="mr-3">
                              <v-chip size="small" :color="getHabilidadeColor(hab.origem)">{{ hab.origem }}</v-chip>
                            </v-col>
                            <v-col>
                              <span class="font-weight-bold">{{ hab.nome }}</span>
                              <v-chip v-if="hab.elemento" size="x-small" class="ml-2" variant="tonal">{{ hab.elemento
                                }}</v-chip>
                            </v-col>
                            <v-col cols="auto">
                              <v-btn icon="mdi-pencil" size="x-small" variant="text" color="grey" class="mr-1"
                                @click.stop="emit('edit:habilidade', hab)"></v-btn>
                              <v-btn icon="mdi-delete" size="x-small" variant="text" color="error"
                                @click.stop="emit('remove:habilidade', hab.id)"></v-btn>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="text-caption">
                        <div v-html="hab.descricao"></div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </div>

              <div v-else class="d-flex flex-column h-100">
                <div class="pa-2 flex-grow-0">
                  <v-row dense align="center">
                    <v-col>
                      <v-text-field v-model="searchRitual" placeholder="Pesquisar ritual..." variant="outlined"
                        density="compact" prepend-inner-icon="mdi-magnify" hide-details clearable></v-text-field>
                    </v-col>
                    <v-col cols="auto">
                      <v-btn icon="mdi-plus" size="small" variant="tonal" color="primary" 
                             @click="showAddRitualModal = true"></v-btn>
                    </v-col>
                  </v-row>
                  <v-row dense class="mt-2">
                    <v-col>
                      <v-btn @click="showRitualElementoFilters = !showRitualElementoFilters"
                        :prepend-icon="showRitualElementoFilters ? 'mdi-chevron-up' : 'mdi-fire'" variant="tonal" block
                        size="small" :color="filtroRitualElemento.length > 0 ? 'primary' : undefined">Elemento</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn @click="showRitualCirculoFilters = !showRitualCirculoFilters"
                        :prepend-icon="showRitualCirculoFilters ? 'mdi-chevron-up' : 'mdi-circle-outline'"
                        variant="tonal" block size="small"
                        :color="filtroRitualCirculo.length > 0 ? 'primary' : undefined">Círculo</v-btn>
                    </v-col>
                  </v-row>

                  <v-expand-transition>
                    <div v-if="showRitualElementoFilters" class="mt-2">
                      <v-chip-group v-model="filtroRitualElemento" show-arrows multiple>
                        <v-chip v-for="filtro in opcoesFiltroRitual" :key="filtro" :value="filtro" filter size="small">{{
                          filtro }}</v-chip>
                      </v-chip-group>
                    </div>
                  </v-expand-transition>
                  <v-expand-transition>
                    <div v-if="showRitualCirculoFilters" class="mt-2">
                      <v-chip-group v-model="filtroRitualCirculo" show-arrows multiple>
                        <v-chip v-for="filtro in opcoesFiltroCirculo" :key="filtro" :value="filtro" filter size="small">{{
                          filtro }}</v-chip>
                      </v-chip-group>
                    </div>
                  </v-expand-transition>
                </div>
                <v-divider></v-divider>

                <div class="overflow-y-auto flex-grow-1">
                  <v-list lines="two" density="compact" bg-color="transparent" class="pt-0">
                    <v-list-item v-for="ritual in rituaisFiltrados" :key="ritual.instanceId" :title="ritual.nome"
                      :subtitle="ritual.descricao">
                      <template v-slot:prepend>
                        <v-chip size="small" :color="getRitualColor(ritual.elemento)" class="mr-3">{{ ritual.elemento }}
                          {{ ritual.circulo }}</v-chip>
                      </template>
                      <template v-slot:append>
                         <v-btn icon="mdi-delete" size="x-small" variant="text" color="error" 
                                @click="removerRitual(ritual.instanceId)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </div>
              </div>

            </div>

            <div class="pa-2 flex-grow-0" style="margin-top: auto;">
              <v-divider class="mb-2" />
              <v-btn @click="showRituais = !showRituais"
                :prepend-icon="showRituais ? 'mdi-auto-fix' : 'mdi-book-variant'" variant="tonal" block size="small">
                <span v-if="!showRituais">Ver Rituais</span>
                <span v-else>Ver Habilidades</span>
              </v-btn>
            </div>

          </div>
        </v-window-item>

        <v-window-item :value="true" class="h-100">
          <div class="d-flex flex-column h-100">

            <div v-if="!showingCombate" class="d-flex flex-column h-100">
              <div class="pa-2 flex-grow-0">
                <v-btn @click="showItemLimits = !showItemLimits"
                  :prepend-icon="showItemLimits ? 'mdi-chevron-up' : 'mdi-chevron-down'" variant="tonal" block
                  size="small" class="mb-2" :color="showItemLimits ? 'primary' : undefined">Limites & Prestígio</v-btn>

                <v-expand-transition>
                  <div v-if="showItemLimits">
                    <v-sheet border rounded class="pa-2">
                      <v-row dense>
                        <v-col cols="6"><v-text-field v-model.number="character.prestigio" label="Prestígio"
                            type="number" density="compact" hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="character.patente" label="Patente" density="compact"
                            hide-details readonly variant="filled" /></v-col>
                      </v-row>
                    </v-sheet>
                    <v-sheet border rounded class="pa-2 my-2 text-center">
                      <v-row dense class="text-caption"><v-col>Cat</v-col><v-col>[I]</v-col><v-col>[II]</v-col><v-col>[III]</v-col><v-col>[IV]</v-col></v-row>
                      <v-row dense class="font-weight-bold">
                        <v-col class="text-caption">Limite</v-col>
                        <v-col v-for="(limite, i) in limitesPorPatente" :key="'lim' + i">{{ limite }}</v-col>
                      </v-row>
                      <v-row dense class="font-weight-bold">
                        <v-col class="text-caption">Itens</v-col>
                        <v-col v-for="(count, i) in itensPorCategoria" :key="'count' + i"
                          :class="count > (limitesPorPatente[i] ?? 0) ? 'text-red' : ''">
                          {{ count }}
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </div>
                </v-expand-transition>

                <v-sheet border rounded class="pa-2">
                  <v-row dense>
                    <v-col cols="6"><v-select v-model="character.credito" :items="opcoesCredito" label="Crédito"
                        density="compact" hide-details /></v-col>
                    <v-col cols="6">
                      <v-text-field v-model.number="character.carga_atual" label="Carga" density="compact" hide-details
                        type="number">
                        <template v-slot:append><span class="text-caption">/ {{ character.carga_max }}</span></template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-sheet>
              </div>

              <div class="d-flex flex-column flex-grow-1 overflow-hidden mt-2">
                <div class="pa-2 pt-0 flex-grow-0">
                  <v-row dense align="center">
                    <v-col><v-text-field v-model="searchItem" placeholder="Pesquisar item..." variant="outlined"
                        density="compact" prepend-inner-icon="mdi-magnify" hide-details clearable /></v-col>
                    <v-col cols="auto"><v-btn icon="mdi-plus" size="small" variant="tonal" color="primary" @click="showAddItemModal = true"/></v-col>
                  </v-row>
                  <v-chip-group v-model="filtroCategorias" show-arrows multiple selected-class="text-indigo" class="mt-2" column>
                        <v-chip v-for="cat in opcoesFiltroCategoria" :key="cat" :value="cat" filter size="x-small">
                            {{ cat }}
                        </v-chip>
                  </v-chip-group>
                </div>
                <v-divider />
                <div class="overflow-y-auto flex-grow-1">
                  <v-list lines="two" density="compact" bg-color="transparent" class="pt-0">
                    <v-list-item v-for="item in inventarioFiltrado" :key="item.id" :title="item.nome"
                      :subtitle="item.descricao || `Categoria ${item.categoria} | Espaços: ${item.espacos}`">
                      <template v-slot:prepend><v-checkbox-btn v-model="item.equipado" density="compact" class="mr-2"></v-checkbox-btn></template>
                      <template v-slot:append>
                          <v-chip size="x-small" class="mr-2">Esp {{ item.espacos }}</v-chip>
                          <v-btn icon="mdi-pencil" size="x-small" variant="text" @click="abrirEdicao(item)"></v-btn>
                          <v-btn icon="mdi-delete" size="x-small" variant="text" color="error" @click="removerItem(item.instanceId)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </div>
              </div>
            </div>

            <div v-else class="d-flex flex-column h-100">
              <div class="flex-grow-0">
                <v-tabs v-model="combateTab" density="compact" grow>
                  <v-tab value="armas">Armas & Proteções</v-tab>
                  <v-tab value="rituais">Rituais</v-tab>
                </v-tabs>
                <v-divider />
              </div>

              <div class="overflow-y-auto flex-grow-1 pa-2">
                <v-window v-model="combateTab" class="h-100">
                  <v-window-item value="armas">
                    <p class="text-subtitle-1 font-weight-bold">Armas Equipadas</p>
                    <v-divider class="my-1"></v-divider>
                    <v-list lines="three" density="compact" bg-color="transparent">
                      <v-list-item v-for="arma in armasEquipadas" :key="arma.id" :title="arma.nome">
                        <template v-slot:subtitle>
                          <div>Dano: {{ arma.dano }} | Crítico: {{ arma.critico }}</div>
                          <div>Alcance: {{ arma.alcance }} | Tipo: {{ arma.tipo_dano }}</div>
                          <div>Perícia: {{ arma.periciaAtaque }} | Attr: {{ arma.atributoAtaque }}</div>
                        </template>
                        <template v-slot:append>
                            <div class="d-flex flex-column align-end">
                                <v-chip size="small" class="mb-1">Cat {{ arma.categoria }}</v-chip>
                                <v-btn icon="mdi-dice-d20" size="small" variant="tonal" color="red" @click.stop="rolarAtaque(arma)"></v-btn>
                            </div>
                        </template>
                      </v-list-item>
                    </v-list>
                    <p class="text-subtitle-1 font-weight-bold mt-4">Proteções Equipadas</p>
                    <v-divider class="my-1"></v-divider>
                    <v-list lines="two" density="compact" bg-color="transparent">
                      <v-list-item v-for="protecao in protecoesEquipadas" :key="protecao.id" :title="protecao.nome">
                        <template v-slot:subtitle>
                          <div>Defesa: +{{ protecao.defesa }}</div>
                          <div>Resistência: {{ protecao.resistencia_dano }}</div>
                        </template>
                        <template v-slot:append><v-chip size="small">Cat {{ protecao.categoria }}</v-chip></template>
                      </v-list-item>
                    </v-list>
                  </v-window-item>
                  <v-window-item value="rituais" class="pa-0">
                    <div class="pa-2 text-center text-caption text-grey">
                      (Lista de Rituais de Combate - Em Breve)
                    </div>
                  </v-window-item>
                </v-window>
              </div>
            </div>

            <div class="pa-2 flex-grow-0" style="margin-top: auto">
              <v-divider class="mb-2" />
              <v-btn @click="showingCombate = !showingCombate"
                :prepend-icon="showingCombate ? 'mdi-bag-personal' : 'mdi-sword'" variant="tonal" block size="small">
                <span v-if="!showingCombate">Ver Combate</span>
                <span v-else>Ver Inventário</span>
              </v-btn>
            </div>

          </div>
        </v-window-item>
      </v-window>
    </v-card-text>

    <ModalAddItem v-model="showAddItemModal" @add="adicionarItem" />
    <ModalEditItem v-model="showEditItemModal" :item="itemEmEdicao" @save="atualizarItem" @delete="removerItem" />
    <ModalAddRitual v-model="showAddRitualModal" @add="adicionarRitual" />

  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFichaOrdem } from '@/composables/ordem/useFicha'
import ModalAddItem from './modals/add/ModalAddItem.vue'
import ModalEditItem from './modals/editar/ModalEditItem.vue'
import ModalAddRitual from './modals/add/ModalAddRitual.vue' // <--- IMPORT
import type { ItemInstancia } from '@/types/ordem/models';

const emit = defineEmits([
  'open:add-habilidade',
  'remove:habilidade',
  'edit:habilidade',
])

const showEditItemModal = ref(false);
const itemEmEdicao = ref<ItemInstancia | null>(null);

const abrirEdicao = (item: ItemInstancia) => {
  itemEmEdicao.value = item;
  showEditItemModal.value = true;
};

const {
  character,
  // Magia
  searchHabilidade,
  filtroHabilidades,
  opcoesFiltroHabilidades,
  habilidadesFiltradas,
  getHabilidadeColor,
  searchRitual,
  filtroRitualElemento,
  opcoesFiltroRitual,
  filtroRitualCirculo,
  opcoesFiltroCirculo,
  rituaisFiltrados,
  getRitualColor,
  // Inventário
  searchItem,
  inventarioFiltrado,
  filtroCategorias,
  opcoesFiltroCategoria,
  armasEquipadas,
  protecoesEquipadas,
  limitesPorPatente,
  itensPorCategoria,
  opcoesCredito,
  // Actions
  adicionarItem,
  removerItem,
  rolarAtaque,
  atualizarItem,
  adicionarRitual, // <--- NOVO
  removerRitual    // <--- NOVO
} = useFichaOrdem()

// Estado Principal
const showInv = ref(false)

// Estados Locais (Aba Magia)
const showRituais = ref(false)
const showRitualElementoFilters = ref(false)
const showRitualCirculoFilters = ref(false)
const showAddRitualModal = ref(false) // <--- NOVO

// Estados Locais (Aba Inventário)
const showingCombate = ref(false)
const combateTab = ref('armas')
const showItemLimits = ref(false)
const showAddItemModal = ref(false)
</script>

<style scoped>
.profile-card {
  height: 85vh;
  max-height: 85vh;
}

.flex-0-0 {
  flex: 0 0 auto;
}

.min-h-40 {
  min-height: 40px;
}

.z-index-1 {
  z-index: 1;
}
</style>