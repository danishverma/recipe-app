import { createSlice, isAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WishlistInitialState, WishlistType } from '../../../Components/common/Interfaces'
const initialState: WishlistInitialState = {
    wishlistRecipes: [],
    heartFilled: []
}
export const WishlistRecipesSlice = createSlice({
    name: 'wishlistRecipesSlice',
    initialState,
    reducers: {
        handleWishlistRecipes: (state, action: PayloadAction<WishlistType[]>) => {
            state.wishlistRecipes = action.payload
            state.heartFilled = action.payload.map(()=>true) // Initialize heart states
        },
        addToWishlist: (state, action: PayloadAction<WishlistType>) => {
            state.wishlistRecipes.push(action.payload)
            state.heartFilled.push(true)
        },
        removeWishlistRecipe: (state, action: PayloadAction<string>) => {
            state.wishlistRecipes = state.wishlistRecipes.filter(recipe => recipe.id !== action.payload)
            state.heartFilled.splice(state.wishlistRecipes.findIndex(recipe => recipe.id === action.payload), 1);
        },
        toggleHeart: (state, action: PayloadAction<number>) => {
            state.heartFilled[action.payload] = !state.heartFilled[action.payload]
        }
    }
})
export const { handleWishlistRecipes, addToWishlist, removeWishlistRecipe, toggleHeart } = WishlistRecipesSlice.actions
export default WishlistRecipesSlice.reducer