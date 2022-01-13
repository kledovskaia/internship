import styled from 'styled-components';
import 'styled-components/macro';
import { NavLink as NLink } from 'react-router-dom';
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
`;

export const GridFullWidth = styled(Paper)`
  padding: 1em;
  grid-column: 1 / -1;
`;

export const GridSmallWidth = styled(Paper)`
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
  justify-content: space-between;
`;
