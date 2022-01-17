import styled from 'styled-components/macro';

export const HeaderContainer = styled.header`
  display: flex;
  flex: 1;
  padding: 0.25em 1.7em;
`;

export const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 2em;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 1em;
  }
`;
