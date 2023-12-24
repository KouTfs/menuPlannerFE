import React, { useEffect } from 'react'
import Menu from '../entity/Menu'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Collapse, IconButton, IconButtonProps, styled, Grid, ListItem, ListItemButton, ListItemText, recomposeColor } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Recipe from '../entity/Recipe';
import { AxiosResponse } from 'axios';
import APICommunicator from '../APICommunicator';
import Ingredient from '../entity/Ingredient';
import IngredientsList from './IngredientsList';
import Step from '../entity/Step';
import StepsList from './StepsList';
import URLbox from './URLbox';
import DescriptionBox from './DescriptionBox';
import MenuModal from '../parts/MenuModal';

interface props {
    menu : Menu,
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>,
    ingredients : Ingredient[]
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const MenuCard = (props : props) => {
    // MenuPatchModal
    const [modalOpen, setModalOpen] = React.useState(false);

    // 展開FLG
    const [expanded, setExpanded] = React.useState(false);

    // recipe
    const [recipe, setRecipe] = React.useState<Recipe>();
    const [ingredients, setIngredients] = React.useState<Ingredient[]>();
    const [steps, setSteps] = React.useState<Step[]>();
    const [url, setUrl] = React.useState<string>();
    const [description, setDescription] = React.useState<string>();

    // レシピ編集FLG
    const [editing, setEditing] = React.useState<boolean>(false);

    // レシピ新設FLG
    const [creating, setCreating] = React.useState<boolean>(false);

    const communicator = new APICommunicator();

    useEffect  (()=>{
      setIngredients(recipe?.ingredients);
      setSteps(recipe?.steps);
      setUrl(recipe?.url);
      setDescription(recipe?.description);
      console.log(recipe);
    }, [recipe]);

    const createRecipeFromResponse = (response : Recipe) : Recipe => {
      if(response.id === undefined){
        setCreating(true);
      }
      let ingredientsList : Ingredient[] = [];
      if(response.ingredients){
        Object.entries(response.ingredients).map(([id, element]) => {
          const ingredient  = props.ingredients.find((item)=> item.id == parseInt(id));
          const amount = element as unknown as string;
          if(ingredient){
            ingredientsList.push({...ingredient, amount: amount});
          }
        });
      }

      let stepsList : Step[] = []
      if(response.steps){
        stepsList = [...response.steps];
      }

      let description : string = '';
      if(response.description){
        description = response.description;
      }

      let url : string = '';
      if(response.url){
        url = response.url;
      }

      return {id : response.id, description: description, steps: stepsList, ingredients: ingredientsList, url: url}
    }

    // メニュー削除
    const handleMenuDeleteClick = async () => {
      await communicator.deleteMenu(props.menu.id).then(()=>console.log("delete"));
    }

    // メニュー更新モーダル
    const handleMenuPatchClick = async () => {
      setModalOpen(true);
    }

    // レシピ表示
    const handleExpandClick = async () =>{
        if(!expanded && !recipe){
            setRecipe(createRecipeFromResponse((await communicator.getRecipe(props.menu.id)).data));
        }
        setExpanded(!expanded);
    }

    // レシピ編集
    const handleEditClick = () => {
      setEditing(true);
    }

    // レシピ更新 
    const handlePatchSubmitClick = async () => {
      const renumberedSteps = [...steps!];
      renumberedSteps.forEach((step, index)=>{step.stepNo = index+1});
      const reqRecipe : Recipe = {id: recipe?.id!, ingredients: ingredients!, steps: renumberedSteps, url: url!, description: description!}
      setRecipe(reqRecipe);
      await communicator.patchRecipe(reqRecipe);
      setEditing(false);
    }

    // レシピ新規作成
    const handlePostSubmitClick = async () => {
      const renumberedSteps = [...steps!];
      renumberedSteps.forEach((step, index)=>{step.stepNo = index+1});
      const reqRecipe : Recipe = {id: null, ingredients: ingredients!, steps: renumberedSteps, url: url!, description: description!}
      setRecipe(reqRecipe);
      await communicator.postRecipe(reqRecipe, props.menu.id);
      setRecipe(createRecipeFromResponse((await communicator.getRecipe(props.menu.id)).data));
      setEditing(false);
      setCreating(false);
    }

    const handleCancelEditClick = () => {
      setIngredients(recipe?.ingredients);
      setSteps(recipe?.steps);
      setEditing(false);
    }

  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            {props.menu.name}
          </Typography>
          <Typography variant='caption'>
            {props.menu.type}
          </Typography>
          <Button onClick={handleMenuDeleteClick}>削除</Button>
          <Button onClick={handleMenuPatchClick}>更新</Button>
        </CardContent>
        <MenuModal setMenus={props.setMenus} open={modalOpen} setOpen={setModalOpen} menu={props.menu} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Grid container direction={'row'}>
              <Grid item xs={7}>
                <Typography variant='subtitle1' >レシピ</Typography>
              </Grid>
              {creating &&               
              <Grid item xs={3} display="flex" justifyContent="flex-end" alignItems="right">
                {!editing && <Button variant="contained" onClick={handleEditClick}>作成</Button>}
                {editing && <>
                  <Button variant="contained" onClick={handlePostSubmitClick}>確定</Button>
                  <Button variant="contained" onClick={handleCancelEditClick} color="error">取消</Button>
                </>}
              </Grid>}
              {!creating && 
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
            {ingredients && <IngredientsList ingredients={ingredients} setIngredients={setIngredients} isEditing={editing} allIngredientsList={props.ingredients}/>}
            <Typography paragraph >手順</Typography>
            {steps && <StepsList steps={steps} setSteps={setSteps} isEditing={editing}/>}
            <Typography paragraph >URL</Typography>
            <URLbox url={url} setUrl={setUrl} isEditing={editing} />
            <Typography paragraph >備考</Typography>
            <DescriptionBox description={description} setDescription={setDescription} isEditing={editing}/>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MenuCard