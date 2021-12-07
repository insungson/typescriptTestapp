import React, { ReactNode } from "react";
import classes from "./Card.module.css";

//props.children 을 넘기는 경우!! 는 아래와 같이 처리하면 된다
const Card: React.FC<ReactNode> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
