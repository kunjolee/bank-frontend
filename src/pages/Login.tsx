import { Grid, Card, CardContent, Typography,CardActions, Button, Box } from '@mui/material';

import login_image from "../assets/login_image.svg";
import bank_image from "../assets/bank-image.jpg";

import './Login.css'

const Login = () => {


  return (
    <Grid container width='90%' height='80vh' margin='6rem auto' >
      
      <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
        <Card 
          sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly' 
            }} 
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h1' marginBottom={5} >Welcome back!</Typography>
              <img src={login_image} alt='login-img' />
            </CardContent>
              <CardActions >
                <Box 
                    display='flex' 
                    flexDirection='column'
                    padding={3} 
                    margin='0 auto 2rem'
                  >
                    <Button sx={{ width: '200px' }} variant='contained'>Login</Button>
                    <Button variant='outlined'>Sign In</Button>
                </Box>
              </CardActions>
        </Card>
      </Grid>
      
      <Grid item xs={ 0 } md={ 6 } lg={ 8} position='relative' className='responsive-login-image'>
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: '#222',
          opacity: '0.5',
        }}
        >
        </Box>
        <img 
          src={ bank_image }
          alt='bank-image'
          height='100%'
        />
      </Grid>
    </Grid>
  )
}

export default Login;