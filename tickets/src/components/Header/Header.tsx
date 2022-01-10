import { ReactNode } from 'react';
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
        <User />
      </HeaderRight>
    </HeaderContainer>
  );
}
