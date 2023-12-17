import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import PDFUpload from './components/PDFUpload';
import Quiz from './components/Quiz';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">My Quiz App</Link>
              <div>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/upload">Upload PDF</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/quiz">Take Quiz</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="hero-section">
            <h1>Welcome to My Quiz App</h1>
            <p>Test your knowledge and improve your skills with a variety of quizzes!</p>
            {/* Optionally, you can add a call-to-action button here */}
          </div>
          <div className="container mt-4">
            <Switch>
              <Route path="/upload">
                <PDFUpload />
              </Route>
              <Route path="/quiz">
                <Quiz />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
