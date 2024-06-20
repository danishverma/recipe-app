import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeModal from '../Recipe-Modal/RecipeModal';
import { RootState } from '../../app/store';
import { RecipeType, SearchResult } from '../common/Interfaces';
const RecipeWidgets = () => {
    const searchResult = useSelector((state: RootState) => state.recipe.searchResult);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType|null>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
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
    return (
        <div className="recipe-widget-container grid grid-cols-5 m-5">
            {searchResult.length > 0 ? searchResult.map((item: SearchResult, index: number) => (
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
                    <a href="#" onClick={() => openModal(item.recipe)}>
                        <img className="rounded-t-lg" src={item.recipe.images.SMALL.url} alt="" />
                    </a>
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
