<template>
  <v-card class="d-flex flex-column profile-card" variant="outlined">
    <v-card-title class="d-flex align-center justify-space-between py-2 bg-surface-light flex-0-0">
      <span class="text-subtitle-2 font-weight-bold text-uppercase">
        <v-icon start size="default">{{ showRollplay ? 'mdi-book-open-page-variant' : 'mdi-dice-d20' }}</v-icon>
        {{ showRollplay ? 'História' : 'Perícias' }}
      </span>
      <v-btn 
        size="default" 
        variant="tonal" 
        :color="showRollplay ? 'purple' : 'teal'"
        @click="showRollplay = !showRollplay"
      >
        {{ showRollplay ? 'Ver Perícias' : 'Ver História' }}
        <v-icon end>{{ showRollplay ? 'mdi-dice-d20' : 'mdi-book-open-page-variant' }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-0 d-flex flex-column flex-grow-1 overflow-hidden" style="position: relative;">
      <v-window v-model="showRollplay" class="d-flex flex-column flex-grow-1 h-100">
        
        <v-window-item :value="true" class="h-100">
           <div class="d-flex flex-column">
              <v-tabs v-model="anotacoesTab" density="compact" grow>
                <v-tab value="historia">História & Psique</v-tab>
                <v-tab value="traumas">Traumas & Medos</v-tab>
              </v-tabs>
              <v-divider></v-divider>
              
              <div class="flex-grow-1" style="overflow-y: auto;">
                <v-window v-model="anotacoesTab">
                  <v-window-item value="historia" class="pa-2">
                    <v-sheet border rounded class="pa-2">
                      <v-textarea v-model="character.historia" label="História" variant="outlined" rows="10"
                        density="compact" hide-details></v-textarea>
                      <v-textarea v-model="character.personalidade" label="Personalidade" variant="outlined" rows="4"
                        density="compact" hide-details class="mt-2"></v-textarea>
                      <v-textarea v-model="character.aparencia" label="Aparência" variant="outlined" rows="4"
                        density="compact" hide-details class="mt-2"></v-textarea>
                    </v-sheet>
                  </v-window-item>
                  
                  <v-window-item value="traumas" class="pa-2">
                    <v-sheet border rounded class="pa-2">
                      <v-textarea v-model="character.primeiroEncontro" label="Primeiro Encontro Paranormal"
                        variant="outlined" rows="8" density="compact" hide-details></v-textarea>
                      <v-textarea v-model="character.doencasFobias" label="Doenças, Fobias e Manias" variant="outlined"
                        rows="5" density="compact" hide-details class="mt-2"></v-textarea>
                      <v-textarea v-model="character.piorPesadelo" label="Pior Pesadelo" variant="outlined" rows="5"
                        density="compact" hide-details class="mt-2"></v-textarea>
                    </v-sheet>
                  </v-window-item>
                </v-window>
              </div>
           </div>
        </v-window-item>

        <v-window-item :value="false" class="h-100">
          <div class="d-flex flex-column h-100">
            
            <div style="overflow-y: auto; flex: 1 1 auto;">
              
              <div class="pa-2 sticky-top bg-surface">
                <v-btn @click="showPericiaFilters = !showPericiaFilters"
                  :prepend-icon="showPericiaFilters ? 'mdi-chevron-up' : 'mdi-filter-variant'" variant="tonal" block
                  size="small">Filtros & Pesquisa</v-btn>
                <v-expand-transition>
                  <div v-if="showPericiaFilters" class="mt-2">
                    <v-text-field v-model="searchPericia" label="Pesquisar perícia..." variant="outlined"
                      density="compact" prepend-inner-icon="mdi-magnify" hide-details clearable
                      class="mb-2"></v-text-field>
                    <v-chip-group v-model="filtroAtributos" show-arrows multiple>
                      <v-chip v-for="atributo in opcoesFiltroAtributo" :key="atributo" :value="atributo" filter
                        size="small">{{ atributo }}</v-chip>
                    </v-chip-group>
                  </div>
                </v-expand-transition>
              </div>

              <v-divider></v-divider>
              
              <v-row class="px-5 py-1 text-caption font-weight-bold justify-space-between ma-0 bg-surface-light"
                style="width: 100%;">
                <v-col cols="auto" class="ml-2">Dado</v-col>
                <v-col cols="auto">Perícia</v-col>
                <v-col cols="auto" class="ml-4">Atributo</v-col>
                <v-col cols="auto" class="mr-2">Bônus</v-col>
              </v-row>
              <v-divider></v-divider>

              <v-expansion-panels variant="accordion" multiple>
                <v-expansion-panel v-for="pericia in periciasFiltradas" :key="pericia.id" elevation="0" rounded="0" class="border-b">
                  <v-expansion-panel-title>
                    <div class="d-flex align-center w-100">
                      
                      <div style="width: 40px" class="text-center ml-3 mr-6">
                        <v-btn 
                          icon 
                          size="x-small" 
                          variant="flat"
                          :color="getAtributoColor(selectedAtributos[pericia.id] || pericia.atributo_base)"
                          class="text-white"
                          @click.stop="rolarPericia(pericia)"
                        >
                          <v-icon>mdi-dice-d20</v-icon>
                        </v-btn>
                      </div>

                      <div style="flex: 1" class="text-body-2 text-truncate pr-2">
                        <v-btn variant="text" class="text-none font-weight-bold"
                          @click.stop="emit('open:pericia', pericia)">{{ pericia.nome }}</v-btn>
                      </div>

                      <div style="width: 70px" class="mr-10" @click.stop>
                        <v-select 
                          v-model="selectedAtributos[pericia.id]" 
                          :items="opcoesAtributo" 
                          density="compact"
                          hide-details 
                          variant="plain" 
                          class="small-select font-weight-bold text-caption"
                          menu-icon=""
                        ></v-select>
                      </div>

                      <div style="width: 50px" class="text-right">
                        <v-chip size="small"
                          :color="getAtributoColor(selectedAtributos[pericia.id] || pericia.atributo_base)"
                          variant="flat">+{{ calcularBonusPericia(pericia) }}</v-chip>
                      </div>
                    </div>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-row dense>
                      <v-col cols="6">
                        <v-select 
                          v-model="pericia.treino" 
                          :items="opcoesTreino" 
                          label="Grau de Treinamento"
                          density="compact" 
                          hide-details 
                          variant="outlined"
                          class="text-caption"
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field 
                          v-model.number="pericia.outros" 
                          label="Bônus / Itens"
                          density="compact" 
                          hide-details 
                          variant="outlined" 
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <div class="flex-0-0"> 
              <div class="pa-2">
                <v-btn @click="showAtributos = !showAtributos"
                  :prepend-icon="showAtributos ? 'mdi-chevron-down' : 'mdi-chevron-up'" variant="tonal" block
                  size="small">Atributos</v-btn>
              </div>

              <v-expand-transition>
                <div v-if="showAtributos" class="pb-2 px-2">
                  <div class="attribute-star-container">
                    
                    <div class="star-point top-center">
                       <div class="attr-label text-blue">AGI</div>
                       <input type="number" v-model.number="character.agilidade" class="attr-input">
                    </div>

                    <div class="star-point top-left">
                       <div class="attr-label text-red">FOR</div>
                       <input type="number" v-model.number="character.forca" class="attr-input">
                    </div>

                    <div class="star-point top-right">
                       <div class="attr-label text-purple">INT</div>
                       <input type="number" v-model.number="character.intelecto" class="attr-input">
                    </div>

                    <div class="star-point bottom-right">
                       <div class="attr-label text-yellow-darken-3">VIG</div>
                       <input type="number" v-model.number="character.vigor" class="attr-input">
                    </div>

                    <div class="star-point bottom-left">
                       <div class="attr-label text-green">PRE</div>
                       <input type="number" v-model.number="character.presenca" class="attr-input">
                    </div>

                  </div>
                </div>
              </v-expand-transition>
            </div>

          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFichaOrdem } from '@/composables/ordem/useFicha';

