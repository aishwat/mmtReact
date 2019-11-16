import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
let count = 4;

function App() {
  // const elements = ["one", "two", "three"];

  let [elements, addElements] = useState({
    1: { checked: true, text: "a " },
    2: { checked: false, text: "b " },
    3: { checked: false, text: "c " }
  });

  const addElement_ = (count, text) => () => {
    const tmp = { checked: true, text: text };
    elements[count] = tmp;
    const newElements = Object.assign({}, elements);
    // console.log(elements);
    addElements(newElements);
  };
  const toggleCheck = id => () => {
    const element = elements[id];
    element.checked = !element.checked;
    const newElements = Object.assign({}, elements);
    addElements(newElements);
  };
  const clearCompleted = event => {
    const tmp = {};
    Object.entries(elements).map(([key, val]) => {
      console.log(key);
      if (val.checked === false) {
        tmp[key] = val;
      }
    });
    addElements(tmp);
  };

  return (
    <div className="App">
      <h1>TODO</h1>
      <button onClick={addElement_(count++, `some text ${count}`)}>
        Create Item
      </button>
      <button onClick={clearCompleted}>Clear Completed Tasks</button>
      <div>completed</div>
      <ul>
        {Object.entries(elements)
          .filter(([key, val]) => val.checked === true)
          .map(([key, val]) => (
            <li>
              {val.text} | checked: {val.checked ? "true" : "false"} |{" "}
              <button onClick={toggleCheck(key)}> toggleCheck</button>
            </li>
          ))}
      </ul>

      <div>uncompleted</div>
      <ul>
        {Object.entries(elements)
          .filter(([key, val]) => val.checked === false)
          .map(([key, val]) => (
            <li type="square">
              {val.text} | checked: {val.checked ? "true" : "false"} |{" "}
              <button onClick={toggleCheck(key)}> toggleCheck</button>
            </li>
          ))}
      </ul>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

let timer;

const fetchApi = query => {
  console.log("fetchApi", query);
};

const myDebounce = (fn, wait = 300) => {
  //
  // if (lastExecuted.ts && lastExecuted.ts - Date.now() < wait) {

  // return fn();
  return query => {
    // console.log(query)
    clearTimeout(timer);

    // lastExecuted.timer = setTimeout(fn, wait);
    timer = setTimeout(() => fn(query), wait);
    // lastExecuted.ts = Date.now();
  };
};

const fetchApiDebounced = myDebounce(fetchApi);

fetchApiDebounced("ra");

fetchApiDebounced("raj");

fetchApiDebounced("raje");

fetchApiDebounced("rajes");

setTimeout(() => {
  fetchApiDebounced("rajesh");
}, 300); //600
