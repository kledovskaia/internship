import styled from 'styled-components';
import 'styled-components/macro';
import { Link, NavLink as NLink } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';

export const Button = styled.button`
  display: inline-block;
  border-radius: 0.25em;
`;

export const Title1 = styled.h1``;
export const Title2 = styled.h2``;
export const Title3 = styled.h3`
  line-height: 1;
  padding: 0;
  margin: 0;
`;

export const NavLink = styled(NLink)`
  display: flex;
  align-items: center;
  color: inherit; 
  text-decoration: none;
`;

export const GridContainer = styled.div`
  padding: 2em;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 2em;
`;

export const GridFullWidth = styled(Paper)`
  grid-column: 1 / -1;
`;

export const GridMiddleWidth = styled(Paper)`
  grid-column: span 4;
`;

export const GridSmallWidth = styled(Paper)`
  grid-column: span 3;
  display: flex;
  padding: 1.5em;
  & > * {
    flex: 1
  }
`;

export const ContentContainer = styled.div`
  padding: 2em 0;
`;

export const Card = styled(Paper)`
  padding: 2em;
`;

export const FlexContainer = styled(Box)`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 1rem;
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: #2F80ED;
  border-radius: 0.5em;
  padding:  0.6em 1.2em 0.4em;
`;

type TicketProps = {
  isCompleted: boolean
}

export const TicketContainer = styled.div<TicketProps>`
  padding: 0.75em;
  background-color: ${({ isCompleted }) => (isCompleted ? '#00ff0030' : 'transparent')}
`;
