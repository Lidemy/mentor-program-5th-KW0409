import styled from "styled-components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  AboutPage,
  ArticlePage,
  UpdatePostPage,
  NewPostPage,
} from "../../pages";
import Header from "../Header";
import Loader from "../Loader";

import { getUserAuthToken } from "../../utils";
import { getUser } from "../../redux/features/userSlice";
import { selectIsLoadingPost } from "../../redux/selectors";

const Root = styled.div`
  padding-top: 64px;
  height: 100%;
`;

export default function App() {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(selectIsLoadingPost);

  const token = getUserAuthToken();

  useEffect(() => {
    dispatch(getUser(token, "App"));
  }, [token, dispatch]);

  return (
    <Root>
      <Router>
        <Header />
        {isLoadingPost && <Loader />}
        <Routes>
          {/*
                Switch: 確保只會匹配第一個符合網址列的路由，exact path 代表完整匹配；若只有 path 是部分匹配
                在 react-router v6 之後 Routes 取代了 Switch 的作用
                且 v6 版本也不再需要特別用 exact path 了，因為 v6 的 path 已經會自己匹配最符合的目標
              */}
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/posts/:id" element={<ArticlePage />}></Route>
          <Route path="/update-post" element={<UpdatePostPage />}></Route>
          <Route path="/new-post" element={<NewPostPage />}></Route>
        </Routes>
      </Router>
    </Root>
  );
}
