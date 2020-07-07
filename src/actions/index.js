import axios from 'axios'
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_IN, AUTH_SIGN_OUT, DASHBOARD_GET_DATA } from './types'

export const googleOauth = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:3333/users/oauth/google', {
      access_token: data,
    })

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    })

    localStorage.setItem('JWT_TOKEN', res.data.token)
    axios.defaults.headers.common['Authorization'] = res.data.token
  }
}

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3333/users/signup', data)

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      })

      localStorage.setItem('JWT_TOKEN', res.data.token)
      axios.defaults.headers.common['Authorization'] = res.data.token
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email already in use',
      })
    }
  }
}

export const signOut = (data) => {
  return (dispatch) => {
    localStorage.removeItem('JWT_TOKEN')
    axios.defaults.headers.common['Authorization'] = ''

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: '',
    })
  }
}

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3333/users/signin', data)

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      })

      localStorage.setItem('JWT_TOKEN', res.data.token)
      axios.defaults.headers.common['Authorization'] = res.data.token
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email or password invalids',
      })
    }
  }
}

export const getSecret = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3333/users/secret')
      console.log(res.data)
      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.batata,
      })
    } catch (error) {}
  }
}
