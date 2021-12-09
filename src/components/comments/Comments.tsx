import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import classes from "./Comments.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import { FIREBASE_DOMAIN, useAppSelector } from "../../store/index";
import { getcomments } from "../../store/quotes-slice";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments: React.FC = () => {
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [isReqCommentsList, setIsReqCommentsList] = useState<boolean>(false);
  const params = useParams();
  const dispatch = useDispatch();

  const commentsList = useAppSelector((state) => state.quotes.comments);

  const { quoteId } = params;
  console.log("comments quoteId: ", quoteId);

  // comment리스트를 요청하는 async 함수를 따로 만들어야 한다!
  const requestCommentList = useCallback(
    async (quoteId: string) => {
      try {
        setIsReqCommentsList(false);
        const response = await axios.get(
          `${FIREBASE_DOMAIN}/comments/${quoteId}.json`
        );
        if (response.status === 200) {
          setIsAddingComment(true);
          dispatch(getcomments({ data: response.data }));
        } else {
          throw new Error("Get CommentList Error Occur!");
        }
      } catch (error: any) {
        setIsAddingComment(true);
        console.log("error: ", error);
        alert(error.message);
      }
    },
    [dispatch, quoteId, getcomments]
  );

  //게시글 아디가 바뀔때마다 요청, reducer 에 적용
  useEffect(() => {
    if (quoteId) {
      requestCommentList(quoteId);
    }
  }, [requestCommentList, quoteId]);

  const startAddHandler = () => {
    setIsAddingComment(true);
  };
  const closeCommentFormHandler = () => {
    setIsAddingComment(false);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && quoteId && (
        <NewCommentForm
          quoteId={quoteId}
          onClosedCommentForm={closeCommentFormHandler}
          onReqAllComments={requestCommentList}
        />
      )}
      {isReqCommentsList && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isReqCommentsList && commentsList.length > 0 ? (
        <CommentsList comments={commentsList} />
      ) : (
        <p className="centered">No comments were added yet!</p>
      )}
    </section>
  );
};

export default Comments;
