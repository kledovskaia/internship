import styled from 'styled-components/macro';

export const HeaderContainer = styled.header`
  display: flex;
  flex: 1;
`;

export const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 1em;
  }
`;
