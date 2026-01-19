import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FichaOrdem from '@/views/ordem/jogador/FichaOrdem.vue'
import MapaArton from '@/views/tormenta/MapaArton.vue'
import EmBreve from '@/views/EmBreve.vue' // <--- Importe o placeholder
import CriarAgente from '@/views/ordem/jogador/CriarAgente.vue'
import MeusAgentes from '@/views/ordem/jogador/MeusAgentes.vue'
import OrdemHome from '@/views/ordem/jogador/OrdemHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // --- A: ASSIMILAÇÃO ---
    {
      path: '/assimilacao',
      name: 'Assimilação',
      component: EmBreve
    },
    // --- O: ORDEM ---
    // Rota de Criação (NOVA)
    {
      path: '/ordem',
      name: 'ordem-home',
      component: OrdemHome // Agora /ordem cai na tela explicativa
    },
    {
      path: '/ordem/agentes',
      name: 'ordem-agentes',
      component: MeusAgentes // Lista de personagens
    },
    {
      path: '/ordem/campanhas-jogador',
      name: 'ordem-campanhas-jogador',
      component: EmBreve // Placeholder
    },
    {
      path: '/ordem/criar',
      name: 'ordem-criar',
      component: CriarAgente
    },
    {
      path: '/ordem/ficha',
      name: 'ordem-ficha',
      component: FichaOrdem
    },
    {
      path: '/ordem/mestre',
      name: 'ordem-mestre',
      component: EmBreve
    },
    {
      path: '/ordem/mestre/campanhas',
      name: 'ordem-campanhas-mestre',
      component: EmBreve
    },
    {
      path: '/ordem/mestre/base',
      name: 'ordem-base',
      component: EmBreve
    },
    {
      path: '/ordem/mestre/agentes',
      name: 'ordem-agentes-mestre',
      component: EmBreve
    },
    // --- S: SACRAMENTO ---
    {
      path: '/sacramento',
      name: 'Sacramento',
      component: EmBreve
    },
    // --- T: TORMENTA ---
    {
      path: '/tormenta20',
      name: 'tormenta-dashboard',
      component: EmBreve
    },
    {
      path: '/tormenta20/fichas',
      name: 'tormenta-fichas',
      component: EmBreve
    },
    {
      path: '/tormenta20/mapa',
      name: 'tormenta-mapa',
      component: MapaArton
    },
  ]
})

export default router