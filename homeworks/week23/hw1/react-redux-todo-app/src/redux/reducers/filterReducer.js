import { CHANGE_FILTER } from "../actionType";

const initialState = {
  filterValue: "All",
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTER: {
      return {
        filterValue: action.payload.value,
      };
    }

    default: {
      return state;
    }
  }
}
