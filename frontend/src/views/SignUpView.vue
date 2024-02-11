<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useForm } from '@volverjs/form-vue'
import { z } from 'zod'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const { signup } = useAuthStore()
const { error } = storeToRefs(useAuthStore())
const signupSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email('email is required'),
    password: z.string().min(6, 'password must be atleast 6 characters long'),
    confirmPassword: z.string().min(6, 'password must be atleast 6 characters long')
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'passwords do not match'
      })
    }
  })
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
    notify({ text: 'login success', type: 'success' })
    router.push('/login')
  }
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
      <button class="bg-black capitalize text-white text-sm px-6 py-2">sign up</button>
      <RouterLink to="/login">already have an account </RouterLink>
    </div>
  </VvForm>
</template>
<style>
input {
  @apply border border-gray-300 rounded px-4 py-2 mt-4;
}
small {
  @apply text-red-500;
}
</style>
<!-- <template> -->
<!--   <h1 class="text-3xl font-bold text-red-500">create an account</h1> -->
<!--   <form -->
<!--     @submit.prevent="submitHandler" -->
<!--     class="flex flex-col gap-4 justify-center items-center py-4 max-w-[500px] border w-full h-screen" -->
<!--   > -->
<!--     <div class="flex flex-col gap-2"> -->
<!--       <label for="name">Name</label> -->
<!--       <input type="text" id="name" v-model="name" placeholder="enter your name" /> -->
<!--     </div> -->
<!--     <div class="flex flex-col gap-2"> -->
<!--       <label for="email">Email</label> -->
<!--       <input type="email" id="email" v-model="email" placeholder="enter your email" /> -->
<!--     </div> -->
<!--     <div class="flex flex-col gap-2 my-2"> -->
<!--       <label for="password">Password</label> -->
<!--       <input type="password" id="password" v-model="password" placeholder="enter your password" /> -->
<!--     </div> -->
<!--     <div class="flex flex-col gap-2 my-2"> -->
<!--       <label for="confirmPassword">Confirm Password</label> -->
<!--       <input -->
<!--         type="password" -->
<!--         id="confirmPassword" -->
<!--         v-model="confirmPassword" -->
<!--         placeholder="retype your password" -->
<!--       /> -->
<!--     </div> -->
<!--     <div class="flex gap-4"> -->
<!--       <button class="bg-black text-white text-sm px-6 py-2" type="submit">register</button> -->
<!--       <RouterLink to="/login">already have an account</RouterLink> -->
<!--     </div> -->
<!--   </form> -->
<!-- </template> -->
