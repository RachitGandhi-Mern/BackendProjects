import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/axios'

export const uploadFile = createAsyncThunk('files/upload', async (formData) => {
  const res = await api.post('/files/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return res.data
})

const slice = createSlice({
  name: 'files',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.items.unshift(action.payload)
    })
  }
})
export default slice.reducer
