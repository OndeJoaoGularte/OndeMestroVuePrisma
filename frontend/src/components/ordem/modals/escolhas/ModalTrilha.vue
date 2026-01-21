<template>
    <v-dialog v-model="isOpen" max-width="800px" scrollable>
        <v-card>
            <v-card-title class="text-h5 bg-surface-light d-flex align-center">
                Selecionar Trilha
                <v-chip size="small" color="primary" class="ml-2" v-if="classeNome">
                    {{ classeNome }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
            </v-card-title>

            <v-card-text class="pa-0 d-flex flex-column" style="height: 60vh;">
                <v-expansion-panels variant="accordion">
                    <v-expansion-panel v-for="trilha in trilhasFiltradas" :key="trilha.id">
                        <v-expansion-panel-title class="py-2">
                            <v-row no-gutters align="center">
                                <v-col><span class="text-subtitle-1 font-weight-bold">{{ trilha.nome }}</span></v-col>
                                <v-col cols="auto">
                                    <v-btn color="primary" size="small" variant="flat" class="mr-2"
                                        @click.stop="selecionar(trilha.id)">
                                        Escolher
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <p class="text-body-2 mb-3">{{ trilha.descricao }}</p>
                            <v-divider class="my-2"></v-divider>
                            <div class="text-caption font-weight-bold text-uppercase mb-2 text-primary">
                                Progressão de Habilidades
                            </div>
                            <div class="d-flex flex-column gap-3">
                                <div v-for="(hab, index) in trilha.habilidades" :key="index" class="d-flex">
                                    <div class="d-flex flex-column align-center mr-3" style="width: 50px">
                                        <v-chip size="x-small" :color="hab.lvl === 2 ? 'primary' : 'grey-darken-1'"
                                            variant="flat" class="font-weight-bold px-1 justify-center"
                                            style="width: 50px">
                                            {{ hab.lvl === 2 ? 'LVL ' + 2 : 'LVL ' + hab.lvl }}
                                        </v-chip>

                                        <div v-if="index !== trilha.habilidades.length - 1"
                                            class="v-line flex-grow-1 bg-grey-lighten-2 my-1" style="width: 3px;"></div>
                                    </div>

                                    <div class="pb-3 flex-grow-1">
                                        <p class="font-weight-bold text-error">
                                            {{ hab.nome }}
                                        </p>
                                        <div class="text-caption text-medium-emphasis text-wrap" v-html="hab.descricao">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>

                <div v-if="trilhasFiltradas.length === 0" class="pa-5 text-center text-medium-emphasis">
                    <v-icon size="large" class="mb-2">mdi-alert-circle-outline</v-icon>
                    <p>Selecione uma <strong>Classe</strong> primeiro para ver as trilhas disponíveis.</p>
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
import { computed } from 'vue';
import { DB_TRILHAS } from '@/database/ordem/basicos/dbTrilhas';

const props = defineProps<{
    modelValue: boolean;
    classeId: string;   // Necessário para filtrar
    classeNome: string; // Para exibir no título
}>();

const emit = defineEmits(['update:modelValue', 'select']);

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

// Filtra as trilhas baseado na prop recebida do pai
const trilhasFiltradas = computed(() => {
    if (!props.classeId) return [];
    return DB_TRILHAS.filter(t => t.classeId === props.classeId);
});

const selecionar = (id: string) => {
    emit('select', id);
    isOpen.value = false;
};
</script>