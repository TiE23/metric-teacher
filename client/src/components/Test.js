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
    utils.cacheNewObject(dat3, "c1", "newVehicle", { id: "vehicle", word: "car" });
    console.log(dat3.topRow.c.newVehicle);
    utils.cacheUpdateObject(dat3, "vehicle", { word: "truck" });
    console.log(dat3.topRow.c.newVehicle);
    utils.cacheDeleteObject(dat3, "vehicle");
    console.log(dat3.topRow.c);
    utils.cacheNewObject(dat3, "c1", "newArray", [{ id: "Aaron" }, { id: "Bill" }]);
    console.log(dat3.topRow.c.newArray);
    utils.cachePushIntoArray(dat3, "c1", "newArray", { id: "Carrie" });
    console.log(dat3.topRow.c.newArray);
    utils.cacheRemoveFromArray(dat3, "c1", "newArray", "Bill");
    console.log(dat3.topRow.c.newArray);
  };

  return (
    <div>
      <p>Hello. <button onClick={() => click()} >Test Cache Functions (see console)</button></p>
    </div>
  );
};

export default withRouter(Test);
