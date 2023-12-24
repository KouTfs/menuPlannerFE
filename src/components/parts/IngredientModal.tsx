import { Box, Button, MenuItem, Modal, Select, TextField } from '@mui/material'
import React from 'react'
import Ingredient from '../entity/Ingredient';
import APICommunicator from '../APICommunicator';

interface props {
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    ingredient : Ingredient | null,
    setIngredients : React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const IngredientModal = (props : props) => {
    const [newIngredientName, setNewIngredientName] = React.useState<string>(props.ingredient?.name || '');
    const [newIngredientType, setNewIngredientType] = React.useState<string>(props.ingredient?.type || '');
    const communicator = new APICommunicator();

    const onPostSubmitClick = async () => {
        if(newIngredientName && newIngredientType){
            await communicator.postIngredient(newIngredientName, newIngredientType);
            props.setIngredients((await communicator.getAllIngredients()).data);
        }
    }

    const onPatchSubmitClick = async () => {
        if(newIngredientName && newIngredientType){
            await communicator.patchIngredient(props.ingredient!.id, newIngredientName, newIngredientType);
            props.setIngredients((await communicator.getAllIngredients()).data);
        }
    }

    const onCancelClick = () => {
        props.setOpen(false);   
    }

  return (
    <Modal open={props.open} onClose={()=>props.setOpen(false)}>
        <Box sx={style}>
            <TextField
                id='newIngredientName'
                label='材料名'
                size='small'
                variant='outlined'
                value={newIngredientName}
                onChange={(e)=>setNewIngredientName(e.target.value)}
            />
            <Select
                label='タイプ'
                id='ingredientType'
                value={newIngredientType}
                onChange={(e)=>setNewIngredientType(e.target.value)}
            >
                <MenuItem value={'MEAT'}>肉</MenuItem>
            </Select>
            {!props.ingredient && <Button variant='contained' onClick={onPostSubmitClick}>OK</Button>}
            {props.ingredient && <Button variant='contained' onClick={onPatchSubmitClick}>OK</Button>}
            <Button variant='contained' onClick={onCancelClick}>キャンセル</Button>
        </Box>
    </Modal>
  )
}

export default IngredientModal