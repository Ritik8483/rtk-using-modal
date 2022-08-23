import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import ViewUsers from './components/ViewUsers';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/view/:id' element={<ViewUsers/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
