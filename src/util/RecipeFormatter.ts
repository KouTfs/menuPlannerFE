import Ingredient from "../components/entity/Ingredient";
import Recipe from "../components/entity/Recipe";
import Step from "../components/entity/Step";

export class RecipeFormatter {
  static createRecipeFromResponse = (response: Recipe, ingredients: Ingredient[]): Recipe => {
    let ingredientsList: Ingredient[] = [];
    if (response.ingredients) {
      Object.entries(response.ingredients).map(([id, element]) => {
        const ingredient = ingredients.find((item) => item.id == parseInt(id));
        const amount = element as unknown as string;
        if (ingredient) {
          ingredientsList.push({ ...ingredient, amount: amount });
        }
      });
    }
  
    let stepsList: Step[] = []
    if (response.steps) {
      stepsList = [...response.steps];
    }
  
    return { id: response.id, description: response.description || '', steps: stepsList, ingredients: ingredientsList, url: response.url || '' }
  }
}
