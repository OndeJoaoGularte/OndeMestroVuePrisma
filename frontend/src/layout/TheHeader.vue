<template>
    <v-app-bar app density="compact" elevation="1">

        <div class="d-flex align-center cursor-pointer ml-2" @click="$router.push('/')" title="Voltar para o Início">
            <v-img :src="logoImg" height="40" width="150" max-width="150" position="left" contain></v-img>
        </div>

        <v-divider vertical class="mx-4 my-auto" length="20" v-if="menuAtual.length > 0"></v-divider>

        <div class="d-flex align-center">
            <v-fade-transition group>
                <v-btn v-for="item in menuAtual" :key="item.label" :to="item.to" :prepend-icon="item.icon"
                    :color="item.color" variant="text" class="mx-1 text-capitalize" size="small">
                    {{ item.label }}
                </v-btn>
            </v-fade-transition>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex align-center mr-2">

            <v-slide-x-transition>
                <div v-if="menuAtual.length > 0" class="mr-4 bg-surface rounded-pill elevation-1"
                    style="transform: scale(0.85);">
                    <v-btn-toggle v-model="modoView" mandatory rounded="xl" density="compact" color="primary"
                        variant="text">
                        <v-btn value="jogador" size="small" prepend-icon="mdi-account">
                            Jogador
                        </v-btn>
                        <v-btn value="mestre" size="small" prepend-icon="mdi-crown">
                            Mestre
                        </v-btn>
                    </v-btn-toggle>
                </div>
            </v-slide-x-transition>

            <div class="d-flex align-center mr-2">

                <v-divider vertical class="mr-3 ml-3" length="20"></v-divider>

                <v-btn icon size="small" @click="toggleTheme" class="mr-1">
                    <v-icon>
                        {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
                    </v-icon>
                    <v-tooltip activator="parent" location="bottom">
                        {{ isDark ? 'Modo Claro' : 'Modo Escuro' }}
                    </v-tooltip>
                </v-btn>

                <v-btn icon size="small">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>

            </div>

            <v-menu offset-y>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="mr-2" size="small">
                        <v-avatar color="pink" size="28" class="mr-2">
                            <span class="white--text text-caption">G</span>
                        </v-avatar>
                        <span class="d-none d-md-block">Gabbloey</span>
                        <v-icon size="small">mdi-chevron-down</v-icon>
                    </v-btn>
                </template>

                <v-list density="compact">
                    <v-list-item link><v-list-item-title>Meu Perfil</v-list-item-title></v-list-item>
                    <v-list-item link><v-list-item-title>Configurações</v-list-item-title></v-list-item>
                    <v-divider />
                    <v-list-item link><v-list-item-title>Sair</v-list-item-title></v-list-item>
                </v-list>
            </v-menu>
        </div>

    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import logoImg from '@/assets/ondemestrologo.png';
import { useTheme } from 'vuetify';

const route = useRoute();
const theme = useTheme();

// --- LÓGICA DO TEMA ---
const isDark = computed(() => theme.global.current.value.dark);

const toggleTheme = () => {
  // Troca o valor
  const novoTema = isDark.value ? 'light' : 'dark';
  theme.global.name.value = novoTema;
  
  // Salva no navegador para lembrar depois
  localStorage.setItem('ondemestro_theme', novoTema);
};

// Ao iniciar, verifica se o usuário já tinha escolhido antes
onMounted(() => {
  const temaSalvo = localStorage.getItem('ondemestro_theme');
  if (temaSalvo) {
    theme.global.name.value = temaSalvo;
  }
});

// --- ESTADO DO MODO ---
const modoView = ref('jogador'); // 'jogador' ou 'mestre'

// --- DEFINIÇÃO DOS MENUS ---

// ORDEM PARANORMAL
const menuOrdemJogador = [
    { label: 'Ordem', to: '/ordem', icon: 'mdi-information-variant', color: 'purple-lighten-4' },
    { label: 'Meus Agentes', to: '/ordem/agentes', icon: 'mdi-account-group', color: 'purple-lighten-4' },
    { label: 'Minhas Campanhas', to: '/ordem/campanhas-jogador', icon: 'mdi-campfire', color: 'purple-lighten-4' },
    { label: 'Criar Agente', to: '/ordem/criar', icon: 'mdi-plus', color: 'purple-lighten-4' },
];

const menuOrdemMestre = [
    { label: 'Ordem', to: '/ordem', icon: 'mdi-information-variant', color: 'deep-purple-lighten-3' },
    { label: 'Painel do Mestre', to: '/ordem/mestre', icon: 'mdi-view-dashboard', color: 'deep-purple-lighten-3' },
    { label: 'Gerir Campanhas', to: '/ordem/mestre/campanhas', icon: 'mdi-table-chair', color: 'deep-purple-lighten-3' },
    { label: 'Base da Ordem', to: '/ordem/mestre/base', icon: 'mdi-domain', color: 'deep-purple-lighten-3' },
    { label: 'Todos Agentes', to: '/ordem/mestre/agentes', icon: 'mdi-account-multiple-outline', color: 'deep-purple-lighten-3' },
];

// TORMENTA 20
const menuTormentaJogador = [
    { label: 'Mapa de Arton', to: '/tormenta20', icon: 'mdi-map', color: 'red-lighten-4' },
    { label: 'Minhas Fichas', to: '/tormenta20/fichas', icon: 'mdi-sword', color: 'red-lighten-4' },
];

const menuTormentaMestre = [
    { label: 'Mapa de Arton', to: '/tormenta20', icon: 'mdi-map', color: 'orange-lighten-3' },
    { label: 'Editor de Mundo', to: '/tormenta20/editor', icon: 'mdi-earth-box', color: 'orange-lighten-3' },
    { label: 'Bestiário', to: '/tormenta20/bestiario', icon: 'mdi-spider', color: 'orange-lighten-3' },
];


// --- LÓGICA DE SELEÇÃO ---

const menuAtual = computed(() => {
    const path = route.path;

    // 1. ORDEM PARANORMAL
    if (path.includes('/ordem')) {
        return modoView.value === 'jogador' ? menuOrdemJogador : menuOrdemMestre;
    }

    // 2. TORMENTA 20
    if (path.includes('/tormenta20')) {
        return modoView.value === 'jogador' ? menuTormentaJogador : menuTormentaMestre;
    }

    // 3. OUTROS (Assimilação, Sacramento...) - Se não tiver menu de mestre definido, usa um padrão ou vazio
    if (path.includes('/assimilacao')) return [];
    if (path.includes('/sacramento')) return [];

    // Home ou Rota desconhecida
    return [];
});

</script>

<style scoped>
.v-btn {
    text-transform: none;
    font-weight: 500;
}
</style>