import { PackageOpen } from 'lucide-react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterWrapper>
      <FooterColumnLogo>
        <PackageOpen size={35} />
        <Logo>TasteBox</Logo>
        <FooterDesc>
          취향 기반 추천 프로젝트
          <br />
          당신의 취향을 찾아주는 서비스입니다.
        </FooterDesc>
      </FooterColumnLogo>

      <FooterColumn>
        <SectionTitle>Services</SectionTitle>
        <List>
          <ListItem>Movies</ListItem>
          <ListItem>TV series</ListItem>
        </List>
      </FooterColumn>

      <FooterColumn>
        <SectionTitle>Developers</SectionTitle>
        <List>
          <ListItem>
            <DevLabel>FE:</DevLabel>Hyoseong Lee, Eunmi Lee, Hojin Jeong
          </ListItem>
          <ListItem>
            <DevLabel>BE:</DevLabel>Minseo Park, Jaewoo Do
          </ListItem>
        </List>
      </FooterColumn>

      <FooterColumn>
        <SectionTitle>Git hub</SectionTitle>
        <List>
          <ListItem>
            <FooterLink
              href="https://github.com/StepUp2025/TasteBox-Frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/StepUp2025/TasteBox-Frontend
            </FooterLink>
          </ListItem>
          <ListItem>
            <FooterLink
              href="https://github.com/StepUp2025/TasteBox-Backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/StepUp2025/TasteBox-Backend
            </FooterLink>
          </ListItem>
        </List>
      </FooterColumn>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.color.subBackground};
  padding: 40px 0;
  display: flex;
`;

const FooterColumnLogo = styled.div`
padding-left:40px;
`;

const FooterColumn = styled.div`
margin-left: 80px;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
`;

const FooterDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-top:17px;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
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

const DevLabel = styled.span`
  font-weight: bold;
  margin-right: 6px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.small};
  &:hover {
    color: ${({ theme }) => theme.color.highlightText};
  }
`;
