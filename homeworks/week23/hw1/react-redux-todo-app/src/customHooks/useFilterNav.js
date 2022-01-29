import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilterValue } from "../redux/selectors";
import { changeFilter } from "../redux/actions";

export default function useFilterNav() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);

  const handleNavClick = useCallback(
    (e) => {
      return dispatch(changeFilter(e.target.innerText));
    },
    [dispatch]
  );
  const navArr = useMemo(() => ["All", "Done", "Todo"], []);

  return {
    navArr,
    filterValue,
    handleNavClick,
  };
}
