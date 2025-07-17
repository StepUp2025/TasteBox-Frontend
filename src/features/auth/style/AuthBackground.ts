import styled from 'styled-components';

export const AuthBackground = styled.div`
  background-color: ${({ theme }) => theme.color.loginBackground};
  min-height: 100vh;
  min-width: 480px;
  width: 100%;
`;
