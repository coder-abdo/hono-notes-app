<script setup lang="ts">
import type { TUser } from '@/types'
interface Props {
  user: TUser | null
}
const props = defineProps<Props>()
</script>
<template>
  <div>
    <h1>welcome back, {{ props.user?.name || 'guest' }}</h1>
  </div>
</template>
