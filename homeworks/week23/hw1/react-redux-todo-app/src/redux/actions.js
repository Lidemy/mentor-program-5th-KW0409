import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  CLEAR_FILTER_TODO,
  CHANGE_FILTER,
} from "./actionType";

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function editTodo(id) {
  return {
    type: EDIT_TODO,
    payload: {
      id,
    },
  };
}

export function updateTodo(id, content) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      content,
    },
  };
}

export function clearFilterTodo(filterValue) {
  return {
    type: CLEAR_FILTER_TODO,
    payload: {
      filterValue,
    },
  };
}

export function changeFilter(value) {
  return {
    type: CHANGE_FILTER,
    payload: {
      value,
    },
  };
}
