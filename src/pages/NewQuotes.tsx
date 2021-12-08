import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuoteForm from "../components/quotes/QuoteForm";
import { FIREBASE_DOMAIN } from "../store/index";

const NewQuotes: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const addQuoteHandler = async (quoteData: {
    author: string;
    text: string;
  }) => {
    try {
      // 요청시 웨이팅 state 설정
      setStatus(true);
      const response: { ok: boolean } = await axios.post(
        `${FIREBASE_DOMAIN}/quotes.json`,
        quoteData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        setStatus(true);
        throw new Error("Could not create quote!");
      } else {
        setStatus(true);
        navigate("/quotes");
      }
    } catch (error: any) {
      console.log("error: ", error);
      alert(error.message);
    }
  };

  return <QuoteForm isLoading={status} onAddQuote={addQuoteHandler} />;
};

export default NewQuotes;
