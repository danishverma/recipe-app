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
    digest: String[];
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

export interface SignUpValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    contact: number|null;
}

export interface  LoginValues {
    email: string;
    password: string;
}

export interface UserDetails {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    contact: number|null;
}

export interface InitialStateAuth {
    isLoggedIn: string;
    userDetails: UserDetails;
}