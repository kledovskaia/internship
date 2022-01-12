import styled from 'styled-components/macro';

export const StatisticContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > * + * {
    margin-top: 1rem;
  }
`;
export const StatisticTitle = styled.h3`
  font-size: 1.5em;
  padding: 0;
  margin: 0;
`;
export const StatisticData = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;
export const StatisticCount = styled.p`
  font-size: 4em;
  line-height: 1;
  padding: 0;
  margin: 0;
`;
export const StatisticPercent = styled.p`
  margin-left: 0.25em;
  font-size: 2em;
  padding: 0;
  margin: 0;
`;
