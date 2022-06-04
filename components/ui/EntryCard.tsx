import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC, useContext } from "react"
import { UIContext } from "../../context/ui"
import { Entry } from "../../interfaces"
import { EntriesContext } from '../../context/entries/';
import { useRouter } from "next/router";

interface Props {
  entry: Entry;
}
export const EntryCard : FC<Props> = ({ entry }) => {

  const router = useRouter();

  const { startDragging, endDragging } = useContext( UIContext );
  const { deleteEntry } = useContext( EntriesContext );

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id);
    startDragging();
  }

  const deleteEntryHandler = () => {
    deleteEntry(entry._id);
  }

  const onDragEnd = () => {
    endDragging();
  }

  const onClick = () => {
    router.push('/entries/'+entry._id);
  }
  
  const addedTime = new Date(new Date().getTime() - entry.createdAt).getMinutes()

  return (
    
    <Card
      onClick= { onClick }
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart = { onDragStart }
      onDragEnd = { onDragEnd }
      
    >
      <CardActionArea>
        <CardContent>
          <Typography 
            sx={{ whiteSpace: 'pre-line'}}
          > 
            { entry.description } 
          </Typography>
        </CardContent>
        
        <CardActions sx={{ display: 'flex', justifyContent:'end', paddingRight: 2 }}>
          <Typography variant='body2'> { addedTime } min ago </Typography>
        </CardActions>
      </CardActionArea>

    </Card>


  )
}
