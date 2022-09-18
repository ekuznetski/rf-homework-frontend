import styled from 'styled-components';

export const Button = styled(({ children, ...props }) => {
  return <button {...props}>{children}</button>;
})`
  background-color: ${({ $primary }) => ($primary ? '#4535CC' : 'white')};
  padding: 12px 24px;
  border: 2px solid #4535cc;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  color: ${({ $primary }) => ($primary ? 'white' : '#4535CC')};
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? '#372AA3' : '#F2F2F2')};
    border: 2px solid ${({ $primary }) => ($primary ? '#372AA3' : '#6358bb')};
  }
  &:active {
    background-color: ${({ $primary }) => ($primary ? '#2f219f' : '#d3d3d3')};
    border: 2px solid ${({ $primary }) => ($primary ? '#2f219f' : '#8983bd')};
  }
  transition: all 0.2s;
`;
