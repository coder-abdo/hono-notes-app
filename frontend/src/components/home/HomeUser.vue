<script setup lang="ts">
import type { TUser } from '@/types'
import NotesComponent from '@/components/notes/NotesComponent.vue'
interface Props {
  user: TUser | null
}
const props = defineProps<Props>()
</script>
<template>
  <h1 class="mb-4 font-bold text-2xl text-sky-500 capitalize">
    welcome back, {{ props.user?.name || 'guest' }}
  </h1>
  <NotesComponent />
</template>
