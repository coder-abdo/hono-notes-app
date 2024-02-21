<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { FormKit } from '@formkit/vue'

const authStore = useAuthStore()
const { login } = authStore
const { error } = storeToRefs(authStore)

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
  <FormKit
    type="form"
    submit-label="Login"
    @submit="onSubmit"
    :actions="false"
    class="flex flex-col justify-center gap-4 w-full h-screen mx-auto max-w-[500px]"
  >
    <h1 class="text-3xl capitalize font-bold text-sky-500 text-center">welocme back</h1>
    <span v-if="error" class="text-red-500">{{ error }}></span>

    <FormKit
      type="text"
      name="email"
      label="Your email"
      placeholder="jane@example.com"
      help="What email should we use?"
      validation="required|email"
    />

    <FormKit
      type="password"
      name="password"
      label="Password"
      validation="required|length:6"
      :validation-messages="{
        matches: 'Please include at least one symbol'
      }"
      placeholder="Your password"
      help="Choose a password"
    />

    <div class="flex gap-4 items-center mt-4">
      <FormKit type="submit" label="Login" />
      <RouterLink to="/signup" class="hover:text-sky-500 capitalize transition-colors"
        >create account</RouterLink
      >
    </div>
  </FormKit>
</template>
