import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Step, Stepper, useTheme, Button, IconButton, Typography, StepLabel } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Additional, Authentication, Information } from '../components/CreateForm';
import { useForm, useShowMessage } from '../hooks';
import { CreateUserForm } from '../interfaces/User';
import { useAppDispatch } from '../store';
import { createUserThunk } from '../store/slices/auth';


const STEPS = ['AUTHENTICATION','USER INFORMATION', 'ADDITIONAL'];

const CreateUser = () => {

  const theme = useTheme();
  const [controlSteps, setControlSteps] = useState(2);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const showMessage = useShowMessage();

  const { form, handleChange } = useForm<CreateUserForm>({
    username: '',
    email: '',
    pass: '',
    name: '',
    phone: '',
    birthdate: '',
    address: ''
  });

// auth: email , pass, username
// user information: name, phone, birthdate
// additional: address

  const nextStep = () => {

    if ( controlSteps === 0) {
      if (!form.username || !form.email || !form.pass) return;
       

    } else if ( controlSteps === 1) {
      if (!form.name || !form.phone || !form.birthdate) return;
      
    } else if ( controlSteps === 2) {
      if (!form.address) return;

    } 

    setControlSteps(prev => prev + 1);
  }
  
  const onSave = () => {
    setControlSteps(prev => prev + 1);

    dispatch(createUserThunk({
      form,
      navigate,
      showMessage
    }));

    setTimeout( () => {
      navigate('/')
    }, 3500)
  }

  return (
    <>
      <Box 
        sx={{ backgroundColor: theme.palette.primary.main}} 
        width='100%'
        height={100}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          width='50%'
          sx={{ margin: '0 auto' }}
        >
          <Box display='flex' alignItems='center' >
            <AccountBalanceIcon color='secondary' sx={{ fontSize: 100}} />
            <Box ml={2}>
              <Typography color='secondary' variant='h1' sx={{ fontSize: 38}}>DSU</Typography>
              <Typography color='secondary' variant='subtitle2'>W2-BANK</Typography>
            </Box>
          </Box>
          <IconButton 
            size='small'
            color='secondary'
            sx={{ height: 50}}
            onClick={ () => navigate('/') }
          >
              Salir
              <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        width='50%' 
        margin='6rem auto'
      > 
        <Typography variant='subtitle1'>
          Let's create your online bank user
        </Typography>
        <Stepper sx={{ my: '2rem'}} activeStep={controlSteps} alternativeLabel >
            {
              STEPS.map(step => (
                <Step key={ step }>
                  <StepLabel>
                    { step }
                  </StepLabel>
                </Step>
              ))
            }
        </Stepper>

        <Box m='4rem 0 2rem' textAlign='center'>
          {
            controlSteps === 0
            ? <Authentication form={form} handleChange={handleChange} />
            : controlSteps === 1 
            ? <Information form={form} handleChange={handleChange} />
            : controlSteps === 2
              ? <Additional form={form} handleChange={handleChange} setControlSteps={setControlSteps}/>
              : (
                  <Typography m='10rem' variant='h2' component='h2' fontSize={60}>
                     Welcome <span style={{ color: '#42ba96'}}>{form.username}!</span>
                  </Typography>
                )
          }
        </Box>
        {
          controlSteps > 0 && controlSteps < 3 && <Button onClick={() => setControlSteps((prev) => prev - 1)}>Back</Button>
        }
        {
          controlSteps < 2 && <Button onClick={nextStep}>Next</Button>
        }
        {
          controlSteps === 2 && <Button onClick={onSave} color='success'>Create User</Button>
        }
      </Box>
    </>
  )
}

export default CreateUser




