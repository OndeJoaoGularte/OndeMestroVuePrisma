<template>
  <v-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)" 
    max-width="900px" 
    scrollable
  >
    <v-card class="bg-surface">
      <v-toolbar color="indigo-darken-3" density="compact">
        <v-icon class="ml-4">mdi-bag-personal-plus</v-icon>
        <v-toolbar-title class="text-subtitle-1 font-weight-bold ml-2">Adicionar Item</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="$emit('update:modelValue', false)"></v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-row no-gutters class="h-100">
          
          <v-col cols="12" md="5" class="border-e d-flex flex-column" style="height: 500px;">
            <div class="pa-3 bg-surface-light">
              <v-text-field 
                v-model="search" 
                label="Buscar no catálogo..." 
                density="compact" 
                variant="outlined"
                prepend-inner-icon="mdi-magnify" 
                hide-details
                clearable
              ></v-text-field>
              
              <v-chip-group v-model="filtroCategoria" selected-class="text-indigo" class="mt-2" column>
                <v-chip filter value="Arma" size="small" variant="outlined">Armas</v-chip>
                <v-chip filter value="Protecao" size="small" variant="outlined">Proteções</v-chip>
                <v-chip filter value="Acessorio" size="small" variant="outlined">Acessórios</v-chip>
                <v-chip filter value="Geral" size="small" variant="outlined">Geral</v-chip>
              </v-chip-group>
            </div>
            
            <v-divider></v-divider>
            
            <div class="flex-grow-1 overflow-y-auto">
              <v-list density="compact" lines="two">
                <v-list-item 
                  v-for="item in itensFiltrados" 
                  :key="item.id" 
                  :title="item.nome"
                  :subtitle="getSubtitulo(item)" 
                  @click="selecionarItem(item)"
                  :active="itemSelecionado?.id === item.id" 
                  color="indigo"
                  class="mb-1"
                >
                  <template v-slot:prepend>
                    <v-avatar color="grey-lighten-3" size="small" class="mr-2">
                       <v-icon :icon="getIcon(item.tipo)" size="small" color="grey-darken-3"></v-icon>
                    </v-avatar>
                  </template>
                  <template v-slot:append>
                     <v-chip size="x-small" v-if="item.categoria > 0">Cat {{ item.categoria }}</v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </v-col>

          <v-col cols="12" md="7" class="d-flex flex-column bg-grey-lighten-5" style="height: 500px; overflow-y: auto;">
            
            <div v-if="itemSelecionado" class="pa-5">
              <div class="d-flex align-center mb-2">
                 <v-icon size="large" color="indigo" class="mr-3">{{ getIcon(itemSelecionado.tipo) }}</v-icon>
                 <div>
                    <h3 class="text-h6 font-weight-bold">{{ itemSelecionado.nome }}</h3>
                    <div class="d-flex gap-2 text-caption text-grey-darken-1">
                       <span>Categoria: <strong>{{ itemSelecionado.categoria }}</strong></span>
                       <span>•</span>
                       <span>Espaços: <strong>{{ itemSelecionado.espacos }}</strong></span>
                    </div>
                 </div>
              </div>
              
              <v-alert v-if="itemSelecionado.descricao" density="compact" variant="tonal" color="grey" class="mb-4 text-caption" border="start">
                 {{ itemSelecionado.descricao }}
              </v-alert>

              <v-form v-model="formValido">
                <v-card border flat class="mb-4">
                   <v-card-text class="pa-3">
                      <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2 d-block">Personalização</span>
                      <v-row dense>
                         <v-col cols="8">
                            <v-text-field 
                               v-model="config.nomePersonalizado" 
                               label="Nome Personalizado (Opcional)"
                               placeholder="Ex: A Vingadora" 
                               variant="outlined" 
                               density="compact" 
                               hide-details
                               bg-color="white"
                            ></v-text-field>
                         </v-col>
                         <v-col cols="4">
                            <v-text-field 
                               v-model.number="config.quantidade" 
                               type="number" 
                               label="Qtd." 
                               density="compact"
                               variant="outlined" 
                               hide-details 
                               min="1"
                               bg-color="white"
                            ></v-text-field>
                         </v-col>
                      </v-row>
                      <v-checkbox 
                         v-model="config.equipado" 
                         label="Adicionar já equipado?" 
                         density="compact"
                         hide-details
                         color="success"
                         class="mt-1"
                      ></v-checkbox>
                   </v-card-text>
                </v-card>

                <div v-if="itemSelecionado.tipo === 'Arma'" class="mb-3">
                  <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis ml-1 mb-1 d-block">Estatísticas de Combate</span>
                  <v-card border flat>
                    <v-card-text class="pa-3">
                      <v-row dense>
                        <v-col cols="6">
                          <v-select 
                             v-model="config.atributoAtaque" 
                             :items="atributos" 
                             label="Atributo Usado"
                             density="compact" 
                             variant="outlined" 
                             hide-details
                             bg-color="white"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-select 
                             v-model="config.periciaAtaque" 
                             :items="periciasNomes" 
                             label="Perícia Usada"
                             density="compact" 
                             variant="outlined" 
                             hide-details
                             bg-color="white"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row dense class="mt-2">
                        <v-col cols="6">
                          <v-text-field 
                             v-model="config.danoPersonalizado" 
                             label="Dano Base" 
                             density="compact" 
                             variant="outlined"
                             hide-details
                             bg-color="white"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field 
                             v-model="config.criticoPersonalizado" 
                             label="Crítico" 
                             density="compact"
                             variant="outlined" 
                             hide-details
                             bg-color="white"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </div>
              </v-form>
            </div>

            <div v-else class="d-flex flex-column align-center justify-center h-100 text-medium-emphasis">
              <v-icon size="64" color="grey-lighten-2" class="mb-2">mdi-cursor-default-click-outline</v-icon>
              <div class="text-body-2">Selecione um item ao lado para configurar</div>
            </div>

            <div class="mt-auto pa-4 border-t bg-surface d-flex justify-end align-center">
              <span v-if="itemSelecionado" class="text-caption text-grey mr-4">
                 Adicionando {{ config.quantidade }}x {{ config.nomePersonalizado || itemSelecionado.nome }}
              </span>
              <v-btn variant="text" @click="$emit('update:modelValue', false)" class="mr-2">Cancelar</v-btn>
              <v-btn 
                 color="indigo-darken-3" 
                 variant="flat" 
                 :disabled="!itemSelecionado" 
                 @click="confirmarAdicao"
                 prepend-icon="mdi-plus"
              >
                 Adicionar à Mochila
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { DB_BASE_ITEMS } from '@/database/ordem/inventario/dbItems';
import type { BaseItem, Atributo } from '@/types/ordem/models';

