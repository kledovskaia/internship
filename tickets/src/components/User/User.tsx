import {
  Avatar, IconButton, Menu, MenuItem, Tooltip, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/thunks/auth';
import { getUser } from '../../redux/selectors';
import { UserContainer } from './styles';

export function User() {
  const user = useSelector(getUser);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <UserContainer onClick={(event) => {
          setAnchorElUser(event.currentTarget);
        }}
        >
          <Typography>
            {user.displayName}
          </Typography>
          <IconButton
            sx={{ p: 0 }}
          >
            <Avatar alt={user.displayName} src={user.photoURL} />
          </IconButton>
        </UserContainer>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => {
          setAnchorElUser(null);
        }}
      >
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
