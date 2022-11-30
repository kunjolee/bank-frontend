import { AddCommentOutlined, ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
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
  idCurrency: number
}

const Transfers = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ITransfer>();

  const [accounts, setAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [selectAccounts, setSelectAccounts] = useState('0');
  const [selectCurrency, setSelectCurrency] = useState(0);

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

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await api.get('/currency');
        setCurrencies( data );
        if(data.length > 0){

         
          setSelectCurrency(data[0].id)
        }
        
      } catch (error) {
        console.log('Error getting the users account',error)
      }
    }

    fetchCurrencies();

  }, []);

  const onSave = async (form: ITransfer) => {
    let dd = String(new Date().getDate()).padStart(2, '0');
    let mm = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = new Date().getFullYear();

    const myDate = `${yyyy}-${mm}-${dd}`;
    
    let amount

    if (Number(form.idCurrency) === 1) {
      amount = Number(form.amount);

    }else if (Number(form.idCurrency) === 2) {
      amount = Number(form.amount) * 7.5;

    }else if (Number(form.idCurrency) === 3) {
      amount = Number(form.amount) * 8.08;
    }

    try {
      
      const { data: dataOrigin } = await api.put('/accounts/balance',{
        type: 'EXPENSES' ,
        amount,
        idAccount: Number(form.idAccountOrigin),
        typeUpdate: 'transferExpense',
      });

      if (dataOrigin.ok) {
        const { data: dataDestination } = await api.put(`/accounts/balance/${form.acountNumber}`,{
          amount,
        });
        
        if (dataDestination.ok) {

          const payloadDestination = {  
            description: form.description,
            amount,
            type: 'INCOME',
            myDate,
            idCategory: 8,
            idAccount: form.idAccountOrigin,
            idCurrency: Number(form.idCurrency) 
          }
          
          const payloadOrigin = {
            description: form.description,
            amount,
            type: 'EXPENSES',
            myDate,
            idCategory: 8,
            idAccount: form.idAccountOrigin,
            idCurrency: Number(form.idCurrency) 
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

  return accounts.length > 0 ? (
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
              validate: isValidNumber
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
        {
          currencies.length > 0 && (
            <TextField
              select
              fullWidth
              label='Currencies'
              sx={{mb: '1rem'}}
              {...register('idCurrency', {
                required: 'Currency required'
              })}
              value={selectCurrency}
              onChange={(e) => {
                setSelectCurrency(Number(e.target.value))
              }}
            >
              {
                currencies.map((el:any) => (
                  <MenuItem key={el.id} value={el.id}>{el.currencyType}</MenuItem>
                ))
              }
          </TextField>
          )
        }
      <Button fullWidth color='success' type='submit' >CREATE MOVEMENT</Button> 
      </form>
    </Box>
  ):(
    <Box display='flex' p={'3rem 2rem'} justifyContent='center'>
        <Typography variant='h2'>
          You don't have an account yet
        </Typography>
      </Box>
  )
}
export default Transfers