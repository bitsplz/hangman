import React,{useState, useEffect} from 'react';
import './App.css';
import Header from './components/header.jsx';
import Figure from './components/figure.jsx';
import WrongLetters from './components/wrongletters.jsx';
import Word from './components/word';
import Popup from './components/popup.jsx';
import Notification from './components/notification.jsx';
import {showNotification as show} from './helpers/helpers.jsx';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];



function App() {
  const[playable, setPlayable]=useState(true);
  const [correctLetters, setCorrectLetters]= useState([]);
  const [wrongLetters, setWrongLetters]= useState([]);
  const [showNotification, setShowNotification]= useState(false);

  useEffect(()=>{
    const handleKeydown=event=>{
      const{key, keyCode}=event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters=>[...currentLetters,letter]);
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters=>[...wrongLetters,letter]);
            } else {
              showNotification(setShowNotification);
            }
          }
        }
    }
    window.addEventListener('keydown',handleKeydown);
    return()=>window.removeEventListener('keydown',handleKeydown);//clean event listeners
  },[correctLetters, wrongLetters, playable]);//when these are updated function is called


  function playAgain() {
    setPlayable(true);
    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header/>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
