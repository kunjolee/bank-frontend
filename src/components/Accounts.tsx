import { useState } from 'react';

import { TextField, Button, CircularProgress, MenuItem, Box, InputAdornment  } from '@mui/material';
import { AccountBalanceOutlined, AccountBoxOutlined, CurrencyBitcoinOutlined, FingerprintOutlined } from '@mui/icons-material';

import {  useForm } from 'react-hook-form';
import { api } from '../api/axios';
import { useShowMessage } from '../hooks';
import { IAccounts } from '../interfaces/';

import { isValidNumber } from '../utils';

const Accounts = () => {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IAccounts>();
  const [loading, setLoading] = useState(false);


  const [selectDeposit, setSelectDeposit] = useState('RECURRING');

  const showMessage = useShowMessage();

  const onSave = async (form: IAccounts) => {
    setLoading(true)
    
    try {
      await api.post('/accounts', {
        ...form,
        idCurrency: 2
      });
    
      showMessage('Account created successfully!', 'success')
      reset()
      
    } catch (error: any) {
      error.response.data.error.errors.forEach((el:any)=>{
        showMessage(el.message, 'error')
      })
    } finally {
      setLoading(false) 
    }
    
  }



  return (
    <Box p={'3rem 2rem'}>
        <h2>Let's create your account!</h2>
        <form onSubmit={ handleSubmit(onSave) } noValidate>
          <TextField
            fullWidth
            type='number'
            label='Account Number: '
            { ...register('accountNumber', {
              required: 'accountNumber required',
              minLength: { 
                value: 9,
                message: 'accountNumber should be at least 9 characters'
              },
              maxLength: {
                value: 10,
                message: 'maximum of 10 characters'
              },
              validate: isValidNumber
            })}
            error={ !!errors.accountNumber }
            helperText={ errors.accountNumber?.message }
            sx={{mb: '1rem'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountBoxOutlined />
                </InputAdornment>
              ),
            }}
            />
          <TextField
            fullWidth
            label='DPI: '
            type='number'
            {
              ...register('dpi', {
                required: 'dpi required',
                minLength: { 
                  value: 9,
                  message: 'dpi should be at least 9 characters'
                },
                maxLength: {
                  value: 11,
                  message: 'maximum of 11 characters'
                },
                validate: isValidNumber
              })
            }
            error={ !!errors.dpi }
            helperText={ errors.dpi?.message }
            sx={{mb: '1rem'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FingerprintOutlined />
                </InputAdornment>
              ),
            }}
            />
          <TextField
            select
            fullWidth
            label='Deposit Type'
            sx={{mb: '1rem'}}
            {...register('typeDeposit', {
              required: 'required type deposit'
            })}
            value={selectDeposit}
            onChange={({ target }) => setSelectDeposit(target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountBalanceOutlined />
                </InputAdornment>
              ),
            }}
            >
            <MenuItem value={'RECURRING'}>Recurring</MenuItem>
            <MenuItem value={'SAVINGS'}>Savings</MenuItem>
          </TextField>          
          <Button fullWidth color='success' type='submit' >CREATE ACCOUNT</Button>
          <CircularProgress sx={{ display: loading ? 'flex' : 'none' }}/>
        </form>
    </Box>
  )
}
export default Accounts


{/* {
            currencies.length > 0 && (
              <TextField
              select
              fullWidth
              label='Currency'
              sx={{mb: '1rem'}}
              {...register('idCurrency', {
                required: 'required currency'
              })}
              value={String(selectCurrencies)}
              onChange={(e) => setSelectCurrencies(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CurrencyBitcoinOutlined />
                  </InputAdornment>
                ),
              }}
              >
                {
                  currencies.map((el:any) => <MenuItem key={el.value} value={el.id}>{el.currencyType}</MenuItem>)
                }
              </TextField>
            )
          } */}