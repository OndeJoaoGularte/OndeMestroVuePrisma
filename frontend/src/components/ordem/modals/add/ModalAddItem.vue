<template>
  <v-dialog v-model="dialog" max-width="800px" scrollable>
    <v-card class="bg-surface">
      <v-toolbar color="primary" density="compact">
        <v-toolbar-title class="text-subtitle-1 font-weight-bold">Adicionar Item</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-row no-gutters class="h-100">
          
          <v-col cols="12" md="5" class="border-e">
            <div class="pa-2 bg-surface-light">
              <v-text-field v-model="search" label="Buscar no catálogo..." density="compact" variant="outlined"
                prepend-inner-icon="mdi-magnify" hide-details></v-text-field>
              <v-chip-group v-model="filtroCategoria" selected-class="text-primary" class="mt-2">
                <v-chip filter value="Arma" size="x-small">Armas</v-chip>
                <v-chip filter value="Protecao" size="x-small">Proteções</v-chip>
                <v-chip filter value="Geral" size="x-small">Geral</v-chip>
              </v-chip-group>
            </div>
            <v-divider></v-divider>
            <v-list density="compact" style="max-height: 400px; overflow-y: auto;">
              <v-list-item v-for="item in itensFiltrados" :key="item.id" :title="item.nome"
                :subtitle="`Cat ${item.categoria} | ${item.espacos} Esp`" @click="selecionarItem(item)"
                :active="itemSelecionado?.id === item.id" color="primary">
                <template v-slot:prepend>
                  <v-icon :icon="getIcon(item.tipo)" size="small" class="mr-2 text-medium-emphasis"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="7" class="pa-4 d-flex flex-column">
            <div v-if="itemSelecionado">
              <h3 class="text-h6 font-weight-bold mb-1">{{ itemSelecionado.nome }}</h3>
              <p class="text-caption text-medium-emphasis mb-4">{{ itemSelecionado.descricao }}</p>

              <v-form v-model="formValido">
                <v-text-field v-model="config.nomePersonalizado" label="Nome Personalizado (Opcional)"
                  placeholder="Ex: A Vingadora" variant="outlined" density="compact" class="mb-2"></v-text-field>

                <div v-if="itemSelecionado.tipo === 'Arma'" class="bg-surface-light pa-3 rounded border mb-3">
                  <span class="text-subtitle-2 font-weight-bold text-primary">Configuração de Ataque</span>
                  <v-row dense class="mt-2">
                    <v-col cols="6">
                      <v-select v-model="config.atributoAtaque" :items="atributos" label="Atributo Usado"
                        density="compact" variant="outlined" hide-details></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select v-model="config.periciaAtaque" :items="periciasNomes" label="Perícia Usada"
                        density="compact" variant="outlined" hide-details></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense class="mt-2">
                    <v-col cols="6">
                      <v-text-field v-model="config.danoPersonalizado" label="Dano" density="compact" variant="outlined"
                        hide-details></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="config.criticoPersonalizado" label="Crítico" density="compact"
                        variant="outlined" hide-details></v-text-field>
                    </v-col>
                  </v-row>
                </div>

                <v-row dense>
                  <v-col cols="6">
                    <v-checkbox v-model="config.equipado" label="Já adicionar equipado?" density="compact"
                      hide-details></v-checkbox>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model.number="config.quantidade" type="number" label="Quantidade" density="compact"
                      variant="outlined" hide-details min="1"></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </div>

            <div v-else class="d-flex align-center justify-center h-100 text-medium-emphasis">
              Selecione um item ao lado para configurar
            </div>

            <div class="mt-auto pt-4 d-flex justify-end">
              <v-btn variant="text" @click="dialog = false" class="mr-2">Cancelar</v-btn>
              <v-btn color="primary" :disabled="!itemSelecionado" @click="confirmarAdicao">Adicionar à Mochila</v-btn>
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
// CORREÇÃO: 'AnyItemBase' não existe no models.ts, o correto é 'BaseItem'
import type { BaseItem, Atributo } from '@/types/ordem/models';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'add']);

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const search = ref('');
const filtroCategoria = ref<string | undefined>(undefined);
// CORREÇÃO: Tipagem atualizada para BaseItem
const itemSelecionado = ref<BaseItem | null>(null);
const formValido = ref(true);

const atributos: Atributo[] = ['AGI', 'FOR', 'INT', 'PRE', 'VIG'];
const periciasNomes = ['Luta', 'Pontaria', 'Ocultismo', 'Tática', 'Reflexos', 'Fortitude']; 

const config = reactive({
  nomePersonalizado: '',
  atributoAtaque: 'AGI' as Atributo,
  periciaAtaque: 'Pontaria',
  danoPersonalizado: '',
  criticoPersonalizado: '',
  equipado: false,
  quantidade: 1
});

const itensFiltrados = computed(() => {
  return DB_BASE_ITEMS.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.value.toLowerCase());
    const matchCat = filtroCategoria.value ? item.tipo === filtroCategoria.value : true;
    return matchSearch && matchCat;
  });
});

const getIcon = (tipo: string) => {
  if (tipo === 'Arma') return 'mdi-sword';
  if (tipo === 'Protecao') return 'mdi-shield';
  if (tipo === 'Municao') return 'mdi-ammunition';
  return 'mdi-bag-personal';
};

// CORREÇÃO: Tipagem do parâmetro atualizada
const selecionarItem = (item: BaseItem) => {
  itemSelecionado.value = item;
  config.nomePersonalizado = '';
  config.quantidade = 1;
  config.equipado = false;

  if (item.tipo === 'Arma') {
    config.danoPersonalizado = item.dano;
    config.criticoPersonalizado = item.critico;
    
    if (item.teste_ataque === 'Luta') config.atributoAtaque = 'FOR';
    else if (item.teste_ataque === 'Pontaria') config.atributoAtaque = 'AGI';
    else if (item.teste_ataque === 'Ocultismo') config.atributoAtaque = 'INT';
    
    config.periciaAtaque = item.teste_ataque;
  }
};

const confirmarAdicao = () => {
  if (!itemSelecionado.value) return;
  
  const novoItem = {
    baseItem: itemSelecionado.value,
    ...config
  };
  
  emit('add', novoItem);
  dialog.value = false;
};
</script>