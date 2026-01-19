<template>
  <v-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)" 
    max-width="600"
    scrollable
  >
    <v-card v-if="localItem">
      <v-toolbar color="brown-darken-3" density="compact">
        <v-icon class="ml-4">mdi-pencil</v-icon>
        <v-toolbar-title class="text-subtitle-1 font-weight-bold ml-2">Editar {{ localItem.nome }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="close"></v-btn>
      </v-toolbar>

      <v-card-text class="pa-4 bg-grey-lighten-5">
        
        <v-card border flat class="mb-4">
          <v-card-text class="pa-3">
            <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2 d-block">Informações Básicas</span>
            <v-text-field 
              v-model="localItem.nome" 
              label="Nome do Item" 
              variant="outlined" 
              density="compact" 
              class="mb-2"
              bg-color="white"
            ></v-text-field>
            
            <v-textarea 
              v-model="localItem.descricao" 
              label="Descrição / Notas" 
              variant="outlined" 
              density="compact" 
              rows="2"
              bg-color="white"
              hide-details
            ></v-textarea>
            
            <v-row dense class="mt-3">
               <v-col cols="6">
                  <v-text-field v-model.number="localItem.categoria" type="number" label="Categoria" density="compact" variant="outlined" bg-color="white"></v-text-field>
               </v-col>
               <v-col cols="6">
                  <v-text-field v-model.number="localItem.espacos" type="number" label="Espaços" density="compact" variant="outlined" bg-color="white"></v-text-field>
               </v-col>
            </v-row>
            <v-checkbox v-model="localItem.equipado" label="Equipado" density="compact" hide-details color="success"></v-checkbox>
          </v-card-text>
        </v-card>

        <div v-if="localItem.tipo === 'Arma'">
           <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis ml-1 mb-1 d-block">Estatísticas de Combate</span>
           <v-card border flat>
             <v-card-text class="pa-3">
               <v-row dense>
                 <v-col cols="6">
                   <v-select 
                      v-model="localItem.teste_ataque" 
                      :items="['Luta', 'Pontaria', 'Ocultismo']" 
                      label="Perícia de Ataque"
                      density="compact" variant="outlined" bg-color="white"
                   ></v-select>
                 </v-col>
                 <v-col cols="6">
                   <v-text-field v-model="localItem.alcance" label="Alcance" density="compact" variant="outlined" bg-color="white"></v-text-field>
                 </v-col>
                 <v-col cols="6">
                   <v-text-field v-model="localItem.dano" label="Dano" density="compact" variant="outlined" bg-color="white"></v-text-field>
                 </v-col>
                 <v-col cols="6">
                   <v-text-field v-model="localItem.critico" label="Crítico" density="compact" variant="outlined" bg-color="white"></v-text-field>
                 </v-col>
                 <v-col cols="12">
                   <v-select 
                      v-model="localItem.tipo_dano" 
                      :items="['Balístico', 'Corte', 'Impacto', 'Perfurante', 'Paranormal', 'Energia']" 
                      label="Tipo de Dano"
                      density="compact" variant="outlined" bg-color="white"
                   ></v-select>
                 </v-col>
               </v-row>
             </v-card-text>
           </v-card>
        </div>

        <div v-if="localItem.tipo === 'Protecao'" class="mt-2">
           <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis ml-1 mb-1 d-block">Defesa</span>
           <v-card border flat>
             <v-card-text class="pa-3">
               <v-row dense>
                 <v-col cols="6">
                   <v-text-field v-model.number="localItem.defesa" type="number" label="Bônus de Defesa" density="compact" variant="outlined" bg-color="white"></v-text-field>
                 </v-col>
                 <v-col cols="6">
                   <v-text-field v-model.number="localItem.resistencia_dano" type="number" label="RD Extra" density="compact" variant="outlined" bg-color="white"></v-text-field>
                 </v-col>
               </v-row>
             </v-card-text>
           </v-card>
        </div>

      </v-card-text>

      <v-card-actions class="pa-3 bg-white border-t">
        <v-btn color="error" variant="text" @click="$emit('delete', localItem.instanceId); close()">Excluir Item</v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="close">Cancelar</v-btn>
        <v-btn color="brown-darken-3" variant="flat" @click="save">Salvar Alterações</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ItemInstancia } from '@/types/ordem/models';

const props = defineProps<{ 
  modelValue: boolean;
  item: ItemInstancia | null; 
}>();

const emit = defineEmits(['update:modelValue', 'save', 'delete']);

const localItem = ref<ItemInstancia | null>(null);

watch(() => props.item, (newVal) => {
  if (newVal) {
    // Clone profundo para evitar mutação direta
    localItem.value = JSON.parse(JSON.stringify(newVal)) as ItemInstancia;
  }
}, { immediate: true });

const close = () => {
  emit('update:modelValue', false);
};

const save = () => {
  if (localItem.value) {
    emit('save', localItem.value);
    close();
  }
};
</script>