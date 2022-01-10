import {
  styled,
} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth } from '../../data/drawerWidth';
import { closedMixin, openedMixin } from '../../mixins/styles';

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    background: theme.palette.background.default,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
