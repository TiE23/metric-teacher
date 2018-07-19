import React from "react";
import { withRouter } from "react-router";

import utils from "../utils";

const Test = (props) => {
  const click = () => {
    const dat3 = {
      topRow: {
        a: {
          id: "a1",
          word: "apple",
        },
        b: {
          id: "b1",
          word: "bee",
        },
        c: {
          id: "c1",
          word: "cat",
        },
      },
    };
    console.log(dat3.topRow.c);
    utils.cacheNewObject(dat3, "c1", "vehicle", { id: "vehicle", word: "car" });
    console.log(dat3.topRow.c);
    utils.cacheUpdateObject(dat3, "vehicle", { word: "truck" });
    console.log(dat3.topRow.c);
    utils.cacheNewObject(dat3, "c1", "vehicle2", { id: "vehicle2", word: "roadster" });
    console.log(dat3.topRow.c);
    utils.cacheDeleteObject(dat3, "vehicle");
    console.log(dat3.topRow.c);
    utils.cacheDeleteObject(dat3, "vehicle2");
    console.log(dat3.topRow.c);
    utils.cacheNewObject(dat3, "c1", "newArray", [{ id: "Aaron" }, { id: "Bill" }]);
    console.log(dat3.topRow.c.newArray);
    utils.cacheNewObject(dat3, "c1", "newArray2", [{ id: "Abby" }, { id: "Bobby" }]);
    console.log(dat3.topRow.c.newArray);
    utils.cachePushIntoArray(dat3, "c1", "newArray", { id: "Carrie" });
    console.log(dat3.topRow.c.newArray);
    utils.cacheDeleteObject(dat3, "Bill");
    console.log(dat3.topRow.c.newArray);
  };

  return (
    <div>
      <p>Hello. <button onClick={() => click()} >Test Cache Functions (see console)</button></p>
    </div>
  );
};

export default withRouter(Test);
