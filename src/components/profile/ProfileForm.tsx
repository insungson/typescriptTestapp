import React, {FormEvent, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAppSelector, API_KEY, googleapisType} from '../../store/index';

import classes from './ProfileForm.module.css';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const token = useAppSelector(state => state.auth.token);

  const submitHandler = async(event: FormEvent) => {
    event.preventDefault();
    
    const enteredPassword = newPasswordInputRef.current?.value.trim() !== '' ? newPasswordInputRef.current!.value : null;
    if (enteredPassword === null) {
      alert('PLZ.. insert Password!');
      return ;
    }
    try {
      const resData: {data: googleapisType} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
        idToken: token,
        password: enteredPassword,
        returnSecureToken: false, //다시 id와 새로운 token 을 reponse로 받을건지에 대한 boolean값
      }, {
        headers: {"Content-Type": "application/json"}
      });
      
      
    } catch (error:any) {
      console.log('error: ', error);
      alert(error.message);
    }

  };

  return ();
};

export default ProfileForm;