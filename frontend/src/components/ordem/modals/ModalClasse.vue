<template>
    <v-dialog v-model="isOpen" max-width="80%" max-height="80%" scrollable>
        <v-card class="d-flex flex-column">
            <v-card-title class="text-h5">Selecionar Classe</v-card-title>
            <v-divider></v-divider>

            <v-card-text class="flex-grow-1" style="overflow-y: auto;">
                <v-row dense>
                    <v-col v-for="classe in DB_CLASSES" :key="classe.id" cols="12" md="4" class="d-flex">
                        <v-card class="d-flex flex-column" variant="outlined" elevation="2">
                            <v-card-title>{{ classe.nome }}</v-card-title>
                            <v-card-subtitle class="text-wrap">{{ classe.descricao }}</v-card-subtitle>

                            <v-card-text class="overflow-y-auto">
                                <v-expansion-panels variant="accordion" class="mb-2">
                                    <v-expansion-panel v-for="hab in classe.habilidades" :key="hab.id">
                                        <v-expansion-panel-title class="font-weight-bold text-subtitle-2">
                                            {{ hab.nome }}
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text class="text-caption text-wrap">
                                            {{ hab.descricao }}
                                        </v-expansion-panel-text>
                                    </v-expansion-panel>
                                </v-expansion-panels>

                                <v-divider class="my-2"></v-divider>
                                <p class="font-weight-bold mb-2">Progressão por Nível:</p>
                                <div class="d-flex flex-column align-start">
                                    <v-chip size="small" color="red" class="mb-1">PV: {{ classe.base_pv }} +
                                        VIG</v-chip>
                                    <v-chip size="small" color="blue" class="mb-1">PS: {{ classe.base_ps }}</v-chip>
                                    <v-chip size="small" color="orange" class="mb-1">PE: {{ classe.base_pe }} +
                                        PRE</v-chip>
                                    <v-divider class="my-2" style="width: 100%"></v-divider>
                                    <v-chip size="small" color="red" class="mb-1">+{{ classe.bonus_pv }} + VIG /
                                        Nível</v-chip>
                                    <v-chip size="small" color="blue" class="mb-1">+{{ classe.bonus_ps }} /
                                        Nível</v-chip>
                                    <v-chip size="small" color="orange" class="mb-1">+{{ classe.bonus_pe }} + PRE /
                                        Nível</v-chip>
                                </div>
                            </v-card-text>

                            <v-card-actions class="mt-auto pa-4">
                                <v-btn color="primary" variant="flat" block @click="selecionar(classe.id)">
                                    Escolher {{ classe.nome }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="isOpen = false">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DB_CLASSES } from '@/database/ordem/basicos/dbClasses';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'select']);

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const selecionar = (id: string) => {
    emit('select', id);
    isOpen.value = false;
};
</script>