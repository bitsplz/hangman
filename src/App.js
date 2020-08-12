import React,{useState, useEffect} from 'react';
import './App.css';
import Header from './components/header.jsx';
import Figure from './components/figure.jsx';
import WrongLetters from './components/wrongletters.jsx';
import Word from './components/word';

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
              //showNotification();
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters=>[...wrongLetters,letter]);
            } else {
              //showNotification();
            }
          }
        }
    }
    window.addEventListener('keydown',handleKeydown);
    return()=>window.removeEventListener('keydown',handleKeydown);//clean event listeners
  },[correctLetters, wrongLetters, playable]);//when these are updated function is called

  return (
    <>
      <Header/>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
    </>
  );
}

export default App;
