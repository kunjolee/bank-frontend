import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';

import { useState, useEffect } from 'react';
import { IMovement } from '../interfaces';
import { isValidNumber } from '../utils';
import { api } from '../api/axios';
import { useAppSelector } from '../store';
import { useShowMessage } from '../hooks/useShowMessage';
import { CategoryOutlined, ShoppingCartCheckoutOutlined, SavingsOutlined, AddCommentOutlined } from '@mui/icons-material';

const ExpenseIncome = () => {

  const { auth } = useAppSelector(state => state.auth)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IMovement>();
  const [loading, setLoading] = useState(false);
  const [selectMovement, setSelectMovement] = useState('EXPENSES');

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectAccounts, setSelectAccounts] = useState("0");
  const [selectCategories, setSelectCategories] = useState("0");


  const showMessage = useShowMessage()

  const onSave = async (form: IMovement) => {
    setLoading(true)

    try {


      const { data } = await api.put('/accounts/balance',{
        type: form.type ,
        amount: Number(form.amount),
        idAccount: Number(form.idAccount)
      });

      if (data.ok) {
        await api.post('/movements', { ...form })
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
        setCategories( data );

        setSelectCategories(data[0].id);


      } catch (error) {
        console.log('Error getting categories in Movements',error);
      }
    }

    fetchCategories();

  }, [])

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