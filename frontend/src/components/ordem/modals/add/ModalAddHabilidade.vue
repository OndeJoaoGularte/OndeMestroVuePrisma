<template>
    <v-dialog v-model="isOpen" max-width="900px" scrollable>
        <v-card class="d-flex flex-column" style="height: 80vh;">
            <v-card-title class="text-h5 bg-surface-variant">
                Adicionar Habilidade
            </v-card-title>

            <div class="px-4 pt-2 elevation-1 z-index-1">
                <v-text-field v-model="search" placeholder="Buscar habilidade..." prepend-inner-icon="mdi-magnify"
                    variant="outlined" density="compact" hide-details class="mb-2" clearable></v-text-field>

                <v-tabs v-model="activeTab" density="compact" grow color="primary">
                    <v-tab value="origem">Origem</v-tab>
                    <v-tab value="classe">Classe</v-tab>
                    <v-tab value="idade">Idade</v-tab>
                    <v-tab value="trilha">Trilha</v-tab>
                    <v-tab value="paranormal">Paranormal</v-tab>
                    <v-tab value="efeitos">Efeitos</v-tab>
                </v-tabs>
            </div>

            <div class="px-4 py-2 bg-grey-lighten-4" v-if="showSubFilters">

                <v-chip-group v-if="activeTab === 'classe' || activeTab === 'trilha'" v-model="filtroClasse"
                    selected-class="text-primary" multiple>
                    <v-chip value="classe_combatente" filter size="small">Combatente</v-chip>
                    <v-chip value="classe_especialista" filter size="small">Especialista</v-chip>
                    <v-chip value="classe_ocultista" filter size="small">Ocultista</v-chip>
                </v-chip-group>

                <v-chip-group v-if="activeTab === 'paranormal' || activeTab === 'efeitos'" v-model="filtroElemento"
                    selected-class="text-primary" multiple>
                    <v-chip value="Sangue" filter size="small" color="red-darken-2">Sangue</v-chip>
                    <v-chip value="Morte" filter size="small" color="grey-darken-3">Morte</v-chip>
                    <v-chip value="Conhecimento" filter size="small" color="yellow-darken-3">Conhecimento</v-chip>
                    <v-chip value="Energia" filter size="small" color="purple-darken-2">Energia</v-chip>
                </v-chip-group>
            </div>

            <v-card-text class="pa-0 overflow-y-auto bg-grey-lighten-5">

                <div v-if="listaExibida.length === 0" class="text-center pa-4 text-grey">
                    Nenhuma habilidade encontrada para os filtros atuais.
                </div>

                <v-expansion-panels variant="accordion">
                    <v-expansion-panel v-for="hab in listaExibida" :key="hab.id" class="bg-white mb-1">
                        <v-expansion-panel-title>
                            <template v-slot:default>
                                <v-row no-gutters align="center">
                                    <v-col cols="auto" class="mr-3">
                                        <v-icon :color="getIconColor(activeTab)">
                                            {{ getIcon(activeTab) }}
                                        </v-icon>
                                    </v-col>

                                    <v-col>
                                        <span class="font-weight-bold">{{ hab.nome }}</span>
                                        <v-chip v-if="hab.elemento" size="x-small" class="ml-2"
                                            :color="getElementoColor(hab.elemento)">
                                            {{ hab.elemento }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <div class="text-body-2 mb-2 text-justify" v-html="hab.descricao"></div>

                            <v-divider class="my-2"></v-divider>

                            <v-row dense align="center" justify="space-between">
                                <v-col>
                                    <div class="text-caption text-grey font-italic">
                                        Fonte: {{ getFonteInfo(hab) }}
                                    </div>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn variant="flat" color="success" size="small" prepend-icon="mdi-plus"
                                        @click="adicionar(hab)">
                                        Adicionar à Ficha
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>

                    </v-expansion-panel>
                </v-expansion-panels>

            </v-card-text>

            <v-card-actions class="bg-white elevation-2">
                <v-spacer></v-spacer>
                <v-btn text @click="isOpen = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Habilidade } from '@/types/ordem/models';
import { v4 as uuidv4 } from 'uuid'

// Importação direta dos "Bancos" para leitura
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

// --- WATCHER PARA LIMPAR FILTROS AO TROCAR DE ABA ---
watch(activeTab, () => {
    filtroClasse.value = [];
    filtroElemento.value = [];
    search.value = '';
});

// --- COMPUTED PRINCIPAL: A LISTA MÁGICA ---
const listaExibida = computed(() => {
    // [CORREÇÃO] Substituído 'any[]' por 'HabilidadeDisplay[]'
    let lista: HabilidadeDisplay[] = [];
    // 1. Coleta os dados baseados na aba
    switch (activeTab.value) {
        case 'origem':
            // Mapeia Origens para extrair a habilidade
            lista = DB_ORIGENS.map(o => ({
                ...o.habilidade,
                // --- A CORREÇÃO MÁGICA ---
                id: `origem_${o.id}`,  // Cria um ID único (ex: origem_academico)
                origem: 'Origem',      // Adiciona a tag para o Chip funcionar
                // -------------------------
                sourceName: o.nome
            }));
            break;

        case 'idade':
            lista = DB_PESO_IDADE.map(i => ({ ...i, sourceName: 'Peso da Idade' }));
            break;

        case 'classe':
            // 1. Habilidades AUTOMÁTICAS (Vêm do objeto da Classe)
            DB_CLASSES.forEach(c => {
                // MUDANÇA 3: Se o array estiver vazio (mostra tudo) OU se o ID da classe estiver na lista
                if (filtroClasse.value.length === 0 || filtroClasse.value.includes(c.id)) {
                    c.habilidades.forEach(h => {
                        lista.push({ ...h, sourceName: `${c.nome} (Automático)` });
                    });
                }
            });

            // 2. [NOVO] Poderes de Classe COMPRÁVEIS (Vêm do DB_PODERES_CLASSE)
            DB_PODERES_CLASSE.forEach(p => {
                // MUDANÇA 3: Mesma lógica aqui (array vazio ou inclui a classe do poder)
                // O p.classe! garante que não é undefined (pois powers de classe sempre tem classe)
                if (filtroClasse.value.length === 0 || (p.classe && filtroClasse.value.includes(p.classe))) {
                    const nomeClasse = DB_CLASSES.find(c => c.id === p.classe)?.nome || 'Classe';
                    lista.push({ ...p, sourceName: `Poder de ${nomeClasse}` });
                }
            });
            break;

        case 'trilha':
            // AQUI ESTÁ A CORREÇÃO DA TRILHA
            DB_TRILHAS.forEach(t => {
                if (filtroClasse.value.length === 0 || filtroClasse.value.includes(t.classeId)) {

                    // Mapeia todas as habilidades do array
                    t.habilidades.forEach(habTrilha => {
                        lista.push({
                            id: uuidv4(), // ID único para a lista
                            nome: `${habTrilha.nome} (LVL ${habTrilha.lvl === 2 ? '2' : habTrilha.lvl})`, // Exibe o NEX no nome
                            descricao: habTrilha.descricao,
                            origem: 'Trilha', // Injeta origem
                            sourceName: t.nome
                        });
                    });

                }
            });
            break;

        case 'paranormal':
            lista = DB_PODERES_PARANORMAIS.map(p => ({ ...p, sourceName: 'Poder Paranormal' }));

            // MUDANÇA 4: Filtro de Elemento Multiplo
            if (filtroElemento.value.length > 0) {
                // Só mantém se tiver elemento E ele estiver na lista de selecionados
                lista = lista.filter(h => h.elemento && filtroElemento.value.includes(h.elemento));
            }
            break;

        case 'efeitos':
            lista = DB_EFEITOS.map(e => ({ ...e.habilidade, origem: 'Efeito Paranormal', sourceName: e.nome }));

            // MUDANÇA 4: Filtro de Elemento Multiplo
            if (filtroElemento.value.length > 0) {
                lista = lista.filter(h => h.elemento && filtroElemento.value.includes(h.elemento));
            }
            break;
    }

    // 2. Aplica a busca por texto (comum a todas as abas)
    if (search.value) {
        const s = search.value.toLowerCase();
        lista = lista.filter(h =>
            h.nome.toLowerCase().includes(s) ||
            h.descricao.toLowerCase().includes(s)
        );
    }

    return lista as (Habilidade & { sourceName: string })[];
});

// --- HELPERS DE UI ---
const showSubFilters = computed(() => {
    // Mostra subfiltros apenas nas abas relevantes
    if (activeTab.value === 'classe' || activeTab.value === 'trilha') return true;
    if (activeTab.value === 'paranormal' || activeTab.value === 'efeitos') return true;
    return false;
});

const getIcon = (tab: string) => {
    switch (tab) {
        case 'origem': return 'mdi-book-open-variant';
        case 'idade': return 'mdi-clock-time-eight-outline';
        case 'classe': return 'mdi-shield-account';
        case 'trilha': return 'mdi-sign-direction';
        case 'paranormal': return 'mdi-ghost';
        case 'efeitos': return 'mdi-flash-alert';
        default: return 'mdi-circle-small';
    }
};

const getIconColor = (tab: string) => {
    switch (tab) {
        case 'origem': return 'green-lighten-1';
        case 'classe': return 'red-lighten-1';
        case 'idade': return 'orange-darken-3';
        case 'trilha': return 'yellow-darken-1';
        case 'paranormal': return 'indigo';
        case 'efeitos': return 'grey-lighten-1';
        default: return 'grey';
    }
};

const getElementoColor = (el?: string) => {
    switch (el) {
        case 'Sangue': return 'red-darken-2';
        case 'Morte': return 'grey-darken-3';
        case 'Energia': return 'purple-darken-2';
        case 'Conhecimento': return 'yellow-darken-3';
        default: return 'grey';
    }
};

const getFonteInfo = (hab: HabilidadeDisplay) => {
    return hab.sourceName || hab.origem;
}

const adicionar = (hab: HabilidadeDisplay) => {
    // [CORREÇÃO]
    // 1. Removemos o 'as any'. O TypeScript sabe que 'hab' tem sourceName.
    // 2. Adicionamos o comentário para o ESLint ignorar que 'sourceName' não é usado.
    //    (Ou você pode renomear para `_sourceName` se sua config permitir).

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sourceName, ...habilidadeLimpa } = hab;

    emit('add', habilidadeLimpa);
};
</script>

<style scoped>
.z-index-1 {
    z-index: 1;
    position: relative;
}
</style>