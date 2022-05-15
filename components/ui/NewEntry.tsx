import { ChangeEvent, useState, useContext, FC } from 'react';
import { Button, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from "@mui/system";
import { EntriesContext } from "../../context/entries";
import { UIContext } from '../../context/ui';

export const NewEntry: FC = () => {

  const { addNewEntry } = useContext( EntriesContext );
  const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);


  const onTextFieldChanges = ( ev: ChangeEvent<HTMLInputElement> ) => {
    setInputValue(ev.target.value);
  }
  const onCancelInputTextEntering = () => {
     setIsAddingEntry(false);
     setTouched(false);
  }

  const resetForm = () => {
    setIsAddingEntry(false);
    setInputValue('');
    setTouched(false);
  }

  const onSave = () => {
    if (inputValue.length === 0) return;

    console.log(inputValue);
    

    addNewEntry(inputValue);

    resetForm();

  }


  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

        {
          !isAddingEntry 
          ? <Button
               startIcon={<AddCircleIcon />}
               fullWidth
               variant='outlined'
               color='success'
               onClick={() => setIsAddingEntry(true)}
             >
              Add Task
            </Button>
          
          : <>
            <TextField 
              fullWidth
              sx={{ marginBottom: 1 }}
              placeholder='Nueva entrada'
              multiline
              autoFocus
              label='Nueva entrada'
              helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}  
              error= { inputValue.length <= 0 && touched }
              onBlur = { () => setTouched( true ) }
              value={ inputValue }
              onChange={ onTextFieldChanges }
            />
        
          
    
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                color='warning'
                onClick={ onCancelInputTextEntering }
              >
                Cancelar
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon= { <SaveIcon />}
                onClick={ onSave }
              >
                Guardar
              </Button>
            </Box> 
          </>

        }
        


      
        


    </Box>
  )
}
