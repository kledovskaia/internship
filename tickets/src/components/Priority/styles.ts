import styled from 'styled-components';
import 'styled-components/macro';

export const PriorityContainer = styled.p`
  color: #fff;
  background-color: ${({ color }) => color};
  padding: 0.5em 1.25em;
  border-radius: 10em;
  font-weight: bold;
`;
