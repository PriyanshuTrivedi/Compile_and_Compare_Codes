import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import CustomCompilation from './components/CustomCompilation';
import Compare from './components/Compare';
import Header from './components/Header';

function App() {
  return(
    <>
      <Router>
        <div className="App">
          <Header/>
          <Routes>
            <Route path='/' element={<CustomCompilation/>} />
            <Route path='/compare' element={<Compare/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;