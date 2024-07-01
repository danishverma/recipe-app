import { configureStore } from '@reduxjs/toolkit'
import recipeSearchSliceReducer from './Slices/recipeSearchSlice'
import authSliceReducer from './Slices/authSlice'
import loaderSliceReducer from './Slices/loader'
export const store = configureStore({
  reducer: {
     recipeSearchSliceReducer,
     authSliceReducer,
     loaderSliceReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch