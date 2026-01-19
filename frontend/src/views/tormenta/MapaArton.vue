<template>
  <v-container fluid class="fill-height pa-0 position-relative overflow-hidden">
    
    <v-toolbar density="compact" color="surface-variant" elevation="2" style="z-index: 1001; position: absolute; top: 0; width: 100%;">
      <v-btn icon="mdi-arrow-left" @click="$router.push('/')" title="Voltar"></v-btn>
      <v-toolbar-title class="text-subtitle-1 font-weight-bold ml-2">
        Mapa de Arton
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn 
        :color="modoRota ? 'primary' : undefined" 
        :variant="modoRota ? 'flat' : 'text'"
        prepend-icon="mdi-map-marker-path"
        @click="toggleModoRota"
      >
        {{ modoRota ? 'Planejando Rota...' : 'Traçar Rota' }}
      </v-btn>
    </v-toolbar>

    <div 
      id="map" 
      class="map-container" 
      :class="{ 'cursor-crosshair': modoRota }"
    ></div>

    <v-card 
      v-if="modoRota" 
      class="painel-viagem pa-4" 
      elevation="8" 
      width="300"
      border
    >
      <div class="d-flex align-center justify-space-between mb-2">
        <h3 class="text-subtitle-1 font-weight-bold text-primary">Dados da Viagem</h3>
        <v-icon color="primary">mdi-compass-outline</v-icon>
      </div>
      
      <v-divider class="mb-3"></v-divider>

      <v-row dense>
        <v-col cols="6">
          <div class="text-caption text-grey">Distância</div>
          <div class="text-h6">{{ distanciaTotalKm }} <small>km</small></div>
        </v-col>
        <v-col cols="6">
          <div class="text-caption text-grey">Tempo (A pé)</div>
          <div class="text-h6">{{ diasViagem }} <small>dias</small></div>
        </v-col>
      </v-row>

      <div class="text-caption text-grey mt-2 font-italic">
        *Considerando marcha normal de {{ VELOCIDADE_VIAGEM.pe }}km/dia.
      </div>

      <v-btn-group class="mt-4 w-100" density="compact">
        <v-btn @click="limparRota" color="error" variant="tonal" flex-grow-1 prepend-icon="mdi-eraser">
          Limpar
        </v-btn>
        <v-btn @click="desfazerUltimoPonto" variant="tonal" flex-grow-1 prepend-icon="mdi-undo">
          Desfazer
        </v-btn>
      </v-btn-group>
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="400"
      temporary
      class="pa-4"
      style="z-index: 1005;"
    >
      <div v-if="localSelecionado">
        <v-chip class="mb-2" :color="getCorTipo(localSelecionado.tipo)" size="small">
          {{ localSelecionado.tipo }}
        </v-chip>
        <h2 class="text-h4 font-weight-bold text-primary mb-2">
          {{ localSelecionado.nome }}
        </h2>
        <v-divider class="mb-4"></v-divider>
        <p class="text-body-1 text-justify">
          {{ localSelecionado.descricao }}
        </p>
        
        <v-alert type="info" variant="tonal" density="compact" class="mt-4" icon="mdi-information">
          Clique em "Traçar Rota" para medir a distância até aqui.
        </v-alert>
      </div>
    </v-navigation-drawer>

  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DB_ARTON, type LocalArton } from '@/database/tormenta/dbArton';

// --- CONFIGURAÇÕES DE ESCALA ---
// CALIBRAÇÃO: Você precisará ajustar este número.
// Significa: "Quantos Km vale 1 pixel na imagem original?"
// Dica: Trace uma rota entre dois pontos conhecidos e ajuste até bater.
const FATOR_ESCALA = 2.5; 

const VELOCIDADE_VIAGEM = {
  pe: 24,     // 24km por dia (marcha normal T20)
  cavalo: 48, // Cavalo de viagem
};

// --- ESTADO GERAL ---
const map = ref<L.Map | null>(null);
const drawer = ref(false);
const localSelecionado = ref<LocalArton | null>(null);

// --- ESTADO DA ROTA ---
const modoRota = ref(false);
const pontosRota = ref<L.LatLng[]>([]);
const polylineRota = ref<L.Polyline | null>(null);
const distanciaTotalKm = ref(0);
const diasViagem = ref(0);

// --- HELPERS VISUAIS ---
const getCorTipo = (tipo: string) => {
  switch(tipo) {
    case 'Capital': return 'purple';
    case 'Reino': return 'blue';
    case 'Perigo': return 'red';
    default: return 'grey';
  }
};

// --- LÓGICA DE ROTA ---

const toggleModoRota = () => {
  modoRota.value = !modoRota.value;
  if (!modoRota.value) {
    // Se desligar, não limpa a rota imediatamente para o usuário ver,
    // mas para de aceitar cliques. Se quiser limpar, descomente abaixo:
    // limparRota(); 
  }
};

