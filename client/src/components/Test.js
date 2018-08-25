import React from "react";
import { Button } from "semantic-ui-react";
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
    console.log(dat3.topRow.c.vehicle);
    utils.cacheUpdateObject(dat3, "vehicle", { word: "truck" });
    console.log(dat3.topRow.c.vehicle);
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
    const datax = { a: { id: "a1", b: {} } };
    utils.cacheNewObject(datax, "a1", "b.c", ["dog"]);
    console.log(datax);
    const data4 = { a: { theId: "a1", b: {} } };
    utils.cacheNewObject(data4, "a1", "b.c", ["dog"], false, "theId");
    console.log(data4);

    console.log(utils.isEmptyRecursive({ a: null }));                                 // True
    console.log(utils.isEmptyRecursive({ a: { b: null } }));                          // True
    console.log(utils.isEmptyRecursive({ a: { b: [] } }));                            // True
    console.log(utils.isEmptyRecursive({ a: { b: [{ b1: null }, { b2: null }] } }));  // True
    console.log(utils.isEmptyRecursive({ a: { b: "boy" } }));                         // False
    console.log(utils.isEmptyRecursive({ a: { b: false } }));                         // False (!)
    console.log(utils.isEmptyRecursive({ alpha: [], a: { id: "a1", b: {} } }));       // False
  };

  return (
    <div>
      <p>Hello. <button onClick={() => click()} >Test Cache Functions (see console)</button></p>
      <Button color="red">Red</Button>
      <Button color="orange">Orange</Button>
      <Button color="yellow">Yellow</Button>
      <Button color="olive">Olive</Button>
      <Button color="green">Green</Button>
      <Button color="teal">Teal</Button>
      <Button color="blue">Blue</Button>
      <Button color="violet">Violet</Button>
      <Button color="purple">Purple</Button>
      <Button color="pink">Pink</Button>
      <Button color="brown">Brown</Button>
      <Button color="grey">Grey</Button>
      <Button color="black">Black</Button>
    </div>
  );
};

export default withRouter(Test);
