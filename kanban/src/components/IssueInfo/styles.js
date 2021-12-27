import styled from 'styled-components/macro';

export const IssueContainer = styled.section.attrs(({ full }) => ({
  backgroundColor: full ? 'transparent' : '#fff',
  border: full ? '0' : '1px solid #ccc',
}))`
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 0.4rem;
  padding: 1.1em;

  & > * + * {
    margin-top: 0.9rem;
  }
`;

export const IssueTitle = styled.h3.attrs(({ full }) => ({
  fontWeight: full ? '600' : '400',
  fontSize: full ? '1.7rem' : '1rem',
}))`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;
export const IssueDescription = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 2rem;
  color: #6e7c87;
`;
export const IssueFooter = styled.div`
  display: flex;

  & > * + * {
    margin-left: 0.5rem;
  }
`;
export const IssueLabel = styled.p`
  color: #6e7c87;
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
