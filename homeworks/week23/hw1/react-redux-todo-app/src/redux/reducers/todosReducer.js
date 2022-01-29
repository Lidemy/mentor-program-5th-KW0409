import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  CLEAR_FILTER_TODO,
} from "../actionType";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};
const initTodosLength = initialState.todos.length;
let todoId = initTodosLength ? initTodosLength : 0;

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false,
            isEditable: false,
          },
        ],
      };
    }

    case DELETE_TODO: {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case TOGGLE_TODO: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }

    case EDIT_TODO: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isEditable: !todo.isEditable,
          };
        }),
      };
    }

    case UPDATE_TODO: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            content: action.payload.content,
            isEditable: !todo.isEditable,
          };
        }),
      };
    }

    case CLEAR_FILTER_TODO: {
      const filterValue = action.payload.filterValue;
      return {
        todos: state.todos.filter((todo) => {
          if (filterValue === "All") return !todo;
          if (filterValue === "Done") return !todo.isDone;
          if (filterValue === "Todo") return todo.isDone;
        }),
      };
    }

    default: {
      return state;
    }
  }
}
