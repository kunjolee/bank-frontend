import { ChangeEvent, useEffect, useState } from 'react';

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Grid, TextField, Box, MenuItem, Button, InputAdornment, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { api } from '../api/axios';
import { CategoryOutlined } from '@mui/icons-material';
import { HistoryRow } from '../components';

const History = () => {
  // TODO: por default va a mostrar todos los movimientos por cada cuenta, de un usuario
  // El filtrar por cuenta significa que solo va a mostrar los movimientos de una cuenta
  // Cuando le de filtrar por categoria va a bloquear account select y date select. y si le doy filtrar por date va a bloquear account select y cateory select y asi lo mismo con todas. para dar a entender que solo estoy filtrando por 1 tipo de select
  // Hacer paginacion
  

  // TODO2: Obtener accounts by user
  // TODO3: Obtener categories 


  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [idAccount, setIdAccount] = useState("0");
  const [idCategory, setIdCategory] = useState("0");

  const [myDate, setMyDate] = useState('');

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const { data } = await api.get(`/movements?idAccount=${idAccount}`)
        
        setHistory(data)
        
      } catch (error) {
        console.log('Error loading history by accounts',error)
      }
      
    }

    apiFetch()
  }, [idAccount]);

  
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data } = await api.get('/accounts');
        setAccounts( data );
        if(data.length > 0){
          
          setIdAccount(data[0].id)
        }
        
      } catch (error) {
        console.log('Error getting the users accounts in history',error)
      }
    }
    
    fetchAccounts();
    
  }, []);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories( data );
        
        setIdCategory(data[0].id);
        
        
      } catch (error) {
        console.log('Error getting categories in History',error);
      }
    }
    
    fetchCategories();
    
  }, [])

  const handleChangeCategory = async (e: ChangeEvent<HTMLInputElement>) => {
    try {

      setIdCategory(e.target.value);

      const { data } = await api.get(`/movements?idAccount=${idAccount}&idCategory=${e.target.value}`);
      
      setHistory(data);

    } catch (error) {
      console.log('Error loading history by categories',error)
    }
  }

  const handleChangeDate = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      setMyDate(target.value)
      const { data } = await api.get(`/movements?idAccount=${idAccount}&myDate='${target.value}'`)
      setHistory(data)
      
    } catch (error) {
      console.log('Error loading history by categories',error)
    }
  }
  
  return (
    <>
      <h2>History</h2>
      <Grid container spacing={3} mb='2rem'>
        <Grid item xs={12} md={6}>
        </Grid>
        <Grid item xs={12} md={6}>

          <Box 
            display='flex'
            alignItems='center'
            gap={2}
          >
            {
              accounts.length > 0 && (
                <TextField
                  sx={{ width: '200px'}}
                  select
                  label="Accounts "
                  value={idAccount}
                  onChange={(e) => {
                    setIdAccount(e.target.value)
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
            {
              categories.length > 0 && (
                <TextField
                sx={{ width: '200px'}}
                select
                  label="Categories"
                  value={idCategory}
                  onChange={handleChangeCategory}
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
              sx={{ width: '200px'}}
              type='date'
              onChange={ handleChangeDate }
              value={ myDate }
              label='Date'
            />
          </Box>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Movement</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {
            history.length > 0 ? (
              history.map((el: any) => (
                <HistoryRow key={ el.id } history={ el } />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align={'center'}>Not have any movement in that filter</TableCell>
              </TableRow>
            ) 
           } 
          </TableBody>
        </Table>
      </TableContainer>      
    </>
  )
}
export default History
