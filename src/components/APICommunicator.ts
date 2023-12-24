import axios, { AxiosResponse } from "axios";
import Ingredient from "./entity/Ingredient";
import Menu from "./entity/Menu";
import Recipe from "./entity/Recipe";
import { useNavigate } from "react-router-dom";

class APICommunicator {
    host = "http://localhost:5000";
    // host = "https://menu-planner-backend-8944564644ed.herokuapp.com";
    
    getToken = () => {
        return sessionStorage.getItem('AUTHORITY');
    }

    login = async (user : object) => {
        const URL = this.host + '/login';
        return await axios.post(URL, user);
    }

    checkAuth = async (token:string) => {
        const URL = this.host + '/menus';
        return await axios.get(URL, {
            headers: {Authorization: token}
        })
    }

    getAllIngredients = async (): Promise<AxiosResponse<Ingredient[]>> => {
        const URL = this.host + '/ingredients';
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getIngredientsById = async (id: number) : Promise<AxiosResponse<Ingredient>> => {
        const URL = this.host + `/ingredients/${id}`;
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    postIngredient = async (name: string, type: string) => {
        const URL = this.host + `/ingredients`;
        await axios.post(URL, {ingredientName: name, ingredientType: type}, {headers: {Authorization: this.getToken()}})
    }

    patchIngredient =async (id: number, name: string, type: string) => {
        const URL = this.host + `/ingredients/${id}`;
        await axios.patch(URL, {ingredientName: name, ingredientType: type}, {headers: {Authorization: this.getToken()}})
    }

    getAllMenus = async (): Promise<AxiosResponse<Menu[]>> => {
        const URL = this.host + '/menus/' + sessionStorage.getItem('USERNAME');
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    postMenu = async (menuName: string, menuType: string) => {
        const URL = this.host + `/menu/` + sessionStorage.getItem('USERNAME');
        await axios.post(URL, {menuName: menuName, menuType: menuType}, {headers: {Authorization: this.getToken()}});
    }

    deleteMenu = async (menuId: number) => {
        const URL = this.host + `/menus/${menuId}`;
        await axios.delete(URL, {headers: {Authorization: this.getToken()}});
    }

    patchMenu = async (menu: Menu) => {
        const URL = this.host + `/menus/${menu.id}`;
        console.log(menu);
        await axios.patch(URL, {menuName: menu.name, menuType: menu.type}, {headers: {Authorization: this.getToken()}});
    }

    getRecipe = async (id: number) : Promise<AxiosResponse<Recipe>> => {
        const URL = this.host + `/menus/${id}/recipe`;
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    patchRecipe = async (recipe:Recipe) => {
        console.log(recipe);
        const URL = this.host + `/recipe`;
        await axios.patch(URL, {id: recipe.id, description : recipe.description, steps: recipe.steps, ingredients: recipe.ingredients, url: recipe.url}, {headers: {Authorization: this.getToken()}})
    }

    postRecipe = async (recipe:Recipe, menuId:number) => {
        const URL = this.host + `/menus/${menuId}/recipe`;
        await axios.post(URL, {description : recipe.description, steps: recipe.steps, ingredients: recipe.ingredients, url: recipe.url}, {headers: {Authorization: this.getToken()}});
    }
}

export default APICommunicator