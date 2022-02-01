import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilterValue } from "../redux/selectors";
import { changeFilter } from "../redux/actions";

const navArr = ["All", "Done", "Todo"];

export default function useFilterNav() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);

  const handleNavClick = useCallback(
    (e) => {
      return dispatch(changeFilter(e.target.innerText));
    },
    [dispatch]
  );

  return {
    navArr,
    filterValue,
    handleNavClick,
  };
}
