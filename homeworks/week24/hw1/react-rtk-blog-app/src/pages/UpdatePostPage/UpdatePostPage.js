import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import useSubmit from "../../customHooks/useSubmit";
import { setError, updateArticle } from "../../redux/features/postSlice";
import {
  selectUser,
  selectArticle,
  selectPostError,
} from "../../redux/selectors";

const Root = styled.div`
  padding: 50px 0;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpdatePostForm = styled.form`
  padding: 28px 24px;
  width: 750px;
  background: #fffffb;
  color: rgba(152, 152, 152, 1);
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
  white-space: pre-line;
`;

const UpdatePostTitle = styled.div`
  margin: 0;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`;

const UpdatePostContent = styled.div`
  span {
    font-size: 20px;
  }

  textarea,
  input {
    margin-top: 10px;
    padding: 5px 10px;
    width: 100%;
    height: 2.5rem;
    display: block;
    font-size: 16px;
    background: rgb(235, 240, 255, 0.5);
    outline: none;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgb(10 10 10 / 5%) 0px 0.0625em 0.125em inset;
  }

  textarea:focus,
  input:focus {
    background: transparent;
    border: 2px solid rgb(205, 225, 255);
  }

  textarea {
    padding: 10px 15px;
    height: 550px;
    resize: none;
  }

  & + & {
    margin-top: 35px;
  }
`;

const UpdatePostSubmit = styled.div`
  padding-top: 35px;
  text-align: center;

  button {
    color: #8b7272;
    font-size: 16px;
    padding: 12px 28px;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
  }

  button:hover {
    cursor: pointer;
    color: #fff;
    background: #8b7272;
  }

  button:active {
    transform: scale(0.9);
  }
`;

export default function UpdatePostPage() {
  const titleInputRef = useRef();
  const contentTextareaRef = useRef();
  const { dispatch, isLoadingPost, navigate, submitCheck } = useSubmit([
    titleInputRef,
    contentTextareaRef,
  ]);

  const user = useSelector(selectUser);
  const article = useSelector(selectArticle);
  const error = useSelector(selectPostError);

  const handleSubmit = (e) => {
    const emptyErrorMsg = "title and body are required";
    const submitData = submitCheck(e, error, setError, emptyErrorMsg);
    if (!submitData) return;

    const yes = window.confirm("確認要更新文章嗎？");
    if (!yes) return;
    dispatch(
      updateArticle(article[0].id, submitData, "UpdatePostPage", navigate)
    );
  };

  useEffect(() => {
    if (!article) {
      alert("更新文章時，請勿重整頁面，將為您導向首頁！");
      return navigate("/");
    }
    if (user && user.username === article[0].user.username) return;
    alert("您沒有更改此文章的權限，請自重！");
    return navigate("/");
  }, [user, article, navigate]);

  return (
    <>
      {!isLoadingPost && (
        <Root>
          <UpdatePostForm onSubmit={handleSubmit}>
            <UpdatePostTitle>編輯文章</UpdatePostTitle>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <UpdatePostContent>
              <span>文章標題: </span>
              <input
                ref={titleInputRef}
                defaultValue={article && article[0].title}
              />
            </UpdatePostContent>
            <UpdatePostContent>
              <span>文章內容:</span>
              <textarea
                ref={contentTextareaRef}
                defaultValue={article && article[0].body}
              ></textarea>
            </UpdatePostContent>
            <UpdatePostSubmit>
              <button>確認更新</button>
            </UpdatePostSubmit>
          </UpdatePostForm>
        </Root>
      )}
    </>
  );
}
