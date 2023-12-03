import Ingredient from "./Ingredient";
import Step from "./Step";

type Recipe = {
    id: number,
    description : string,
    steps : Step[],
    ingredients : Ingredient[],
    url : string;
}

export default Recipe