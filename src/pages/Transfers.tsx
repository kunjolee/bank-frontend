import { AddCommentOutlined, ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import { Box, Button, InputAdornment, MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isValidNumber } from '../utils';
import { useShowMessage } from '../hooks/';
import { api } from '../api/axios';

export interface ITransfer {
  description: string;
  amount: number,
  idAccountOrigin: number,
  acountNumber: string,
  currency: 'quetzal' | 'dollar' | 'euro'
}

const Transfers = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ITransfer>();

  const [accounts, setAccounts] = useState([]);
  const [selectAccounts, setSelectAccounts] = useState('0');
  const [selectCurrency, setSelectCurrency] = useState('quetzal');

  const showMessage = useShowMessage()

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data } = await api.get('/accounts');
        setAccounts( data );
        if(data.length > 0){

          setSelectAccounts(data[0].id)
        }
        
      } catch (error) {
        console.log('Error getting the users account',error)
      }
    }

    fetchAccounts();

  }, []);

  const onSave = async (form: ITransfer) => {

    let dd = String(new Date().getDate()).padStart(2, '0');
    let mm = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = new Date().getFullYear();

    const myDate = `${yyyy}-${mm}-${dd}`;
    
    let amount

    if (form.currency === 'dollar') {
      amount = Number(form.amount) * 7.5;
    }else if (form.currency === 'euro') {
      amount = Number(form.amount) * 8.08;

    }else if (form.currency === 'quetzal') {
      amount = Number(form.amount)
    }
    

    try {
      
      const { data: dataOrigin } = await api.put('/accounts/balance',{
        type: 'EXPENSES' ,
        amount,
        idAccount: Number(form.idAccountOrigin),
        typeUpdate: 'transferExpense'
      });

      if (dataOrigin.ok) {
        const { data: dataDestination } = await api.put(`/accounts/balance/${form.acountNumber}`,{
          amount,
        });
        
        if (dataDestination.ok) {

          const payloadDestination = {  
            description: form.description,
            amount: form.amount,
            type: 'INCOME',
            myDate,
            idCategory: 8,
            idAccount: form.idAccountOrigin
          }
          
          const payloadOrigin = {
            description: form.description,
            amount: form.amount,
            type: 'EXPENSES',
            myDate,
            idCategory: 8,
            idAccount: form.idAccountOrigin
          }

          await api.post('/movements', payloadOrigin)
          await api.post(`/movements/${form.acountNumber}`, payloadDestination)
          showMessage('Transfer created successfully!', 'success');
          reset();
        } else {
          showMessage(dataDestination.msg, 'error');
        }

      } else {
        showMessage(dataOrigin.msg, 'error');
      }


    } catch (error) {
      
      showMessage('Error making a transfer', 'error')
    }

  }

  return (
    <Box p={'3rem 2rem'}>
      <h2>Transfers</h2>
      <form onSubmit={handleSubmit(onSave)}>
        <TextField
          fullWidth
          label='Description'
          { ...register('description', {
            required: 'description required',
            minLength: { value: 2, message: 'description should be at least 2 characters'},
          })}
          error={ !!errors.description }
          helperText={ errors.description?.message }
          sx={{mb: '1rem'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AddCommentOutlined />
              </InputAdornment>
            ),
          }}
          />
        <TextField
          fullWidth
          label='amount: '
          type='number'
          {
            ...register('amount', {
              required: 'amount required',
              validate:(text) => isValidNumber(String(text)) 
            })
          }
          error={ !!errors.amount }
          helperText={ errors.amount?.message }
          sx={{mb: '1rem'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <ShoppingCartCheckoutOutlined />
              </InputAdornment>
            ),
          }}
          />
          <TextField
            fullWidth
            label='Account Destination'
            { ...register('acountNumber', {
              required: 'Account Destination required',
              minLength: { value: 9, message: 'description should be at least 9 characters'},
              maxLength: {
                value: 10,
                message: 'maximum of 10 characters'
              },
            })}
            error={ !!errors.acountNumber }
            helperText={ errors.acountNumber?.message }
            sx={{mb: '1rem'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AddCommentOutlined />
                </InputAdornment>
              ),
            }}
          /> 
          {
            accounts.length > 0 && (
            <TextField
              select
              fullWidth
              label='Your accounts'
              sx={{mb: '1rem'}}
              {...register('idAccountOrigin', {
                required: 'account required'
              })}
              value={selectAccounts}
              onChange={(e) => {
                setSelectAccounts(e.target.value)
              }}
            >
              {
                accounts.map((el:any) => (
                  <MenuItem key={el.id} value={el.id}>{el.accountNumber}</MenuItem>
                ))
              }
          </TextField>
          )
        }
        <TextField
          select
          fullWidth
          label='Type of currency'
          sx={{mb: '1rem'}}
          {...register('currency', {
            required: 'currency required'
          })}
          value={selectCurrency}
          onChange={(e) => {
            setSelectCurrency(e.target.value)
          }}
            >
              <MenuItem value={'quetzal'}>Quetzal</MenuItem>
              <MenuItem value={'dollar'}>Dollar</MenuItem>
              <MenuItem value={'euro'}>Euro</MenuItem>
          </TextField>
        <Button fullWidth color='success' type='submit' >CREATE MOVEMENT</Button> 
      </form>
    </Box>
  )
}
export default Transfers