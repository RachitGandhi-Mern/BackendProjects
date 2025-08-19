import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/authSlice'
import filesReducer from '../Features/fileSlice'
import analysisReducer from '../Features/analysisSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    files: filesReducer,
    analysis: analysisReducer
  }
})
