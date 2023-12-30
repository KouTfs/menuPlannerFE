import React from 'react'
import Ingredient from './entity/Ingredient'
import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import IngredientModal from './parts/IngredientModal'
import { IngredientType } from './entity/IngredientType'
import { isNull } from 'util'

interface props {
    ingredients : Ingredient[]
    setIngredients : React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientContainer = (props : props) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalIngredient, setModalIngredient] = React.useState<Ingredient | null>(null);

    const handleIngredientClick = (ingredient : Ingredient) => { 
        setModalIngredient(ingredient);
        setModalOpen(true);
    }

    return (
    <>
        IngredientContainer
        <Button variant='contained' onClick={()=>setModalOpen(true)}>新規作成</Button>
        <List>
        {props.ingredients.map((item) => (
            <ListItem key={item.id}>
                <ListItemButton onClick={() => handleIngredientClick(item)}>
                    <ListItemText primary={`${item.name} : ${IngredientType.getJaIngredientType(item.type)}`} />
                </ListItemButton>
            </ListItem>
        ))}
        </List>
        {modalOpen && <IngredientModal open={modalOpen} setOpen={setModalOpen} modalIngredient={modalIngredient} setModalIngredient={setModalIngredient} setIngredients={props.setIngredients}/>}
    </>
    )
}

export default IngredientContainer