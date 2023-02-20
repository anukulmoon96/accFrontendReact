import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

window.onbeforeunload = null;

if(window.self === window.top) {
ReactDOM.render(<App />, document.getElementById("root"));
}
