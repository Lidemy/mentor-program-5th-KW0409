import styled from "styled-components";

import useFilterNav from "../customHooks/useFilterNav";

const HeaderContainer = styled.div`
  height: 64px;
  background: #4a90e2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  width: 130px;
  height: 64px;
  font-size: 26px;
  font-family: Palatino;
  color: #00408b;
  text-align: center;
  line-height: 64px;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    !props.$active &&
    `
    &:hover {
    color: white;
    border: 2.5px solid #dedede;
    }
  `}

  ${(props) =>
    props.$active &&
    `
    color: white;
    border-bottom: 5px solid #000000ab;
  `}

  & + & {
    margin-left: 65px;
  }
`;

function TodosFilterNav() {
  const { navArr, filterValue, handleNavClick } = useFilterNav();

  return (
    <>
      {navArr.map((navText, index) => (
        <Nav
          key={`nav-${index}`}
          $active={filterValue === navText}
          onClick={handleNavClick}
        >
          {navText}
        </Nav>
      ))}
    </>
  );
}

export default function HeaderFilter() {
  return (
    <HeaderContainer>
      <TodosFilterNav />
    </HeaderContainer>
  );
}
