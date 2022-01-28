import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostList from "./PostList";
import Pagination from "../../components/Pagination";

import { getPosts } from "../../redux/features/postSlice";
import {
  selectIsLoadingPost,
  selectLimitPosts,
  selectCurrentPage,
  selectPostError,
} from "../../redux/selectors";

const Root = styled.div`
  width: 80%;
  max-width: 850px;
  margin: 0 auto;
  padding-top: 48px;
`;

const ErrorMsg = styled.h2`
  color: red;
  text-align: center;
`;

const EmptyMessage = styled.h2`
  color: red;
  text-align: center;
  white-space: pre-line;
`;

const MemoPostList = memo(PostList);
const MemoPagination = memo(Pagination);

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const limitPosts = useSelector(selectLimitPosts);
  const currentPage = useSelector(selectCurrentPage);
  const error = useSelector(selectPostError);

  const navigate = useNavigate();
  const pageLimit = 5;

  useEffect(() => {
    if (currentPage === 1) {
      navigate("/");
    } else if (currentPage !== 1) {
      navigate(`/?page=${currentPage}`);
    }

    dispatch(getPosts(currentPage, pageLimit, "HomePage"));
  }, [currentPage, navigate, dispatch]);

  return (
    <>
      {!isLoadingPost && (
        <Root>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {limitPosts && limitPosts.length === 0 && (
            <EmptyMessage>
              {"~~~~~ 目前似乎還沒有任何文章呢 ~~~~~"}
            </EmptyMessage>
          )}
          {limitPosts && limitPosts.length !== 0 && (
            <>
              {limitPosts.map((post) => (
                <MemoPostList key={post.id} post={post} />
              ))}
              <MemoPagination />
            </>
          )}
        </Root>
      )}
    </>
  );
}
