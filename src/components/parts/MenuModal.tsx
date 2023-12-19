import { Modal, Box, TextField, Select, MenuItem, Button} from '@mui/material'
import React from 'react'
import Menu from '../entity/Menu';
import APICommunicator from '../APICommunicator';

interface props {
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>,
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    menuId : number | null
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

const MenuModal = (props : props) => {
    const menuTypeList = ['STAPLE', 'MAIN', 'SUB'] // API取得する形もありかも
    const [newMenuName, setNewMenuName] = React.useState<string>('');
    const [newMenuType, setNewMenuType] = React.useState<string>('');
    const communicator = new APICommunicator();

    
    const onCancelClick = () => {
        setNewMenuName('');
        setNewMenuType('');
        props.setOpen(false);
    }

    const onPostSubmitClick = async () => {
        if(newMenuName && newMenuType){
          await communicator.postMenu(newMenuName, newMenuType).then(onCancelClick);
          props.setMenus((await communicator.getAllMenus()).data);
        }
    }

    const onPatchSubmitClick = async () => {
        if(newMenuName && newMenuType){
          await communicator.patchMenu({id : props.menuId!, name : newMenuName, type: newMenuType}).then(onCancelClick);
          props.setMenus((await communicator.getAllMenus()).data);
        }
    }

  return (
    <Modal
          open={props.open}
          onClose={()=>props.setOpen(false)}
        >
          <Box sx={style}>
            <TextField 
              id='newMenuName'
              label='メニュー名'
              size='small' 
              variant='outlined'
              value={newMenuName}
              onChange={(e)=>setNewMenuName(e.target.value)}
            />
            <Select
              label='タイプ'
              id='menuType'
              value={newMenuType}
              onChange={(e)=>setNewMenuType(e.target.value)}
            >
              <MenuItem value={menuTypeList[0]}>主食</MenuItem>
              <MenuItem value={menuTypeList[1]}>主菜</MenuItem>
              <MenuItem value={menuTypeList[2]}>副菜</MenuItem>
            </Select>
            {!props.menuId && <Button variant='contained' onClick={onPostSubmitClick}>OK</Button>}
            {props.menuId && <Button variant='contained' onClick={onPatchSubmitClick}>OK</Button>}
            <Button variant='contained' onClick={onCancelClick}>キャンセル</Button>
          </Box>
        </Modal>  )
}

export default MenuModal