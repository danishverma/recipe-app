export interface InitialState {
    searchInput: string
    searchResult: SearchResult[]
}
export interface SearchResult {
    recipe: RecipeType;
}
export interface RecipeType {
    images: ImagesType;
    ingredientLines: String[]
    label: string;
    url: String;
    healthLabels: String[];
    calories: number;
    ingredients: String[];
}
export interface ImagesType {
    SMALL: ImgSizeTypes;
}
export interface ImgSizeTypes {
    height: number;
    url: string;
    width: number;
}
export interface PropTypes {
    showModal: boolean;
    closeModal: () => void;
    recipe: RecipeType | null;
}
