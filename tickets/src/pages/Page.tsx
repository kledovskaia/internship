import { ReactNode, useState } from 'react';
import {
  useTheme,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navLinks } from '../data/navLinks';
import Header from '../components/Header/Header';
import { NavLink, Title1 } from '../styles';
import { AppBar } from '../components/AppBar/AppBar';
import { Drawer } from '../components/Drawer/Drawer';
import { DrawerHeader } from '../components/DrawerHeader/DrawerHeader';

type Props = {
  pageTitle: string,
  children: ReactNode;
}

export default function Page({ children, pageTitle }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header>
            <Title1>{pageTitle}</Title1>
          </Header>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            paddingTop: '25px',
            paddingBottom: '25px',
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
          // ['Inbox', 'Starred', 'Send email', 'Drafts']
          navLinks.map(({ path, title, Icon }) => (
            <NavLink to={path} key={title}>
              <ListItem button>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </NavLink>
          ))
}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
