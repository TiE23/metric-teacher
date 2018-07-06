import React, { Component } from "react";

import "./semantic/dist/semantic.min.css";

import Ping from "./components/Ping";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Hi!</p>
        <Ping />
      </div>
    );
  }
}

export default App;
