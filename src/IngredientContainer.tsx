import React from 'react'
import Ingredient from './components/entity/Ingredient'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import IngredientModal from './components/parts/IngredientModal'

interface props {
    ingredients : Ingredient[]
    setIngredients : React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientContainer = (props : props) => {
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleIngredientClick = () => { 
        setModalOpen(true);
    }

    return (
    <>
        IngredientContainer
        <List>
        {props.ingredients.map((item) => (
            <>
            <ListItem key={item.id}>
                <ListItemButton onClick={handleIngredientClick}>
                    <ListItemText primary={`${item.name} : ${item.type}`} />
                </ListItemButton>
            </ListItem>
            <IngredientModal  open={modalOpen} setOpen={setModalOpen} ingredient={item} setIngredients={props.setIngredients}/>
            </>
        ))}
        </List>
    </>
    )
}

export default IngredientContainer