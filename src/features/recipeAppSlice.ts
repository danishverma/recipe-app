import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InitialState } from '../Components/Interfaces/Interfaces'
const initialState: InitialState = {
    searchInput : '',
    searchResult: []
}
export const RecipeAppSlice = createSlice({
    name: 'recipeApp',
    initialState,
    reducers: {
        handleSearchChange: (state, action) => {
            state.searchInput = action.payload
        },
        searchResult: (state, action) => {
            state.searchResult = action.payload
        }
    }
})
export const {handleSearchChange, searchResult} = RecipeAppSlice.actions
export default RecipeAppSlice.reducer