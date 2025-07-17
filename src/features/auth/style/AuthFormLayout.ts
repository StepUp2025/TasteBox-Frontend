import styled from 'styled-components';

export const AuthFormLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  min-width: 320px; 
  

  .container {
    width: 52vw;
    max-width: 550px;
    min-width: 480px;
    padding: 2rem;
    background-color: ${({ theme }) => theme.color.basicBackground};
    padding: 60px 72px;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({ theme }) => `
    @media ${theme.mediaQuery.mobile} {
      padding: 50px 60px;
    }
  `}
    
  }

  .header {
    display: flex;
    align-items: center;
    gap: 2vw;
    margin-bottom: 4vh;
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
    gap: 1rem;
    width: 100%;
    width: 100%;
    margin-bottom: 2rem;
  }

  form > button {
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
  gap: 0.5rem;
  margin: 1rem 0;

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
  gap: 4vw;
  margin-bottom: 2rem;

}


`;
