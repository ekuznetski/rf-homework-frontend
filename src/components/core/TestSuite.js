import { TestPlan } from './TestPlan';
import { useAccordion } from '../../hooks/useAccordion';
import { useEditModal } from '../../hooks/useEditModal';
import styled from 'styled-components';
import { Button } from '../shared/Button';

export const TestSuite = styled(({ details, ...props }) => {
  const { isActiveAccordion, toggleActiveAccordion } = useAccordion(details.id);
  const { openModal } = useEditModal();
  const editClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(details);
  };
  const expandClickHandler = () => {
    toggleActiveAccordion(details.id);
  };

  return (
    <div {...props}>
      <div className="testSuite" onClick={expandClickHandler}>
        <div
          className={`activeTestSuite ${isActiveAccordion ? 'isActive' : ''}`}
        />
        <div>{details.test_suite_name}</div>
        <div>{details.test_plans.length} tests</div>
        <div>
          <Button onClick={editClickHandler}>Edit</Button>
        </div>
      </div>
      {isActiveAccordion && (
        <div className="testPlanWrapper">
          {details.test_plans.map((plans) => (
            <TestPlan details={plans} key={plans.test_name} />
          ))}
        </div>
      )}
    </div>
  );
})`
  .activeTestSuite {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);

    &.isActive {
      transform: rotate(45deg);
    }
  }

  .testSuite {
    position: relative;
    padding: 3px 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    gap: 20px;
    cursor: pointer;
    transition: background-color 0.2s;

    > div:nth-child(2) {
      width: 70%;
    }

    > div:nth-child(3) {
      flex-grow: 1;
    }

    &:hover {
      background-color: #f6f6f6;
    }
  }

  .testPlanWrapper {
    padding: 15px 0;
  }
`;
