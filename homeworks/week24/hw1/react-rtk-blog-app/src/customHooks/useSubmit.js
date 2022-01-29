import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsLoadingPost } from "../redux/selectors";

export default function useSubmit(inputRefArr) {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(selectIsLoadingPost);

  const navigate = useNavigate();

  const submitCheck = (e, error, setError, emptyErrorMsg) => {
    e.preventDefault();
    if (error) dispatch(setError(null));

    const emptyInput = inputRefArr.find((inputRef) => !inputRef.current.value);
    if (emptyInput) {
      emptyInput.current.focus();
      dispatch(setError(`${emptyErrorMsg}`));
      return false;
    }

    const inputValueArr = inputRefArr.map((inputRef) => inputRef.current.value);
    return inputValueArr;
  };

  return {
    dispatch,
    isLoadingPost,
    navigate,
    submitCheck,
  };
}
