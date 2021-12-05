import {useState, useRef, FC, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import axios, {AxiosError, AxiosResponse, } from 'axios';
import {useAppSelector, useAppDispatch} from '../../store/index';


import classes from './AuthForm.module.css';
import { url } from 'inspector';

type googleapisType = {
  localId: string,
  email: string,
  displayName: string,
  idToken: string,
  registered: boolean,
  refreshToken: string
  expiresIn: string
};

const API_KEY = 'AIzaSyBwuX3ywjJQxmnljVptj8b8ERxX7SlKLAk';
const fireBaseAuthURL = (isLogIn: boolean) => {
  return isLogIn
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}` ;
};

const AuthForm: FC = () => {
  const navigation = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async(event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i) ? emailInputRef.current?.value : null;
    const enteredPassword = passwordInputRef.current?.value.trim() !== '' ? passwordInputRef.current?.value : null;

    setIsLoading(true);
    
    try {
      const data: googleapisType = await axios.post(fireBaseAuthURL(isLogin), {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
      
    } catch (error: AxiosError) {
      console.log('error: ',error);
      alert(error.message);
    }
    
  };

  return ();
};

export default AuthForm;