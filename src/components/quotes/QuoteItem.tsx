import React from "react";
import { Link } from "react-router-dom";
import { quotesState } from "../../store/quotes-slice";
import classes from "./QuoteItem.module.css";

const QuoteItem: React.FC<quotesState> = ({ id, author, text }) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <Link className="btn" to={`/quotes/${id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
