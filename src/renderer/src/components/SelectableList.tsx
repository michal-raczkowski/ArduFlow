import { useState } from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'

const SelectableList = ({ items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    onSelect(item)
  }

  return (
    <List>
      {items.map((item, index) => (
        <ListItemButton
          key={index}
          selected={selectedItem === item}
          onClick={() => handleItemClick(item)}
        >
          <ListItemText primary={item} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default SelectableList
