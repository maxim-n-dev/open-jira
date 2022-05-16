import { FC, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

  const addNewEntry = ( description: string ) => {

    const newEntry: Entry = {
      _id: uuidv4(),
      createdAt: Date.now(),
      status: 'pending',
      description
    }

    dispatch({
      type: '[Entries] Add-Entry',
      payload: newEntry
    });
  }

  const updateEntry = ( entry: Entry ) => {
    dispatch({
      type: '[Entries] Entry-Update',
      payload: entry
    })
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
      updateEntry
  }}>
      { children }
    </EntriesContext.Provider>
  )
}