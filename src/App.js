import React from 'react';
import logo from './woap19-logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Wellington on a Plate
        </h2>
        <p>A application made for the Wellington on a Plate food festival which will help you plan which places you go to during the festival.</p>
        <p>This will be an unoffical app and not created by the offical WOAP organisers.</p>
      </header>
    </div>
  );
}

export default App;
