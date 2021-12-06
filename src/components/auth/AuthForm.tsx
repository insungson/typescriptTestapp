import { useState, useRef, FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useAppSelector,
  useAppDispatch,
  API_KEY,
  googleapisType,
} from "../../store/index";
import { logIn } from "../../store/auth-slice";
import { useDispatch } from "react-redux";

import classes from "./AuthForm.module.css";

const fireBaseAuthURL = (isLogIn: boolean) => {
  return isLogIn
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
};

const AuthForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value.match(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    )
      ? emailInputRef.current?.value
      : null;
    const enteredPassword =
      passwordInputRef.current?.value.trim() !== ""
        ? passwordInputRef.current?.value
        : null;

    setIsLoading(true);

    try {
      const resData: { data: googleapisType } = await axios.post(
        fireBaseAuthURL(isLogin),
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = resData.data;
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      // useAppDispatch(logIn({token: data.idToken, expirationTime: expirationTime.toISOString()})); // 이건 왜 안되는지 모르겠다..ㅠ.ㅠ
      dispatch(
        logIn({
          token: data.idToken,
          expirationTime: expirationTime.toISOString(),
        })
      );
      navigate("/", { replace: true }); //history.replace('/') 와 같은 코드이다. 버전업하면서 바뀜
    } catch (error: any) {
      // error: AxiosError 로 넣으려고 했는데.. 방법을 모르겠다..ㅠ.ㅠ
      console.log("error: ", error);
      alert(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
