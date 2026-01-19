<template>
  <v-container class="fill-height align-center justify-center">
    
    <v-card width="100%" max-width="900" elevation="10" class="rounded-xl overflow-hidden">
      
      <v-toolbar color="purple-darken-3" dark flat>
        <v-toolbar-title class="font-weight-bold text-uppercase">
          Criação de Agente
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="mr-4 text-subtitle-2">Passo {{ step }} de 4</span>
      </v-toolbar>

      <v-progress-linear 
        :model-value="(step / 4) * 100" 
        color="purple-accent-2" 
        height="6"
      ></v-progress-linear>

      <v-card-text class="pa-6" style="min-height: 400px;">
        
        <v-window v-model="step">
          
          <v-window-item :value="1">
            <h2 class="text-h5 font-weight-bold mb-4 text-purple-darken-2">Escolha sua Origem</h2>
            <p class="mb-4 text-grey-darken-1">O que você fazia antes de conhecer o Paranormal?</p>
            
            <v-row style="max-height: 400px; overflow-y: auto;">
              <v-col 
                v-for="origem in listaOrigens" 
                :key="origem.id" 
                cols="12" sm="6" md="4"
              >
                <v-card 
                  :color="form.origemId === origem.id ? 'purple-lighten-5' : 'surface'"
                  :border="form.origemId === origem.id"
                  class="cursor-pointer hover-card"
                  @click="form.origemId = origem.id; form.origemNome = origem.nome"
                  elevation="2"
                >
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    {{ origem.nome }}
                  </v-card-title>
                  <v-card-text class="text-caption text-grey">
                    {{ origem.pericias.join(', ') }}
                  </v-card-text>
                  <v-icon 
                    v-if="form.origemId === origem.id" 
                    color="purple" 
                    class="position-absolute top-0 right-0 ma-2"
                  >mdi-check-circle</v-icon>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item :value="2">
            <h2 class="text-h5 font-weight-bold mb-4 text-purple-darken-2">Escolha sua Classe</h2>
            <v-row justify="center" class="mt-4">
              
              <v-col cols="12" md="4">
                <v-card 
                  @click="form.classe = 'Combatente'"
                  :color="form.classe === 'Combatente' ? 'red-lighten-5' : 'surface'"
                  class="text-center py-6 cursor-pointer hover-card"
                  :class="{'border-selected-red': form.classe === 'Combatente'}"
                >
                  <v-icon size="60" color="red-darken-2">mdi-sword</v-icon>
                  <h3 class="text-h6 mt-3 font-weight-bold">Combatente</h3>
                  <p class="text-caption pa-2">Focados em força e proteção.</p>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card 
                  @click="form.classe = 'Especialista'"
                  :color="form.classe === 'Especialista' ? 'blue-lighten-5' : 'surface'"
                  class="text-center py-6 cursor-pointer hover-card"
                  :class="{'border-selected-blue': form.classe === 'Especialista'}"
                >
                  <v-icon size="60" color="blue-darken-2">mdi-crosshairs-gps</v-icon>
                  <h3 class="text-h6 mt-3 font-weight-bold">Especialista</h3>
                  <p class="text-caption pa-2">Mestres em perícias e tecnologia.</p>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card 
                  @click="form.classe = 'Ocultista'"
                  :color="form.classe === 'Ocultista' ? 'purple-lighten-5' : 'surface'"
                  class="text-center py-6 cursor-pointer hover-card"
                  :class="{'border-selected-purple': form.classe === 'Ocultista'}"
                >
                  <v-icon size="60" color="purple-darken-2">mdi-pentagram</v-icon>
                  <h3 class="text-h6 mt-3 font-weight-bold">Ocultista</h3>
                  <p class="text-caption pa-2">Estudiosos do Outro Lado.</p>
                </v-card>
              </v-col>

            </v-row>
          </v-window-item>

          <v-window-item :value="3">
            <h2 class="text-h5 font-weight-bold mb-2 text-purple-darken-2">Defina os Atributos</h2>
            <p class="text-caption mb-6">Distribua seus pontos (0 a 5).</p>

            <v-row justify="center">
              <v-col cols="12" sm="10">
                <div v-for="(valor, key) in form.atributos" :key="key" class="d-flex align-center mb-4">
                  <div class="text-uppercase font-weight-bold mr-4 w-25 text-right">
                    {{ key }}
                  </div>
                  <v-btn icon size="small" color="grey-lighten-2" @click="alterarAtributo(key, -1)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <div class="mx-4 text-h5 font-weight-bold w-10 text-center">{{ valor }}</div>
                  <v-btn icon size="small" color="purple-lighten-4" @click="alterarAtributo(key, 1)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  
                  <div class="ml-4 d-none d-sm-flex">
                     <v-icon v-for="n in valor" :key="n" color="purple" size="small">mdi-circle</v-icon>
                     <v-icon v-for="n in (5 - valor)" :key="n + 'empty'" color="grey-lighten-3" size="small">mdi-circle-outline</v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item :value="4">
            <h2 class="text-h5 font-weight-bold mb-4 text-purple-darken-2">Identidade</h2>
            
            <v-row justify="center">
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="form.nome"
                  label="Nome do Personagem"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                  color="purple"
                  class="mb-4"
                ></v-text-field>

                <v-card border flat class="bg-grey-lighten-4 pa-4">
                  <h3 class="text-subtitle-1 font-weight-bold mb-2">Resumo da Ficha:</h3>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="purple" class="mr-2">mdi-account-circle</v-icon>
                    <strong>{{ form.nome || 'Sem nome' }}</strong>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="blue" class="mr-2">mdi-briefcase</v-icon>
                    Origem: {{ form.origemNome || 'Não selecionada' }}
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="red" class="mr-2">mdi-sword-cross</v-icon>
                    Classe: {{ form.classe || 'Não selecionada' }}
                  </div>
                </v-card>

              </v-col>
            </v-row>
          </v-window-item>

        </v-window>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4 bg-grey-lighten-5">
        <v-btn 
          v-if="step > 1" 
          variant="text" 
          @click="step--"
        >
          Voltar
        </v-btn>
        <v-btn v-else variant="text" color="error" to="/ordem">
          Cancelar
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn 
          v-if="step < 4" 
          color="purple-darken-2" 
          variant="flat" 
          @click="avancar"
          :disabled="bloquearAvanco"
        >
          Próximo
        </v-btn>
        <v-btn 
          v-else 
          color="success" 
          variant="flat" 
          size="large"
          @click="finalizarCriacao"
          :disabled="!form.nome"
        >
          Criar Ficha
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
// Importe seus bancos de dados corretamente
import { DB_ORIGENS } from '@/database/ordem/basicos/dbOrigens'; 

