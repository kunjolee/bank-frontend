import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { CreateUserForm } from '../../interfaces';
import { Button, TextField } from '@mui/material';

interface Props {
  form: CreateUserForm
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setControlSteps: Dispatch<SetStateAction<number>>;
}

export const Additional = ({ form, handleChange, setControlSteps }: Props ) => {

  const [isTouched, setIsTouched] = useState(false);
  const { address } = form;
  

  return (
    <>
      <TextField
        sx={{ width: '80%'}}
        label='address'
        name='address'
        helperText='Insert your address'
        value={ address }
        error={ isTouched && address.length === 0 }
        margin='normal'
        onChange={ handleChange }
        onBlur = { () => setIsTouched( true ) }
        required
      />
    </>
  )
}