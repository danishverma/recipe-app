import axios from "axios"
import { useEffect } from "react"
import RecipeWidgets from "../Recipe-Widgets/RecipeWidgets"

const WishlistPage =  () => {
    const userId = localStorage.getItem('id')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await axios.get(`${process.env.REACT_APP_API_PREFIX}/wishlist/${userId}`).catch(err => {
                    throw err
                })
                console.log(apiResponse, 'gjfjkfgfg');
                
            } catch (error) {
                throw error
            }
        } 
        fetchData()
    }, [userId])
    return (
        <>
        <RecipeWidgets />
        </>
    )
}
export default WishlistPage