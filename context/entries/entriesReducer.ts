import { EntriesState } from '.';
import { Entry } from '../../interfaces';


type EntriesActionType = 
  | { type: '[Entries] Add-Entry', payload: Entry } 
  | { type: '[Entries] Remove-Entry', payload: string } 
  | { type: '[Entries] Entry-Update', payload: Entry } 
  | { type: '[Entries] Refresh-Data', payload: Entry[] } 

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

  switch (action.type) {
    case '[Entries] Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }    
    case '[Entries] Remove-Entry':
      return {
        ...state,
        entries: state.entries.filter(en => en._id != action.payload)
      }    
      case '[Entries] Entry-Update':
        return {
          ...state,
          entries: state.entries.map( entry => {
            if (entry._id == action.payload._id) {
              return action.payload;
            }
            return entry;
          })
        }
      case '[Entries] Refresh-Data':
        return {
          ...state,
          entries: [ ...action.payload ]
        }
     default:
      return state;
  }
}