import { Route, Routes } from "react-router-dom"
import Login from "../Login/Login"
import Navbar from "../Navbar/Navbar"
import RecipeWigets from "../Recipe-Widgets/RecipeWidgets"
import SignUp from "../SignUp/SignUp"
import WishlistPage from "../Wishlist-Page/WishlistPage"
const LandingPage = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<><Navbar /><RecipeWigets /></>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
        </>
    )
}
export default LandingPage