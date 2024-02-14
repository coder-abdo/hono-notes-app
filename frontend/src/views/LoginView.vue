<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { useForm } from '@volverjs/form-vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { loginSchema } from '@/schemas/auth'

const authStore = useAuthStore()
const { login } = authStore
const { error } = storeToRefs(authStore)
const { VvForm, VvFormField } = useForm(loginSchema, {
  lazyLoad: true
})
const { notify } = useNotification()
const router = useRouter()
const onSubmit = (formData: { email: string; password: string }) => {
  login(formData)
  if (error.value) {
    notify({ text: error.value, type: 'error' })
  } else {
    notify({ text: 'login success', type: 'success' })
    router.push({ path: '/', replace: true })
  }
  formData.email = ''
  formData.password = ''
}
</script>
<template>
  <h1 class="text-3xl capitalize font-bold text-sky-500 text-center">welocme back</h1>
  <span v-if="error" class="text-red-500">{{ error }}></span>
  <VvForm
    @submit="onSubmit"
    class="flex flex-col justify-center gap-4 w-full h-screen mx-auto max-w-[500px]"
  >
    <VvFormField
      type="email"
      label="Email"
      placeholder="Enter your Email"
      name="email"
      class="flex flex-col gap-2"
    />

    <VvFormField
      type="password"
      placeholder="Enter your Password"
      name="password"
      label="Password"
    />

    <div class="flex gap-4 items-center mt-4">
      <button
        class="rounded bg-sky-500 capitalize text-white text-sm px-6 py-2 hover:text-sky-500 hover:bg-white border border-sky-500 transition-colors"
      >
        login
      </button>
      <RouterLink to="/signup" class="hover:text-sky-500 capitalize transition-colors"
        >create account</RouterLink
      >
    </div>
  </VvForm>
</template>
<style>
input {
  @apply px-6 py-3 text-sm placeholder-gray-600 border border-gray-400 focus:border-sky-500 rounded;
}
label {
  @apply text-sky-500;
}
</style>
