import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

// I combined everything into one file, but if file will be bigger or we will have complex components, ofc better to split into few small files
const RawInput = styled.input`
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  background: white;
  padding: 12px 16px;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: 2px solid #e5e2f2;
    border: 2px solid #4535cc;
  }
`;
const RawSelect = styled.select`
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  background: white;
  padding: 12px 16px;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: 2px solid #e5e2f2;
    border: 2px solid #4535cc;
  }
`;
const Label = styled.div`
  position: absolute;
  top: -5px;
  margin-bottom: 5px;
`;

export const FormField = styled(
  ({
    name,
    type,
    label = name,
    defaultValue,
    control,
    rules,
    options,
    ...props
  }) => {
    return (
      <div {...props}>
        <Label>{label}</Label>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <>
              {options ? (
                <RawSelect
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                >
                  {options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </RawSelect>
              ) : (
                <RawInput
                  type={type ?? 'text'}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
              {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
            </>
          )}
        />
      </div>
    );
  }
)`
  position: relative;
  padding: 20px 0;
`;
