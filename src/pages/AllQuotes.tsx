import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, FIREBASE_DOMAIN } from "../store/index";
import { getAllQuotes } from "../store/quotes-slice";
import axios from "axios";

import QuoteList from "../components/quotes/QuoteList";
import NoQuoteFound from "../components/quotes/NoQuotesFound";

const AllQuotes: React.FC = () => {
  const dispatch = useDispatch();
  const quotesList = useAppSelector((state) => state.quotes.quotes);

  useEffect(() => {
    const temp = async () => {
      const response = await axios.get(`${FIREBASE_DOMAIN}/quotes.json`);
      console.log("response: ", response);
      dispatch(getAllQuotes({ data: response.data }));
    };
    temp();
    console.log("quotesList111: ", quotesList);
  }, [dispatch]);

  return (
    <React.Fragment>
      {quotesList.length !== 0 ? (
        <QuoteList quotes={quotesList} />
      ) : (
        <NoQuoteFound />
      )}
    </React.Fragment>
  );
};

export default AllQuotes;
