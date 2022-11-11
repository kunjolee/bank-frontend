import { Grid } from '@mui/material';
import { useAppDispatch } from '../store/hooks';

import { Accounts, Movements } from '../components';
const Home = () => {

  const dispatch = useAppDispatch();

  return (
    <Grid container height='80vh'>
        <Grid  item xs={12} sm={12} md={6}>
          <Accounts/>
        </Grid>
        <Grid  item xs={12} sm={12} md={6}>
          <Movements/>
        </Grid>
    </Grid>
  )
}
export default Home;