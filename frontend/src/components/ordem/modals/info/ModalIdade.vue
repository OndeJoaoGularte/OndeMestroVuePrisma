<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="400px" scrollable>
        <v-card>
            <v-card-title class="text-h5 bg-surface-light d-flex align-center">
                <v-icon start>mdi-cake-variant</v-icon>
                Definir Idade
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" variant="text" size="small" @click="$emit('update:modelValue', false)"></v-btn>
            </v-card-title>
            <v-card-text class="pt-4">
                <v-text-field v-model="localDataAtual" label="Data Atual (Campanha)"
                    prepend-inner-icon="mdi-calendar-today" density="compact" variant="outlined"
                    placeholder="DD/MM/AAAA" hide-details class="mb-3"></v-text-field>

                <v-text-field v-model="localNascimento" label="Data de Nascimento" prepend-inner-icon="mdi-calendar"
                    density="compact" variant="outlined" placeholder="DD/MM/AAAA" hide-details
                    class="mb-3"></v-text-field>

                <v-text-field v-model.number="localEnvelhecido" label="Modificador (Envelhecimento Mágico)"
                    prepend-inner-icon="mdi-plus-box" density="compact" variant="outlined" type="number" suffix="anos"
                    hide-details></v-text-field>

                <div class="text-caption text-grey mt-2">
                    Use o modificador para somar anos à idade cronológica (ex: rituais, maldições).
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="$emit('update:modelValue', false)">Cancelar</v-btn>
                <v-btn color="primary" variant="flat" @click="salvar">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  dataNascimento: string | null;
  idadeEnvelhecida: number;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

// Estado Local
const localDataAtual = ref('15/01/2023'); // Exemplo
const localNascimento = ref('');
const localEnvelhecido = ref(0);

// Sincroniza quando abre
watch(() => props.modelValue, (aberto) => {
  if (aberto) {
    localNascimento.value = props.dataNascimento || '';
    localEnvelhecido.value = props.idadeEnvelhecida || 0;
  }
});

const salvar = () => {
  emit('save', {
    nascimento: localNascimento.value,
    envelhecido: localEnvelhecido.value
  });
  emit('update:modelValue', false);
};
</script>