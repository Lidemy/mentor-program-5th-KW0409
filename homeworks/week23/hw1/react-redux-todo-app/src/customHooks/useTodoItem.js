import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

import { deleteTodo, toggleTodo, editTodo, updateTodo } from "../redux/actions";

export default function useTodoItem(todo) {
  const editInputRef = useRef();
  const dispatch = useDispatch();

  const handleDeleteTodo = useCallback(
    () => dispatch(deleteTodo(todo.id)),
    [todo, dispatch]
  );

  const handleToggleTodo = useCallback(
    () => dispatch(toggleTodo(todo.id)),
    [todo, dispatch]
  );

  const handleEditTodo = useCallback(
    () => dispatch(editTodo(todo.id)),
    [todo, dispatch]
  );

  const handleUpdateTodo = useCallback(
    (id, content) => dispatch(updateTodo(id, content)),
    [dispatch]
  );

  const editInputCheck = useCallback(() => {
    const inputContent = editInputRef.current.value;
    if (!inputContent) {
      alert("輸入不可為空白");
      editInputRef.current.value = todo.content;
      return editInputRef.current.focus();
    }
    return inputContent;
  }, [todo]);

  const handleUpdateCheckButton = useCallback(() => {
    const newContent = editInputCheck();
    if (!newContent) return;

    const yes = window.confirm("Are you sure to update todo?");
    if (yes) {
      handleUpdateTodo(todo.id, newContent);
    } else {
      editInputRef.current.focus();
    }
  }, [todo, editInputCheck, handleUpdateTodo]);

  const handleUpdateCancelButton = useCallback(() => {
    const newContent = editInputCheck();
    if (!newContent) return;

    const yes = window.confirm("Are you sure not to update todo?");
    if (yes) {
      handleEditTodo();
    } else {
      editInputRef.current.focus();
    }
  }, [editInputCheck, handleEditTodo]);

  const handleEditInputKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleUpdateCheckButton();
      }
    },
    [handleUpdateCheckButton]
  );

  return {
    editInputRef,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo,
    handleUpdateCheckButton,
    handleUpdateCancelButton,
    handleEditInputKeyPress,
  };
}
