import React from "react";
import CommentItem from "./CommentItem";
import { commentState } from "../../store/quotes-slice";

import classes from "./CommentsList.module.css";

const CommentsList: React.FC<{ comments: commentState[] }> = ({ comments }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
