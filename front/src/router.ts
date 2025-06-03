import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Results from './pages/Results.vue';
import Create from './pages/Create.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/results', name: 'Results', component: Results },
  { path: '/create', name: 'Create', component: Create }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
