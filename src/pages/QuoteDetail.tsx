import React, { Fragment, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useMatch,
  useParams,
  resolvePath,
} from "react-router-dom";
import axios from "axios";
import { FIREBASE_DOMAIN, useAppSelector } from "../store/index";
import { quotesState } from "../store/quotes-slice";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const QuoteDetail: React.FC = () => {
  const params = useParams();
  console.log("params: ", params);
  // {quoteId: '-MqHrY1HNPo8wKsg-FIe'}
  const match = useMatch({ path: "/quotes/:quoteId" });
  console.log("match: ", match);
  // params: {quoteId: '-MqHrY1HNPo8wKsg-FIe'}
  // pathname: "/quotes/-MqHrY1HNPo8wKsg-FIe"
  // pathnameBase: "/quotes/-MqHrY1HNPo8wKsg-FIe"
  // pattern: {path: '/quotes/:quoteId'}
  const match1 = resolvePath("/quotes");
  console.log("match1: ", match1);
  // hash: ""
  // pathname: "/quotes"
  // search: ""
  const match2 = useMatch({ path: "/quotes/:quoteId/comments" });
  console.log("match2: ", match2);

  const { quoteId } = params;
  // 싱글게시글 정보 state
  const quoteLists = useAppSelector((state) => state.quotes.quotes);
  const singleQuote = quoteLists.find((quote) => quote.id === quoteId);
  // const [singleQuoteInfo, setSingleQuoteInfo] = useState<quotesState>();

  return (
    <Fragment>
      {singleQuote && (
        <>
          <HighlightedQuote
            text={singleQuote.text}
            author={singleQuote.author}
          />
          <div className="centered">
            <Link className="btn--flat" to={`${match?.pathname}/comments`}>
              Load Comments
            </Link>
          </div>
          {match2 !== null && <Comments />}
        </>
      )}
      {/* <Routes>
        <Route path={`${match?.pathname}`}>
          <div className="centered">
            <Link className="btn--flat" to={`${match?.pathname}/comments`}>
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`${match?.pathname}/comments`} element={<Comments />} />
      </Routes> */}
    </Fragment>
  );
};

export default QuoteDetail;
