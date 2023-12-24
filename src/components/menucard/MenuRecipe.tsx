import React, { useEffect } from 'react'
import Recipe from '../entity/Recipe'
import { Button, Grid, Typography } from '@mui/material'
import DescriptionBox from './DescriptionBox'
import IngredientsList from './IngredientsList'
import StepsList from './StepsList'
import URLbox from './URLbox'
import Ingredient from '../entity/Ingredient'
import Step from '../entity/Step'
import APICommunicator from '../APICommunicator'
import { RecipeFormatter } from '../../util/RecipeFormatter'

interface props {
    recipe: Recipe | undefined,
    setRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>,
    ingredients : Ingredient[],
    menuId : number
}

const MenuRecipe = (props: props) => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>();
    const [steps, setSteps] = React.useState<Step[]>();
    const [url, setUrl] = React.useState<string>();
    const [description, setDescription] = React.useState<string>();

    // レシピ編集FLG
    const [editing, setEditing] = React.useState<boolean>(false);

    const communicator = new APICommunicator();

    useEffect(() => {
        setIngredients(props.recipe?.ingredients);
        setSteps(props.recipe?.steps);
        setUrl(props.recipe?.url);
        setDescription(props.recipe?.description);
        console.log(props.recipe);
    }, [props.recipe]);

    // レシピ更新 
    const handlePatchSubmitClick = async () => {
        const renumberedSteps = [...steps!];
        renumberedSteps.forEach((step, index) => { step.stepNo = index + 1 });
        const reqRecipe: Recipe = { id: props.recipe?.id!, ingredients: ingredients!, steps: renumberedSteps, url: url!, description: description! }
        props.setRecipe(reqRecipe);
        await communicator.patchRecipe(reqRecipe);
        setEditing(false);
    }

    // レシピ新規作成
    const handlePostSubmitClick = async () => {
        const renumberedSteps = [...steps!];
        renumberedSteps.forEach((step, index) => { step.stepNo = index + 1 });
        const reqRecipe: Recipe = { id: null, ingredients: ingredients!, steps: renumberedSteps, url: url!, description: description! }
        props.setRecipe(reqRecipe);
        await communicator.postRecipe(reqRecipe, props.menuId);
        props.setRecipe(RecipeFormatter.createRecipeFromResponse((await communicator.getRecipe(props.menuId)).data, props.ingredients));
        setEditing(false);
    }

    const handleCancelEditClick = () => {
        setIngredients(props.recipe?.ingredients);
        setSteps(props.recipe?.steps);
        setEditing(false);
    }

    // レシピ編集
    const handleEditClick = () => {
        setEditing(true);
    }

    return (
        <>
            <Grid container direction={'row'}>
                <Grid item xs={7}>
                    <Typography variant='subtitle1' >レシピ</Typography>
                </Grid>
                {!props.recipe?.id &&
                    <Grid item xs={3} display="flex" justifyContent="flex-end" alignItems="right">
                        {!editing && <Button variant="contained" onClick={handleEditClick}>作成</Button>}
                        {editing && <>
                            <Button variant="contained" onClick={handlePostSubmitClick}>確定</Button>
                            <Button variant="contained" onClick={handleCancelEditClick} color="error">取消</Button>
                        </>}
                    </Grid>}
                {props.recipe?.id &&
                    <Grid item xs={3} display="flex" justifyContent="flex-end" alignItems="right">
                        {!editing && <Button variant="contained" onClick={handleEditClick}>編集</Button>}
                        {editing && <>
                            <Button variant="contained" onClick={handlePatchSubmitClick}>確定</Button>
                            <Button variant="contained" onClick={handleCancelEditClick} color="error">取消</Button>
                        </>}
                    </Grid>
                }
            </Grid>
            <Typography paragraph >材料</Typography>
            {ingredients && <IngredientsList ingredients={ingredients} setIngredients={setIngredients} isEditing={editing} allIngredientsList={props.ingredients} />}
            <Typography paragraph >手順</Typography>
            {steps && <StepsList steps={steps} setSteps={setSteps} isEditing={editing} />}
            <Typography paragraph >URL</Typography>
            <URLbox url={url} setUrl={setUrl} isEditing={editing} />
            <Typography paragraph >備考</Typography>
            <DescriptionBox description={description} setDescription={setDescription} isEditing={editing} />
        </>)

}

export default MenuRecipe