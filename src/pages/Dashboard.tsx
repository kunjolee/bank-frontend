import { Grid } from '@mui/material'
import { Movements, Summary } from '../components/'
import Transfers from './Transfers'

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
          <Summary />
      </Grid>
      <Grid item xs={12} md={6}>
        <Movements />
      </Grid>
      <Grid item xs={12} md={6}>
        <Transfers />
      </Grid>
    </Grid>
  )
}
export default Dashboard