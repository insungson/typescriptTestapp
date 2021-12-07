import React, { Fragment } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { quotesState } from "../../store/quotes-slice";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// sort 함수
const sortQuotes = (quotes: quotesState[], ascending: boolean) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList: React.FC<{ quotes: quotesState[] }> = ({ quotes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location: ", location);

  const queryParams = new URLSearchParams(location.search);
  console.log('queryParams.get("sort"): ', queryParams.get("sort"));

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // useHistory 대신 아래의 방식을 사용한다.
    navigate(
      `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    );
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
