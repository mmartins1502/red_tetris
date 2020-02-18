import React from "react";

import Case from "./Case";

const classes = require("./Grid.module.css");

const Line = () => {
  const cases = Array.from({ length: 10 }, (v, k) => k);

  return (
    <div className={classes.Line}>
      {/* {props.children} */}
      {cases.map((i) => {
        return <Case key={i} />;
      })}
    </div>
  );
};

export default Line;
