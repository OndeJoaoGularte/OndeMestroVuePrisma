<template>
  <v-container class="fill-height align-start" fluid>
    
    <v-row class="mt-4 mb-6">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-btn icon="mdi-arrow-left" variant="text" @click="$router.push('/')"></v-btn>
          <div>
            <h1 class="text-h4 font-weight-bold text-purple-darken-3">Ordem Paranormal</h1>
            <span class="text-subtitle-1 text-grey-darken-1">Gerenciador de Campanhas e Personagens</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="6" lg="4">
        <v-btn-toggle
          v-model="perfilAtivo"
          color="purple-darken-2"
          rounded="xl"
          group
          mandatory
          class="elevation-2 bg-white"
          style="width: 500px;"
        >
          <v-btn value="jogador" class="w-auto" height="50">
            <v-icon start>mdi-account</v-icon> Jogador
          </v-btn>
          <v-btn value="mestre" class="w-auto" height="50">
            <v-icon start>mdi-crown</v-icon> Mestre
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-window v-model="perfilAtivo" class="w-100">
      
      <v-window-item value="jogador">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h5 font-weight-bold mb-4 ml-2 border-l-4 pl-3 border-purple">
              Meus Agentes
            </h2>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card 
              class="h-100 d-flex flex-column align-center justify-center cursor-pointer border-dashed"
              min-height="250"
              elevation="0"
              color="transparent"
              @click="criarNovoPersonagem"
              v-ripple
            >
              <div class="text-center pa-6 rounded-circle bg-white elevation-2 mb-4">
                <v-icon size="40" color="purple">mdi-plus</v-icon>
              </div>
              <h3 class="text-h6 font-weight-bold text-purple">Criar Agente</h3>
              <p class="text-caption text-grey">Começar do zero</p>
            </v-card>
          </v-col>

          <v-col 
            v-for="char in meusPersonagens" 
            :key="char.id" 
            cols="12" sm="6" md="4" lg="3"
          >
            <v-card 
              class="h-100 cursor-pointer hover-card" 
              elevation="3"
              @click="abrirPersonagem(char.id)"
            >
              <v-img 
                :src="char.avatar || 'https://i.pinimg.com/736x/b2/a3/9a/b2a39a957816ae0945d8205f4277713d.jpg'" 
                height="150" 
                cover
                class="align-end"
              >
                <v-card-title class="text-white bg-gradient">
                  {{ char.nome }}
                </v-card-title>
              </v-img>
              
              <v-card-text class="pt-3">
                <div class="d-flex align-center justify-space-between mb-1">
                  <v-chip size="small" color="purple" variant="flat">{{ char.classe }}</v-chip>
                  <span class="text-caption font-weight-bold">Nível {{ char.nivel }}</span>
                </div>
                <div class="text-caption text-grey">
                  {{ char.origem }} • {{ char.trilha }}
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn variant="text" color="primary" size="small">Editar</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-delete" variant="text" color="error" size="small"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

        </v-row>
      </v-window-item>

      <v-window-item value="mestre">
        <v-container class="text-center py-10">
          <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-sword</v-icon>
          <h2 class="text-h5 text-grey">Área do Mestre</h2>
          <p class="text-body-2 text-grey-lighten-1">
            Criação de campanhas e ameaças em breve.
          </p>
        </v-container>
      </v-window-item>

    </v-window>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import pinkyImageUrl from '@/assets/pinky.png';

const router = useRouter();
const perfilAtivo = ref('jogador'); 

// --- DADOS DOS PERSONAGENS ---
// Aqui simulam o banco de dados.
// O "id: 'demo'" representa a ficha que estamos programando agora.
const meusPersonagens = ref([
  { 
    id: 'demo', 
    nome: 'Pinky Dahlia', 
    classe: 'Ocultista', 
    trilha: 'Lâmina Paranormal', 
    nivel: 2, 
    origem: 'Artista',
    // Uma imagem aleatória estilo RPG/Dark para ilustrar
    avatar: pinkyImageUrl
  }
]);

// Ação ao clicar em "Criar Agente"
const criarNovoPersonagem = () => {
  // Redireciona para a ficha que já construímos
  router.push('/ordem/criar');
};

// Ação ao clicar no Card do Agente
const abrirPersonagem = (id: string | number) => {
  console.log('Abrindo ficha do ID:', id);
  // Redireciona para a ficha que já construímos
  router.push('/ordem/ficha');
};
</script>

<style scoped>
.border-dashed {
  border: 2px dashed rgba(var(--v-theme-purple), 0.3) !important;
  transition: all 0.2s;
}
.border-dashed:hover {
  border-color: rgba(var(--v-theme-purple), 1) !important;
  background-color: rgba(var(--v-theme-purple), 0.05) !important;
}

.hover-card {
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: translateY(-4px);
}

.bg-gradient {
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.border-l-4 {
  border-left: 4px solid;
}
.border-purple {
  border-color: rgb(var(--v-theme-purple));
}
</style>