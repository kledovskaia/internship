import styled from 'styled-components';
import 'styled-components/macro';
import { Link, NavLink as NLink } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import {
  styled as muiStyled,
} from '@mui/material/styles';

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
  min-width: 50em;
  display: grid;
  grid-template-columns: repeat(12, minmax(2.2rem, 1fr));
  grid-gap: 2em;
`;
export const TicketsGridContainer = styled.div`
  min-height: 40.5em;
  display: grid;
  grid-template-columns: repeat(12, minmax(1.8rem, 1fr));
  grid-template-rows: min-content auto;
  grid-gap: 2em;
`;

export const GridFullWidth = styled(Paper)`
  overflow: hidden;
  grid-column: 1 / -1;
  display: flex;
  & > * {
    flex: 1;
  }
`;

export const GridMiddleWidth = styled(Paper)`
  overflow: hidden;
  grid-column: span 4;
  display: flex;

  & > * {
    flex: 1;  
  }

  @media screen and (max-width: 110rem) {
    grid-column: span 6;    
  }
  @media screen and (max-width: 75rem) {
    grid-column: 1 / -1;    
  }
`;

export const GridSmallWidth = styled(Paper)`
  overflow: hidden;
  grid-column: span 3;
  @media screen and (max-width: 90rem) {
    grid-column: span 6;    
  }
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
  flex-wrap: wrap;
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
  word-break: break-all;
  padding: 0.75em;
  background-color: ${({ isCompleted }) => (isCompleted ? '#00ff0030' : 'transparent')};

  display: flex;
  flex-direction: column;
`;

export const FlexColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const Flex1 = styled.div`
  flex: 1;
`;

export const TicketLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;

  & > * {
    flex: 1;
  }
`;

export const LoginContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginButton = muiStyled(Button)(({ theme }) => ({
  padding: '2rem 3rem',
  fontWeight: 'bold',
  fontSize: '2em',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  background: theme.palette.background.default,
}));

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: max-content 1fr;
`;
export const Aside = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  min-width: 16em;

  @media screen and (max-width: 80rem) {
    min-width: 3.5em;
  }
`;
export const Main = styled.main`
  grid-column: 2 / -1;
  padding: 1.7em;
`;

export const HeaderWithSearch = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  `;
export const HeaderSearch = styled.div`
  margin: 0 2em;
  display: flex;
  flex: 1;
  & > * {
    flex: 1;
    max-width: 50em;
    margin: 0 auto;
  }
`;
