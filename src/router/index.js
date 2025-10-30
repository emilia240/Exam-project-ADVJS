import { createRouter, createWebHistory } from 'vue-router'
import { useAuth, authReady } from '@/modules/useAuth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (Dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true } //this route requires authentication
    },
     {
      path: '/sleep-logs',
      name: 'sleep-logs',
      component: () => import('../views/SleepLogListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sleep-logs/:id',
      name: 'sleep-log-detail',
      component: () => import('../views/SleepLogDetailView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})


router.beforeEach(async (to, from, next) => {
  // Wait for Firebase auth to initialize before checking auth state
  await authReady
  
  //destructure the isLoggedIn property from useAuth
  const {isLoggedIn} = useAuth()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next({name: 'login'}) //redirect to login page if not logged in
  } else {
    next()
  }
})


export default router
