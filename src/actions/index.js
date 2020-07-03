import axios from 'axios'
import { AUTH_SIGN_UP, AUTH_ERROR } from './types'

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3333/users/signup', data)

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      })

      localStorage.setItem('JWT_TOKEN', res.data.token)
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email already in use',
      })
    }
  }
}
