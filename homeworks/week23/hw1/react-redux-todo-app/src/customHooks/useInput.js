import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

import { addTodo } from "../redux/actions";

export default function useInput() {
  const addInputRef = useRef();
  const dispatch = useDispatch();

  const handleAddClick = useCallback(() => {
    const newTodo = addInputRef.current.value;
    if (!newTodo) return alert("輸入不可為空白");
    dispatch(addTodo(newTodo));
    addInputRef.current.value = "";
  }, [dispatch]);

  const handleInputKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") return handleAddClick();
    },
    [handleAddClick]
  );

  return {
    addInputRef,
    handleAddClick,
    handleInputKeyPress,
  };
}
