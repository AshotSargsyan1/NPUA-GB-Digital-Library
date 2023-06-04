import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Toolbar, AppBar, TextField } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/123.jfif'
import classes from './HeaderComponent.module.css'
import { getSearchedBooksThunk } from '../Features/booksSlice'
import { useState } from 'react';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { deepPurple } from '@mui/material/colors';
import { isLogged } from '../utils';

function HeaderComponent() {

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ minWidth: '100vw' }} className={classes.appBar}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }} className={classes.toolbar}>
          <img src={logo} alt='noImage' className={classes.logo} onClick={() => {
            navigate('/')
          }} />

          <Box sx={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
            <TextField type='search' className={classes.searchInput} placeholder="Որոնում․․․" sx={{ mr: 2 }} margin="normal" onChange={(event) => {
              dispatch(getSearchedBooksThunk(event.target.value))
            }} />

            {isLogged ?
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="large"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ bgcolor: deepPurple[500] }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => {
                    handleClose()
                    navigate('/profile')
                  }}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }} /> Իմ Պրոֆիլը
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleClose()
                    navigate('/favoritebooks')
                  }}>
                    <BookmarksIcon />  Ընտրված գրքեր
                  </MenuItem>
                  <Divider />


                  <MenuItem onClick={() => {
                    handleClose();
                    localStorage.removeItem('accessToken');
                    window.location.reload()
                  }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Դուրս գալ
                  </MenuItem>
                </Menu>
              </>
              :
              <LoginIcon
                sx={{
                  cursor: 'pointer',
                  alignItems: 'center',
                }}
                onClick={() => {
                  navigate('/signin')
                }}
                fontSize='large'
                color='primary' />
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>


  )
}


export default HeaderComponent


