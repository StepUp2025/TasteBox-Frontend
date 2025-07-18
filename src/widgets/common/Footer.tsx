import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import githubLogo from 'shared/assets/icons/github-mark.svg';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterWrapper>
      <FooterColumnLogo>
        <PackageOpen size={40} />
        <Logo>TasteBox</Logo>
        <FooterDescription>
          취향 기반 추천 프로젝트
          <br />
          당신의 취향을 찾아주는 서비스입니다.
        </FooterDescription>
        <div className="copyright">
          <span>© 2025 TasteBox. All rights reserved.</span>
        </div>
      </FooterColumnLogo>
      <Divider />
      <div className="column-wrapper">
        <div className="lists-wrapper">
          <FooterColumn>
            <SectionTitle>Services</SectionTitle>
            <nav>
              <List>
                <ListItem>
                  <Link to="/">Home</Link>
                </ListItem>
                <ListItem>
                  <Link to="/movie">Movies</Link>
                </ListItem>
                <ListItem>
                  <Link to="/tv">TV series</Link>
                </ListItem>
                <ListItem>
                  <Link to="/collection">Collection</Link>
                </ListItem>
                <ListItem>
                  <Link to="/mypage">MyPage</Link>
                </ListItem>
              </List>
            </nav>
          </FooterColumn>

          <FooterColumn>
            <SectionTitle>FE Developers</SectionTitle>
            <List>
              <ListItem>
                <FooterLink
                  href="https://github.com/eunmilee89"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eunmi Lee
                </FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink
                  href="https://github.com/hyoseongLee"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hyoseong Lee
                </FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink
                  href="https://github.com/KMU-jeonghj"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hojin Jeong
                </FooterLink>
              </ListItem>
            </List>
          </FooterColumn>

          <FooterColumn>
            <SectionTitle>BE Developers</SectionTitle>
            <List>
              <ListItem>
                <FooterLink
                  href="https://github.com/hightuv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minseo Park
                </FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink
                  href="https://github.com/Kevin-jwd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jaewoo Do
                </FooterLink>
              </ListItem>
            </List>
          </FooterColumn>
        </div>

        <FooterColumn>
          <div className="github-title">
            <SectionTitle>GitHub</SectionTitle>
          </div>
          <List>
            <ListItem>
              <LogoButton
                href="https://github.com/StepUp2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Organization"
              >
                <img src={githubLogo} alt="GitHub" />
              </LogoButton>
            </ListItem>
          </List>
        </FooterColumn>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.color.subBackground};
  color: ${({ theme }) => theme.color.thirdText};
  padding: 60px;
  display: flex;
  justify-content: center; 
  gap: 120px;   
  margin-top: 90px;
  & * {
    color: ${({ theme }) => theme.color.thirdText};
  }



  .column-wrapper {
    display: flex;
    gap: 90px;
    flex-wrap: wrap;
    @media ${({ theme }) => theme.mediaQuery.tablet} {
      gap: 60px;
    }
  }

  .lists-wrapper {
    display: flex;
    gap: 90px;
    flex-wrap: wrap;
    @media ${({ theme }) => theme.mediaQuery.tablet} {
      gap: 60px;
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

const FooterColumnLogo = styled.div`
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    text-align: center;
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 20px;
  }
`;

const FooterColumn = styled.div`

`;

const Divider = styled.hr`
  width: 90%;
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.color.border};
  margin: 20px 0;

  display: none; 

  @media (min-width: 481px) and (max-width: 768px) {
    display: block; 
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 12px;
  margin-bottom: 12px;
  gap: 8px;
`;

const FooterDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-top:17px;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.mediaQuery.mobile} {
      margin-bottom: 40px;
    }
`;

const SectionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 24px;
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 6px;
  margin-top: 19px;
  font-size: ${({ theme }) => theme.fontSize.small};
  text-overflow: ellipsis;
`;

const FooterLink = styled.a`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const LogoButton = styled.a`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);

  img {
    width: 55px;
    height: 55px;
    object-fit: contain;
  }

  ${hoverOverlay}

`;
