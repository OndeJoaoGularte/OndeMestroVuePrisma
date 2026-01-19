<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title class="text-h5 bg-surface-variant">
                Editar Habilidade
            </v-card-title>

            <v-card-text class="pt-4">
                <v-text-field v-model="localHab.nome" label="Nome da Habilidade" variant="outlined"
                    density="compact"></v-text-field>

                <v-select v-model="localHab.origem" label="Origem / Tipo" :items="opcoesOrigem" variant="outlined"
                    density="compact"></v-select>

                <v-select v-if="localHab.elemento" v-model="localHab.elemento" label="Elemento" :items="opcoesElemento"
                    clearable variant="outlined" density="compact"></v-select>

                <v-textarea v-model="localHab.descricao" label="Descrição" variant="outlined" rows="5"></v-textarea>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="isOpen = false">Cancelar</v-btn>
                <v-btn color="primary" variant="flat" @click="salvar">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Habilidade } from '@/types/ordem/models';

const props = defineProps<{
    modelValue: boolean;
    habilidade: Habilidade | null;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

// Dados locais para edição
const localHab = ref<Habilidade>({
    id: '', nome: '', descricao: '', origem: 'Origem'
});

// Opções para os selects
const opcoesOrigem = ['Classe', 'Origem', 'Peso da Idade', 'Trilha', 'Poder de Classe', 'Poder Paranormal', 'Efeito Paranormal'];
const opcoesElemento = ['Sangue', 'Morte', 'Conhecimento', 'Energia'];

// Clona o objeto quando o modal abre para não editar em tempo real
watch(() => props.habilidade, (newVal) => {
    if (newVal) {
        localHab.value = JSON.parse(JSON.stringify(newVal));
    }
}, { immediate: true });

const salvar = () => {
    emit('save', localHab.value);
    isOpen.value = false;
};
</script>