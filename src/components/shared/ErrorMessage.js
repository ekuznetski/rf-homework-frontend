import styled from 'styled-components';

export const ErrorMessage = styled(({ children, ...props }) => {
  return <div {...props}>{children}</div>;
})`
  bottom: 13px;
  background: white;
  padding: 0 3px;
  font-size: 13px;
  color: #ff4d4d;
  position: ${({ $isAbsolute = true }) =>
    $isAbsolute ? 'absolute' : 'initial'};
`;
