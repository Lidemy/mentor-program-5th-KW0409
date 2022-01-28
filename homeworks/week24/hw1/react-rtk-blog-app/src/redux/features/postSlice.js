import { createSlice } from "@reduxjs/toolkit";

import {
  getPosts as getPostsAPI,
  getArticle as getArticleAPI,
  updateArticle as updateArticleAPI,
  deleteArticle as deleteArticleAPI,
  postArticle as postArticleAPI,
} from "../../WebAPI";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    article: null,
    limitPosts: null,
    totalPage: 1,
    currentPage: 1,
    error: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setArticle: (state, action) => {
      state.article = action.payload;
    },

    setLimitPosts: (state, action) => {
      state.limitPosts = action.payload;
    },

    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },

    setCurrentPagePrev: (state, action) => {
      state.currentPage -= 1;
    },
    setCurrentPageNext: (state, action) => {
      state.currentPage += 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setArticle,
  setLimitPosts,
  setTotalPage,
  setCurrentPagePrev,
  setCurrentPageNext,
  setCurrentPage,
  setError,
} = postSlice.actions;

export const getPosts = (currentPage, pageLimit, usePlace) => (dispatch) => {
  dispatch(setError(null));
  dispatch(setIsLoadingPost(true));
  getPostsAPI(currentPage, pageLimit, usePlace)
    .then((resp) => {
      if (!resp) return null;

      const totalCount = resp.headers.get("x-total-count");
      dispatch(setTotalPage(Math.ceil(totalCount / pageLimit)));
      return resp.json();
    })
    .then((datas) => {
      if (!datas) {
        dispatch(
          setError(
            `\u26A0 很抱歉，因伺服器異常，導致目前無法獲得所有文章，請在稍候重整頁面 \u26A0`
          )
        );
      }
      dispatch(setLimitPosts(datas));
      dispatch(setIsLoadingPost(false));
    });
};

export const getArticle = (id, usePlace) => (dispatch) => {
  dispatch(setError(null));
  dispatch(setIsLoadingPost(true));

  getArticleAPI(id, usePlace).then((data) => {
    // 有文章內容 => data 會是 [ {...} ]
    // 沒有文章內容 => data 會是 []
    // .catch => data 會是 null
    dispatch(setArticle(data));
    if (!data) {
      dispatch(
        setError(
          `\u26A0 很抱歉，因伺服器異常，導致目前無法獲取此文章內容，請在稍候重整頁面 \u26A0`
        )
      );
    }
    dispatch(setIsLoadingPost(false));
  });
};

export const updateArticle =
  (id, submitData, usePlace, navigate) => (dispatch) => {
    dispatch(setIsLoadingPost(true));
    updateArticleAPI(id, submitData, usePlace).then((data) => {
      if (!data) {
        // 基本上只有 .catch 時會出錯，data 會是 undefined
        alert(`很抱歉，因伺服器異常導致更新文章失敗，請在稍候重試`);
        return dispatch(setIsLoadingPost(false));
      }
      alert("文章更新成功！點擊確認後，將為您導向文章頁面！");
      navigate(`/posts/${data.id}`);
    });
  };

export const deleteArticle = (id, usePlace, navigate) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  deleteArticleAPI(id, usePlace).then((data) => {
    dispatch(setIsLoadingPost(false));
    if (!data) {
      // 刪除成功只會回傳空物件，失敗則 undefined
      return alert(`很抱歉，因伺服器異常導致刪除文章失敗，請在稍候重試`);
    }
    alert("文章刪除成功！點擊確認後，將為您導回首頁！");
    navigate("/");
  });
};

export const newPost = (submitData, usePlace, navigate) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  postArticleAPI(submitData, usePlace).then((data) => {
    if (data.ok === 0) {
      if (!data.message) {
        alert(`很抱歉，因伺服器異常導致發布文章失敗，請在稍候重試`);
      }
      dispatch(setError(data.message));
      return dispatch(setIsLoadingPost(false));
    }
    alert("文章發佈成功！點擊確認後，將為您導向文章頁面！");
    navigate(`/posts/${data.id}`);
  });
};

export default postSlice.reducer;
