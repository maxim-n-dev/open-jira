import { FC, useEffect, useReducer } from 'react';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from '.';
import { entriesApi } from '../../apis';


export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async ( description: string ) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description });

    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   createdAt: Date.now(),
    //   status: 'pending',
    //   description
    // }

    dispatch({
      type: '[Entries] Add-Entry',
      payload: data
    });
  }

  const updateEntry = async ( entry: Entry, showSnackbar = false ) => {

    const { data } = await entriesApi.put<Entry>('/entries/' + entry._id,  entry );

    if(showSnackbar){
      enqueueSnackbar('Entrada actualizada',{
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          horizontal: 'right',
          vertical:'top'
        }
      }) 
    }

    dispatch({
      type: '[Entries] Entry-Update',
      payload: data
    })
  }
  
  const deleteEntry = async (id: string, showSnackbar: boolean) => {
    const respo = await entriesApi.delete('/entries/'+ id);
    
    if (respo.status === 200) {
      dispatch({ type: '[Entries] Remove-Entry', payload: id });  
    }

    if(showSnackbar) {
      enqueueSnackbar('Entrada eliminada correctamente', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    }
  }


  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entries] Refresh-Data', payload: data });
    console.log(data);
  }

  useEffect(()=> {
    refreshEntries();
  }, []);


  return (
    <EntriesContext.Provider value={{ 
      ...state,

      //Methods
      addNewEntry,
      updateEntry,
      deleteEntry
  }}>
      { children }
    </EntriesContext.Provider>
  )
}