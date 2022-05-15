import { EntriesState } from '.';
import { Entry } from '../../interfaces';


type EntriesActionType = 
  | { type: '[Entries] Add-Entry', payload: Entry } 
  | { type: '[Entries] ENTRY-UPDATE', payload: Entry } 

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

  switch (action.type) {
    case '[Entries] Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }    
      case '[Entries] ENTRY-UPDATE':
        return {
          ...state,
          entries: state.entries.map( entry => {
            if (entry._id == action.payload._id) {
              return action.payload;
            }
            return entry;
          })
        }
     default:
      return state;
  }
}