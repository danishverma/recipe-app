import { PropTypes } from "../common/Interfaces";
const RecipeModal = ({ showModal, closeModal, recipe }: PropTypes) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex flex-col lg:flex-row items-center justify-between p-4 border-b rounded-t">
                <div className="mb-4 lg:mb-0 lg:w-1/2 lg:pr-4">
                  <img
                    src={recipe?.images.SMALL.url}
                    alt={recipe?.label}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe?.label}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-500">
                    <strong>Ingredients:</strong>
                    <ul>
                      {recipe?.ingredientLines.map((ingredient: String, index: number) => (
                        <li key={index}>{index + 1}. {ingredient}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 mt-5">
                    <strong>Nutritional Details:</strong><br />
                    <p className="text-center"> {recipe?.healthLabels.slice(0, 4).join(", ")}</p>
                  </p>
                  {recipe?.digest ? recipe?.digest.length > 0 ? recipe?.digest.slice(0, 8).map((nutrients: any, index: number) => (
                    <ul className="nutrients-list">
                      <li className="list-none flex gap-2 text-base leading-relaxed text-gray-500" key={index}>
                        {nutrients.label}
                        <span className="ms-auto">{Math.round(nutrients.total)}{nutrients.unit}</span>
                      </li>
                    </ul>
                  )) : undefined : undefined}
                </div>
              </div>
              <div className="p-4">
                <a
                  href={recipe?.url ? String(recipe.url) : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Instructions
                </a>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RecipeModal;
