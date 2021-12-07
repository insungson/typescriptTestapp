import React, { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppSelector, API_KEY, googleapisType } from "../../store/index";

import classes from "./ProfileForm.module.css";

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const token = useAppSelector((state) => state.auth.token);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredNewPassword =
      newPasswordInputRef.current?.value.trim() !== ""
        ? newPasswordInputRef.current!.value
        : null;
    if (enteredNewPassword === null) {
      return alert("plz.. write a good password!!");
    }
    try {
      const resData = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false, //다시 id와 새로운 token 을 reponse로 받을건지에 대한 boolean값
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("resData: ", resData);
    } catch (error: any) {
      console.log("error: ", error);
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        {/* 아래와 같이 minLength 로 들어갈 최소갯수를 넣어주면 이부분은 유효성검사를 할필요가 없다 */}
        <input
          type="password"
          id="new-password"
          // minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
