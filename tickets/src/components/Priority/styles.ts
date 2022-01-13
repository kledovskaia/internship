import styled from 'styled-components';
import 'styled-components/macro';

export const PriorityContainer = styled.p`
  font-size: 0.9rem;
  color: #fff;
  background-color: ${({ color }) => color};
  padding: 0.55em 1em 0.4em;
  border-radius: 10em;
  line-height: 1;
`;
