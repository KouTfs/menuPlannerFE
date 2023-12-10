import React, { useEffect, useState } from 'react'
import Ingredient from './entity/Ingredient'
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Autocomplete, Button, IconButton, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'

interface props {
    ingredients : Ingredient[]
    setIngredients : React.Dispatch<React.SetStateAction<Ingredient[] | undefined>>;
    isEditing : boolean
    allIngredientsList : Ingredient[]
}

const IngredientsList = (props : props) => {
    const [amounts, setAmounts] = useState<string[]>([]);
    const [addFlg, setAddFlg] = useState<boolean>(false); // 追加材料入力欄を制御するFlg
    const [newIngredient, setNewIngredient] = useState<Ingredient | null>(); // 追加材料を保持するstate
    const [newIngredientInput, setNewIngredientInput] = useState<string>(''); // 追加材料の入力用state
    const [newAmount, setNewAmount] = useState<string>(); // 追加材料の数量を保持する入力用state


    useEffect(()=>{
        setAmounts(Array.from(props.ingredients.map((item)=>item.amount)));
    }, [props.ingredients]);

    useEffect(()=>{
        setAddFlg(true);
    }, [newIngredient])

    const onAmountChange = (index : number) => (event : any) => {
        const updAmountList = [...amounts];
        updAmountList[index] = event.target.value;
        setAmounts(updAmountList)
    }

    const onAmountBlur = (index : number) => (event : any) => {
        const updIngredientList = [...props.ingredients];
        updIngredientList[index].amount = amounts[index];
        props.setIngredients(updIngredientList);
    }

    const onDeleteClick = (index : number) => (event : any) => {
        const updIngredientList = [...props.ingredients];
        updIngredientList.splice(index,1);
        props.setIngredients(updIngredientList);
    }

    const onCreateClick = () => {
        setAddFlg(true);
        pushNewIngredient();
    }

    const onNewIngredientChange = (event : any, newValue : string | null) => {
        if(newValue){
            const newIngredient = props.allIngredientsList.find((item)=>item.name === newValue);
            setNewIngredientInput(newIngredient!.name);
            setNewIngredient(newIngredient);
        }else{
            setNewIngredientInput('');
            setNewIngredient(null);
        }
    }

    const pushNewIngredient = () => {
        if(newIngredient && newAmount){
            const updIngredientList = [...props.ingredients];
            updIngredientList.push({...newIngredient, amount: newAmount});
            props.setIngredients(updIngredientList);
            setAddFlg(false);
            setNewIngredient(null);
            setNewIngredientInput('');
            setNewAmount('');
        }
    }

    if(props.isEditing){
        return (
            <>
                {props.ingredients.map((ingredient, index)=>(
                    <ListItem>
                        <ListItemText  primary={`${props.ingredients[index].name} : `} /> 
                        <TextField
                            id=""
                            label="数量"
                            size='small'
                            variant="outlined"
                            value={amounts[index]}
                            onChange={onAmountChange(index)}
                            onBlur={onAmountBlur(index)}
                        />
                        <IconButton aria-label="delete" onClick={onDeleteClick(index)}>
                          <DeleteIcon width={15} height={15}/>
                        </IconButton>
                    </ListItem>
                ))}
                {addFlg && 
                    <ListItem>
                        <Autocomplete
                          disablePortal
                          id="newIngredient"
                          options={props.allIngredientsList.map((item)=>item.name)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="材料" />}
                          value={newIngredient?.name}
                          onChange={onNewIngredientChange}
                          inputValue={newIngredientInput}
                          onInputChange={(event, newInputValue) => {
                            setNewIngredientInput(newInputValue);
                          }}
                          onBlur={pushNewIngredient}
                        />
                        :
                        <TextField
                            id="newAmount"
                            label="数量"
                            size='small'
                            variant="outlined"
                            value={newAmount}
                            onChange={(e)=>setNewAmount(e.target.value)}
                            onBlur={pushNewIngredient}
                        />
                    </ListItem>
                }
                <IconButton aria-label='create' onClick={onCreateClick}>
                    <ControlPointIcon width={15} height={15}/>
                </IconButton>
            </>
        )
    }else{
        return (
            <>
                {props.ingredients.map((ingredient)=>(
                    <ListItem>
                        <ListItemText primary={`${ingredient.name} : ${ingredient.amount}`} />
                    </ListItem>
                ))}
            </>
        )
    }
}

export default IngredientsList