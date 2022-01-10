import styled from 'styled-components/macro';
import { NavLink as NLink } from 'react-router-dom';

export const Button = styled.button`
  display: inline-block;
  border-radius: 0.25em;
`;

export const Title1 = styled.h1`
`;
export const Title2 = styled.h2``;

export const NavLink = styled(NLink)`
  display: flex;
  align-items: center;
  color: inherit; 
  text-decoration: none;
`;
