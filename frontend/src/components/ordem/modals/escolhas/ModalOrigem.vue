<template>
    <v-dialog v-model="isOpen" max-width="800px" scrollable>
        <v-card>
            <v-card-title class="text-h5">
                Selecionar Origem
            </v-card-title>

            <v-card-text style="height: 60vh; overflow-y: auto;">
                <v-expansion-panels variant="inset">
                    <v-expansion-panel v-for="origem in DB_ORIGENS" :key="origem.id">
                        <v-expansion-panel-title>
                            <v-row no-gutters align="center">
                                <v-col>
                                    <span class="text-subtitle-1">{{ origem.nome }}</span>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn color="primary" size="small" class="mr-2"
                                        @click.stop="selecionar(origem.id)">
                                        Escolher
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <p class="text-body-2 mb-3">{{ origem.descricao }}</p>
                            <v-divider class="my-2"></v-divider>
                            <div>
                                <div class="text-caption">Habilidade de Origem</div>
                                <p class="font-weight-bold mb-1">{{ origem.habilidade.nome }}</p>
                                <p class="text-body-2">{{ origem.habilidade.descricao }}</p>
                            </div>
                            <v-divider class="my-2"></v-divider>
                            <div>
                                <div class="text-caption mb-2">Perícias Treinadas</div>
                                <v-chip v-for="pericia in origem.pericias" :key="pericia" size="small" class="mr-2"
                                    color="primary" variant="tonal">
                                    {{ pericia }}
                                </v-chip>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="isOpen = false">
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DB_ORIGENS } from '@/database/ordem/basicos/dbOrigens';

// Recebe o 'modelValue' (true/false) do pai para abrir/fechar
const props = defineProps<{
    modelValue: boolean;
}>();

// Define os eventos que este componente envia para o pai
const emit = defineEmits(['update:modelValue', 'select']);

// Computed para controlar o v-model do dialog
const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

// Função que avisa o pai: "O usuário escolheu este ID"
const selecionar = (id: string) => {
    emit('select', id);
    isOpen.value = false; // Fecha o modal
};
</script>