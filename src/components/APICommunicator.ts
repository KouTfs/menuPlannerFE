import axios, { AxiosResponse } from "axios";
import Ingredient from "./entity/Ingredient";
import Menu from "./entity/Menu";
import Recipe from "./entity/Recipe";

class APICommunicator {
    getToken = () => {
        return sessionStorage.getItem('AUTHORITY');
    }

    getAllIngredients = async (): Promise<AxiosResponse<Ingredient[]>> => {
        const URL = 'http://localhost:5000/ingredients';
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getIngredientsById = async (id: number) : Promise<AxiosResponse<Ingredient>> => {
        const URL = `http://localhost:5000/ingredients/${id}`
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getAllMenus = async (): Promise<AxiosResponse<Menu[]>> => {
        const URL = 'http://localhost:5000/menus';
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getMenuById = async (id: number): Promise<AxiosResponse<Menu>> => {
        const URL = `http://localhost:5000/menus/${id}`;
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getRecipe = async (id: number) : Promise<AxiosResponse<Recipe>> => {
        const URL = `http://localhost:5000/menus/${id}/recipe`;
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }
}

export default APICommunicator