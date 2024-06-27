import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn: '',
    userDetails: ''
}
export const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
       checkLoginStatus: (state, action) => {
        state.isLoggedIn = action.payload
       },
       storeUserDetails: (state, action) => {
        state.userDetails = action.payload
       }
    }
})
export const {checkLoginStatus, storeUserDetails} = AuthSlice.actions
export default AuthSlice.reducer