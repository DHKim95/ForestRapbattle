import React from 'react';
import './App.scss';
import Router from "./routes";
import CSRFToken from "./csrftoken";

function App() {
  return (
    <div className="App">
      <CSRFToken />
      <Router />
    </div>
  );
}

export default App;
