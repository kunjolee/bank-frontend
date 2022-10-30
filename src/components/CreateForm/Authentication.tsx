import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextField } from '@mui/material'

import { CreateUserForm } from '../../interfaces';

interface Props {
  form: CreateUserForm
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type FormData = {
  name:     string
  email:    string,
  password: string,
};


export const Authentication = ({ form, handleChange }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isTouched, setIsTouched] = useState(false);
  const { username, email, pass } = form;

  return (
    <>
      <TextField
        label='Name'
        { ...register('name', {
          required: 'Name required',
          minLength: { value: 2, message: 'Name should be at least 2 characters'}
        })}
        error={ !!errors.name }
        helperText={ errors.name?.message }
        sx={{mb: '1rem', width: '80%'}}
      />
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
        label='pass'
        name='pass'
        helperText='Insert your pass'
        value={ pass }
        error={ isTouched && pass.length === 0 }
        type='pass'
        onChange={ handleChange }
        onBlur={ () => setIsTouched( true ) }
        required
      />
      
    </>
  )
}