// Definição de Props e Emits
defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'add']);

// Estado UI
const search = ref('');
const filtroCategoria = ref<string | undefined>(undefined);
const itemSelecionado = ref<BaseItem | null>(null);
const formValido = ref(true);

// Listas para Selects
const atributos: Atributo[] = ['AGI', 'FOR', 'INT', 'PRE', 'VIG'];
const periciasNomes = ['Luta', 'Pontaria', 'Ocultismo', 'Tática', 'Reflexos', 'Fortitude']; 

// Configuração do Item a ser adicionado
const config = reactive({
  nomePersonalizado: '',
  atributoAtaque: 'AGI' as Atributo,
  periciaAtaque: 'Pontaria',
  danoPersonalizado: '',
  criticoPersonalizado: '',
  equipado: false,
  quantidade: 1
});

// Filtros
const itensFiltrados = computed(() => {
  return DB_BASE_ITEMS.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.value.toLowerCase());
    
    if (!filtroCategoria.value) return matchSearch;
    
    if (filtroCategoria.value === 'Geral') {
        // Geral engloba 'Geral', 'Municao' e talvez 'Acessorio' dependendo da sua preferência
        // No seu DB você usou 'Geral' e 'Municao'.
        return matchSearch && (item.tipo === 'Geral' || item.tipo === 'Municao');
    }
    
    return matchSearch && item.tipo === filtroCategoria.value;
  });
});

// Helpers Visuais
const getIcon = (tipo: string) => {
  if (tipo === 'Arma') return 'mdi-pistol'; // Ou mdi-sword
  if (tipo === 'Protecao') return 'mdi-shield-half-full';
  if (tipo === 'Municao') return 'mdi-ammunition';
  if (tipo === 'Acessorio') return 'mdi-ring';
  return 'mdi-bag-personal';
};

const getSubtitulo = (item: BaseItem) => {
    return `Cat ${item.categoria} • ${item.espacos} Espaço(s)`;
};

// Lógica de Seleção
const selecionarItem = (item: BaseItem) => {
  itemSelecionado.value = item;
  
  // Reseta config
  config.nomePersonalizado = '';
  config.quantidade = 1;
  config.equipado = false;

  // Pré-preenche dados de arma
  if (item.tipo === 'Arma') {
    config.danoPersonalizado = item.dano;
    config.criticoPersonalizado = item.critico;
    
    // Tenta adivinhar o atributo
    if (item.teste_ataque === 'Luta') config.atributoAtaque = 'FOR';
    else if (item.teste_ataque === 'Pontaria') config.atributoAtaque = 'AGI';
    else if (item.teste_ataque === 'Ocultismo') config.atributoAtaque = 'INT';
    
    config.periciaAtaque = item.teste_ataque || 'Luta';
  } else {
      config.danoPersonalizado = '';
      config.criticoPersonalizado = '';
  }
};

const confirmarAdicao = () => {
  if (!itemSelecionado.value) return;
  
  // Loop para adicionar múltiplas quantidades
  // (Pois cada item no inventário é uma instância única com seu próprio ID)
  const qtd = config.quantidade > 0 ? config.quantidade : 1;
  
  for (let i = 0; i < qtd; i++) {
      const novoItem = {
        baseItem: itemSelecionado.value,
        
        // Passamos os dados configurados para o useFicha montar o objeto final
        nomePersonalizado: config.nomePersonalizado || undefined,
        equipado: config.equipado,
        
        // Dados de combate (Se não for arma, o useFicha ignora ou salva como vazio)
        danoPersonalizado: config.danoPersonalizado,
        criticoPersonalizado: config.criticoPersonalizado,
        
        // Extras (Opcionais, se seu modelo suportar no futuro)
        atributoAtaque: config.atributoAtaque,
        periciaAtaque: config.periciaAtaque
      };
      
      emit('add', novoItem);
  }
  
  emit('update:modelValue', false);
};
</script>