import { Box, Button, MenuItem, Modal, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import Ingredient from '../entity/Ingredient';
import APICommunicator from '../APICommunicator';
import { IngredientType } from '../entity/IngredientType';

interface props {
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    modalIngredient : Ingredient | null,
    setModalIngredient : React.Dispatch<React.SetStateAction<Ingredient | null>>
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
    const [newIngredientName, setNewIngredientName] = React.useState<string>(props.modalIngredient?.name || '');
    const [newIngredientType, setNewIngredientType] = React.useState<string>(props.modalIngredient?.type || '');
    const communicator = new APICommunicator();

    const onPostSubmitClick = async () => {
        if(newIngredientName && newIngredientType){
            await communicator.postIngredient(newIngredientName, newIngredientType);
            props.setIngredients((await communicator.getAllIngredients()).data);
            onClose();
        }
    }

    const onPatchSubmitClick = async () => {
        if(newIngredientName && newIngredientType){
            await communicator.patchIngredient(props.modalIngredient!.id, newIngredientName, newIngredientType);
            props.setIngredients((await communicator.getAllIngredients()).data);
            onClose();
        }
    }

    const onClose = () => {
        props.setOpen(false);
        props.setModalIngredient(null);
    }

  return (
    <Modal open={props.open} onClose={onClose}>
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
                {IngredientType.IngredientType.map((type)=>{
                    const key = Object.keys(type)[0];
                    const value = Object.values(type)[0];
                    return <MenuItem value={key}>{value}</MenuItem>
                })}
           </Select>
            {!props.modalIngredient && <Button variant='contained' onClick={onPostSubmitClick}>OK</Button>}
            {props.modalIngredient && <Button variant='contained' onClick={onPatchSubmitClick}>OK</Button>}
            <Button variant='contained' onClick={onClose}>キャンセル</Button>
        </Box>
    </Modal>
  )
}

export default IngredientModal