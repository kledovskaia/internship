import { Tooltip } from '@mui/material';
import Logo from '../Logo/Logo';
import { navLinks } from '../../data/navLinks';
import {
  IconContainer,
  NavLink, SidebarContainer, SidebarHeader, Text,
} from './styles';

export default function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo />
        <Text>Dashboard kit</Text>
      </SidebarHeader>
      {navLinks.map(({ path, title, Icon }) => (
        <Tooltip key={path} title={title} placement="right">
          <NavLink to={path}>
            <IconContainer>
              <Icon />
            </IconContainer>
            <Text>{title}</Text>
          </NavLink>
        </Tooltip>
      ))}
    </SidebarContainer>
  );
}
