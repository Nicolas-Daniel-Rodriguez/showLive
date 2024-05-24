import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventCartelera from './pages/EventCartelera';
import EventPage from './pages/EventPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/cartelera">Cartelera</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/cartelera">
            <EventCartelera />
          </Route>
          <Route path="/evento/:id">
            <EventPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;