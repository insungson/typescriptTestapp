import React, { FormEvent, Fragment, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm: React.FC<{
  onAddQuote: (obj: { author: string; text: string }) => void;
  isLoading: boolean;
}> = ({ onAddQuote, isLoading }) => {
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const authorInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

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

  return <Fragment></Fragment>;
};

export default QuoteForm;
