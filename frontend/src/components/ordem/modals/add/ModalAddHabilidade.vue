<template>
    <v-dialog v-model="isOpen" max-width="800px" scrollable>
        <v-card class="d-flex flex-column">

            <v-card-title class="text-h5 bg-surface-light d-flex align-center flex-0-0">
                Adicionar Habilidade
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
            </v-card-title>

            <v-card-text class="pa-0 d-flex flex-column" style="height: 65vh;">

                <div style="flex: 0 0 auto; z-index: 2;" class="bg-surface">

                    <div class="pa-3">
                        <v-text-field v-model="search" placeholder="Pesquisar habilidade..."
                            prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" hide-details
                            clearable></v-text-field>
                    </div>

                    <v-tabs v-model="activeTab" density="compact" grow color="primary" class="border-b">
                        <v-tab value="origem">Origem</v-tab>
                        <v-tab value="classe">Classe</v-tab>
                        <v-tab value="idade">Idade</v-tab>
                        <v-tab value="trilha">Trilha</v-tab>
                        <v-tab value="paranormal">Paranormal</v-tab>
                        <v-tab value="efeitos">Efeitos</v-tab>
                    </v-tabs>

                    <div class="px-4 py-2 border-b" v-if="showSubFilters">
                        <v-chip-group v-if="activeTab === 'classe' || activeTab === 'trilha'" v-model="filtroClasse"
                            selected-class="text-primary" multiple>
                            <v-chip value="classe_combatente" filter size="x-small">Combatente</v-chip>
                            <v-chip value="classe_especialista" filter size="x-small">Especialista</v-chip>
                            <v-chip value="classe_ocultista" filter size="x-small">Ocultista</v-chip>
                        </v-chip-group>

                        <v-chip-group v-if="activeTab === 'paranormal' || activeTab === 'efeitos'"
                            v-model="filtroElemento" selected-class="ring-active" multiple>
                            <v-chip value="Sangue" filter size="x-small" color="red-lighten-1"
                                variant="tonal">Sangue</v-chip>
                            <v-chip value="Morte" filter size="x-small" color="grey-lighten-1"
                                variant="tonal">Morte</v-chip>
                            <v-chip value="Conhecimento" filter size="x-small" color="yellow-lighten-1"
                                variant="tonal">Conhecimento</v-chip>
                            <v-chip value="Energia" filter size="x-small" color="purple-lighten-1"
                                variant="tonal">Energia</v-chip>
                        </v-chip-group>
                    </div>
                </div>

                <div class="flex-grow-1 overflow-y-auto bg-surface">
                    <v-expansion-panels variant="accordion">
                        <v-expansion-panel v-for="hab in listaExibida" :key="hab.id">

                            <v-expansion-panel-title class="py-2">
                                <v-row no-gutters align="center">
                                    <v-col cols="auto" class="mr-3">
                                        <v-icon :color="getIconColor(activeTab)">{{ getIcon(activeTab) }}</v-icon>
                                    </v-col>

                                    <v-col>
                                        <span class="text-subtitle-2 font-weight-bold">{{ hab.nome }}</span>
                                        <v-chip v-if="hab.elemento" size="x-small" class="ml-2"
                                            :color="getElementoColor(hab.elemento)" label>
                                            {{ hab.elemento }}
                                        </v-chip>
                                    </v-col>

                                </v-row>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <div class="text-body-2 mb-3 text-justify" v-html="hab.descricao"></div>

                                <v-divider class="my-2"></v-divider>

                                <v-row dense align="center" justify="space-between">
                                    <v-col>
                                        <div class="text-caption text-medium-emphasis font-italic">
                                            Fonte: {{ getFonteInfo(hab) }}
                                        </div>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn variant="flat" color="primary" size="small" @click="adicionar(hab)">
                                            Adicionar à Ficha
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>

                        </v-expansion-panel>
                    </v-expansion-panels>

                    <div v-if="listaExibida.length === 0"
                        class="d-flex flex-column align-center justify-center h-100 pa-4 text-grey">
                        <v-icon size="large" class="mb-2">mdi-magnify-remove-outline</v-icon>
                        <span class="text-body-2">Nenhuma habilidade encontrada.</span>
                    </div>
                </div>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="isOpen = false">Cancelar</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Habilidade } from '@/types/ordem/models';
import { v4 as uuidv4 } from 'uuid';

// Importação dos Bancos de Dados
import { DB_ORIGENS } from '@/database/ordem/basicos/dbOrigens';
import { DB_CLASSES } from '@/database/ordem/basicos/dbClasses';
import { DB_TRILHAS } from '@/database/ordem/basicos/dbTrilhas';
import { DB_PODERES_PARANORMAIS } from '@/database/ordem/habilidades/dbPoderesP';
import { DB_PODERES_CLASSE } from '@/database/ordem/habilidades/dbPoderesC';
import { DB_PESO_IDADE } from '@/database/ordem/habilidades/dbPeso';
import { DB_EFEITOS } from '@/database/ordem/habilidades/dbEfeitos';

