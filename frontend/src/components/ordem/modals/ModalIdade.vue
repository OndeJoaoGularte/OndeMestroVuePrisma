<template>
  <v-dialog v-model="isOpen" max-width="400px">
    <v-card>
      <v-card-title>Calcular Idade</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="localDataAtual"
          label="Data Atual (Campanha)"
          prepend-inner-icon="mdi-calendar-today"
          density="compact"
          placeholder="DD/MM/AAAA"
          hide-details
        ></v-text-field>
        
        <v-text-field
          v-model="localNascimento"
          label="Data de Nascimento"
          prepend-inner-icon="mdi-calendar"
          density="compact"
          placeholder="DD/MM/AAAA"
          class="mt-4" 
          hide-details
        ></v-text-field>

        <v-text-field
          v-model.number="localEnvelhecido"
          label="Anos Envelhecidos"
          prepend-inner-icon="mdi-plus-box"
          density="compact"
          type="number"
          suffix="anos"
          class="mt-4"
          hide-details
        ></v-text-field>
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

const props = defineProps<{
  modelValue: boolean;
  dataNascimento: string | null;
  idadeEnvelhecida: number;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Estado Local do Modal
const localDataAtual = ref('15/01/2023'); // Poderia vir de prop também se fosse global
const localNascimento = ref('');
const localEnvelhecido = ref(0);

// Quando o modal abre, copia os dados do Pai para o estado Local
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
  isOpen.value = false;
};
</script>