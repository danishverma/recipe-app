import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeModal from '../Recipe-Modal/RecipeModal';
import { RootState } from '../../app/store';
import { RecipeType, SearchResult } from '../common/Interfaces';
import Skeleton from 'react-loading-skeleton'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, TooltipProps } from 'react-tippy';
import { useNavigate } from 'react-router-dom';

const RecipeWidgets = () => {
    const navigate = useNavigate()
    const searchResult = useSelector((state: RootState) => state.recipe.searchResult);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
    const [activeHeartIndex, setActiveHeartIndex] = useState<number | null>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const tooltipProps: TooltipProps = {
        title: 'Login to add to wishlist',
        position: 'top',
        trigger: 'click',
        // arrow: 'true'
    };
    useEffect(() => {
        const titleElement = titleRef.current;
        if (titleElement) {
            const maxHeight = parseInt(window.getComputedStyle(titleElement).getPropertyValue('line-height')) * 2;
            if (titleElement.offsetHeight > maxHeight) {
                titleElement.classList.add('line-clamp-2');
            }
        }
    }, [searchResult]);
    const openModal = (recipe: RecipeType) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const toggleHeartColor = (index: number) => {
        // if (index === activeHeartIndex) {
        //     setActiveHeartIndex(null);
        // } else {
        //     setActiveHeartIndex(index);
        // }
    };
    return (
        <div className="recipe-widget-container grid grid-cols-5 m-5">
            {searchResult.length > 0 ? searchResult.map((item: SearchResult, index: number) => (
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
                    <div className="relative">
                        <a href="#" onClick={() => openModal(item.recipe)}>
                            {item.recipe.images.SMALL.url ?
                                <img className="rounded-t-lg" src={item.recipe.images.SMALL.url} alt="" /> : <Skeleton count={10} />}
                        </a>
                        <Tooltip {...tooltipProps}>

                            <div className='absolute top-1 right-6 cursor-not-allowed'>
                                <FontAwesomeIcon icon={faHeart} size='lg' onClick={() => toggleHeartColor(index)}
                                    style={{ color: activeHeartIndex === index ? 'red' : 'white' }}
                                    />

                            </div>
 
                        </Tooltip>
                        
                    </div>
                    <div className="p-5">
                        <a href="#" onClick={() => openModal(item.recipe)}>
                            <h3 ref={titleRef} className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{item.recipe.label}</h3>
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


// import React, { useState, useRef, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import RecipeModal from '../Recipe-Modal/RecipeModal';
// import { RootState } from '../../app/store';
// import { RecipeType, SearchResult } from '../common/Interfaces';
// import Skeleton from 'react-loading-skeleton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';

// const RecipeWidgets = () => {
//     const searchResult = useSelector((state: RootState) => state.recipe.searchResult);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedRecipe, setSelectedRecipe] = useState<RecipeType|null>(null);
//     const [heartFilledStates, setHeartFilledStates] = useState<boolean[]>([]); // State array to track heart icon filled states for each widget
//     const titleRef = useRef<HTMLHeadingElement>(null);

//     useEffect(() => {
//         // Initialize heartFilledStates array with false values for each widget
//         setHeartFilledStates(new Array(searchResult.length).fill(false));
//     }, [searchResult]);

//     const openModal = (recipe: RecipeType) => {
//         setSelectedRecipe(recipe);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const toggleHeart = (index: number) => {
//         // Toggle heartFilledStates[index] to change the filled state for the specific widget
//         const newHeartFilledStates = [...heartFilledStates];
//         newHeartFilledStates[index] = !newHeartFilledStates[index];
//         setHeartFilledStates(newHeartFilledStates);
//     };

//     return (
//         <div className="recipe-widget-container grid grid-cols-5 m-5">
//             {searchResult.length > 0 ? searchResult.map((item: SearchResult, index: number) => (
//                 <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
//                     <div className="relative">
//                         <a href="#" onClick={() => openModal(item.recipe)}>
//                             {item.recipe.images.SMALL.url ? 
//                                 <img className="rounded-t-lg" src={item.recipe.images.SMALL.url} alt="" />
//                                 : <Skeleton count={10} />
//                             }
//                         </a>
//                         {/* Heart icon in the top right */}
//                         <div className="absolute top-1 right-6">
//                             <FontAwesomeIcon
//                                 icon={faHeart}
//                                 size="lg"
//                                 color={heartFilledStates[index] ? 'red' : 'white'}
//                                 onClick={() => toggleHeart(index)}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                         </div>
//                     </div>
//                     <div className="p-5">
//                         <a href="#" onClick={() => openModal(item.recipe)}>
//                             <h3 ref={titleRef} className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{item.recipe.label}</h3>
//                         </a>
//                         <div className='flex text-xs justify-center'>
//                             <p className='text-cyan-500'>{Math.round(item.recipe.calories)} </p>
//                             <p>&nbsp;CALORIES</p>
//                             <div style={{ borderLeft: '1px solid black', height: '20px', marginLeft: '10px', marginRight: '10px' }}></div>
//                             <p className='text-cyan-500'>{item.recipe.ingredients.length}</p>
//                             <p>&nbsp;INGREDIENTS</p>
//                         </div>
//                     </div>
//                 </div>
//             )) : null}
//             <RecipeModal showModal={showModal} closeModal={closeModal} recipe={selectedRecipe} />
//         </div>
//     );
// };

// export default RecipeWidgets;
