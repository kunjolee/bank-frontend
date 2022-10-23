import { ChangeEvent, useState } from 'react';

import { TextField } from '@mui/material'
import { CreateUserForm } from '../../interfaces';

interface Props {
  form: CreateUserForm
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Information = ({ form, handleChange }: Props) => {

    const [isTouched, setIsTouched] = useState(false);
    const { name, phone, birthdate } = form;

    return (
      <>
        <TextField
          sx={{ width: '80%'}}
          label='name'
          name='name'
          helperText='Insert your name'
          value={ name }
          error={ isTouched && name.length === 0 }
          margin='normal'
          onChange={ handleChange }
          onBlur = { () => setIsTouched( true ) }
          required
        />
        <TextField
          sx={{ width: '80%'}}
          label='phone number'
          name='phone'
          helperText='Insert your phone number'
          value={ phone }
          error={ isTouched && phone.length === 0 }
          margin='normal'
          onChange={ handleChange }
          onBlur = { () => setIsTouched( true ) }
          required
        />
        <TextField
          sx={{ width: '80%'}}
          name='birthdate'
          helperText='Insert your birthdate'
          value={ birthdate }
          error={ isTouched && birthdate.length === 0 }
          type='date'
          onChange={ handleChange }
          onBlur={ () => setIsTouched( true ) }
          required
        />
      </>
  )
}