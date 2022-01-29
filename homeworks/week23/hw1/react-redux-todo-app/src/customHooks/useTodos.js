import { useRef, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectTodos, selectFilterValue } from "../redux/selectors";
import { clearFilterTodo } from "../redux/actions";

function writeTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export default function useTodos() {
  const isFirstRender = useRef(true);

  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filterValue = useSelector(selectFilterValue);

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filterValue === "All") return todo;
      if (filterValue === "Done") return todo.isDone;
      if (filterValue === "Todo") return !todo.isDone;
    });
  }, [todos, filterValue]);

  useEffect(() => {
    if (isFirstRender.current) return (isFirstRender.current = false);
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleClearFilterTodos = useCallback(
    () => dispatch(clearFilterTodo(filterValue)),
    [dispatch, filterValue]
  );

  return {
    todos,
    filterTodos,
    handleClearFilterTodos,
  };
}
