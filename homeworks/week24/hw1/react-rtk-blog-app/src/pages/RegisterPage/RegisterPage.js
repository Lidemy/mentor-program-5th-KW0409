import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

import useSubmit from "../../customHooks/useSubmit";
import { setError, userRegister } from "../../redux/features/userSlice";
import { selectUserError } from "../../redux/selectors";

const Root = styled.div`
  padding: 50px 0;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.form`
  padding: 28px 24px;
  width: 400px;
  background: #fffffb;
  color: rgba(152, 152, 152, 1);
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const RegisterTitle = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`;

const RegisterInput = styled.div`
  span {
    font-size: 20px;
  }

  input {
    margin-top: 5px;
    padding: 5px 10px;
    width: 100%;
    height: 2.5rem;
    display: block;
    font-size: 16px;
    background: rgb(232, 240, 254);
    outline: none;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgb(10 10 10 / 5%) 0px 0.0625em 0.125em inset;
  }

  & + & {
    margin-top: 20px;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  white-space: pre-line;
`;

const RegisterSubmit = styled.div`
  margin-top: 25px;
  text-align: center;

  button {
    color: #8b7272;
    font-size: 16px;
    padding: 6px 26px;
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

const RegisterLink = styled.div`
  padding-top: 20px;
  text-align: center;

  a {
    text-decoration: none;
    color: rgb(66, 139, 202);
  }
`;

export default function RegisterPage() {
  const nicknameInputRef = useRef();
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const { dispatch, isLoadingPost, navigate, submitCheck } = useSubmit([
    nicknameInputRef,
    userInputRef,
    passwordInputRef,
  ]);

  const error = useSelector(selectUserError);

  const handleSubmit = (e) => {
    const emptyErrorMsg = "username, password and nickname are required";
    const submitData = submitCheck(e, error, setError, emptyErrorMsg);
    if (!submitData) return;

    dispatch(userRegister(submitData, "RegisterPage", navigate));
  };

  return (
    <>
      {!isLoadingPost && (
        <Root>
          <RegisterForm onSubmit={handleSubmit}>
            <RegisterTitle>註冊</RegisterTitle>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <RegisterInput>
              <span>Nickname</span>
              <input ref={nicknameInputRef} />
            </RegisterInput>
            <RegisterInput>
              <span>Username</span>
              <input ref={userInputRef} />
            </RegisterInput>
            <RegisterInput>
              <span>Password</span>
              <input type="password" ref={passwordInputRef} />
            </RegisterInput>
            <RegisterSubmit>
              <button>確認</button>
            </RegisterSubmit>
            <RegisterLink>
              已經有帳戶了？ <Link to="/login">立即登入</Link>
            </RegisterLink>
          </RegisterForm>
        </Root>
      )}
    </>
  );
}
