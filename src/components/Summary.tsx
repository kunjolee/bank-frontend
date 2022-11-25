import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Box, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Card } from '@mui/material';
import { api } from '../api/axios';

let initialAccountBalances: any
let initialTotalBalance: any

const Summary = () => {
  const [currencyType, setCurrencyType] = useState('quetzal');

  const [totalAccounts, setTotalAccounts] = useState(0);
  const [currencySign, setCurrencySign] = useState('Q');
  const [accounts, setAccounts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
    
      const { data } = await api.get('/accounts')
      setAccounts(data)
    }

    fetchData()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    
      const { data } = await api.get('/accounts/total')
      setTotalAccounts( data[0].sum )

      initialTotalBalance = data[0].sum
    }

    fetchData()
  }, []);


  useEffect(() => {
    const fetchData = async () => {
    
      const { data } = await api.get('/accounts/info')
      setAccounts(data)
      initialAccountBalances = data
    }

    fetchData()
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{

    if (e.target.value === 'quetzal') {
      setCurrencySign('Q')
      setAccounts(initialAccountBalances)
      setTotalAccounts(initialTotalBalance)
    } else if (e.target.value === 'dollar') {
      setCurrencySign('$')

      if (accounts.length > 0 ) {
        
        const newAccounts = accounts.map((el:any) => {
          const data = initialAccountBalances.find((initial:any) => initial.id === el.id )

          return {
            ...el,
            balance: data.balance * 0.13
          }

        })

        setAccounts(newAccounts)
        setTotalAccounts(initialTotalBalance * 0.13)
      }
    } else if (e.target.value === 'euro') {
      setCurrencySign('€')
      if (accounts.length > 0 ) {
        const newAccounts = accounts.map((el:any)=>{
          
          const data = initialAccountBalances.find((initial:any) => initial.id === el.id )
  
          return {
            ...el,
            balance: data.balance * 0.12
          }
        })
  
          setAccounts(newAccounts)
          setTotalAccounts(initialTotalBalance * 0.12)
      }
    }

    setCurrencyType(e.target.value)
  }

  
  return (
    <Box 
      m={'0 auto'}
      p='2rem'
      >
      <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
        <Typography variant='h2' sx={{ fontWeight: '800' }}>
          Summary
        </Typography>
        <TextField
          select
          value={currencyType}
          onChange={ handleChange}
        >
          <MenuItem
            value={'quetzal'}
            >
            Total In Quetzals
          </MenuItem>
          <MenuItem
            value={'dollar'}
            >
            Total In Dollars
          </MenuItem>
          <MenuItem
            value={'euro'}
          >
            Total In Euros
          </MenuItem>
        </TextField>
      </Box>
      <Box bgcolor='#fff' mt='1rem'>
        <TableContainer>
          <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Description
                  </TableCell>
                  <TableCell>
                    Account Number
                  </TableCell>
                  <TableCell>
                    Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                accounts.length > 0 && (
                  accounts.map( (account:any) => (
                    <TableRow key={ account.id }>
                      <TableCell>
                        Bank account total 
                      </TableCell>
                      <TableCell>
                        { account.accountNumber }
                      </TableCell>
                      <TableCell>
                        {currencySign}{ account.balance }
                      </TableCell>
                    </TableRow>
                  ))                  
                )
              }
              </TableBody>
          </Table>
        </TableContainer>
      </Box>  
      <Card 
        sx={{
          width:'80%',margin:'4rem auto 0', padding:'1rem', display:'flex',justifyContent:'space-between', flexWrap: 'wrap'
        }}
      >
        <Typography variant='subtitle1'>Total balance accounts</Typography>
        <Typography variant='subtitle1'>{currencySign}{totalAccounts}</Typography>
      </Card>
    </Box>
  )
}
export default Summary