import type { loginDTO, signupDTO } from '@/types'

const signupAction = async (signupDto: signupDTO) => {
  try {
    const res = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupDto)
    })
    const data = await res.json()
    return data
  } catch (err) {
    if (err instanceof Error) {
      return err
    }
  }
}
// login
const loginAction = async (loginDto: loginDTO) => {
  try {
    const res = await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDto)
    })
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}
// logout
const logoutAction = async (token: string) => {
  try {
    const data = await fetch('http://localhost:3000/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    return data
  } catch (err) {
    return err
  }
}

export { signupAction, loginAction, logoutAction }
