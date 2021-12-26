import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Title = styled.h1``
export const ColumnContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(15rem, 1fr));
`
export const Column = styled.section``
export const Page = styled.div`
  padding: 1rem;

  & > * + * {
    margin-top: 1.5rem;
  }
`
export const ButtonLink = styled(Link)`
  display: inline-block;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 0.8rem;
  border-radius: 0.4rem;
  text-decoration: none;
  background-color: ${({ primary }) => (primary ? '#F2994A' : '#4094F7')};
`
export const Button = styled.button`
  cursor: pointer;
  border: 0;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 0.4rem;
  font-weight: 600;
  text-decoration: none;
  background-color: ${({ primary }) => (primary ? '#F2994A' : '#4094F7')};
`
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 1em;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * + * {
    margin-top: 2rem;
  }
`

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  font-size: 1.7rem;
`

export const ProjectList = styled.ul`
  & > * + * {
    margin-top: 1em;
  }
`
export const ProjectListItem = styled.li``
