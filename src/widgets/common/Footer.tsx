// Footer.tsx
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import githubLogo from 'shared/assets/icons/github-mark.svg';
import {
  Divider,
  FooterColumn,
  FooterColumnLogo,
  FooterDescription,
  FooterLink,
  FooterWrapper,
  List,
  ListItem,
  Logo,
  LogoButton,
  SectionTitle,
} from './Footer.style';

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
