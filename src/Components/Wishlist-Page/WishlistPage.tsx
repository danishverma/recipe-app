import axios from "axios"
import { useEffect, useRef, useState } from "react"
import RecipeModal from "../Recipe-Modal/RecipeModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { RecipeType } from "../common/Interfaces"

const WishlistPage =  () => {
    const userId = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
    const [heartFilledStates, setHeartFilledStates] = useState<boolean[]>([]);
    const [wishlistRecipes, setWishlistRecipes] = useState([])
    const titleRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await axios.get(`${process.env.REACT_APP_API_PREFIX}/wishlist/${userId}`).catch(err => {
                    throw err
                })
                console.log(apiResponse.data.data[0].recipe.calories, 'gjfjkfgfg');
                setWishlistRecipes(apiResponse.data.data)
                
            } catch (error) {
                throw error
            }
        } 
        fetchData()
    }, [userId])
    const toggleHeart = async (index: number) => {
        // Toggle heartFilledStates[index] to change the filled state for the specific widget
        const newHeartFilledStates = [...heartFilledStates];
        newHeartFilledStates[index] = !newHeartFilledStates[index];
        setHeartFilledStates(newHeartFilledStates);
    }
    const openModal = (recipe: RecipeType) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    console.log(wishlistRecipes,"wishlistRecipes");
    
    return (
        <>
        <div className=""><b>WISHLIST RECIPES</b></div>
        <div className="recipe-widget-container grid grid-cols-5 m-5">
            {wishlistRecipes.length > 0 ? wishlistRecipes.map((item: any, index: number) => (
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5 relative">
                    <a href="#" onClick={() => openModal(item.recipe)}>
                        
                            <img className="rounded-t-lg" src={item.recipe.images.SMALL.url} alt="" />
                           
                    </a>
                    {/* Heart icon in the top right */}
                    <div className="absolute top-1 right-6">
                        
                            <FontAwesomeIcon
                                icon={faHeart}
                                size="lg"
                                color={heartFilledStates[index] ? 'red' : 'white'}
                                style={{ cursor: token ? 'pointer' : 'not-allowed' }}
                                onClick={token ? () => toggleHeart(index) : undefined}
                            />
                    </div>
                    <div className="p-5">
                        <a href="#" onClick={() => openModal(item.recipe)}>
                            <h3 ref={titleRef} className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 hover:text-cyan-500">{item.recipe.label}</h3>
                        </a>
                        <div className='flex text-xs justify-center'>
                            <p className='text-cyan-500'>{Math.round(item.recipe.calories)} </p>
                            <p>&nbsp;CALORIES</p>
                            <div style={{ borderLeft: '1px solid black', height: '20px', marginLeft: '10px', marginRight: '10px' }}></div>
                            <p className='text-cyan-500'>{item.recipe.ingredients.length}</p>
                            <p>&nbsp;INGREDIENTS</p>
                        </div>
                    </div>
                </div>
            )) : null}
            <RecipeModal showModal={showModal} closeModal={closeModal} recipe={selectedRecipe} />
        </div>
        </>
    )
}
export default WishlistPage