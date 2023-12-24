import React from 'react'
import Menu from './entity/Menu'
import MenuCard from './menucard/MenuCard'
import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import Ingredient from './entity/Ingredient'
import APICommunicator from './APICommunicator'
import MenuModal from './parts/MenuModal'

interface props {
  menus: Menu[]
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
  ingredients: Ingredient[]
}

const MenuContainer = (props: props) => {
  const [open, setOpen] = React.useState<boolean>(false);


  const onCreateClick = () => {
    setOpen(true);
  }

  return (
    <>
      MenuContainer
      <Button variant='contained' onClick={onCreateClick}>新規作成</Button>
      <Grid container direction={'column'}>
        {props.menus.map((menu) => <MenuCard menu={menu} ingredients={props.ingredients} setMenus={props.setMenus}/>)}
      </Grid>
      <MenuModal setMenus={props.setMenus} open={open} setOpen={setOpen} menu={null} />
    </>
  )
}

export default MenuContainer