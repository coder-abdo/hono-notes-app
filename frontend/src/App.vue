<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Notifications } from '@kyvg/vue3-notification'
import Navbar from '@/components/Navbar.vue'
import WrapperComponent from '@/components/WrapperComponent.vue'
</script>

<template>
  <Navbar />
  <Notifications />
  <WrapperComponent>
    <RouterView />
  </WrapperComponent>
</template>
