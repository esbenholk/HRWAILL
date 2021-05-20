import React from "react";

import Chat from "./components/Chat/Chat";

import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Chat} />
    </Router>
  );
};

export default App;
