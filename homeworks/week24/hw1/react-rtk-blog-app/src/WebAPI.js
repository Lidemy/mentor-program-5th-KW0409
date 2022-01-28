import { getUserAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

// 取得目前頁數的文章
export const getPosts = (currentPage, pageLimit, usePlace) => {
  const startNum = (currentPage - 1) * pageLimit;
  return fetch(
    `${BASE_URL}/posts?_start=${startNum}&_limit=${pageLimit}&_sort=createdAt&_expand=user&_order=desc`
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(`getPosts Err(${usePlace}):`, err.toString());
    });
};

// 取得指定文章
export const getArticle = (id, usePlace) => {
  return fetch(`${BASE_URL}/posts?id=${id}&_expand=user`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(`getArticle Err(${usePlace}):`, err.toString());
    });
};

// 更新指定文章
export const updateArticle = (id, data, usePlace) => {
  const [title, body] = data;

  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`updateArticle Err(${usePlace}):`, err.toString());
    });
};

// 刪除指定文章
export const deleteArticle = (id, usePlace) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`deleteArticle Err(${usePlace}):`, err.toString());
    });
};

// 登入（獲得 token）
export const login = (data, usePlace) => {
  const [username, password] = data;

  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`login Err(${usePlace}):`, err.toString());
      return { ok: 0 };
    });
};

// 註冊（獲得 token）
export const register = (data, usePlace) => {
  const [nickname, username, password] = data;

  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`register Err(${usePlace}):`, err.toString());
      return { ok: 0 };
    });
};

// 身份驗證(用 token 驗證，取得使用者完整資料)
export const getUserData = (token, usePlace) => {
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`getUserData Err(${usePlace}):`, err.toString());
      return { ok: 0 };
    });
};

// 發佈文章
export const postArticle = (data, usePlace) => {
  const token = getUserAuthToken();
  const [title, body] = data;

  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`postArticle Err(${usePlace}):`, err.toString());
      return { ok: 0 };
    });
};
