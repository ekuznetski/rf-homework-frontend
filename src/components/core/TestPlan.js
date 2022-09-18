import styled from 'styled-components';

export const TestPlan = styled(({ details, ...props }) => {
  return (
    <div {...props}>
      <div>{details.test_name}</div>
      <div>{details.browser}</div>
      <div>{details.instruction_count} steps</div>
    </div>
  );
})`
  padding: 3px 10px;
  margin: 5px 0;
  background-color: #f8f8f8;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  transition: background-color 0.2s;

  > div:nth-child(1) {
    width: 70%;
  }
  > div:nth-child(2) {
    flex-grow: 1;
  }

  &:hover {
    background-color: #f6f6f6;
  }
`;
