<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { FormKit } from '@formkit/vue'
import { useNotification } from '@kyvg/vue3-notification'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const { signup } = useAuthStore()
const { error } = storeToRefs(useAuthStore())

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
  <FormKit type="form" submit-label="Register" @submit="onSubmit" :actions="false">
    <h1 class="text-2xl font-bold mb-2">Register!</h1>
    <FormKit
      type="text"
      name="name"
      label="Your name"
      placeholder="Jane Doe"
      help="What do people call you?"
      validation="required"
    />
    <FormKit
      type="text"
      name="email"
      label="Your email"
      placeholder="jane@example.com"
      help="What email should we use?"
      validation="required|email"
    />
    <div class="double">
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol'
        }"
        placeholder="Your password"
        help="Choose a password"
      />
      <FormKit
        type="password"
        name="confirmPassword"
        label="Confirm password"
        placeholder="Confirm password"
        validation="required|confirm"
        help="Confirm your password"
      />
    </div>

    <div class="flex gap-4 items-center mt-4">
      <FormKit type="submit" label="Register" />
      <RouterLink to="/login" class="hover:text-sky-500 capitalize transition-colors"
        >already have an account
      </RouterLink>
    </div>
  </FormKit>
</template>
