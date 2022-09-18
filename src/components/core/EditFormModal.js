import { useEditModal } from '../../hooks/useEditModal';
import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTestSuitsMutation } from '../../hooks/useTestSuits';
import styled from 'styled-components';
import { ErrorMessage } from '../shared/ErrorMessage';
import { FormField } from '../shared/FormField';
import { Button } from '../shared/Button';

// Instead react-hook-form i can use custom input handler via useRef, but for this i need to write more boilerplate and need more than 3hrs
export const EditFormModal = styled((props) => {
  const { data, closeModal } = useEditModal();
  const { mutation: updateTestSuite } = useTestSuitsMutation();
  const ref = useRef(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    name: 'test_plans',
    control,
    rules: { required: true },
  });
  const closeModalAndClearForm = () => {
    closeModal();
    remove();
    reset();
  };
  const onSubmit = (submitData) => {
    const preparedData = { ...data, ...submitData };
    updateTestSuite(preparedData);
    closeModalAndClearForm();
    console.log(JSON.stringify(preparedData, null, 3));
  };

  const addTestPlan = (e) => {
    e.preventDefault();
    append(undefined);
  };
  const removeTestPlan = (id) => {
    remove(id);
  };

  useEffect(() => {
    if (data) {
      append(data.test_plans);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModalAndClearForm();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      remove();
    };
  }, []);
  const browsers = ['chrome', 'firefox', 'safari', 'edge'];
  const required = { value: true, message: 'This field is required' };
  return data ? (
    <div {...props}>
      <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <h3>Edit test suit</h3>
        <FormField
          label="Test suit name"
          name="test_suite_name"
          defaultValue={data.test_suite_name}
          control={control}
          rules={{ required }}
        />
        {fields.map((testPlan, id) => (
          <div className="testPlans" key={testPlan.test_name || id}>
            <FormField
              label="Test name"
              name={`test_plans.${id}.test_name`}
              defaultValue={testPlan.test_name}
              control={control}
              rules={{ required }}
            />
            <FormField
              label="Browser"
              name={`test_plans.${id}.browser`}
              defaultValue={testPlan.browser}
              control={control}
              options={browsers}
            />
            <FormField
              label="Instruction count"
              type="number"
              name={`test_plans.${id}.instruction_count`}
              defaultValue={testPlan.instruction_count}
              control={control}
              rules={{
                required,
                min: {
                  value: 1,
                  message: 'Count should be > 0',
                },
              }}
            />
            <div>
              <Button onClick={() => removeTestPlan(id)}>Remove test</Button>
            </div>
          </div>
        ))}
        <div className="footerButtons">
          <Button onClick={addTestPlan}>Add test</Button>
          <Button $primary>Submit</Button>
          <Button onClick={() => closeModalAndClearForm()}>Cancel</Button>
        </div>
        {errors.test_plans?.root?.type === 'required' && (
          <div className="formError">
            <ErrorMessage $isAbsolute={false}>
              You should add at least one test plan
            </ErrorMessage>
          </div>
        )}
      </form>
    </div>
  ) : null;
})`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(113, 122, 135, 0.6);

  h3 {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 40px;
  }

  form {
    position: absolute;
    overflow-x: auto;
    max-height: calc(90vh - 5%);
    width: 800px;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }

  .testPlans {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    margin: 5px 0;

    > div:nth-child(1) {
      flex: 5 0 0;
    }

    > div:nth-child(2),
    > div:nth-child(3) {
      flex: 2 0 0;
    }
  }

  .formError > div {
    text-align: center;
    margin-top: 10px;
  }

  .footerButtons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
`;
