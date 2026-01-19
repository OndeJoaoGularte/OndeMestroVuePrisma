<template>
  <v-dialog v-model="isOpen" max-width="800px" scrollable>
    <v-card>
      <v-card-title class="text-h5 bg-surface-light d-flex align-center">
        Selecionar Origem
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text style="height: 60vh; overflow-y: auto;" class="pa-0">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="origem in DB_ORIGENS" :key="origem.id">
            <v-expansion-panel-title class="py-2">
              <v-row no-gutters align="center" style="width: 100%">
                <v-col><span class="text-subtitle-1 font-weight-bold">{{ origem.nome }}</span></v-col>
                <v-col cols="auto">
                  <v-btn color="primary" size="small" variant="flat" class="mr-2" @click.stop="selecionar(origem.id)">
                    Escolher
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="bg-grey-lighten-5">
              <p class="text-body-2 mb-3">{{ origem.descricao }}</p>
              <v-divider class="my-2"></v-divider>
              <div>
                <div class="text-caption font-weight-bold text-uppercase">Habilidade</div>
                <p class="font-weight-bold text-primary mb-1">{{ origem.habilidade.nome }}</p>
                <p class="text-caption">{{ origem.habilidade.descricao }}</p>
              </div>
              <div v-if="origem.pericias.length" class="mt-2">
                <div class="text-caption font-weight-bold text-uppercase mb-1">Perícias</div>
                <v-chip v-for="pericia in origem.pericias" :key="pericia" size="x-small" class="mr-1" color="indigo" label>
                  {{ pericia }}
                </v-chip>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DB_ORIGENS } from '@/database/ordem/basicos/dbOrigens';

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