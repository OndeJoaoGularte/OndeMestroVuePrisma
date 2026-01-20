<template>
    <v-dialog v-model="isOpen" max-width="800px" scrollable>
        <v-card class="d-flex flex-column" style="max-height: 600px;">
            <v-card-title class="text-h5 bg-surface-light d-flex align-center flex-0-0">
                Selecionar Origem
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
            </v-card-title>

            <v-card-text class="pa-0 d-flex flex-column" style="height: 60vh;">
                <div class="pa-3 bg-surface z-index-1 border-b">
                    <v-text-field v-model="search" placeholder="Pesquisar origem..." prepend-inner-icon="mdi-magnify"
                        variant="outlined" density="compact" hide-details clearable></v-text-field>
                </div>
                <div class="flex-grow-1 overflow-y-auto">
                    <v-expansion-panels variant="accordion">
                        <v-expansion-panel v-for="origem in origensFiltradas" :key="origem.id">
                            <v-expansion-panel-title class="py-2">
                                <v-row no-gutters align="center">
                                    <v-col>
                                        <span class="text-subtitle-1 font-weight-bold">{{ origem.nome }}</span>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn color="primary" size="small" variant="flat" class="mr-2"
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
                                    <div class="text-caption font-weight-bold text-uppercase">Habilidade de Origem</div>
                                    <p class="font-weight-bold text-error mb-1">{{ origem.habilidade.nome }}</p>
                                    <p class="text-caption">{{ origem.habilidade.descricao }}</p>
                                </div>
                                <v-divider class="my-2"></v-divider>
                                <div v-if="origem.pericias.length" class="mt-2">
                                    <div class="text-caption font-weight-bold text-uppercase mb-1">Perícias Treinadas
                                    </div>
                                    <v-chip v-for="pericia in origem.pericias" :key="pericia" size="x-small"
                                        class="mr-2" color="primary" variant="tonal" label>
                                        {{ pericia }}
                                    </v-chip>
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div v-if="origensFiltradas.length === 0" class="text-center pa-4 text-grey">
                        Nenhuma origem encontrada para "{{ search }}".
                    </div>
                </div>
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
import { ref, computed } from 'vue';
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

const search = ref('');

// Computed: Ordena e Filtra
const origensFiltradas = computed(() => {
    // 1. Cria uma cópia e ordena alfabeticamente
    let lista = [...DB_ORIGENS].sort((a, b) => a.nome.localeCompare(b.nome));

    // 2. Aplica o filtro de pesquisa se houver texto
    if (search.value) {
        const termo = search.value.toLowerCase();
        lista = lista.filter(o => o.nome.toLowerCase().includes(termo));
    }

    return lista;
});

// Função que avisa o pai: "O usuário escolheu este ID"
const selecionar = (id: string) => {
    emit('select', id);
    isOpen.value = false; // Fecha o modal
};
</script>
<style scoped>
/*
    .flex-0-0 {
  flex: 0 0 auto;
}*/
</style>