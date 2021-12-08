import React, { FormEvent, Fragment, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm: React.FC<{
  onAddQuote: (obj: { author: string; text: string }) => void;
  isLoading: boolean;
}> = ({ onAddQuote, isLoading }) => {
  const location = useLocation();
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const authorInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  //폼이 포커스 상태일때 다른 버튼 클릭시 경고창 뜨는 로직
  //기존의 V5에선 <Prompt /> 가 존재하지만.. V6는 없기때문에 만듬!
  useEffect(() => {
    if (isEntering && location.pathname !== "/new-quote") {
      alert("Are you really trying to leave this page? this text will be lost");
    }
  }, [location, isEntering]);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredAuthor =
      authorInputRef.current?.value.trim() !== ""
        ? authorInputRef.current!.value
        : null;
    const enteredText =
      textInputRef.current?.value.trim() !== ""
        ? textInputRef.current!.value
        : null;
    if (enteredAuthor !== null && enteredText !== null) {
      onAddQuote({ author: enteredAuthor, text: enteredText });
    } else {
      alert("plz.. fill iT!!");
    }
  };

  const formFocusedHandler = () => {
    console.log("Focus!!");
    setIsEntering(true);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <Fragment>
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows={5} ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
