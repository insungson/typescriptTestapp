import React from "react";
import classes from "./HighlightedQuote.module.css";

const HighlightedQuote: React.FC<{ text: string; author: string }> = ({
  text,
  author,
}) => {
  return (
    <figure className={classes.quote}>
      <p>{text}</p>
      <figcaption>{author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
