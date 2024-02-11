<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { useForm } from '@volverjs/form-vue'
import { z } from 'zod'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const loginSchema = z.object({
  email: z.string().email({ message: 'invalid email' }),
  password: z.string().min(6, { message: 'password must be at least 6 characters' })
})
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
    router.push('/')
  }
  formData.email = ''
  formData.password = ''
}
</script>
<template>
  <h1 class="text-3xl font-bold text-red-500 text-center">welocme back</h1>
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
      <button class="bg-black capitalize text-white text-sm px-6 py-2">login</button>
      <RouterLink to="/signup">create account</RouterLink>
    </div>
  </VvForm>
</template>
