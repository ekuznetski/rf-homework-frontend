import { useTestSuitsQuery } from '../../hooks/useTestSuits';
import { TestSuite } from './TestSuite';
import styled from 'styled-components';

export const TestSuitsList = styled((props) => {
  const { data } = useTestSuitsQuery();

  return data ? (
    <div {...props}>
      {data.map((testSuit) => (
        <TestSuite details={testSuit} key={testSuit.id} />
      ))}
    </div>
  ) : null;
})`
  margin: auto;
  max-width: 800px;
`;
