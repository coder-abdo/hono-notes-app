<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import HomeGuest from '@/components/guest/HomeGuest.vue'
import HomeUser from '@/components/home/HomeUser.vue'
const store = useAuthStore()
const { user } = storeToRefs(store)
</script>

<template>
  <main class="px-4 flex flex-col">
    <HomeUser v-if="user" :user="user" />
    <HomeGuest v-else />
  </main>
</template>
