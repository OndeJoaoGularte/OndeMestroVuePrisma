<template>
  <v-dialog v-model="isOpen" max-width="85vw" width="85vw" scrollable>
    <v-card class="d-flex flex-column">
      <v-card-title class="text-h5 bg-surface-light d-flex align-center">
        Selecionar Classe
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col v-for="classe in DB_CLASSES" :key="classe.id" cols="12" md="4">
            <v-card
              class="d-flex flex-column h-100"
              height="68vh"
              max-height="68vh"
              variant="outlined"
              elevation="2"
              border
            >
              <v-card-title class="text-red font-weight-bold">{{ classe.nome }}</v-card-title>
              <v-card-subtitle class="text-wrap pb-2" style="line-height: 1.2">{{
                classe.descricao
              }}</v-card-subtitle>

              <v-divider></v-divider>

              <v-card-text class="flex-grow-1 overflow-y-auto" style="max-height: 300px">
                <div class="text-caption font-weight-bold mb-1">HABILIDADES INICIAIS</div>
                <v-expansion-panels variant="accordion" class="mb-3">
                  <v-expansion-panel
                    v-for="hab in classe.habilidades"
                    :key="hab.id"
                    elevation="0"
                    class="border"
                  >
                    <v-expansion-panel-title class="py-1 min-h-40 text-subtitle-2 font-weight-bold">
                      {{ hab.nome }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="text-caption">
                      {{ hab.descricao }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

                <v-divider class="my-2"></v-divider>
                <p class="font-weight-bold mb-2">Progressão por Nível:</p>
                <div class="d-flex flex-row justify-space-between">
                  <div class="d-flex flex-column align-start">
                    <v-chip size="small" color="red" class="mb-1"
                      >PV: {{ classe.base_pv }} + VIG</v-chip
                    >
                    <v-chip size="small" color="blue" class="mb-1">PS: {{ classe.base_ps }}</v-chip>
                    <v-chip size="small" color="orange" class="mb-1"
                      >PE: {{ classe.base_pe }} + PRE</v-chip
                    >
                  </div>
                  <div class="d-flex flex-column align-end">
                    <v-chip size="small" color="red" class="mb-1"
                      >+{{ classe.bonus_pv }} + VIG / Nível</v-chip
                    >
                    <v-chip size="small" color="blue" class="mb-1"
                      >+{{ classe.bonus_ps }} / Nível</v-chip
                    >
                    <v-chip size="small" color="orange" class="mb-1"
                      >+{{ classe.bonus_pe }} + PRE / Nível</v-chip
                    >
                  </div>
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
import { computed } from 'vue'
import { DB_CLASSES } from '@/database/ordem/basicos/dbClasses'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'select'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const selecionar = (id: string) => {
  emit('select', id)
  isOpen.value = false
}
</script>

<style scoped>
.min-h-40 {
  min-height: 40px;
}
</style>
