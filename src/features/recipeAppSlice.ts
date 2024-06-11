import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InitialState, SearchResult } from '../Components/common/Interfaces'
const initialState: InitialState = {
    searchInput : '',
    searchResult: []
}
export const RecipeAppSlice = createSlice({
    name: 'recipeApp',
    initialState,
    reducers: {
        handleSearchChange: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload
        },
        searchResult: (state, action: PayloadAction<SearchResult[]>) => {
            state.searchResult = action.payload
        }
    }
})
export const {handleSearchChange, searchResult} = RecipeAppSlice.actions
export default RecipeAppSlice.reducer