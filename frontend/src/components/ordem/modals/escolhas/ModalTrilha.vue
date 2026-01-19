<template>
  <v-dialog v-model="isOpen" max-width="800px" scrollable>
    <v-card>
      <v-card-title class="text-h5">
        Selecionar Trilha
        <v-chip size="small" color="primary" class="ml-2" v-if="classeNome">
          {{ classeNome }}
        </v-chip>
      </v-card-title>
      
      <v-card-text style="height: 60vh; overflow-y: auto;">
        <v-expansion-panels variant="inset">
          <v-expansion-panel
            v-for="trilha in trilhasFiltradas"
            :key="trilha.id"
          >
            <v-expansion-panel-title>
              <v-row no-gutters align="center">
                <v-col>
                  <span class="text-subtitle-1">{{ trilha.nome }}</span>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    color="primary"
                    size="small"
                    class="mr-2"
                    @click.stop="selecionar(trilha.id)"
                  >
                    Escolher
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">{{ trilha.descricao }}</p>
              <v-divider class="my-2"></v-divider>
              <div>
                <div class="text-caption">Habilidade de Trilha</div>
                <p class="font-weight-bold mb-1">{{ trilha.habilidade.nome }}</p>
                <p class="text-body-2">{{ trilha.habilidade.descricao }}</p>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        
        <v-alert v-if="trilhasFiltradas.length === 0" type="info" variant="tonal" class="mt-4">
          Selecione uma Classe primeiro para ver as trilhas disponíveis.
        </v-alert>
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