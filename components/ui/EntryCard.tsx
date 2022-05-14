import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { FC } from "react"
import { Entry } from "../../interfaces"

interface Props {
  entry: Entry;
}
export const EntryCard : FC<Props> = ({ entry }) => {
  
  const addedTime = new Date(new Date().getTime() - entry.createdAt).getMinutes()

  return (
    
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
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
          <Typography variant='body2'> Added { new Date(entry.createdAt).getMinutes() } min ago </Typography>
        </CardActions>
      </CardActionArea>

    </Card>


  )
}
