import { DragEvent, FC, useContext, useMemo } from "react"

import { List, Paper } from "@mui/material"

import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"

import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"

import styles from './EntryList.module.css';


interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  
  const { entries, updateEntry  } = useContext( EntriesContext );
  const { isDragging, endDragging } = useContext( UIContext );

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries] )

  const onDropEntry = (ev: DragEvent<HTMLDivElement>) => {
    
    const id = ev.dataTransfer.getData('text');

    let updatedEntry = entries.find(entry => entry._id === id);
    
    if( updatedEntry ) {
      updatedEntry.status = status;
      updateEntry(updatedEntry);
    }

    endDragging();

  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }


  return (
    // TODO: aquí haremos drop
    <div 
      className={`${isDragging && styles.dragging}`}
      onDrop={ onDropEntry }
      onDragOver = { allowDrop }
      
    >
      <Paper 
        sx={{ 
            height: 'calc( 100vh - 150px )', 
            overflow: 'scroll', 
            backgroundColor: 'transparent', 
            padding: '0 5px',
            scrollbarColor: 'yellow'
        }}
      >
      
      {/* TODO: cambiará dependiendo de si estoy haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all 0.3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={ entry._id } entry={ entry } />

            ))
          }
        </List>

      </Paper>
    </div>
  )
}
