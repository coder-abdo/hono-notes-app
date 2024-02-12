<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useForm } from '@volverjs/form-vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { signupSchema } from '@/schemas/auth'
const { signup } = useAuthStore()
const { error } = storeToRefs(useAuthStore())

const { VvForm, VvFormField } = useForm(signupSchema, {
  lazyLoad: true
})
const { notify } = useNotification()
const router = useRouter()
const onSubmit = (formData: {
  name: string
  email: string
  password: string
  confirmPassword: string
}) => {
  signup(formData)
  if (error.value) {
    notify({ text: error.value, type: 'error' })
    formData.name = ''
    formData.email = ''
    formData.password = ''
    formData.confirmPassword = ''
  } else {
    notify({ text: 'signup success', type: 'success' })
    router.push('/login')
  }
}
</script>
<template>
  <h1 class="text-3xl capitalize font-bold text-sky-500 text-center">create your account</h1>
  <span v-if="error" class="text-red-500">{{ error }}></span>
  <VvForm
    @submit="onSubmit"
    class="flex flex-col justify-center gap-4 w-full h-screen mx-auto max-w-[500px]"
  >
    <VvFormField
      type="text"
      label="Name"
      placeholder="Enter your Name"
      name="name"
      class="flex flex-col gap-2"
    />
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
    <VvFormField
      type="password"
      placeholder="Enter your Confirm Password"
      name="confirmPassword"
      label="Confirm Password"
    />
    <div class="flex gap-4 items-center mt-4">
      <button
        class="rounded bg-sky-500 capitalize text-white text-sm px-6 py-2 hover:text-sky-500 hover:bg-white border border-sky-500 transition-colors"
      >
        sign up
      </button>
      <RouterLink to="/login" class="hover:text-sky-500 capitalize transition-colors"
        >already have an account
      </RouterLink>
    </div>
  </VvForm>
</template>
