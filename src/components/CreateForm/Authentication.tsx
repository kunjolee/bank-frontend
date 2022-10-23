import { ChangeEvent, useState } from 'react';

import { TextField } from '@mui/material'

import { CreateUserForm } from '../../interfaces';

interface Props {
  form: CreateUserForm
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Authentication = ({ form, handleChange }: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const { username, email, password } = form;

  return (
    <>
      <TextField
        sx={{ width: '80%'}}
        label='username'
        name='username'
        helperText='Insert your username'
        value={ username }
        error={ isTouched && username.length === 0 }
        margin='normal'
        onChange={ handleChange }
        onBlur = { () => setIsTouched( true ) }
        required
      />
      <TextField
        sx={{ width: '80%'}}
        label='email'
        name='email'
        helperText='Insert your email'
        value={ email }
        error={ isTouched && email.length === 0 }
        margin='normal'
        onChange={ handleChange }
        onBlur = { () => setIsTouched( true ) }
        required
      />
      <TextField
        sx={{ width: '80%'}}
        label='password'
        name='password'
        helperText='Insert your password'
        value={ password }
        error={ isTouched && password.length === 0 }
        type='password'
        onChange={ handleChange }
        onBlur={ () => setIsTouched( true ) }
        required
      />
      
    </>
  )
}