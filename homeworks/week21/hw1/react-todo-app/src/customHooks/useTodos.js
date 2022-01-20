import {
  useRef,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { FilterContext } from "../filterContext";

function writeTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export default function useTodos() {
  const id = useRef(0);
  const isFirstRender = useRef(true);

  const [todos, setTodos] = useState(() => {
    let todosData = JSON.parse(localStorage.getItem("todos")) || [];
    if (todosData.length) {
      id.current = todosData.length;
    }
    return todosData;
  });

  const filterValue = useContext(FilterContext);
  console.log("filterValue(useTodos):", filterValue);
  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filterValue === "All") return todo;
      if (filterValue === "Done") return todo.isDone;
      if (filterValue === "Todo") return !todo.isDone;
    });
  }, [todos, filterValue]);

  useEffect(() => {
    if (isFirstRender.current) return (isFirstRender.current = false);
    console.log("useEffect(TodoContainer)");
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = useCallback(
    (content) => {
      setTodos([
        ...todos,
        {
          id: id.current,
          content,
          isDone: false,
          isEditable: false,
        },
      ]);
      id.current++;
    },
    [todos, setTodos]
  );

  const handleToggleIsDone = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    },
    [todos, setTodos]
  );

  const handleToggleIsEditable = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isEditable: !todo.isEditable,
          };
        })
      );
    },
    [todos, setTodos]
  );

  const handleUpdateTodo = useCallback(
    (id, content) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            content,
            isEditable: !todo.isEditable,
          };
        })
      );
    },
    [todos, setTodos]
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos, setTodos]
  );

  const handleClearFilterTodos = () => {
    setTodos(
      todos.filter((todo) => {
        if (filterValue === "All") return !todo;
        if (filterValue === "Done") return !todo.isDone;
        if (filterValue === "Todo") return todo.isDone;
      })
    );
  };

  return {
    todos,
    setTodos,
    filterTodos,
    handleAddTodo,
    handleToggleIsDone,
    handleToggleIsEditable,
    handleUpdateTodo,
    handleDeleteTodo,
    handleClearFilterTodos,
  };
}
