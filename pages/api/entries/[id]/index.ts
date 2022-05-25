import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry } from '../../../../models';
import { IEntry } from '../../../../models';

type Data = | { message: string }
            | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;

  console.log('id ', id);

  if ( !mongoose.isValidObjectId(id) ) {
    return res.status(400).json({ message: 'El id no es válido ' + id });
  }


  switch( req.method ) {
    case 'PUT' : 
      return updateEntry(req, res);
    case 'DELETE' : 
      return removeEntry(req, res);
    case 'GET' : 
      return getEntry(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed '});
  }
}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  
  const { id } = req.query;
  
  await db.connect();

  const entryToUpdate = await Entry.findById( id );
    

  if ( !entryToUpdate ) {
    await db.disconnect();
    
    return res.status(400).json({ message: 'No hay entrada con el ID: ' + id });
  }
  
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,    
  } = req.body;
  
  try{
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
    await db.disconnect();
    res.status(200).json( updatedEntry! );
    
  } catch(error: any) {
    
    await db.disconnect();
    res.status(400).json( { message: error.errors.status.message });
  }


}

const removeEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  const { id } = req.query;

  if(!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'No hay entrada con el ID: ' + id });
  }


  await db.connect();

  var resp = await Entry.findByIdAndDelete(id);

  console.log(resp);

  await db.disconnect();

  return res.status(200).json({ message: 'Entry deleted correctly '});
  
}


const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  const { id } = req.query;

  await db.connect();
  const dbEntry = await Entry.findById(id);
  await db.disconnect();

  if( !dbEntry ) {
    res.status(404).json({ message: 'Entry not found' });
  }

  res.status(200).json( dbEntry! );

}