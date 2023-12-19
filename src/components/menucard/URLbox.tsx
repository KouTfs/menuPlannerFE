import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, IconButton, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import Step from '../entity/Step'

interface props {
    url : string | undefined
    setUrl : React.Dispatch<React.SetStateAction<string | undefined>>;
    isEditing : boolean
}

const URLbox = (props : props) => {

    if(props.isEditing){
        return (
            <>
                {
                    <ListItem>
                        <TextField
                            id=""
                            label={`URL`}
                            size='small'
                            variant="outlined"
                            value={props.url}
                            onChange={(e)=>props.setUrl(e.target.value)}
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
                        <ListItemText primary={`${props.url}`} />
                    </ListItem>
                }
            </>
        )
    }
}

export default URLbox