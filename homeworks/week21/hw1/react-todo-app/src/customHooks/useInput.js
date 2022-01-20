import { useRef } from "react";

export default function useInput(handleAddTodo) {
  const addInputRef = useRef();

  const handleAddClick = () => {
    const newTodo = addInputRef.current.value;
    if (!newTodo) return alert("輸入不可為空白");
    handleAddTodo(newTodo);
    addInputRef.current.value = "";
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") return handleAddClick();
  };

  return {
    addInputRef,
    handleAddClick,
    handleInputKeyPress,
  };
}