const router = useRouter();
const step = ref(1);
const listaOrigens = DB_ORIGENS;

// O OBJETO DA FICHA SENDO CRIADA
const form = reactive({
  nome: '',
  origemId: '',
  origemNome: '',
  classe: '',
  atributos: {
    forca: 1,
    agilidade: 1,
    intelecto: 1,
    vigor: 1,
    presenca: 1
  }
});

// --- LÓGICA DE CONTROLE ---

const alterarAtributo = (key: keyof typeof form.atributos, delta: number) => {
  const novoValor = form.atributos[key] + delta;
  if (novoValor >= 0 && novoValor <= 5) {
    form.atributos[key] = novoValor;
  }
};

const bloquearAvanco = computed(() => {
  if (step.value === 1 && !form.origemId) return true;
  if (step.value === 2 && !form.classe) return true;
  return false;
});

const avancar = () => {
  if (step.value < 4) step.value++;
};

const finalizarCriacao = () => {
  // A MÁGICA: SALVAR NO LOCALSTORAGE
  // Salvamos como string JSON para ler depois na ficha
  const fichaPronta = {
    ...form,
    nex: 5,         // Começa com 5%
    trilha: 'Nenhuma', // Trilha escolhe depois (10%)
    vidaAtual: 20,  // Valores placeholders, a lógica real calcularia isso
    peAtual: 5,
    sanAtual: 20
  };

  localStorage.setItem('ficha_ativa_ordem', JSON.stringify(fichaPronta));
  
  // Redireciona para a ficha
  router.push('/ordem/ficha');
};
</script>

<style scoped>
.hover-card {
  transition: all 0.2s;
  border: 2px solid transparent;
}
.hover-card:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--v-theme-primary), 0.5);
}

.border-selected-red { border: 2px solid rgb(var(--v-theme-error)) !important; }
.border-selected-blue { border: 2px solid rgb(var(--v-theme-info)) !important; }
.border-selected-purple { border: 2px solid rgb(var(--v-theme-purple)) !important; }
</style>