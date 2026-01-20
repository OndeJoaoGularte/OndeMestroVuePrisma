<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="400px"
        scrollable>
        <v-card>
            <v-card-title class="text-h5 bg-surface-light d-flex align-center">
                <v-icon start>mdi-shield-plus-outline</v-icon>
                Resistências a Dano
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" variant="text" size="small" @click="$emit('update:modelValue', false)"></v-btn>
            </v-card-title>

            <v-card-text>
                <v-row dense align="center" class="mb-2">
                    <v-col cols="6">
                        <v-select v-model="localTipo" :items="tiposDano" label="Tipo de Dano" variant="outlined"
                            density="compact" hide-details></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field v-model.number="localValor" type="number" label="Valor" variant="outlined"
                            density="compact" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="2" class="d-flex justify-center">
                        <v-btn icon="mdi-plus" color="success" size="small" variant="tonal" @click="handleAdicionar"
                            :disabled="!localTipo || localValor <= 0"></v-btn>
                    </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <div v-if="resistencias && resistencias.length > 0">
                    <v-list density="compact" class="bg-transparent">
                        <v-list-item v-for="res in resistencias" :key="res.id" rounded class="mb-1 border">
                            <template v-slot:prepend>
                                <v-icon :color="getDanoColor(res.tipo)" size="small">mdi-shield</v-icon>
                            </template>

                            <v-list-item-title class="font-weight-bold d-flex justify-space-between align-center">
                                <span>{{ res.tipo }}</span>
                                <v-chip size="small" :color="getDanoColor(res.tipo)" variant="flat"
                                    class="font-weight-black">
                                    {{ res.valor }}
                                </v-chip>
                            </v-list-item-title>

                            <template v-slot:append>
                                <v-btn icon="mdi-delete" size="x-small" variant="text" color="grey"
                                    @click="$emit('remover', res.id)"></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                </div>
                <div v-else class="text-center text-medium-emphasis py-4 text-caption">
                    Nenhuma resistência cadastrada.
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="$emit('update:modelValue', false)">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { ResistenciaManual } from '@/types/ordem/models'; // Importe a tipagem se quiser garantir

// CORREÇÃO: Removemos "const props =" pois não é usado no script
defineProps<{
    modelValue: boolean;
    resistencias: ResistenciaManual[]; // Usei o tipo do model para ficar mais limpo, ou mantenha Array<{...}>
}>();

const emit = defineEmits(['update:modelValue', 'adicionar', 'remover']);

// Estado Local do Form
const localTipo = ref('Balístico');
const localValor = ref(5);

const tiposDano = [
    'Balístico', 'Corte', 'Impacto', 'Perfurante',
    'Eletricidade', 'Fogo', 'Frio', 'Química',
    'Mental', 'Sangue', 'Morte', 'Energia', 'Conhecimento', 'Medo'
];

// Lógica Local
const handleAdicionar = () => {
    const novaResistencia: ResistenciaManual = {
        id: uuidv4(),
        tipo: localTipo.value,
        valor: localValor.value
    };
    emit('adicionar', novaResistencia);

    // Resetar apenas o valor para facilitar
    localValor.value = 0;
};

const getDanoColor = (tipo: string) => {
    const map: Record<string, string> = {
        'Sangue': 'red-darken-4',
        'Morte': 'grey-darken-4',
        'Conhecimento': 'amber-darken-4',
        'Energia': 'purple-darken-2',
        'Mental': 'blue-darken-3',
        'Medo': 'grey-lighten-1',
        'Fogo': 'orange',
        'Frio': 'cyan',
        'Eletricidade': 'yellow-darken-3',
        'Química': 'green',
        'Balístico': 'blue-grey',
    };
    return map[tipo] || 'grey-darken-2';
};
</script>