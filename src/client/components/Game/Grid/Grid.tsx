import React from "react";

import Line from "./Line";

const classes = require("./Grid.module.css");

const Grid = () => {
  const lines = Array.from({ length: 20 }, (v, k) => k);

  return (
    <div className={classes.Grid}>
      {lines.map((i) => {
        return <Line key={i} />;
      })}
    </div>
  );
};

export default Grid;
