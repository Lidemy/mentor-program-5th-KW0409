import styled from "styled-components";
import { memo } from "react";

import useButton from "../customHooks/useButton";

const ButtonContainer = styled.div`
  margin: 20px 0;
`;

const ButtonList = styled.ol`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  display: inline-flex;
  justify-content: center;
`;

const StyledLi = styled.li`
  & + & {
    margin-left: 20px;
  }
`;

const Button = styled.button`
  padding: 5px 0;
  width: 150px;
  font-size: 18px;
  line-height: 40px;
  color: #fff;
  background: #5a5a5a;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.9);
  }
`;

function ButtonLi({ description, handleClick }) {
  console.log("render ButtonLi");

  return (
    <StyledLi>
      <Button onClick={handleClick}>{description}</Button>
    </StyledLi>
  );
}

const MemoButtonLi = memo(ButtonLi);

export default function GameButton({ setBoardState }) {
  console.log("render GameButton");

  const buttonArr = useButton(setBoardState);

  return (
    <ButtonContainer>
      <ButtonList>
        {buttonArr.map((value, index) => (
          <MemoButtonLi
            key={`button-${index}`}
            description={value.description}
            handleClick={value.handleClick}
          />
        ))}
      </ButtonList>
    </ButtonContainer>
  );
}
