import React, { Component } from "react";
import "./app.css";

class App extends Component {
  state = {
    hi: "hello!"
  };
  render() {
    return (
      <div>
        <h1>{this.state.hi}</h1>
      </div>
    );
  }
}

export default App;
