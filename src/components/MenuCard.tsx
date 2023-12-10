import React, { useEffect } from 'react'
import Menu from './entity/Menu'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Collapse, IconButton, IconButtonProps, styled, Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Recipe from './entity/Recipe';
import { AxiosResponse } from 'axios';
import APICommunicator from './APICommunicator';
import Ingredient from './entity/Ingredient';
import IngredientsList from './IngredientsList';
import Step from './entity/Step';
import StepsList from './StepsList';

interface props {
    menu : Menu,
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
    // 展開FLG
    const [expanded, setExpanded] = React.useState(false);

    // recipe
    const [recipe, setRecipe] = React.useState<Recipe>();
    const [ingredients, setIngredients] = React.useState<Ingredient[]>();
    const [steps, setSteps] = React.useState<Step[]>();
    const [url, setUrl] = React.useState<string>();
    const [description, setDescription] = React.useState<string>();

    // 編集中FLG
    const [editing, setEditing] = React.useState<boolean>(false);

    const communicator = new APICommunicator();

    useEffect  (()=>{
      setIngredients(recipe?.ingredients);
      setSteps(recipe?.steps);
      setUrl(recipe?.url);
      setDescription(recipe?.description);
    }, [recipe]);

    const createRecipeFromResponse = (response : Recipe) : Recipe => {
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

    const handleExpandClick = async () =>{
        if(!expanded && !recipe){
            const response : AxiosResponse<Recipe> = await communicator.getRecipe(props.menu.id);
            setRecipe(createRecipeFromResponse(response.data));
        }
        setExpanded(!expanded);
    }

    const handleEditClick = () => {
      setEditing(true);
    }

    const handleSubmitClick = () => {
      const renumberedSteps = [...steps!];
      renumberedSteps.forEach((step, index)=>{step.stepNo = index+1})
      setRecipe({id: recipe?.id!, ingredients: ingredients!, steps: renumberedSteps, url: url!, description: description!})
      setEditing(false);
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
        </CardContent>
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
              <Grid item xs={3} display="flex" justifyContent="flex-end" alignItems="right">
                {!editing && <Button variant="contained" onClick={handleEditClick}>編集</Button>}
                {editing && <>
                  <Button variant="contained" onClick={handleSubmitClick}>確定</Button>
                  <Button variant="contained" onClick={handleCancelEditClick} color="error">取消</Button>
                </>}
              </Grid>
            </Grid>
            <Typography paragraph >材料</Typography>
            {ingredients &&
              <IngredientsList ingredients={ingredients} setIngredients={setIngredients} isEditing={editing} allIngredientsList={props.ingredients}/>
            }
            <Typography paragraph >手順</Typography>
            {steps &&
              <StepsList steps={steps} setSteps={setSteps} isEditing={editing}/>   
            }
            <Typography paragraph >URL</Typography>
            {url &&
              <Typography >{url}</Typography>
            }
            <Typography paragraph >備考</Typography>
            {description &&
              <Typography >{description}</Typography>
            }
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MenuCard