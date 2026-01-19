<template>
  <v-container class="fill-height justify-center text-center">
    <div>
      <v-icon size="100" color="grey-lighten-1" class="mb-4">mdi-cone</v-icon>
      <h1 class="text-h3 font-weight-bold">Em Construção</h1>
      <p class="text-h6 text-grey mt-2">O sistema {{ $route.name }} chegará em breve.</p>
      <v-btn color="primary" class="mt-6" to="/">Voltar para Home</v-btn>
    </div>
  </v-container>
</template>