type HabilidadeDisplay = Habilidade & { sourceName: string };

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'add']);

const isOpen = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

// --- ESTADO LOCAL ---
const activeTab = ref('origem');
const search = ref('');
const filtroClasse = ref<string[]>([]);
const filtroElemento = ref<string[]>([]);

// Limpar filtros ao trocar de aba
watch(activeTab, () => {
    filtroClasse.value = [];
    filtroElemento.value = [];
    search.value = '';
});

// --- LÓGICA DE LISTAGEM ---
const listaExibida = computed(() => {
    let lista: HabilidadeDisplay[] = [];

    switch (activeTab.value) {
        case 'origem':
            lista = DB_ORIGENS.map(o => ({
                ...o.habilidade,
                id: `origem_${o.id}`,
                origem: 'Origem',
                sourceName: o.nome
            }));
            break;

        case 'idade':
            lista = DB_PESO_IDADE.map(i => ({ ...i, sourceName: 'Peso da Idade' }));
            break;

        case 'classe':
            DB_CLASSES.forEach(c => {
                if (filtroClasse.value.length === 0 || filtroClasse.value.includes(c.id)) {
                    c.habilidades.forEach(h => lista.push({ ...h, sourceName: `${c.nome} (Automático)` }));
                }
            });
            DB_PODERES_CLASSE.forEach(p => {
                if (filtroClasse.value.length === 0 || (p.classe && filtroClasse.value.includes(p.classe))) {
                    const nomeClasse = DB_CLASSES.find(c => c.id === p.classe)?.nome || 'Classe';
                    lista.push({ ...p, sourceName: `Poder de ${nomeClasse}` });
                }
            });
            break;

        case 'trilha':
            DB_TRILHAS.forEach(t => {
                if (filtroClasse.value.length === 0 || filtroClasse.value.includes(t.classeId)) {
                    t.habilidades.forEach(h => lista.push({
                        ...h,
                        id: uuidv4(),
                        nome: `${h.nome} (NEX ${h.lvl || '?'})`, // Ajuste de visualização
                        origem: 'Trilha',
                        sourceName: t.nome
                    }));
                }
            });
            break;

        case 'paranormal':
            lista = DB_PODERES_PARANORMAIS.map(p => ({ ...p, sourceName: 'Poder Paranormal' }));
            if (filtroElemento.value.length > 0) {
                lista = lista.filter(h => h.elemento && filtroElemento.value.includes(h.elemento));
            }
            break;

        case 'efeitos':
            lista = DB_EFEITOS.map(e => ({ ...e.habilidade, origem: 'Efeito Paranormal', sourceName: e.nome }));
            if (filtroElemento.value.length > 0) {
                lista = lista.filter(h => h.elemento && filtroElemento.value.includes(h.elemento));
            }
            break;
    }

    lista.sort((a, b) => a.nome.localeCompare(b.nome));

    // Busca por Texto
    if (search.value) {
        const s = search.value.toLowerCase();
        lista = lista.filter(h => h.nome.toLowerCase().includes(s) || h.descricao.toLowerCase().includes(s));
    }

    return lista;
});

// --- HELPERS UI ---
const showSubFilters = computed(() => {
    return ['classe', 'trilha', 'paranormal', 'efeitos'].includes(activeTab.value);
});

const getIcon = (tab: string) => {
    const icons: Record<string, string> = {
        'origem': 'mdi-book-open-variant',
        'idade': 'mdi-clock-time-eight-outline',
        'classe': 'mdi-shield-account',
        'trilha': 'mdi-sign-direction',
        'paranormal': 'mdi-ghost',
        'efeitos': 'mdi-flash-alert'
    };
    return icons[tab] || 'mdi-circle-small';
};

const getIconColor = (tab: string) => {
    const colors: Record<string, string> = {
        'origem': 'green-lighten-1',
        'classe': 'red-lighten-1',
        'idade': 'orange-darken-3',
        'trilha': 'yellow-darken-1',
        'paranormal': 'indigo',
        'efeitos': 'grey-lighten-1'
    };
    return colors[tab] || 'grey';
};

const getElementoColor = (el?: string) => {
    if (!el) return 'grey';
    const colors: Record<string, string> = {
        'Sangue': 'red-lighten-1',
        'Morte': 'grey-lighten-1',
        'Energia': 'purple-lighten-1',
        'Conhecimento': 'yellow-lighten-1',
        'Medo': 'white'
    };
    return colors[el] || 'grey';
};

const getFonteInfo = (hab: HabilidadeDisplay) => hab.sourceName || hab.origem;

const adicionar = (hab: HabilidadeDisplay) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sourceName, ...dados } = hab;
    emit('add', dados);
};
</script>

<style scoped>
/* Classe para manter o header fixo e não ser esmagado pelo flex */
.flex-0-0 {
    flex: 0 0 auto;
}

/* Efeito de anel de foco para os chips de elemento */
.ring-active .v-chip--selected {
    box-shadow: 0 0 0 2px currentColor;
}
</style>