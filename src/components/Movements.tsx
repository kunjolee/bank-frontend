import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';

import { useState, useEffect } from 'react';
import { IMovement } from '../interfaces';
import { isValidNumber } from '../utils';
import { api } from '../api/axios';
import { useShowMessage } from '../hooks/useShowMessage';
import { CategoryOutlined, ShoppingCartCheckoutOutlined, SavingsOutlined, AddCommentOutlined } from '@mui/icons-material';

const ExpenseIncome = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IMovement>();
  const [loading, setLoading] = useState(false);
  const [selectMovement, setSelectMovement] = useState('EXPENSES');

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [selectAccounts, setSelectAccounts] = useState("0");
  const [selectCategories, setSelectCategories] = useState("0");

  const [selectCurrencies, setSelectCurrencies] = useState(0);

  const showMessage = useShowMessage()

  const onSave = async (form: IMovement) => {
    let amount

    if (Number(form.idCurrency) === 2) {
      amount = Number(form.amount)
    } else if (Number(form.idCurrency) === 3) {
      amount = Number(form.amount) * 7.5;
    } else if (Number(form.idCurrency) === 4){
      amount = Number(form.amount) * 8.08;
    }

    try {
      
      const { data } = await api.put('/accounts/balance',{
        type: form.type ,
        amount,
        idAccount: Number(form.idAccount),
        idCurrency: Number(form.idCurrency)
      });


      if (data.ok) {
        await api.post('/movements', { ...form, idCurrency: Number(form.idCurrency) })
        showMessage('Movement created successfully!', 'success');
        reset();
      } else {
        showMessage(data.msg, 'error');
      }
        

    } catch (error: any) {
        showMessage('Error making a movement. Contact your admin', 'error')

    }finally{
      setLoading( false );
    }

  }

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
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories( data.slice(0,6) );

        setSelectCategories(data[0].id);


      } catch (error) {
        console.log('Error getting categories in Movements',error);
      }
    }

    fetchCategories();

  }, []);

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

          setSelectCurrencies(data[0].id)
        }
        
      } catch (error) {
        console.log('Error getting the users account',error)
      }
    }
    
    fetchCurrencies()
  }, []);


  return (
    <Box p={'3rem 2rem'}>
      {
        accounts.length > 0 ? (
          <Box>
              <h2>Create your movement</h2>
              <form onSubmit={ handleSubmit( onSave ) }>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
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
                        <InputAdornment position="start">
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
                        <InputAdornment position="start">
                          <ShoppingCartCheckoutOutlined />
                        </InputAdornment>
                      ),
                    }}
                    />
                  <TextField
                    fullWidth
                    type='date'
                    { ...register('myDate', {
                      required: 'date required',
                    })}
                    error={ !!errors.myDate }
                    helperText={ errors.myDate?.message }
                    sx={{mb: '1rem'}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label='Movement Type'
                    sx={{mb: '1rem'}}
                    {...register('type', {
                      required: 'required type movement'
                    })}
                    value={selectMovement}
                    onChange={({ target }) => setSelectMovement(target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SavingsOutlined />
                        </InputAdornment>
                      ),
                    }}
                    >
                    <MenuItem value={'EXPENSES'}>Expenses</MenuItem>
                    <MenuItem value={'INCOME'}>Income</MenuItem>
                  </TextField>
                  {
                    categories.length > 0 && (
                      <TextField
                      select
                      fullWidth
                        label="Categories"
                        sx={{mb: '1rem'}}
                        {...register('idCategory', {
                          required: 'category required'
                        })}
                        value={selectCategories}
                        onChange={(e) => {
                          setSelectCategories(e.target.value)
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CategoryOutlined />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {
                          categories.map((el:any) => (
                            <MenuItem key={el.id} value={el.id}>{el.category}</MenuItem>
                          ))
                        }
                      </TextField>
                    )
                  }
                  <TextField
                      select
                      fullWidth
                      label="Accounts "
                      sx={{mb: '1rem'}}
                      {...register('idAccount', {
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
                      value={selectCurrencies}
                      onChange={(e) => {
                        setSelectCurrencies(Number(e.target.value))
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
                </Grid>
              </Grid> 
              
              <Button fullWidth color='success' type='submit' >CREATE MOVEMENT</Button>
              <CircularProgress sx={{ display: loading ? 'flex' : 'none' }}/>
            </form>
          </Box>
        ) : (
          <Box display='flex' p={'3rem 2rem'} justifyContent='center'>
            <Typography variant='h2'>
              You don't have an account yet
            </Typography>
          </Box>
        )
      }
    </Box>
  )
}
export default ExpenseIncome