import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from '.';


export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pending: Proident officia cillum officia pariatur reprehenderit excepteur mollit excepteur qui labore eiusmod.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'In-Progress: Voluptate amet pariatur labore consectetur voluptate aute consectetur non.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'Completed: Aliquip consectetur laborum incididunt culpa.',
      status: 'completed',
      createdAt: Date.now() - 100000,
    },
  ],
}

export const EntriesProvider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);


  return (
    <EntriesContext.Provider value={{ 
      ...state
  }}>
      { children }
    </EntriesContext.Provider>
  )
}