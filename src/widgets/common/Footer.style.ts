import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.color.subBackground};
  color: ${({ theme }) => theme.color.thirdText};
  padding: 40px;
  display: flex;
  justify-content: center;
  gap: 120px;
  margin-top: 90px;

  & * {
    color: ${({ theme }) => theme.color.thirdText};
  }
  
  .copyright {
    font-size: 0.75rem;
  }

  .column-wrapper {
    display: flex;
    gap: 90px;


    @media ${({ theme }) => theme.mediaQuery.tablet} {
      gap: 60px;
    }
  }

  .lists-wrapper {
    display: flex;
    gap: 90px;


    @media ${({ theme }) => theme.mediaQuery.tablet} {
      gap: 100px;
    }

    @media ${({ theme }) => theme.mediaQuery.mobile} {
      display: none;
    }
  }

  .github-title {
    @media ${({ theme }) => theme.mediaQuery.mobile} {
      display: none;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const FooterColumnLogo = styled.div`
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    text-align: center;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 20px;
  }
`;

export const FooterColumn = styled.div``;

export const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.color.border};
  margin: 20px 0;
  display: none;

  @media (min-width: 481px) and (max-width: 768px) {
    display: block;
  }
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const FooterDescription = styled.div`
  font-size: 0.75rem;
  margin-top: 8px;
  margin-bottom: 12px;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 40px;
  }
`;

export const SectionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
  font-size: ${({ theme }) => theme.fontSize.xsmall};
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListItem = styled.li`
  font-size: 0.75rem;
  text-overflow: ellipsis;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  font-size: 0.75rem;
`;

export const LogoButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  ${hoverOverlay}
`;
