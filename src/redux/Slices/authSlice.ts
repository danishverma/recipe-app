import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InitialStateAuth, UserDetails } from '../../Components/common/Interfaces'
const initialState: InitialStateAuth = {
    isLoggedIn: '',
    userDetails: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        contact: null
    }
}
export const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
       checkLoginStatus: (state, action) => {
        state.isLoggedIn = action.payload
       },
       storeUserDetails: (state, action:PayloadAction<UserDetails>) => {
        state.userDetails = action.payload
       }
    }
})
export const {checkLoginStatus, storeUserDetails} = AuthSlice.actions
export default AuthSlice.reducer