const emit = defineEmits(['open:pericia']);
const { 
    character, 
    searchPericia, 
    periciasFiltradas, 
    rolarPericia, 
    getAtributoColor, 
    calcularBonusPericia, 
    filtroAtributos,
    opcoesFiltroAtributo,
    selectedAtributos,
    opcoesAtributo,
    opcoesTreino 
} = useFichaOrdem();

const showRollplay = ref(true);
const anotacoesTab = ref('historia');
const showPericiaFilters = ref(false);
const showAtributos = ref(true);
</script>

<style scoped>
.profile-card {
    height: 85vh;
    max-height: 85vh;
}

.flex-0-0 {
    flex: 0 0 auto;
}

.sticky-top {
    position: sticky;
    top: 0;
    z-index: 5;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

/* --- ESTILO DOS ATRIBUTOS (STAR) --- */
.attribute-star-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
    height: 250px;
    background-image: url('@/assets/atributos.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 5px;
}

.star-point {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* POSICIONAMENTO MANUAL (Ajuste conforme sua imagem exata) */
.top-center   { top: 14.8%; left: 50.2%; }
.top-left     { top: 37.4%; left: 33.5%; }
.top-right    { top: 37.4%; left: 67.1%; }
.bottom-left  { top: 74.3%; left: 38.8%; }
.bottom-right { top: 74.3%; left: 61.1%; }

.attr-label {
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    text-shadow: 0 0 2px white;
    background-color: rgba(255, 255, 255);
    border: 2px solid rgba(0,0,0);
    border-radius: 10px;
    padding: 2px;
    margin-bottom: 2px;
}

.attr-input {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255);
    border: 2px solid rgba(0,0,0);
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    outline: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.2s;
    color: black;
}

.attr-input:focus {
    transform: scale(1.1);
    border-color: #6200EA; /* Purple */
    background-color: white;
}

/* Remove setinhas do input number */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* --- Select Compacto na Lista --- */
:deep(.small-select .v-field__input) {
    padding: 0;
    min-height: auto;
    font-size: 0.8rem;
    text-align: center;
    justify-content: center;
}
:deep(.small-select .v-field__append-inner) {
    display: none;
}
</style>