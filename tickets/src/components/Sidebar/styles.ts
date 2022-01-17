import styled from 'styled-components';
import 'styled-components/macro';
import { NavLink as RNavLink } from 'react-router-dom';

export const SidebarContainer = styled.nav`
  color: #A4A6B3;
  background-color: #363740;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  min-width: 16em;

  @media screen and (max-width: 80rem) {
    min-width: 3.5em;
  }
`;
export const NavLink = styled(RNavLink)`
  border-left: 0.2em solid transparent;
  padding: 1em;
  padding-left: 2.4em;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  
  &.active {
    color: #fff;
    border-color: currentColor;
    background-color: #474853;
  }
  @media screen and (max-width: 80rem) {
    padding-left: 1em;
  }
`;
export const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.span`
  margin-left: 1.2rem;
  line-height: 1;
  opacity: 0.7;

  @media screen and (max-width: 80rem) {
    display: none;
  }
`;

export const SidebarHeader = styled.section`
  padding: 1.5em 0;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
