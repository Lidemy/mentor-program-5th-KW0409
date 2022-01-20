import { memo } from "react";
import styled from "styled-components";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import useTodos from "../customHooks/useTodos";

const Container = styled.div`
  margin: 0 auto;
  max-width: 650px;
`;

const TodoList = styled.ul`
  margin-top: 45px;
  padding: 0 10px;
  list-style: none;
`;

const TodoClearButton = styled.div`
  padding: 30px 0;
  text-align: center;

  button {
    padding: 8px 12px;
    color: #fff;
    font-size: 20px;
    border: 1px solid #aeaeae;
    box-shadow: rgb(153 153 153) 0.1rem 0.1rem 0.2rem;
    border-radius: 5px;
    background: #e43636d9;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  button:active {
    transform: scale(1);
  }
`;

const MemoTodoInput = memo(TodoInput);

const MemoTodoItem = memo(TodoItem);

export default function TodoContainer() {
  console.log("render TodoContainer");
  const {
    filterTodos,
    handleAddTodo,
    handleToggleIsDone,
    handleToggleIsEditable,
    handleUpdateTodo,
    handleDeleteTodo,
    handleClearFilterTodos,
  } = useTodos();

  return (
    <Container>
      <MemoTodoInput handleAddTodo={handleAddTodo} />
      {filterTodos.length !== 0 && (
        <TodoList>
          {filterTodos.map((filterTodo) => (
            <MemoTodoItem
              key={filterTodo.id}
              todo={filterTodo}
              handleToggleIsDone={handleToggleIsDone}
              handleToggleIsEditable={handleToggleIsEditable}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            ></MemoTodoItem>
          ))}
        </TodoList>
      )}
      {filterTodos.length !== 0 && (
        <TodoClearButton>
          <button onClick={handleClearFilterTodos}>Clear all</button>
        </TodoClearButton>
      )}
    </Container>
  );
}
