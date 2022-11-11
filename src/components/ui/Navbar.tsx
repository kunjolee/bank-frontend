import { AppBar, Box, Button, CardMedia, IconButton, Toolbar, Typography } from '@mui/material';

import { MenuOpen } from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useAppDispatch } from '../../store';
import { setOpenMenu } from '../../store/slices/ui';


const Navbar = () => {
    const dispatch = useAppDispatch();

    return (
        <AppBar color='primary' >
            <Toolbar>
                <IconButton sx={{color: 'white'}} onClick={ () => dispatch( setOpenMenu( true ) )}>
                    <MenuOpen/>
                </IconButton>
                <Link to='/'>
                    <Box display='flex' alignItems='center' >
                        <AccountBalanceIcon color='secondary' sx={{ fontSize: 100}} />
                        <Box ml={2}>
                            <Typography color='white' variant='h1' sx={{ fontSize: 38}}>DSU</Typography>
                            <Typography color='white' variant='subtitle2'>W2-BANK</Typography>
                        </Box>
                    </Box>
                </Link>
                <Box flex={1}></Box>
                <Link to='messages'>
                    {/* <Button color=''>Messages</Button> */}
                </Link>

            </Toolbar>
        </AppBar>
    )
}
export default Navbar