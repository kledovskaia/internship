import { ReactNode } from 'react';
import { Divider } from '@mui/material';
import { User } from '../User/User';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import { HeaderContainer, HeaderLeft, HeaderRight } from './styles';

type Props = {
  children: ReactNode;
}

export default function Header({ children }: Props) {
  return (
    <HeaderContainer>
      <HeaderLeft>
        {children}
      </HeaderLeft>
      <HeaderRight>
        <ToggleTheme />
        <Divider orientation="vertical" variant="middle" sx={{ maxHeight: '2em' }} />
        <User />
      </HeaderRight>
    </HeaderContainer>
  );
}
