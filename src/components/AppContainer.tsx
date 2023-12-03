import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import Ingredient from './entity/Ingredient';
import Menu from './entity/Menu';
import MenuContainer from './MenuContainer';
import APICommunicator from './APICommunicator';

export const AppContainer = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [menus, setMenus] = React.useState<Menu[]>([]);
  const [loadingFlg, setLoadingFlg] = React.useState<boolean>(true);
  const communicator = new APICommunicator();

  const load = async () => {
    try {
      const ingredientsResponse: AxiosResponse<Ingredient[]> = await communicator.getAllIngredients();
      setIngredients(ingredientsResponse.data);

      const menusResponse: AxiosResponse<Menu[]> = await communicator.getAllMenus();
      setMenus(menusResponse.data);
    } catch (error) {
      console.error('Error while loading:', error);
    }
    setLoadingFlg(false);
  }

  useEffect(()=>{load();}, [])

  return (<>
  {!loadingFlg &&
      (
        <>
          <ul>
            {ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
              >{`[id]=${ingredient.id} [name]=${ingredient.name} [type]=${ingredient.type}`}</li>
            ))}
          </ul>
          <MenuContainer menus={menus}/>
        </>
      )
            }
  </>);
}

export default AppContainer