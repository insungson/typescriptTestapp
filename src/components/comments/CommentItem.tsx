import React from "react";
import classes from "./CommentItem.module.css";

const CommentItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <li className={classes.item}>
      <p>{text}</p>
    </li>
  );
};

export default CommentItem;
