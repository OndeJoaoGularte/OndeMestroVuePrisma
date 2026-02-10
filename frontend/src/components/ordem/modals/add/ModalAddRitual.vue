<template>
  <v-dialog v-model="isOpen" max-width="800px" scrollable>
    <v-card class="d-flex flex-column">
      
      <v-card-title class="text-h5 bg-surface-light d-flex align-center flex-0-0">
        Transcender Ritual
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
      </v-card-title>

      <v-card-text class="pa-0 d-flex flex-column" style="height: 65vh;">
        
        <div style="flex: 0 0 auto; z-index: 2;" class="bg-surface border-b">
          <div class="pa-3">
            <v-text-field 
              v-model="search" 
              placeholder="Pesquisar ritual..."
              prepend-inner-icon="mdi-magnify" 
              variant="outlined" 
              density="compact" 
              hide-details
              clearable
            ></v-text-field>
          </div>

          <div class="px-4 pb-2">
            <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-1">Círculo</div>
            <v-chip-group v-model="filtroCirculo" selected-class="text-primary" multiple column>
              <v-chip :value="1" filter size="small" variant="outlined">1º Círculo</v-chip>
              <v-chip :value="2" filter size="small" variant="outlined">2º Círculo</v-chip>
              <v-chip :value="3" filter size="small" variant="outlined">3º Círculo</v-chip>
              <v-chip :value="4" filter size="small" variant="outlined">4º Círculo</v-chip>
            </v-chip-group>

            <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mt-2 mb-1">Elemento</div>
            <v-chip-group v-model="filtroElemento" selected-class="ring-active" multiple column>
              <v-chip value="Sangue" filter size="small" color="red-darken-2" variant="tonal">Sangue</v-chip>
              <v-chip value="Morte" filter size="small" color="grey-darken-3" variant="tonal">Morte</v-chip>
              <v-chip value="Conhecimento" filter size="small" color="yellow-darken-3" variant="tonal">Conhecimento</v-chip>
              <v-chip value="Energia" filter size="small" color="purple-darken-2" variant="tonal">Energia</v-chip>
              <v-chip value="Medo" filter size="small" color="white" variant="tonal">Medo</v-chip>
            </v-chip-group>
          </div>
        </div>

        <div class="flex-grow-1 overflow-y-auto bg-surface">
          <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="ritual in listaExibida" :key="ritual.id">
              
              <v-expansion-panel-title class="py-2">
                <v-row no-gutters align="center">
                  <v-col cols="auto" class="mr-3">
                    <v-avatar size="32" :color="getElementoColor(ritual.elemento)" variant="flat">
                      <span class="text-white font-weight-bold text-caption">{{ ritual.circulo }}º</span>
                    </v-avatar>
                  </v-col>

                  <v-col>
                    <div class="font-weight-bold">{{ ritual.nome }}</div>
                    <div class="text-caption text-medium-emphasis">
                      {{ ritual.execucao }} • {{ ritual.alcance }} • {{ ritual.alvo }}
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <div class="d-flex justify-space-between text-caption mb-2 text-medium-emphasis border-b pb-1">
                  <span><strong>Duração:</strong> {{ ritual.duracao }}</span>
                  <span><strong>Resistência:</strong> {{ ritual.resistencia }}</span>
                </div>

                <div class="text-body-2 mb-3 text-justify" v-html="ritual.descricao"></div>

                <v-row dense justify="end">
                  <v-col cols="auto">
                    <v-btn 
                      variant="flat" 
                      color="purple-darken-2" 
                      size="small" 
                      prepend-icon="mdi-auto-fix"
                      @click="adicionar(ritual)"
                    >
                      Aprender Ritual
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>

          <div v-if="listaExibida.length === 0" class="d-flex flex-column align-center justify-center h-100 pa-4 text-grey">
            <v-icon size="large" class="mb-2">mdi-book-off</v-icon>
            <span class="text-body-2">Nenhum ritual encontrado com esses filtros.</span>
          </div>
        </div>

      </v-card-text>

      <v-card-actions class="bg-white elevation-2">
        <v-spacer></v-spacer>
        <v-btn text @click="isOpen = false">Fechar</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ritual } from '@/types/ordem/models';
import { DB_RITUAIS } from '@/database/ordem/inventario/dbRituais';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'add']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// --- FILTROS ---
const search = ref('');
const filtroElemento = ref<string[]>([]);
const filtroCirculo = ref<number[]>([]);

// --- CORES ---
const getElementoColor = (el?: string) => {
  const map: Record<string, string> = {
    'Sangue': 'red-darken-3',
    'Morte': 'grey-darken-4',
    'Energia': 'purple-accent-3',
    'Conhecimento': 'amber-darken-3',
    'Medo': 'white'
  };
  return map[el || ''] || 'grey';
};

// --- LISTAGEM E ORDENAÇÃO ---
const listaExibida = computed(() => {
  let lista = [...DB_RITUAIS];

  // 1. Filtro Texto
  if (search.value) {
    const s = search.value.toLowerCase();
    lista = lista.filter(r => r.nome.toLowerCase().includes(s));
  }

  // 2. Filtro Elemento
  if (filtroElemento.value.length > 0) {
    lista = lista.filter(r => filtroElemento.value.includes(r.elemento));
  }

  // 3. Filtro Círculo
  if (filtroCirculo.value.length > 0) {
    lista = lista.filter(r => filtroCirculo.value.includes(r.circulo));
  }

  // 4. Ordenação (Círculo Crescente -> Nome Alfabético)
  lista.sort((a, b) => {
    if (a.circulo !== b.circulo) return a.circulo - b.circulo;
    return a.nome.localeCompare(b.nome);
  });

  return lista;
});

const adicionar = (ritual: Ritual) => {
  emit('add', ritual);
};
</script>

<style scoped>
.flex-0-0 { flex: 0 0 auto; }
.ring-active .v-chip--selected { box-shadow: 0 0 0 2px currentColor; }
</style>