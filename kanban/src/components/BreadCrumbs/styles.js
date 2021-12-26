import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export const BreadCrumbsContainer = styled.ul`
  display: flex;

  & > * + * {
    padding-left: 1.5em;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0.4em;
      top: 50%;
      transform: translateY(-50%);
      height: 0.75em;
      width: 0.75em;
      background: url('/icons/chevron-right.svg') center center / contain
        no-repeat;
    }
  }
`
export const BreadCrumbsItem = styled.li``
export const BreadCrumbsLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: ${({ active }) => (active ? '#252c32' : '#6e7c87')};
  padding: 0.5em 0;
`
