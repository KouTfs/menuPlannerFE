import React, { useEffect, useState } from 'react'
import Ingredient from '../entity/Ingredient'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Button, IconButton, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import Step from '../entity/Step'

interface props {
    steps : Step[]
    setSteps : React.Dispatch<React.SetStateAction<Step[] | undefined>>;
    isEditing : boolean
}

const StepsList = (props : props) => {
    const [addFlg, setAddFlg] = useState<boolean>(false); // 追加手順入力欄を制御するFlg
    const [newStep, setNewStep] = useState<string>(); // 追加手順を保持する入力用state

    const onStepChange = (index : number) => (event : any) => {
        const updStepList = [...props.steps];
        updStepList[index].description = event.target.value;
        props.setSteps(updStepList)
    }

    const onDeleteClick = (index : number) => (event : any) => {
        const updStepList = [...props.steps];
        updStepList.splice(index,1);
        props.setSteps(updStepList);
    }

    const onCreateClick = () => {
        setAddFlg(true);
        pushNewStep();
    }

    const pushNewStep = () => {
        if(newStep){
            const updStepList = [...props.steps];
            updStepList.push({stepNo: 0, description : newStep})
            setAddFlg(false);
            props.setSteps(updStepList)
            setNewStep('');
        }
    }

    if(props.isEditing){
        return (
            <>
                {props.steps.map((step, index)=>(
                    <ListItem>
                        <TextField
                            id=""
                            label={`手順${index+1}`}
                            size='small'
                            variant="outlined"
                            value={props.steps[index].description}
                            onChange={onStepChange(index)}
                        />
                        <IconButton aria-label="delete" onClick={onDeleteClick(index)}>
                          <DeleteIcon width={15} height={15}/>
                        </IconButton>
                    </ListItem>
                ))}
                {addFlg && 
                    <ListItem>
                        <TextField
                            id="newStep"
                            label="手順"
                            size='small'
                            variant="outlined"
                            value={newStep}
                            onChange={(e)=>setNewStep(e.target.value)}
                            onBlur={pushNewStep}
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
                {props.steps.map((step)=>(
                    <ListItem>
                        <ListItemText primary={`${step.description}`} />
                    </ListItem>
                ))}
            </>
        )
    }
}

export default StepsList