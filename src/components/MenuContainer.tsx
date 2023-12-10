import React from 'react'
import Menu from './entity/Menu'
import MenuCard from './MenuCard'
import { Grid } from '@mui/material'
import Ingredient from './entity/Ingredient'

interface props {
    menus : Menu[]
    ingredients : Ingredient[]
}


const MenuContainer = (props : props) => {
    const onCreateClick = async () => {
        
    }
  return (
    <>
        MenuContainer
        <Grid container direction={'column'}>
            {props.menus.map((menu) => <MenuCard menu={menu} ingredients={props.ingredients}/>)}
        </Grid>
    </>
  )
}

export default MenuContainer