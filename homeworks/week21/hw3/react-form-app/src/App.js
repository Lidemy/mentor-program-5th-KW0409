import styled from "styled-components";
import Form from "./components/Form";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding-bottom: 3.5rem;
`;

const Container = styled.div`
  margin: 3.5rem auto;
  max-width: 645px;
  padding: 2rem 1.8rem;
  border-top: 8px solid #fad312;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
`;

const Title = styled.h1`
  margin-bottom: 35px;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 20px;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 8px;
  }
`;

const RedHint = styled.p`
  margin: 0;
  font-size: 16px;
  color: #e74149;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 1rem 0;
  background: black;
  font-size: 15px;
  color: #999999;
  text-align: center;
`;

function App() {
  console.log("===== render App =====");

  return (
    <>
      <Wrapper>
        <Container>
          <Title>新拖延運動報名表單</Title>
          <Description>
            <p>活動日期：2020/12/10 ~ 2020/12/11</p>
            <p>活動地點：台北市大安區新生南路二段1號</p>
          </Description>
          <RedHint>* 必填</RedHint>
          <Form />
        </Container>
      </Wrapper>
      <Footer>&copy; 2020 &copy; Copyright. All rights Reserved.</Footer>
    </>
  );
}

export default App;
