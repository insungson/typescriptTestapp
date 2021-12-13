import React, { FormEvent, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 아래 주석처리한건 상위 컴포넌트로 올릴것!.. 그냥 상위에서 commentList 요청하는 함수를 받아서 여기서 실행하자!!
import axios from "axios";
import { useDispatch } from "react-redux";

import { FIREBASE_DOMAIN, useAppSelector } from "../../store/index";
import { postCommentsReq } from "../../store/quotes-slice";
import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

const NewCommentForm: React.FC<{
  onClosedCommentForm: () => void;
  quoteId: string;
  onReqAllComments: (id: string) => void;
}> = ({ onClosedCommentForm, quoteId, onReqAllComments }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  // const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const {
    postResult,
    loading: isPostRequesting,
    error: isPostRequestingError,
  } = useAppSelector((state) => state.quotes.comments);

  // postComment 가 완료될때!! ALlCommentsReq 실행!
  useEffect(() => {
    if (postResult && quoteId) {
      onReqAllComments(quoteId);
      onClosedCommentForm();
    }
  }, [postResult, onReqAllComments, quoteId]);

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredText =
      commentTextRef.current?.value.trim() !== ""
        ? commentTextRef.current!.value
        : null;
    if (enteredText !== null) {
      dispatch(postCommentsReq({ quoteId: quoteId, text: enteredText }));
      // // 기존의 axios 요청 -> saga 요청으로 바꿈
      // try {
      //   setIsRequesting(true);
      //   const resData = await axios.post(
      //     `${FIREBASE_DOMAIN}/comments/${quoteId}.json`,
      //     { text: enteredText },
      //     { headers: { "Content-Type": "application/json" } }
      //   );
      //   if (resData.status === 200) {
      //     onClosedCommentForm();
      //     setIsRequesting(false);
      //     onReqAllComments(quoteId);
      //   } else {
      //     throw new Error("comment add Error Occur!");
      //   }
      // } catch (error: any) {
      //   setIsRequesting(false);
      //   console.log("error: ", error);
      //   alert(error.message);
      // }
    } else {
      return alert("plz.. write a word!");
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {isPostRequesting && ( // 기존의 isRequesting -> isPostRequesting 변경
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
