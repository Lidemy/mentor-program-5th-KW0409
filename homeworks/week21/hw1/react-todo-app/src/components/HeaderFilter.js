import { useContext } from "react";
import styled from "styled-components";
import { FilterContext } from "../filterContext";

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
  console.log("render TodosFilterNav");

  const filterValue = useContext(FilterContext);
  console.log("filterValue:", filterValue);

  return (
    <>
      <Nav $active={filterValue === "All" && true}>All</Nav>
      <Nav $active={filterValue === "Done" && true}>Done</Nav>
      <Nav $active={filterValue === "Todo" && true}>Todo</Nav>
    </>
  );
}

export default function HeaderFilter({ handleChangeFilter }) {
  console.log("render HeaderFilter");

  const handleClickFilter = (e) => {
    if (e.target.tagName !== "NAV") return;
    handleChangeFilter(e.target.innerText);
  };

  return (
    <HeaderContainer onClick={handleClickFilter}>
      <TodosFilterNav />
    </HeaderContainer>
  );
}
