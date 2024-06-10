import { configureStore } from '@reduxjs/toolkit'
import recipeAppReducer from '../features/recipeAppSlice'

export const store = configureStore({
  reducer: {
    recipe: recipeAppReducer
  },
})