<template>
  <v-btn icon="mdi-arrow-left" position="fixed" location="bottom left" class="ma-6" color="surface-variant"
    elevation="4" style="z-index: 1005;" @click="$router.push('/ordem')"></v-btn>

  <v-container fluid class="fill-height align-start pa-4">
    <v-row class="fill-height">
      
      <v-col cols="12" md="4" variant="outlined">
        <CardEsquerdo 
          @open:origem="showOrigemModal = true" 
          @open:classe="showClasseModal = true"
          @open:trilha="showTrilhaModal = true" 
          @open:idade="showIdadeModal = true" 
        />
      </v-col>

      <v-col cols="12" md="4" variant="outlined">
        <CardCentro 
          @open:pericia="abrirModalPericia" 
        />
      </v-col>

      <v-col cols="12" md="4" variant="outlined">
        <CardDireito 
          @open:add-habilidade="showAddHabilidadeModal = true" 
          @remove:habilidade="removerHabilidade"
          @edit:habilidade="abrirEdicaoHabilidade" 
        />
      </v-col>

    </v-row>
  </v-container>

  <ModalIdade v-model="showIdadeModal" :data-nascimento="character.dataNascimento"
    :idade-envelhecida="character.idadeEnvelhecida" @save="handleSaveIdade" />

  <ModalOrigem v-model="showOrigemModal" @select="selecionarOrigem" />
  <ModalClasse v-model="showClasseModal" @select="selecionarClasse" />
  <ModalTrilha v-model="showTrilhaModal" :classe-id="character.classe" :classe-nome="nomeClasseTratado"
    @select="selecionarTrilha" />

  <ModalAddHabilidade v-model="showAddHabilidadeModal" @add="adicionarHabilidade" />
  <ModalEditHabilidade v-model="showEditHabilidadeModal" :habilidade="habilidadeEmEdicao" @save="atualizarHabilidade" />

  <v-dialog v-model="showModalPericia" max-width="500px">
    <v-card v-if="modalPericia">
      <v-card-title class="text-h5">{{ modalPericia.nome }}</v-card-title>
      <v-card-text>{{ modalPericia.descricao }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="modalPericia = null">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="4000" location="bottom right">
    {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
    </template>
  </v-snackbar>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFichaOrdem } from '@/composables/ordem/useFicha';
import type { Habilidade, Pericia } from '@/types/ordem/models';

// NOVOS COMPONENTES
import CardEsquerdo from '@/components/ordem/CardEsquerdo.vue';
import CardCentro from '@/components/ordem/CardCentro.vue';
import CardDireito from '@/components/ordem/CardDireito.vue';

// MODAIS (Mantidos)
import ModalOrigem from '@/components/ordem/modals/escolhas/ModalOrigem.vue';
import ModalClasse from '@/components/ordem/modals/escolhas/ModalClasse.vue';
import ModalTrilha from '@/components/ordem/modals/escolhas/ModalTrilha.vue';
import ModalIdade from '@/components/ordem/modals/info/ModalIdade.vue';
import ModalAddHabilidade from '@/components/ordem/modals/add/ModalAddHabilidade.vue';
import ModalEditHabilidade from '@/components/ordem/modals/editar/ModalEditHabilidade.vue';

const { character, snackbar, classeNome, handleSaveIdade, adicionarHabilidade, atualizarHabilidade, removerHabilidade } = useFichaOrdem();

// Estado dos Modais
const showOrigemModal = ref(false);
const showClasseModal = ref(false);
const showTrilhaModal = ref(false);
const showIdadeModal = ref(false);
const showAddHabilidadeModal = ref(false);
const showEditHabilidadeModal = ref(false);
const habilidadeEmEdicao = ref<Habilidade | null>(null);
const modalPericia = ref<Pericia | null>(null);

// Lógica de Modais
const abrirEdicaoHabilidade = (hab: Habilidade) => { habilidadeEmEdicao.value = hab; showEditHabilidadeModal.value = true; };
const showModalPericia = computed({ get: () => !!modalPericia.value, set: (val) => { if (!val) modalPericia.value = null; } });
const nomeClasseTratado = computed(() => { if (!classeNome.value) return ''; return classeNome.value.split(' ')[0] || ''; });
const selecionarOrigem = (id: string) => { character.value.origem = id; showOrigemModal.value = false; }
const selecionarClasse = (id: string) => { character.value.classe = id; showClasseModal.value = false; }
const selecionarTrilha = (id: string) => { character.value.trilha = id; showTrilhaModal.value = false; }
const abrirModalPericia = (pericia: Pericia) => { modalPericia.value = pericia; }
</script>

<style scoped>
/* CSS Global Utilitário */
:deep(.v-label) {
    font-size: 12px;
    font-weight: 500;
}

:deep(.v-field__input) {
    font-size: 14px;
}

:deep(.v-list-item-title) {
    font-size: 14px !important;
}

:deep(.v-list-item-subtitle) {
    font-size: 12px !important;
}

:deep(input[type='number']::-webkit-outer-spin-button),
:deep(input[type='number']::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
}
</style>