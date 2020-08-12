import React from 'react';
import './App.css';
import Header from './components/header.jsx';
import Figure from './components/figure.jsx';
import WrongLetters from './components/wrongletters.jsx';
import Word from './components/word';

function App() {
  return (
    <>
      <Header/>
      <div className="game-container">
        <Figure/>
        <WrongLetters/>
        <Word/>
      </div>
    </>
  );
}

export default App;
