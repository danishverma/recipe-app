import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeModal from '../Recipe-Modal/RecipeModal';
import { RootState } from '../../redux/store';
import { RecipeType, SearchResult } from '../common/Interfaces';
import Skeleton from 'react-loading-skeleton';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const RecipeWidgets = () => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const searchResult = useSelector((state: RootState) => state.recipeSearchSliceReducer.searchResult);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
    const [heartFilledStates, setHeartFilledStates] = useState<boolean[]>([]);
    const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Initialize heartFilledStates array with false values for each widget
        setHeartFilledStates(new Array(searchResult.length).fill(false));
    }, [searchResult]);

    const openModal = (recipe: RecipeType) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleMouseEnter = (index: number) => {
        setActiveTooltipIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveTooltipIndex(null);
    };

    const toggleHeart = async (index: number) => {
        // Toggle heartFilledStates[index] to change the filled state for the specific widget
        const newHeartFilledStates = [...heartFilledStates];
        newHeartFilledStates[index] = !newHeartFilledStates[index];
        setHeartFilledStates(newHeartFilledStates);

        if(token && userId) {
            const recipe = searchResult[index].recipe
            const data  = {
                recipe,
                user_id: userId
            }
            try {
                const apiResponse = await axios.post(`${process.env.REACT_APP_API_PREFIX}/wishlist/add`, data).catch(err => {
                    throw err
                })
            } catch (error) {
                throw error
            }
        }
    };

    return (
        <div className="recipe-widget-container grid grid-cols-5 m-5">
            {searchResult.length > 0 ? searchResult.map((item: SearchResult, index: number) => (
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5 relative">
                    <a href="#" onClick={() => openModal(item.recipe)}>
                        {item.recipe.images.SMALL.url ?
                            <img className="rounded-t-lg" src={item.recipe.images.SMALL.url} alt="" />
                            : <Skeleton count={10} />
                        }
                    </a>
                    {/* Heart icon in the top right */}
                    <div className="absolute top-1 right-6">
                        <div
                            className="heart-icon-container relative"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave()}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                size="lg"
                                color={heartFilledStates[index] ? 'red' : 'white'}
                                style={{ cursor: token ? 'pointer' : 'not-allowed' }}
                                onClick={token ? () => toggleHeart(index) : undefined}
                            />
                            {!token && activeTooltipIndex === index && (
                                <div className="tooltip min-w-32 text-center bg-gray-800 text-white text-xs p-1 rounded absolute top-full left-1/2 transform -translate-x-1/2  pointer-events-none">
                                    Login to add to wishlist
                                </div>
                            )}
                        </div>
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
    );
};

export default RecipeWidgets;
