import { createSlice } from "@reduxjs/toolkit";

import {
  getUserData as getUserDataAPI,
  login as loginAPI,
  register as registerAPI,
} from "../../WebAPI";
import { setUserAuthToken } from "../../utils";
import { setIsLoadingPost } from "../features/postSlice";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoadingUser: false,
    user: null,
    error: null,
  },
  reducers: {
    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setIsLoadingUser, setUser, setError } = userSlice.actions;

export const getUser = (token, usePlace) => (dispatch) => {
  if (!token) return;

  dispatch(setIsLoadingUser(true));
  getUserDataAPI(token, usePlace).then((resp) => {
    if (!resp.ok) {
      if (!resp.message) {
        alert(`很抱歉，因伺服器異常無法獲取使用者資料，請在稍候重新登入`);
      }
      setUserAuthToken("");
    }
    dispatch(setUser(resp.data));
    dispatch(setIsLoadingUser(false));
  });
};

export const userLogin = (submitData, usePlace, navigate) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  loginAPI(submitData, usePlace).then((data) => {
    if (!data.ok) {
      if (!data.message) {
        alert(`很抱歉，因伺服器異常導致無法成功登入，請在稍候重試`);
      }
      dispatch(setError(data.message));
      return dispatch(setIsLoadingPost(false));
    }
    alert("登入成功！點擊確認後，系統將為您導向首頁！");

    getUserDataAPI(data.token, usePlace).then((resp) => {
      if (!resp.ok) {
        if (!resp.message) {
          alert(`很抱歉，因伺服器異常無法獲取使用者資料，請在稍候重新登入`);
        }
        dispatch(setError(resp.message));
        setUserAuthToken("");
        return dispatch(setIsLoadingPost(false));
      }
      setUserAuthToken(data.token); // 放在這邊是避免因 getUserData 出問題而出現兩次 alert(App, LoginPage)
      navigate("/"); // 這邊因為成功登入後會導向 HomePage，所以不用 setIsLoadingPost(false)
    });
  });
};

export const userRegister = (submitData, usePlace, navigate) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  registerAPI(submitData, usePlace).then((data) => {
    if (!data.ok) {
      if (!data.message) {
        alert(`很抱歉，因伺服器異常導致無法成功註冊，請在稍候重試`);
      }
      dispatch(setError(data.message));
      return dispatch(setIsLoadingPost(false));
    }
    alert("恭喜註冊成功！點擊確認後，系統將自動為您登入帳戶！");

    getUserDataAPI(data.token, usePlace).then((resp) => {
      if (!resp.ok) {
        if (!resp.message) {
          alert(`很抱歉，因伺服器異常無法獲取使用者資料，請在稍候重新登入`);
        }
        dispatch(setError(resp.message));
        setUserAuthToken("");
        return dispatch(setIsLoadingPost(false));
      }
      setUserAuthToken(data.token); // 放在這邊是避免因 getUserData 出問題而出現兩次 alert(App, LoginPage)
      navigate("/"); // 這邊因為成功登入後會導向 HomePage，所以不用 setIsLoadingPost(false)
    });
  });
};

export const userLogout = () => (dispatch) => {
  setUserAuthToken("");
  dispatch(setUser(null));
};

export default userSlice.reducer;
