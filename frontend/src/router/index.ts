import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignUpView.vue'
import UpdateNoteView from '@/views/UpdateNoteView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/note/update/:id',
      name: 'updateNote',
      component: UpdateNoteView
    }
  ]
})

export default router
