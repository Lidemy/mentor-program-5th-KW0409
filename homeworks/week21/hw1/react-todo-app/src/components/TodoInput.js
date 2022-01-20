import styled from "styled-components";
import useInput from "../customHooks/useInput";

const TodoInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px 15px;
  min-height: 56px;
  font-size: 1.5rem;
  border: none;
  border-radius: 6px 0 0 6px;
  outline: none;

  &::placeholder {
    color: #b6b6b6;
    font-size: 1.3rem;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const Button = styled.button`
  width: 22.5%;
  padding: 5px 10px;
  min-height: 56px;
  font-size: 1.4rem;
  text-align: center;
  color: #fff;
  background: #1158a2b3;
  cursor: pointer;
  border: 3px solid white;
  border-radius: 0 6px 6px 0;

  &:hover {
    opacity: 0.7;
  }
`;

export default function TodoInput({ handleAddTodo }) {
  console.log("render TodoInput");

  const { addInputRef, handleAddClick, handleInputKeyPress } =
    useInput(handleAddTodo);

  return (
    <TodoInputWrapper>
      <Input
        ref={addInputRef}
        onKeyPress={handleInputKeyPress}
        placeholder="add something here~"
      />
      <Button onClick={handleAddClick}>Add Todo</Button>
    </TodoInputWrapper>
  );
}
