import { configureStore } from '@reduxjs/toolkit'
import recipeAppReducer from '../features/recipeAppSlice'
export const store = configureStore({
  reducer: {
    recipe: recipeAppReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch