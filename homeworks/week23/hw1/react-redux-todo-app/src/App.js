import styled from "styled-components";

import { COPYRIGHT_YEAR, ARTHUR } from "./constants/Data";
import HeaderFilter from "./components/HeaderFilter";
import TodoContainer from "./components/TodoContainer";

const TodoWrapper = styled.div`
  width: 100%;
  min-height: 90%;
  padding: 0 15px;
  padding-top: 85px;
  padding-bottom: 35px;
  background: #e1e1e1;
`;

const Footer = styled.footer`
  margin: 0 auto;
  height: 50px;
  text-align: center;
  padding: 15px 0;
  background: white;

  span {
    color: brown;
    font-family: Comic Sans MS;
    font-style: italic;
  }
`;

function App() {
  return (
    <>
      <HeaderFilter />
      <TodoWrapper>
        <TodoContainer />
      </TodoWrapper>
      <Footer>
        Copyright &copy; {COPYRIGHT_YEAR} by <span>{ARTHUR}</span> All Rights
        Reserved.
      </Footer>
    </>
  );
}

export default App;
