import styled from 'styled-components';

export const AuthFormLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  
  

  .container {
    min-width: 550px;
    min-height: 620px;
    background-color: ${({ theme }) => theme.color.basicBackground};
    padding: 60px 72px;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
  }

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
    justify-content: center;

    h1 {
      font-size: ${({ theme }) => theme.fontSize.large};
      color: ${({ theme }) => theme.color.primary};
      margin: 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 24px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 32px;
  }

  form > button {
    max-width: 400px;
    width: 100%;
  }

  .to-link {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.thirdText};

    a {
      color: ${({ theme }) => theme.color.highlightText};
      text-decoration: none;
      margin-left: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .divider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 24px;

  span {
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.color.thirdText};
  }

  .or {
    color: ${({ theme }) => theme.color.thirdText};
    font-size: ${({ theme }) => theme.fontSize.small};
    white-space: nowrap;
  }
}

.oauth-buttons {
  display: flex;
  justify-content: center;
  gap: 64px;
  margin-bottom: 24px;


}
`;
