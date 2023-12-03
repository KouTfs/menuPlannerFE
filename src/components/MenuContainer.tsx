import React from 'react'
import Menu from './entity/Menu'

interface props {
    menus : Menu[]
}


const MenuContainer = (props : props) => {
    const onCreateClick = async () => {
        
    }
  return (
    <>
        MenuContainer
        <ul>
            {props.menus.map((menu) => (
              <li
                key={menu.id}
              >{`[id]=${menu.id} [name]=${menu.name} [type]=${menu.type}`}</li>
            ))}
          </ul>
    </>
  )
}

export default MenuContainer