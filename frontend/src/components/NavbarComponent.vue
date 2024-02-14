<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from '@/stores/auth'
import IconLogo from '@/components/icons/IconLogo.vue'
const { user, error } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()
const { notify } = useNotification()
const router = useRouter()
const handleLogout = () => {
  logout()
  if (error.value) {
    notify({ text: error.value, type: 'error' })
  } else {
    notify({ text: 'Successfully Logged out', type: 'success' })
    router.push({ name: 'login', replace: true })
  }
}
</script>
<template>
  <nav
    class="flex px-2 justify-between items-center shadow-sm py-4 sticky top-0 left-0 right-0 bg-white"
  >
    <RouterLink to="/">
      <IconLogo />
    </RouterLink>
    <div class="flex gap-4 capitalize" v-if="user">
      <RouterLink class="hover:text-sky-500 transition-colors" to="/profile">{{
        user?.name
      }}</RouterLink>
      <button
        class="hover:text-sky-500 hover:bg-white bg-sky-500 rounded text-sm px-2 py-1 text-white border border-sky-500 transition-colors"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
    <div class="flex gap-4 capitalize" v-else>
      <RouterLink class="hover:text-sky-500 transition-colors" to="/login">login</RouterLink>
      <RouterLink class="hover:text-sky-500 transition-colors" to="/signup">signup</RouterLink>
    </div>
  </nav>
</template>
