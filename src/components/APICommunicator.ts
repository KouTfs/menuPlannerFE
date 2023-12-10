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
        const URL = this.host + `/ingredients/${id}`
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getAllMenus = async (): Promise<AxiosResponse<Menu[]>> => {
        const URL = this.host + '/menus';
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getMenuById = async (id: number): Promise<AxiosResponse<Menu>> => {
        const URL = this.host + `/menus/${id}`;
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }

    getRecipe = async (id: number) : Promise<AxiosResponse<Recipe>> => {
        const URL = this.host + `/menus/${id}/recipe`;
        return await axios.get(URL, {headers: {Authorization: this.getToken()}});
    }
}

export default APICommunicator