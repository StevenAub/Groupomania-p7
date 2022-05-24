import Logo from "../../assets/logo.svg";
import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
`;

const HeaderImg = styled.img`
  height: 150px;
  width: 150px;
`;

function Header() {
  return (
    <HeaderStyle>
      <HeaderImg src={Logo} alt="Logo groupomania"></HeaderImg>
    </HeaderStyle>
  );
}

export default Header;
