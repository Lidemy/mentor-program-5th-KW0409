import { useRef, useCallback } from "react";

export default function useTodoItem(
  todo,
  handleToggleIsDone,
  handleToggleIsEditable,
  handleUpdateTodo,
  handleDeleteTodo
) {
  const editInputRef = useRef();

  const handleToggleCheck = () => {
    handleToggleIsDone(todo.id);
  };

  const handleDeleteButton = () => {
    handleDeleteTodo(todo.id);
  };

  const handleEditButton = () => {
    handleToggleIsEditable(todo.id);
  };

  const editInputCheck = useCallback(() => {
    const inputContent = editInputRef.current.value;
    if (!inputContent) {
      alert("輸入不可為空白");
      editInputRef.current.value = todo.content;
      return editInputRef.current.focus();
    }
    return inputContent;
  }, [todo]);

  const handleUpdateCheckButton = () => {
    const newContent = editInputCheck();
    if (!newContent) return;

    const yes = window.confirm("Are you sure to update todo?");
    if (yes) {
      handleUpdateTodo(todo.id, newContent);
    } else {
      editInputRef.current.focus();
    }
  };

  const handleUpdateCancelButton = () => {
    const newContent = editInputCheck();
    if (!newContent) return;

    const yes = window.confirm("Are you sure not to update todo?");
    if (yes) {
      handleToggleIsEditable(todo.id);
    } else {
      editInputRef.current.focus();
    }
  };

  const handleEditInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdateCheckButton();
    }
  };

  return {
    editInputRef,
    handleToggleCheck,
    handleDeleteButton,
    handleEditButton,
    handleUpdateCheckButton,
    handleUpdateCancelButton,
    handleEditInputKeyPress,
  };
}
