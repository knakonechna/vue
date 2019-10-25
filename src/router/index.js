import Vue from 'vue';
import VueRouter from 'vue-router';
import ToDo from '../views/ToDo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ToDo
  }
];

const router = new VueRouter({
  routes
});

export default router;
