import { useNavigate } from 'react-router-dom';

import { CopyrightOutlined, ForumOutlined, GroupsOutlined, HomeOutlined, LogoutOutlined, PersonOutlined, TaskAltOutlined, AccountBalance } from '@mui/icons-material';
import { Box, Drawer, List, ListItemIcon, CardMedia, Typography, ListItem, ListItemText, ListSubheader, Divider } from '@mui/material';

import Cookies from 'js-cookie';

import { useAppDispatch, useAppSelector } from '../../store';
import { setOpenMenu } from '../../store/slices/ui';
import { setLogout } from '../../store/slices/auth';

const Sidebar = () => {

  const { isOpenMenu } = useAppSelector(( state ) => state.isOpenMenu );
  const authGlobal = useAppSelector(( state ) => state.auth.auth );
  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const onLogOut = () => {
    dispatch(setLogout({
      ok: false,
      token: '',
      msg: 'Logged out successfully'
    }));

    dispatch(setOpenMenu(false));

    Cookies.remove('token');
  }

  return (
    <Drawer
            anchor='left'
            open={ isOpenMenu }
            ModalProps={{
                keepMounted: true, 
            }}
            onClose={ () => dispatch( setOpenMenu( false ) )}
        >
            <Box height='100%' width={250} >
                <List sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Box display='flex' alignItems='center' my={2}>                    
                        <Box display='flex' alignItems='center' >
                        <AccountBalance color='primary' sx={{ fontSize: 100}} />
                        <Box ml={2}>
                            <Typography color='primary' variant='h1' sx={{ fontSize: 38}}>DSU</Typography>
                            <Typography color='primary' variant='subtitle2'>W2-BANK</Typography>
                        </Box>
                    </Box>
                    </Box>
                    <ListItem button onClick={ () => {
                      navigate('/')
                      dispatch( setOpenMenu( false ) )
                    }}
                    >
                      <ListItemIcon>
                          <HomeOutlined />
                      </ListItemIcon>                    
                      <ListItemText>Home</ListItemText>
                    </ListItem>

                    <ListItem button onClick={() => {
                      navigate('/accounts')
                      dispatch( setOpenMenu( false ) )
                    }}>
                      <ListItemIcon>
                          <TaskAltOutlined />
                      </ListItemIcon>                    
                      <ListItemText>My Accounts</ListItemText>
                    </ListItem>

                    <ListItem button onClick={() => {
                      navigate('/expense-income')
                      dispatch( setOpenMenu( false ) )
                    } }>
                        <ListItemIcon>
                            <ForumOutlined />
                        </ListItemIcon>                    
                        <ListItemText>Expenses - Income</ListItemText>
                    </ListItem>

                    <ListItem button onClick={ onLogOut }>
                        <ListItemIcon>
                            <LogoutOutlined />
                        </ListItemIcon>                    
                        <ListItemText>LogOut</ListItemText>
                    </ListItem>

                    <ListSubheader>USER</ListSubheader>
                    <Divider/>
                    
                    <ListItem button>
                        <ListItemIcon>
                            <GroupsOutlined />
                        </ListItemIcon>                    
                        <ListItemText>DSU Bank</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', flexDirection: 'column' }} button>
                        <ListItemIcon >
                            <PersonOutlined
                                sx={{ height: 100, width: 100 }}
                            />
                        </ListItemIcon> 
                        <ListItemText>{authGlobal?.user?.name || 'no name available'}</ListItemText>
                    </ListItem>
                    <Divider/>
                    <Box flex={ 1 }/>
                    <Box>
                        <ListItem>
                            <ListItemIcon>
                                <CopyrightOutlined />
                            </ListItemIcon>        
                            <Typography variant='caption'>
                                Alrights reserved by &copy;DSU BANK
                            </Typography>            
                        </ListItem>
                    </Box>
                </List>
            </Box>
    </Drawer>
  )
}
export default Sidebar