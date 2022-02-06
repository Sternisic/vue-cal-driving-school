import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard'
import NewUser from "@/components/NewUser";
import EditUser from "@/components/EditUser";
import ViewUser from "@/components/ViewUser";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/kalender',
    name: 'Kalender',
    component: () => import('../views/Kalender.vue')
  },
  {
    path: '/new',
    name: 'Neuer User',
    component: NewUser
  },
  {
    path: '/edit/:user_id',
    name: 'edit-user',
    component: EditUser
  },
  {
    path: '/:user_id',
    name: 'view-user',
    component: ViewUser
  },
]

const router = new VueRouter({
  routes
})

export default router
