import { ChangeEvent, useEffect, useState } from 'react';

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Grid, TextField, Box, MenuItem, Button, InputAdornment, Typography } from '@mui/material';

import { api } from '../api/axios';
import { CategoryOutlined } from '@mui/icons-material';
import { HistoryRow } from '../components';

const History = () => {

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
    <Box pb={'5rem'}>
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
              <TableCell>Currency</TableCell>
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
                <TableCell colSpan={7} align={'center'}>Not have any movement in this filter</TableCell>
              </TableRow>
            ) 
           } 
          </TableBody>
        </Table>
      </TableContainer>      
    </Box>
  )
}
export default History
