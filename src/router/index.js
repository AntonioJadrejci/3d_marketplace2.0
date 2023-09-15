import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GalerijaView from "@/views/GalerijaView.vue"
import FavoritiView from "../views/FavoritiView.vue";
import ProfilView from "../views/ProfilView.vue";
import ModelPageVue from "@/views/ModelPage.vue";
import Opis from "@/views/Opis.vue";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/opis',
    name: 'opis',
    component: Opis
  },
  {
    path: "/galerija/",
    name: "galerija",
    component: GalerijaView,
  },
  {
    path: "/profil",
    name: "profil",
    component: ProfilView,
  },
  {
    path: "/favoriti",
    name: "favoriti",
    component: FavoritiView,
  },
  {
    path: "/galerija/:model",
    name: "model-page",
    props: true,
    component: ModelPageVue,
  },


]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
