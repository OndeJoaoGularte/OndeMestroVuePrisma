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
                                            <v-text-field v-model="searchHabilidade"
                                                placeholder="Pesquisar habilidade..." variant="outlined"
                                                density="compact" prepend-inner-icon="mdi-magnify" hide-details
                                                clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon="mdi-plus" size="small" variant="tonal" color="primary"
                                                @click="emit('open:add-habilidade')"></v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-chip-group v-model="filtroHabilidades" show-arrows multiple class="filtro">
                                        <v-chip v-for="filtro in opcoesFiltroHabilidades" :key="filtro" :value="filtro"
                                            filter size="x-small">{{ filtro }}</v-chip>
                                    </v-chip-group>
                                </div>

                                <v-divider></v-divider>

                                <div class="overflow-y-auto flex-grow-1">
                                    <v-expansion-panels variant="accordion" multiple>
                                        <v-expansion-panel v-for="hab in habilidadesFiltradas" :key="hab.instanceId">
                                            <v-expansion-panel-title class="py-2" style="min-height: 48px">
                                                <template v-slot:default="{ expanded }">
                                                    <v-row no-gutters align="center">
                                                        <v-col cols="auto" class="mr-2">
                                                            <v-chip size="x-small"
                                                                :color="getHabilidadeColor(hab.origem)" label>{{
                                                                    hab.origem }}</v-chip>
                                                        </v-col>
                                                        <v-col class="text-truncate font-weight-bold text-body-2">
                                                            {{ hab.nome }}
                                                        </v-col>
                                                        <v-col cols="auto" v-if="hab.elemento">
                                                            <v-icon size="small"
                                                                :color="getRitualColor(hab.elemento)">mdi-circle-slice-8</v-icon>
                                                        </v-col>
                                                        <v-col cols="auto" v-if="expanded" class="d-flex ml-2">
                                                            <v-btn icon="mdi-pencil" size="x-small" variant="text"
                                                                @click.stop="emit('edit:habilidade', hab)"></v-btn>
                                                            <v-btn icon="mdi-delete" size="x-small" variant="text"
                                                                color="error"
                                                                @click.stop="emit('remove:habilidade', hab.instanceId)"></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </template>
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text class="text-caption text-medium-emphasis">
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
                                            <v-text-field v-model="searchRitual" placeholder="Pesquisar ritual..."
                                                variant="outlined" density="compact" prepend-inner-icon="mdi-magnify"
                                                hide-details clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon="mdi-plus" size="small" variant="tonal" color="primary"
                                                @click="showAddRitualModal = true"></v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col>
                                            <v-btn @click="showRitualElementoFilters = !showRitualElementoFilters"
                                                :prepend-icon="showRitualElementoFilters ? 'mdi-chevron-up' : 'mdi-fire'"
                                                variant="tonal" block size="small"
                                                :color="filtroRitualElemento.length > 0 ? 'primary' : undefined">Elemento</v-btn>
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
                                                <v-chip v-for="filtro in opcoesFiltroRitual" :key="filtro"
                                                    :value="filtro" filter size="small">{{
                                                        filtro }}</v-chip>
                                            </v-chip-group>
                                        </div>
                                    </v-expand-transition>
                                    <v-expand-transition>
                                        <div v-if="showRitualCirculoFilters" class="mt-2">
                                            <v-chip-group v-model="filtroRitualCirculo" show-arrows multiple>
                                                <v-chip v-for="filtro in opcoesFiltroCirculo" :key="filtro"
                                                    :value="filtro" filter size="small">{{
                                                        filtro }}</v-chip>
                                            </v-chip-group>
                                        </div>
                                    </v-expand-transition>
                                </div>
                                <v-divider></v-divider>

                                <div class="overflow-y-auto flex-grow-1">
                                    <v-expansion-panels variant="accordion" multiple>
                                        <v-expansion-panel v-for="ritual in rituaisFiltrados" :key="ritual.instanceId">
                                            <v-expansion-panel-title class="py-2" style="min-height: 48px">
                                                <template v-slot:default="{ expanded }">
                                                    <v-row no-gutters align="center">
                                                        <v-col cols="auto" class="mr-2">
                                                            <v-avatar size="24" :color="getRitualColor(ritual.elemento)"
                                                                variant="flat">
                                                                <span class="text-white font-weight-bold text-caption"
                                                                    style="font-size: 0.7rem;">
                                                                    {{ ritual.circulo }}º
                                                                </span>
                                                            </v-avatar>
                                                        </v-col>
                                                        <v-col class="text-truncate font-weight-bold text-body-2">
                                                            {{ ritual.nome }}
                                                        </v-col>
                                                        <v-col cols="auto" v-if="expanded" class="d-flex">
                                                            <v-btn icon="mdi-pencil" size="x-small" variant="text"
                                                                @click.stop="abrirEdicaoRitual(ritual)"></v-btn>
                                                            <v-btn icon="mdi-delete" size="x-small" variant="text"
                                                                color="error"
                                                                @click.stop="removerRitual(ritual.instanceId)"></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </template>
                                            </v-expansion-panel-title>

                                            <v-expansion-panel-text class="pa-0 bg-surface">
                                                <v-sheet class="pa-3 text-caption">

                                                    <v-row dense class="mb-2 text-medium-emphasis">
                                                        <v-col cols="4" class="border-e text-center">
                                                            <div class="font-weight-bold text-grey-darken-1">Execução
                                                            </div>
                                                            <div>{{ ritual.execucao }}</div>
                                                        </v-col>
                                                        <v-col cols="4" class="border-e text-center">
                                                            <div class="font-weight-bold text-grey-darken-1">Alcance
                                                            </div>
                                                            <div>{{ ritual.alcance }}</div>
                                                        </v-col>
                                                        <v-col cols="4" class="text-center">
                                                            <div class="font-weight-bold text-grey-darken-1">Alvo</div>
                                                            <div>{{ ritual.alvo }}</div>
                                                        </v-col>
                                                    </v-row>

                                                    <v-divider class="mb-2"></v-divider>

                                                    <div class="d-flex justify-space-between mb-2">
                                                        <span><span class="font-weight-bold text-red-darken-4">Duração:</span>
                                                        {{
                                                            ritual.duracao }}</span>
                                                        <span><span class="font-weight-bold text-red-darken-4">Resistência:</span>
                                                        {{
                                                            ritual.resistencia }}</span>
                                                    </div>

                                                    <div class="text-body-2 text-justify" v-html="ritual.descricao">
                                                    </div>

                                                </v-sheet>

                                            </v-expansion-panel-text>

                                        </v-expansion-panel>
                                    </v-expansion-panels>

                                    <div v-if="rituaisFiltrados.length === 0"
                                        class="text-center pa-4 text-grey text-caption">
                                        Nenhum ritual encontrado.
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="pa-2 flex-grow-0" style="margin-top: auto;">
                            <v-btn @click="showRituais = !showRituais"
                                :prepend-icon="showRituais ? 'mdi-auto-fix' : 'mdi-book-variant'" variant="tonal" block
                                size="small">
                                <span v-if="!showRituais">Ver Rituais</span>
                                <span v-else>Ver Habilidades</span>
                            </v-btn>
                        </div>

                    </div>
                </v-window-item>

                <v-window-item :value="true" class="h-100">
                    <div class="d-flex flex-column h-100">
                        <div style="flex: 1 1 auto; overflow: hidden" class="d-flex flex-column">
                            <div v-if="!showingCombate" class="d-flex flex-column h-100">
                                <div class="pa-2 flex-grow-0">
                                    <v-btn @click="showItemLimits = !showItemLimits"
                                        :prepend-icon="showItemLimits ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        variant="tonal" block size="small" class="mb-2"
                                        :color="showItemLimits ? 'primary' : undefined">Limites &
                                        Prestígio</v-btn>

                                    <v-expand-transition>
                                        <div v-if="showItemLimits">
                                            <v-sheet border rounded class="pa-2">
                                                <v-row dense>
                                                    <v-col cols="6"><v-text-field v-model.number="character.prestigio"
                                                            label="Prestígio" type="number" density="compact"
                                                            hide-details /></v-col>
                                                    <v-col cols="6"><v-text-field v-model="character.patente"
                                                            label="Patente" density="compact" hide-details readonly
                                                            variant="filled" /></v-col>
                                                </v-row>
                                            </v-sheet>
                                            <v-sheet border rounded class="pa-2 my-2 text-center">
                                                <v-row dense
                                                    class="text-caption"><v-col>Cat</v-col><v-col>[I]</v-col><v-col>[II]</v-col><v-col>[III]</v-col><v-col>[IV]</v-col></v-row>
                                                <v-row dense class="font-weight-bold">
                                                    <v-col class="text-caption">Limite</v-col>
                                                    <v-col v-for="(limite, i) in limitesPorPatente" :key="'lim' + i">{{
                                                        limite
                                                        }}</v-col>
                                                </v-row>
                                                <v-row dense class="font-weight-bold">
                                                    <v-col class="text-caption">Itens</v-col>
                                                    <v-col v-for="(count, i) in itensPorCategoria" :key="'count' + i"
                                                        :class="count > (limitesPorPatente[i] ?? 0) ? 'text-red' : ''">
                                                        {{ count }}
                                                    </v-col>
                                                </v-row>
                                            </v-sheet>
                                            <v-sheet border rounded class="pa-2">
                                                <v-row dense>
                                                    <v-col cols="6"><v-select v-model="character.credito"
                                                            :items="opcoesCredito" label="Crédito" density="compact"
                                                            hide-details /></v-col>
                                                    <v-col cols="6">
                                                        <v-text-field v-model.number="character.carga_atual"
                                                            label="Carga" density="compact" hide-details type="number">
                                                            <template v-slot:append><span class="text-caption">/ {{
                                                                character.carga_max }}</span></template>
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-sheet>
                                        </div>
                                    </v-expand-transition>
                                </div>

                                <div class="d-flex flex-column flex-grow-1 overflow-hidden">
                                    <div class="pa-2 pt-0 flex-grow-0">
                                        <v-row dense align="center">
                                            <v-col><v-text-field v-model="searchItem" placeholder="Pesquisar item..."
                                                    variant="outlined" density="compact"
                                                    prepend-inner-icon="mdi-magnify" hide-details clearable /></v-col>
                                            <v-col cols="auto">
                                                <v-btn icon="mdi-plus" size="small" variant="tonal" color="primary"
                                                    @click="showAddItemModal = true" />
                                            </v-col>
                                        </v-row>
                                        <v-chip-group v-model="filtroCategorias" show-arrows multiple
                                            selected-class="text-indigo" class="mt-2" column>
                                            <v-chip v-for="cat in opcoesFiltroCategoria" :key="cat" :value="cat" filter
                                                size="x-small">
                                                {{ cat }}
                                            </v-chip>
                                        </v-chip-group>
                                    </div>
                                    <v-divider />
                                    <div class="overflow-y-auto flex-grow-1">
                                        <v-expansion-panels variant="accordion" multiple>
                                            <v-expansion-panel v-for="item in inventarioFiltrado"
                                                :key="item.instanceId">
                                                <v-expansion-panel-title class="py-2" style="min-height: 48px">
                                                    <template v-slot:default="{ expanded }">
                                                        <v-row no-gutters align="center">
                                                            <v-col class="text-truncate font-weight-bold text-body-2">
                                                                {{ item.nome }}
                                                            </v-col>
                                                            <v-col cols="auto" class="mr-2">
                                                                <v-chip size="x-small" class="mr-2">Cat {{
                                                                    item.categoria }}</v-chip>
                                                                <v-chip size="x-small">Esp {{ item.espacos }}</v-chip>
                                                            </v-col>
                                                            <v-col cols="auto" v-if="expanded" class="d-flex">
                                                                <v-btn icon="mdi-pencil" size="x-small" variant="text"
                                                                    @click.stop="abrirEdicao(item)"></v-btn>

                                                                <v-btn icon="mdi-delete" size="x-small" variant="text"
                                                                    color="error"
                                                                    @click.stop="removerItem(item.instanceId)"></v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text class="bg-surface pa-0">
                                                    <div class="text-caption text-medium-emphasis mb-2 pa-3 pb-0"
                                                        v-if="item.descricao">
                                                        {{ item.descricao }}
                                                    </div>

                                                    <v-divider class="mb-2 mx-3" v-if="item.descricao"></v-divider>

                                                    <v-row dense class="text-caption px-3">
                                                        <v-col cols="4" class="text-center border-e">
                                                            <div class="text-grey-darken-1 font-weight-bold"
                                                                style="font-size: 0.7rem;">
                                                                TIPO</div>
                                                            <div>{{ item.tipo }}</div>
                                                        </v-col>
                                                        <v-col cols="4" class="text-center border-e">
                                                            <div class="text-grey-darken-1 font-weight-bold"
                                                                style="font-size: 0.7rem;">
                                                                ESPAÇO</div>
                                                            <div>{{ item.espacos }}</div>
                                                        </v-col>
                                                        <v-col cols="4" class="text-center">
                                                            <div class="text-grey-darken-1 font-weight-bold"
                                                                style="font-size: 0.7rem;">
                                                                CATEGORIA</div>
                                                            <div>{{ item.categoria }}</div>
                                                        </v-col>

                                                        <v-col cols="12" v-if="item.tipo === 'Arma'">
                                                            <v-sheet rounded class="pa-2  border-t">
                                                                <v-row dense>
                                                                    <v-col cols="6">
                                                                        <span
                                                                            class="font-weight-bold text-red-darken-4">Dano:</span>
                                                                        {{
                                                                            item.dano }}
                                                                    </v-col>
                                                                    <v-col cols="6">
                                                                        <span
                                                                            class="font-weight-bold text-red-darken-4">Tipo:</span>
                                                                        {{
                                                                            item.tipo_dano }}
                                                                    </v-col>
                                                                    <v-col cols="6">
                                                                        <span
                                                                            class="font-weight-bold text-red-darken-4">Crítico:</span>
                                                                        {{ item.critico }}
                                                                    </v-col>
                                                                    <v-col cols="6">
                                                                        <span
                                                                            class="font-weight-bold text-red-darken-4">Alcance:</span>
                                                                        {{ item.alcance }}
                                                                    </v-col>
                                                                    <v-col cols="12" class="border-t pt-1 text-center">
                                                                        <span
                                                                            class="font-weight-bold text-caption">Teste:</span>
                                                                        {{
                                                                            item.periciaAtaque }}
                                                                        <span v-if="item.atributoAtaque"
                                                                            class="text-grey">({{
                                                                                item.atributoAtaque }})</span>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-sheet>
                                                        </v-col>

                                                        <v-col cols="12" v-if="item.tipo === 'Protecao'">
                                                            <v-sheet rounded class="pa-2 border-t">
                                                                <v-row dense>
                                                                    <v-col cols="6" class="text-center">
                                                                        <span
                                                                            class="font-weight-bold text-blue-darken-4">Defesa</span>
                                                                        <div class="text-h6 font-weight-bold">+{{
                                                                            item.defesa }}</div>
                                                                    </v-col>
                                                                    <v-col cols="6" class="text-center">
                                                                        <span
                                                                            class="font-weight-bold text-blue-darken-4">Resistência</span>
                                                                        <div class="text-h6 font-weight-bold">{{
                                                                            item.resistencia_dano
                                                                            }}</div>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-sheet>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
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
                                                <v-list-item v-for="arma in armasEquipadas" :key="arma.id"
                                                    :title="arma.nome">
                                                    <template v-slot:subtitle>
                                                        <div>Dano: {{ arma.dano }} | Crítico: {{ arma.critico }}</div>
                                                        <div>Alcance: {{ arma.alcance }} | Tipo: {{ arma.tipo_dano }}
                                                        </div>
                                                        <div>
                                                            Perícia: {{ arma.teste_ataque }} | Emp.: {{ arma.empunhadura
                                                            }}
                                                        </div>
                                                    </template>
                                                    <template v-slot:append>
                                                        <div class="d-flex flex-column align-end">
                                                            <v-chip size="small" class="mb-1">Cat {{ arma.categoria
                                                                }}</v-chip>
                                                            <v-btn icon="mdi-dice-d20" size="small" variant="tonal"
                                                                color="red" @click.stop="rolarAtaque(arma)"></v-btn>
                                                        </div>
                                                    </template>
                                                </v-list-item>
                                            </v-list>
                                            <p class="text-subtitle-1 font-weight-bold mt-4">Proteções Equipadas</p>
                                            <v-divider class="my-1"></v-divider>
                                            <v-list lines="two" density="compact" bg-color="transparent">
                                                <v-list-item v-for="protecao in protecoesEquipadas" :key="protecao.id"
                                                    :title="protecao.nome">
                                                    <template v-slot:subtitle>
                                                        <div>Defesa: +{{ protecao.defesa }}</div>
                                                        <div>Resistência: {{ protecao.resistencia_dano }}</div>
                                                    </template>
                                                    <template v-slot:append><v-chip size="small">Cat {{
                                                        protecao.categoria }}</v-chip></template>
                                                </v-list-item>
                                            </v-list>
                                        </v-window-item>
                                        <v-window-item value="rituais" class="pa-0">
                                            <div class="pa-2 text-center text-caption text-grey">
                                                (Lista de Rituais de Combate)
                                            </div>
                                        </v-window-item>
                                    </v-window>
                                </div>
                            </div>
                        </div>

                        <div class="pa-2 flex-grow-0" style="margin-top: auto">
                            <v-btn @click="showingCombate = !showingCombate"
                                :prepend-icon="showingCombate ? 'mdi-bag-personal' : 'mdi-sword'" variant="tonal" block
                                size="small">
                                {{ showingCombate ? 'Voltar para Inventário' : 'Ver Combate' }}
                            </v-btn>
                        </div>
                    </div>
                </v-window-item>
            </v-window>
        </v-card-text>

        <ModalAddItem v-model="showAddItemModal" @add="adicionarItem" />
        <ModalEditItem v-model="showEditItemModal" :item="itemEmEdicao" @save="atualizarItem" @delete="removerItem" />
        <ModalAddRitual v-model="showAddRitualModal" @add="adicionarRitual" />
        <ModalEditRitual v-model="showEditRitualModal" :ritual="ritualEmEdicao" @save="atualizarRitual"
            @delete="removerRitual" />
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFichaOrdem } from '@/composables/ordem/useFicha'
import ModalAddItem from './modals/add/ModalAddItem.vue'
import ModalEditItem from './modals/editar/ModalEditItem.vue'
import ModalAddRitual from './modals/add/ModalAddRitual.vue' // <--- IMPORT
import type { ItemInstancia, RitualInstancia } from '@/types/ordem/models';
import ModalEditRitual from './modals/editar/ModalEditRitual.vue'

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

const showEditRitualModal = ref(false);
const ritualEmEdicao = ref<RitualInstancia | null>(null);

const abrirEdicaoRitual = (ritual: RitualInstancia) => {
    ritualEmEdicao.value = ritual;
    showEditRitualModal.value = true;
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
    adicionarRitual,
    removerRitual,
    atualizarRitual
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

.filtro{
    padding: 8px 0 0 0;
}
</style>