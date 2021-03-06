import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { capitalize, 
    Card, 
    Grid, 
    CardHeader, 
    CardContent, 
    TextField, 
    CardActions, 
    Button, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    IconButton,
   } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { formatDistance, subDays } from 'date-fns';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress','completed'];

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

  const { description, status:estado, createdAt } = entry;

  const fechaCreacion = dateFunctions.getFormatDistanceToNow(entry.createdAt);

  const [inputValue, setinputValue] = useState(description);
  const [status, setStatus] = useState<EntryStatus>(estado);
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const router = useRouter();
  

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setinputValue( event.target.value );
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus( event.target.value as EntryStatus );
  }



  const isNotValid = useMemo(()=> inputValue.length <= 0 && touched, [inputValue, touched])

  const onSave = () => {

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    };

    updateEntry(updatedEntry, true);
    setOpen(true);

    router.push('/');
  }

  const deleteEntryHandler = () => {
    deleteEntry(entry._id, true);

    router.replace('/');
  }


  const handleClose = () => {
    setOpen(false);
  }


  return (
    
    <Layout title={inputValue.substring(0,20) + "..."} >
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid 
          item xs={ 12 } sm={ 8 } md={ 6 }
        >
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Hace: ${ fechaCreacion }`}
            >
            </CardHeader>
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='Nueva entrada'
                label='Nueva entrada'
                multiline
                autoFocus
                value={ inputValue }
                onBlur={ () => setTouched(true) }
                onChange={ onInputValueChanged }
                helperText={ isNotValid && 'Ingrese un valor' }
                error={ isNotValid }
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup
                  value= {status}
                  onChange={onStatusChanged}
                  row
                  
                >
                  {
                    validStatus.map(opt => (
                      <FormControlLabel
                        key={ opt }
                        value={ opt }
                        control={<Radio />}
                        label = { capitalize(opt) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            
            </CardContent>
            <CardActions>
              <Button
                startIcon={ <SaveOutlinedIcon /> }
                variant='contained'
                fullWidth
                onClick={ onSave }
                disabled={ inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>

          </Card>

        </Grid>
        
      </Grid>
        
        <IconButton 
          sx={{ 
              position: 'fixed',
              top: '50vh',
              right: 30,
              backgroundColor: 'error.main'
          }}

          onClick={deleteEntryHandler}
        >
          <DeleteOutlinedIcon />
        </IconButton>       
    </Layout>

    

  );
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };


  const entry = await dbEntries.getEntryById(id);

  if(!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}




export default EntryPage;
