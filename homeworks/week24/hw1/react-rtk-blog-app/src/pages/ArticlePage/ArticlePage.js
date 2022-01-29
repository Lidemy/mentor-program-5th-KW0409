import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getArticle, deleteArticle } from "../../redux/features/postSlice";
import {
  selectUser,
  selectIsLoadingPost,
  selectArticle,
  selectPostError,
} from "../../redux/selectors";

const ArticleContainer = styled.div`
  margin: 3rem auto;
  padding: 32px 24px;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  background: #fffffb;
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
`;

const ErrorMsg = styled.h2`
  color: red;
  text-align: center;
`;

const EmptyMessage = styled.h3`
  color: red;
  white-space: pre-line;
`;

const ArticleButton = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 5px 12px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  background: ${(props) =>
    props.$type === "edit" ? `rgb(33, 90, 188)` : `rgb(225, 50, 35)`};
  border: solid 1px #a8a8a8;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.9);
  }

  & + & {
    margin-left: 25px;
  }
`;

const ArticleTitle = styled.h1`
  margin: 0;
  width: 100%;
  color: rgb(70, 140, 200);
  font-size: 28px;
  font-family: monospace;
`;

const ArticleInfo = styled.div`
  padding: 15px 0;
  padding-top: 30px;
  border-bottom: 1px solid rgba(200, 185, 185, 1);
  display: flex;
  color: rgba(200, 185, 185, 1);

  div {
    i {
      margin-right: 5px;
    }
  }

  div + div {
    margin-left: 25px;
  }
`;

const ArticleDate = styled.div``;

const ArticleAuthor = styled.div``;

const ArticleTag = styled.div``;

const ArticleBody = styled.div`
  width: 100%;
  padding: 0px 5px;
  padding-top: 25px;
  color: rgba(152, 152, 152, 1);
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 1.3em;
  white-space: pre-line;
`;

export default function ArticlePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const article = useSelector(selectArticle);
  const error = useSelector(selectPostError);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate("/update-post");
  }, [navigate]);

  const handleDelete = useCallback(() => {
    let yes = window.confirm("確認要刪除文章嗎？");
    if (!yes) return;
    dispatch(deleteArticle(id, "ArticlePage", navigate));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    dispatch(getArticle(id, "ArticlePage"));
  }, [dispatch, id]);

  return (
    <>
      {!isLoadingPost && (
        <ArticleContainer>
          {error && !article && <ErrorMsg>{error}</ErrorMsg>}
          {article && article.length === 0 && (
            <EmptyMessage>{"您搜尋的文章不存在"}</EmptyMessage>
          )}
          {article && article.length !== 0 && (
            <>
              {user && user.username === article[0].user.username && (
                <ArticleButton>
                  <ActionButton $type="edit" onClick={handleEdit}>
                    編輯
                  </ActionButton>
                  <ActionButton $type="delete" onClick={handleDelete}>
                    刪除
                  </ActionButton>
                </ArticleButton>
              )}
              <ArticleTitle>{article[0].title}</ArticleTitle>
              <ArticleInfo>
                <ArticleDate>
                  <i className="fas fa-calendar-alt"></i>
                  {new Date(article[0].createdAt).toLocaleString()}
                </ArticleDate>
                <ArticleAuthor>
                  <i className="fas fa-user"></i>
                  {article[0].user.username}
                </ArticleAuthor>
                <ArticleTag>
                  <i className="fas fa-tags"></i>
                  Lidemy Student Test
                </ArticleTag>
              </ArticleInfo>
              <ArticleBody>{article[0].body}</ArticleBody>
            </>
          )}
        </ArticleContainer>
      )}
    </>
  );
}
