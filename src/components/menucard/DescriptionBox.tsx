import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, IconButton, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import Step from '../entity/Step'

interface props {
    description : string | undefined
    setDescription : React.Dispatch<React.SetStateAction<string | undefined>>;
    isEditing : boolean
}

const DescriptionBox = (props : props) => {

    if(props.isEditing){
        return (
            <>
                {
                    <ListItem>
                        <TextField
                            id=""
                            label={`備考`}
                            size='small'
                            variant="outlined"
                            value={props.description}
                            onChange={(e)=>props.setDescription(e.target.value)}
                        />
                    </ListItem>
                }
            </>
        )
    }else{
        return (
            <>
                {
                    <ListItem>
                        <ListItemText primary={`${props.description}`} />
                    </ListItem>
                }
            </>
        )
    }
}

export default DescriptionBox