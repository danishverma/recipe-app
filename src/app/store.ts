import { configureStore } from '@reduxjs/toolkit'
import receipeAppReducer from '../features/recipeAppSlice'

export const store = configureStore({
  reducer: {
    receipe: receipeAppReducer
  },
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch