import styled from 'styled-components/macro';

export const IssueContainer = styled.section.attrs(({ full }) => ({
  backgroundColor: full ? 'transparent' : '#fff',
  border: full ? '0' : '1px solid #ccc',
}))`
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 0.4rem;
  padding: 0.5em;
`;
export const IssueTitle = styled.h3``;
export const IssueDescription = styled.p``;
export const IssueFooter = styled.div``;
