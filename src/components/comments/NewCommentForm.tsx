import React, { FormEvent, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 아래 주석처리한건 상위 컴포넌트로 올릴것!.. 그냥 상위에서 commentList 요청하는 함수를 받아서 여기서 실행하자!!
import axios from "axios";

import { FIREBASE_DOMAIN } from "../../store/index";
import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

const NewCommentForm: React.FC<{
  onClosedCommentForm: () => void;
  quoteId: string;
  onReqAllComments: (id: string) => void;
}> = ({ onClosedCommentForm, quoteId, onReqAllComments }) => {
  const params = useParams();
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredText =
      commentTextRef.current?.value.trim() !== ""
        ? commentTextRef.current!.value
        : null;
    if (enteredText !== null) {
      try {
        setIsRequesting(true);
        const resData = await axios.post(
          `${FIREBASE_DOMAIN}/comments/${quoteId}.json`,
          { text: enteredText },
          { headers: { "Content-Type": "application/json" } }
        );
        if (resData.status === 200) {
          onClosedCommentForm();
          setIsRequesting(false);
          onReqAllComments(quoteId);
        } else {
          throw new Error("comment add Error Occur!");
        }
      } catch (error: any) {
        setIsRequesting(false);
        console.log("error: ", error);
        alert(error.message);
      }
    } else {
      return alert("plz.. write a word!");
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {isRequesting && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows={5} ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
