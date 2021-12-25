import { configureStore } from '@reduxjs/toolkit'
import projects from './projectsSlice'

export const store = configureStore({
  reducer: { projects },
})
