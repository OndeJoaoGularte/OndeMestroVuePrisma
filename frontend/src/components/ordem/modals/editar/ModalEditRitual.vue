<template>
  <v-dialog v-model="isOpen" max-width="800px" scrollable>
    <v-card v-if="localRitual">
      
      <v-card-title class="text-h5 bg-surface-light d-flex align-center flex-0-0">
        Editar Ritual
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
      </v-card-title>

      <v-card-text class="pt-4" style="height: 65vh;">
        
        <v-row dense>
          <v-col cols="8">
            <v-text-field 
              v-model="localRitual.nome" 
              label="Nome do Ritual" 
              variant="outlined" 
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select 
              v-model="localRitual.elemento"
              :items="['Sangue', 'Morte', 'Conhecimento', 'Energia', 'Medo']" 
              label="Elemento"
              variant="outlined" 
              density="compact"
            ></v-select>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="4">
            <v-text-field 
              v-model.number="localRitual.circulo" 
              type="number" 
              label="Círculo"
              variant="outlined" 
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
              v-model="localRitual.execucao" 
              label="Execução"
              placeholder="Padrão, Completa, Reação..." 
              variant="outlined" 
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
              v-model="localRitual.alcance" 
              label="Alcance" 
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="4">
            <v-text-field 
              v-model="localRitual.alvo" 
              label="Alvo / Área" 
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
              v-model="localRitual.duracao" 
              label="Duração" 
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
              v-model="localRitual.resistencia" 
              label="Resistência" 
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-textarea 
          v-model="localRitual.descricao" 
          label="Descrição / Efeito" 
          variant="outlined" 
          rows="6"
          class="mt-2"
        ></v-textarea>

      </v-card-text>

      <v-card-actions>
        <v-btn text @click="isOpen = false">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" @click="salvar">Salvar</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { RitualInstancia } from '@/types/ordem/models';

const props = defineProps<{
  modelValue: boolean;
  ritual: RitualInstancia | null;
}>();

const emit = defineEmits(['update:modelValue', 'save', 'delete']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const localRitual = ref<RitualInstancia | null>(null);

// Clona o objeto quando o modal abre
watch(() => props.ritual, (newVal) => {
  if (newVal) {
    localRitual.value = JSON.parse(JSON.stringify(newVal));
  }
}, { immediate: true });

const salvar = () => {
  if (localRitual.value) {
    emit('save', localRitual.value);
    isOpen.value = false;
  }
};
</script>

<style scoped>
.flex-0-0 {
  flex: 0 0 auto;
}
</style>