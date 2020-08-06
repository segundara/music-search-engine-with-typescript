import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Route
            path="/"
            exact
            render={(routerProps) => <Home {...routerProps} />}
          />
        </header>
      </Router>
    </div>
  );
}

export default App;
