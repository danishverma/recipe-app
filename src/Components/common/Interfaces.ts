export interface InitialState{
    searchInput: string
    searchResult: SearchResult[]
}
export interface SearchResult{
    receipe:RecipeType;
}

export interface RecipeType{
    images: ImagesType;
    ingredientLines: String[]
    label: string;
    url: String;
    healthLabels: String[];
}

export interface ImagesType{
    SMALL: ImgSizeTypes;
}

export interface ImgSizeTypes{
    height: number;
    url: string;
    width: number;
}
export interface PropTypes{
    showModal: boolean;
    closeModal: any;
    recipe: RecipeType|null;
  }
