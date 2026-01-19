<template>
  <div class="fill-height bg-black overflow-y-auto">
    
    <v-parallax
      src="https://i.pinimg.com/originals/f3/0e/41/f30e414c552097e305315512d7659547.jpg"
      height="500"
      class="d-flex align-center justify-center"
    >
      <div class="text-center text-white bg-overlay pa-10 rounded-xl elevation-10">
        <v-icon size="80" class="mb-4">mdi-pentagram</v-icon>
        <h1 class="text-h2 font-weight-bold mb-4 font-cinzel">Ordem Paranormal</h1>
        <p class="text-h5 font-weight-light">O Paranormal não vem para a nossa realidade de maneira fácil.</p>
        
        <v-btn 
          color="purple-accent-3" 
          size="x-large" 
          class="mt-8 font-weight-bold"
          to="/ordem/criar"
          prepend-icon="mdi-plus"
        >
          Iniciar Investigação
        </v-btn>
      </div>
    </v-parallax>

    <v-container class="py-10">
      <v-row>
        
        <v-col cols="12" md="4">
          <v-card color="grey-darken-4" class="h-100 pa-4" elevation="4">
            <v-icon color="purple" size="40" class="mb-2">mdi-book-open-page-variant</v-icon>
            <h2 class="text-h5 font-weight-bold text-purple-lighten-2 mb-2">O Sistema</h2>
            <p class="text-grey-lighten-1 text-justify">
              Ordem Paranormal RPG é um sistema de investigação e horror. 
              Você assume o papel de agentes de uma organização secreta dedicada a proteger 
              a Realidade das inomináveis criaturas do Outro Lado.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="grey-darken-4" class="h-100 pa-4" elevation="4">
            <v-icon color="red" size="40" class="mb-2">mdi-sword-cross</v-icon>
            <h2 class="text-h5 font-weight-bold text-red-lighten-2 mb-2">As Classes</h2>
            <p class="text-grey-lighten-1 text-justify">
              Escolha seu caminho:
              <br><strong>Combatentes</strong> enfrentam o perigo de frente.
              <br><strong>Especialistas</strong> dominam perícias e técnicas.
              <br><strong>Ocultistas</strong> usam o próprio Paranormal contra ele.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="grey-darken-4" class="h-100 pa-4" elevation="4">
            <v-icon color="yellow-darken-2" size="40" class="mb-2">mdi-eye-outline</v-icon>
            <h2 class="text-h5 font-weight-bold text-yellow-lighten-2 mb-2">O Outro Lado</h2>
            <p class="text-grey-lighten-1 text-justify">
              Sangue, Morte, Conhecimento e Energia. As quatro entidades que regem o medo. 
              Entenda seus elementos para sobreviver, mas cuidado: saber demais é perigoso.
            </p>
          </v-card>
        </v-col>

      </v-row>

      <v-divider class="my-10 border-opacity-25"></v-divider>

      <v-row justify="center">
        <v-col cols="12" class="text-center mb-4">
          <h3 class="text-h4 text-white">Pronto para a missão?</h3>
        </v-col>
        <v-col cols="12" sm="5">
          <v-btn block size="large" variant="outlined" color="purple-lighten-2" to="/ordem/agentes">
            Ver Meus Agentes
          </v-btn>
        </v-col>
        <v-col cols="12" sm="5">
          <v-btn block size="large" variant="outlined" color="red-lighten-2" to="/ordem/campanhas">
            Gerenciar Campanhas
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<style scoped>
/* Um fundo escuro transparente para o texto ficar legível em cima da imagem */
.bg-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  max-width: 800px;
}

/* Fonte estilo RPG (Opcional, se quiser importar fonts do Google depois) */
.font-cinzel {
  font-family: serif; 
  letter-spacing: 2px;
}
</style>