import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentPagePrev,
  setCurrentPageNext,
  setCurrentPage,
} from "../redux/features/postSlice";
import { selectCurrentPage, selectTotalPage } from "../redux/selectors";

export default function usePagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPage = useSelector(selectTotalPage);

  const totalPageArray = useMemo(() => {
    return Array.from({ length: totalPage }, (item, index) => index + 1);
  }, [totalPage]);

  const slicePageArray = useMemo(() => {
    if (currentPage < 6) return totalPageArray.slice(0, 6);
    else if (currentPage > totalPage - 5)
      return totalPageArray.slice(totalPage - 6);
    else return totalPageArray.slice(currentPage - 2, currentPage + 1);
  }, [currentPage, totalPage, totalPageArray]);

  const handleChangePage = useCallback(
    (pageButtonValue) => {
      switch (pageButtonValue) {
        case "prev":
          return dispatch(setCurrentPagePrev());

        case "next":
          return dispatch(setCurrentPageNext());

        default:
          return dispatch(setCurrentPage(pageButtonValue));
      }
    },
    [dispatch]
  );

  return {
    currentPage,
    totalPage,
    totalPageArray,
    slicePageArray,
    handleChangePage,
  };
}
