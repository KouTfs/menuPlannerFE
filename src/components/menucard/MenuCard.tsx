import React, { useEffect } from 'react'
import Menu from '../entity/Menu'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Collapse, IconButton, IconButtonProps, styled, Grid, ListItem, ListItemButton, ListItemText, recomposeColor } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Recipe from '../entity/Recipe';
import APICommunicator from '../APICommunicator';
import Ingredient from '../entity/Ingredient';
import MenuModal from '../parts/MenuModal';
import MenuRecipe from './MenuRecipe';
import { RecipeFormatter } from '../../util/RecipeFormatter';

interface props {
  menu: Menu,
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>,
  ingredients: Ingredient[]
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

const MenuCard = (props: props) => {
  // MenuPatchModal
  const [modalOpen, setModalOpen] = React.useState(false);

  // 展開FLG
  const [expanded, setExpanded] = React.useState(false);

  // recipe
  const [recipe, setRecipe] = React.useState<Recipe>();

  // レシピ編集FLG
  const [editing, setEditing] = React.useState<boolean>(false);

  // レシピ新設FLG
  const [creating, setCreating] = React.useState<boolean>(false);

  const communicator = new APICommunicator();

  // メニュー削除
  const handleMenuDeleteClick = async () => {
    await communicator.deleteMenu(props.menu.id).then(() => console.log("delete"));
    props.setMenus((await communicator.getAllMenus()).data);
  }

  // メニュー更新モーダル
  const handleMenuPatchClick = async () => {
    setModalOpen(true);
  }

  // レシピ表示
  const handleExpandClick = async () => {
    if (!expanded && !recipe) {
      setRecipe(RecipeFormatter.createRecipeFromResponse((await communicator.getRecipe(props.menu.id)).data, props.ingredients));
    }
    setExpanded(!expanded);
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
          <MenuRecipe recipe={recipe} setRecipe={setRecipe} ingredients={props.ingredients} menuId={props.menu.id}/>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MenuCard