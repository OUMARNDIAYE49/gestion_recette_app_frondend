import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListeRecettesView from '@/views/ListeRecettesView.vue';
import AjouterRecetteView from '@/views/AjouterRecetteView.vue';
import ModifierRecetteView from '@/views/ModifierRecetteView.vue';
import VoirRecetteView from '@/views/VoirRecetteView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/recettes', name: 'ListeRecettes', component: ListeRecettesView },
  { path: '/ajouter', name: 'AjouterRecette', component: AjouterRecetteView },
  { path: '/modifier/:recetteId', name: 'ModifierRecette', component: ModifierRecetteView, props: true },
  { path: '/voir/:id', name: 'VoirRecette', component: VoirRecetteView, props: true } // Nouvelle route pour voir la recette
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
