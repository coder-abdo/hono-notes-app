import { defineStore } from 'pinia'
import type { TUser, loginDTO, signupDTO } from '@/types'
import { loginAction, logoutAction, signupAction } from '@/api/actions/auth'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as TUser | null,
    error: '' as string,
    token: sessionStorage.getItem('token') || (null as string | null)
  }),
  getters: {
    isAuth: (state) => !!state.user
  },
  actions: {
    signup(signupDto: signupDTO) {
      signupAction(signupDto)
        .then((res) => {
          if (res.error) {
            this.error = res.error
          } else {
            this.error = ''
          }
          console.log(res)
        })
        .catch((err) => {
          if (err instanceof Error) this.error = err.message
          console.log(err)
        })
    },
    login(loginDto: loginDTO) {
      loginAction(loginDto)
        .then((res) => {
          if (res.error) {
            this.error = res.error
          } else {
            this.error = ''
            this.user = res.user
            this.token = res.token
            sessionStorage.setItem('token', res.token)
          }
        })
        .catch((err) => console.log(err))
    },
    logout() {
      logoutAction(this.token as string)
        .then((res: any) => {
          if (res.error) {
            this.error = res.error
          } else {
            this.error = ''
            this.token = null
            this.user = null
            sessionStorage.removeItem('token')
            console.log(res)
          }
        })
        .catch((err) => {
          if (err instanceof Error) this.error = err.message
        })
    }
  }
})
