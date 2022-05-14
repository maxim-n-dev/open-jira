import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

import { Layout } from '../components/layouts';
import { EntryList } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      
      <Grid container spacing={ 2 }>
        
        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc( 100vh - 180px )' }}>
            <CardHeader title='Pending'/>
              { /* Agregar una nueva entrada */ }
              {/* Listado de entradas */}
              <EntryList status='pending' />
          </Card>
        </Grid>
        
        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc( 100vh - 180px )' }}>
            <CardHeader title='In progress'/>
              { /* Agregar una nueva entrada */ }
              {/* Listado de entradas */}
              <EntryList status='in-progress' />
          </Card>
        </Grid>
        
        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc( 100vh - 180px )' }}>
            <CardHeader title='Completed'/>
              { /* Agregar una nueva entrada */ }
              {/* Listado de entradas */}
              <EntryList status='completed' />
          </Card>
        </Grid>


      </Grid>


    </Layout>
  )
}

export default HomePage;