const limparRota = () => {
  pontosRota.value = [];
  distanciaTotalKm.value = 0;
  diasViagem.value = 0;
  if (polylineRota.value) {
    polylineRota.value.remove();
    polylineRota.value = null;
  }
};

const desfazerUltimoPonto = () => {
  if (pontosRota.value.length > 0) {
    pontosRota.value.pop();
    atualizarDesenhoRota();
  }
};

const atualizarDesenhoRota = () => {
  if (!map.value) return;

  // 1. Atualiza ou Cria a Linha Visual
  if (polylineRota.value) {
    polylineRota.value.setLatLngs(pontosRota.value);
  } else {
    polylineRota.value = L.polyline(pontosRota.value, { 
      color: '#d50000', // Vermelho forte
      weight: 4,
      dashArray: '10, 10', // Linha tracejada estilo mapa antigo
      opacity: 0.8
    }).addTo(map.value);
  }

  // 2. Calcula Distância
  if (pontosRota.value.length > 1) {
    let distanciaPixels = 0;
    
    for (let i = 0; i < pontosRota.value.length - 1; i++) {
      // O segredo do CRS.Simple: Usar latLngToLayerPoint ou project
      // Mas para consistência, calculamos a distância euclidiana simples entre os pontos
      const p1 = map.value.project(pontosRota.value[i], map.value.getMaxZoom());
      const p2 = map.value.project(pontosRota.value[i+1], map.value.getMaxZoom());
      distanciaPixels += p1.distanceTo(p2);
    }

    // A mágica da escala: Convertemos pixels projetados em KM
    // O divisor (2 ** zoomMax) normaliza para o zoom base se necessário, 
    // mas aqui vamos simplificar multiplicando direto pelo Fator.
    // Nota: Como estamos projetando no MaxZoom, o FATOR_ESCALA deve ser calibrado para ele.
    const km = (distanciaPixels / 100) * FATOR_ESCALA; // O /100 é um ajuste fino arbitrário

    distanciaTotalKm.value = Math.round(km);
    diasViagem.value = Math.round(km / VELOCIDADE_VIAGEM.pe);
  } else {
    distanciaTotalKm.value = 0;
    diasViagem.value = 0;
  }
};

// --- LÓGICA DO MAPA ---

onMounted(() => {
  // 1. Inicializa Mapa
  const mapInstance = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 1,
    maxZoom: 6,            // Permite Zoom extra (Overzoom)
    zoomSnap: 0,           // Zoom livre (suave)
    wheelPxPerZoomLevel: 30, // Scroll mais lento/suave
    zoomDelta: 0.1
  });

  // 2. Tiles
  L.tileLayer('/tiles/{z}/{x}/{y}.png', {
    tileSize: 256,
    minZoom: 0,
    maxNativeZoom: 5, // Importante: Diz que seus tiles só vão até o 5
    maxZoom: 6,       // Permite esticar até o 7
    noWrap: true,
    bounds: [[0, 0], [-1000, 1000]]
  }).addTo(mapInstance);

  mapInstance.setView([-100, 100], 2);

  // 3. Marcadores
  DB_ARTON.forEach(local => {
    const marker = L.circleMarker(local.coords, {
      color: getCorTipo(local.tipo),
      fillColor: getCorTipo(local.tipo),
      fillOpacity: 0.8,
      radius: 8,
      weight: 2
    }).addTo(mapInstance);

    marker.bindTooltip(`<b>${local.nome}</b>`, { 
      permanent: false, 
      direction: 'top',
      className: 'custom-tooltip' // Opcional: estilizar no CSS
    });

    // Clique no marcador abre o drawer
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e); // Impede que o clique no pino desenhe uma rota embaixo
      localSelecionado.value = local;
      drawer.value = true;
    });
  });

  // 4. Evento de Clique no Mapa (Rota ou Debug)
  // 4. Evento de Clique (Modo Debug / Mapeamento)
  mapInstance.on('click', (e) => {
    // Se estiver no modo rota, ignora
    if (modoRota.value) return; 

    // Cria as coordenadas formatadas
    const lat = e.latlng.lat.toFixed(0); // Arredonda para não ficar gigante
    const lng = e.latlng.lng.toFixed(0);
    const coordString = `[${lat}, ${lng}]`;

    // 1. Mostra no Console (F12)
    console.log(`📍 Coordenada para DB: ${coordString}`);

    // 2. [OPCIONAL] Cria um Popup temporário para você copiar fácil
    L.popup()
      .setLatLng(e.latlng)
      .setContent(`<b>Copiar:</b><br>${coordString}`)
      .openOn(mapInstance);
  });

  map.value = mapInstance;
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; /* Ocupa a altura toda */
  background-color: #000;
  z-index: 1;
}

.cursor-crosshair {
  cursor: crosshair !important;
}

.painel-viagem {
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 1002;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
}

/* Ajuste fino para os tooltips do Leaflet ficarem bonitos */
:deep(.leaflet-tooltip) {
  background: rgba(0, 0, 0, 0.8);
  border: none;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>