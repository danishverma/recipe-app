import { createSlice } from '@reduxjs/toolkit'

const initialState: Boolean = false
export const LoaderSlice = createSlice({
    name: 'loaderSlice',
    initialState,
    reducers: {
        checkIsLoading: (state, action) => {
            return action.payload
        }
    }
})
export const {checkIsLoading} = LoaderSlice.actions
export default LoaderSlice.reducer