import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/axios'

const register = createAsyncThunk('auth/register', async (data) => {
  const res = await api.post('/auth/register', data)
  return res.data
})
 const login = createAsyncThunk('auth/login', async (data) => {
  const res = await api.post('/auth/login', data)
  return res.data
})

const slice = createSlice({
  name: 'auth',
initialState: {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle'
},
  reducers: {
  logout: (state) => {
    state.token = null
    state.user = null
    localStorage.removeItem('token') 
    localStorage.removeItem('user')
  }
},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    })
    builder.addCase(login.fulfilled, (state, action) => {
  state.user = action.payload.user 
  state.token = action.payload.token
  localStorage.setItem('token', action.payload.token)
})
  }
})
export const { logout } = slice.actions
export { login, register  }  
export default slice.reducer
