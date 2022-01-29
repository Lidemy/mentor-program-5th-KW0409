import styled from "styled-components";

import useTodoItem from "../customHooks/useTodoItem";

const TodoItemWrapper = styled.li`
  width: 100%;
  min-height: 85px;
  background: ${(props) => (props.$isDone ? `#f2f2f2` : `#fff2dc`)};
  padding: 0 10px;
  border-radius: 3px;
  list-style: none;
  display: flex;
  align-items: center;

  & + & {
    margin-top: 15px;
  }
`;

const TodoItemCheck = styled.div`
  width: 10%;
  text-align: center;

  button {
    border: none;
    color: ${(props) => (props.$isDone ? `#288aff` : `#fff`)};
    font-size: 24px;
    background: transparent;
  }

  button:hover {
    cursor: pointer;
    opacity: 0.8;
    color: #57a4ff;
  }
`;

const TodoItemContent = styled.div`
  width: 80%;
  height: 100%;
  padding: 15px 10px;
  word-break: break-word;
  font-size: 1.3rem;

  ${(props) =>
    props.$isDone &&
    `
    color: #b8b8b8;
    font-style: italic;
    text-decoration: line-through;
  `};

  input {
    width: 100%;
    font-size: 1.3rem;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    transition: border-color 0.8s ease-in-out;

    ${(props) =>
      props.$isDone &&
      `
      color: #b8b8b8;
      font-style: italic;
      text-decoration: line-through;
    `};
  }

  input:focus {
    border-bottom: 2px solid #5c5c5c;
  }
`;

const TodoItemAction = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
`;

const ActionButton = styled.button`
  border: none;
  color: #0000008c;
  font-size: 20px;
  background: transparent;

  ${(props) =>
    props.$type &&
    `
    font-size: 22px;
    color: ${props.$type === "updateCheck" ? `green` : `red`};
  `}

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }

  & + & {
    margin-left: 5px;
  }
`;

export default function TodoItem({ todo }) {
  const {
    editInputRef,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo,
    handleUpdateCheckButton,
    handleUpdateCancelButton,
    handleEditInputKeyPress,
  } = useTodoItem(todo);

  return (
    <TodoItemWrapper $isDone={todo.isDone}>
      <TodoItemCheck $isDone={todo.isDone}>
        <button onClick={handleToggleTodo}>
          {!todo.isDone && <i className="fa fa-square"></i>}
          {todo.isDone && <i className="fas fa-check-square"></i>}
        </button>
      </TodoItemCheck>
      <TodoItemContent $isDone={todo.isDone}>
        {!todo.isEditable && todo.content}
        {todo.isEditable && (
          <input
            ref={editInputRef}
            type="text"
            defaultValue={todo.content}
            autoFocus
            onKeyPress={handleEditInputKeyPress}
          />
        )}
      </TodoItemContent>
      <TodoItemAction>
        {!todo.isEditable && (
          <>
            <ActionButton onClick={handleEditTodo}>
              <i className="fas fa-edit"></i>
            </ActionButton>
            <ActionButton onClick={handleDeleteTodo}>
              <i className="fas fa-trash-alt"></i>
            </ActionButton>
          </>
        )}
        {todo.isEditable && (
          <>
            <ActionButton $type="updateCheck" onClick={handleUpdateCheckButton}>
              <i className="fas fa-check-circle"></i>
            </ActionButton>
            <ActionButton
              $type="updateCancel"
              onClick={handleUpdateCancelButton}
            >
              <i className="fas fa-times-circle"></i>
            </ActionButton>
          </>
        )}
      </TodoItemAction>
    </TodoItemWrapper>
  );
}
