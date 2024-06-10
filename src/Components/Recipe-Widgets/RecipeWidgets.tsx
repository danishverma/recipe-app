import { useSelector } from "react-redux"

const RecipeWigets = () => {
    const searchResult = useSelector((state: any) => state.recipe.searchResult)
    return (
        <div className="recipw-widget-conatiner grid grid-cols-5 m-5">
        {searchResult.length>0?searchResult.map(( item: any, index: number) =>(
            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
                <a href="#">
                    <img className="rounded-t-lg" src={item.recipe.images.SMALL.url} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.recipe.label}</h5>
                    </a>
                </div>
            </div>
        )):null}
        </div>
    )
}
export default RecipeWigets