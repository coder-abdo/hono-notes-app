<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Notifications, useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from './stores/auth'
const { user, token, error } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()
const { notify } = useNotification()
const router = useRouter()
const handleLogout = () => {
  logout().then(() => {
    if (error.value) {
      notify({ text: error.value, type: 'error' })
    } else {
      notify({ text: 'Logged out', type: 'success' })
      router.push('/login')
    }
  })
}
</script>

<template>
  <nav class="flex gap-4 py-4 sticky top-0">
    <slot v-if="token">
      <RouterLink to="/about">About</RouterLink>
      <button @click="handleLogout">Logout</button>
      <RouterLink to="/">{{ user?.name }}</RouterLink>
    </slot>
    <slot v-else>
      <RouterLink to="/login">login</RouterLink>
      <RouterLink to="/signup">signup</RouterLink>
    </slot>
  </nav>
  <Notifications />
  <RouterView />
</template>
