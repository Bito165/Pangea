import styled from 'styled-components';
import LogoIcon from '../../assets/images/lumin-logo.png';


export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 3px -3px grey;
`;

const LogoImg = styled.img`
  width: 160px;
  margin-right: 30px;
`;
export const Logo = () => <LogoImg src={LogoIcon} alt="logo" />;

export const NavLink = styled.span`
  font-size: 14px;
  margin-left: 40px;
  cursor: pointer;
  opacity: 1;
  transition: all 300ms ease-out;
  font-family: Bau;

  &:hover {
    opacity: 0.7;
  }
`;
export const Menu = styled(NavLink)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
export const Group = styled.div`
  display: flex;
  align-items: center;
`;
export const NavGroup = styled(Group)`
  @media (max-width: 768px) {
    display: none;
  }
`;


