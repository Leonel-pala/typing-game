import './App.css';
import { useEffect, useRef, useState } from 'react';
import Enemies from './components/enemies';
import AreaAttack from './components/areaAttack';
import bgPattern from './assets/img/background-pattern.jfif';
let selectIndexWord = 0;

function App() {
  const words = [
    'montaña',
    'relampago',
    'sabiduria',
    'horizonte',
    'espejo',
    'serenidad',
    'bosque',
    'destino',
    'sombra',
    'refugio',
    'rayo',
    'camino',
    'mariposa',
    'trueno',
    'nube',
    'estrella',
    'viento',
    'cumbre',
    'luz',
    'aurora',
    'oceano',
    'desierto',
    'bruma',
    'rio',
    'lago',
    'fuego',
    'arena',
    'cielo',
    'hoja',
    'roca',
  ];

  const wordRefActive = useRef<HTMLInputElement>(null);
  const inputTyping = useRef<HTMLInputElement>(null);
  const [word, setWord] = useState<string[]>([]);
  const [wordActive, setWordActive] = useState(word[0]);
  const [score, setScore] = useState(0);
  const [type, setType] = useState('');
  const [delay, setDelay] = useState(3000);
  const [lifes, setLifes] = useState(3);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const areaAttackRef = useRef<HTMLInputElement>(null);
  const [isOverlapping, setIsOverlapping] = useState(false);

  function gameOver() {
    setIsGameOver(true);
  }
  function tryAgain() {
    setIsWinner(false);
    setIsGameOver(false);
    setWord([]);
    setWordActive(word[0]);
    setDelay(3000);
    setType('');
    selectIndexWord = 0;
    setLifes(3);
    setScore(0);
  }
  useEffect(() => {
    if (isOverlapping && selectIndexWord < word.length) {
      if (lifes > 1 && word.length == words.length) {
        setIsWinner(true);
      }
      if (wordRefActive.current) wordRefActive.current.style.display = 'none';
      selectIndexWord += 1;
      setWordActive(word[selectIndexWord]);
      if (inputTyping.current) inputTyping.current.value = '';
      setType('');
      setIsOverlapping(false);
      setLifes(lifes - 1);

      if (lifes - 1 <= 0) gameOver();
    }
  }, [isOverlapping, selectIndexWord, inputTyping, word, lifes]);

  useEffect(() => {
    const checkCollision = () => {
      if (areaAttackRef.current && wordRefActive.current) {
        const rectA = areaAttackRef.current.getBoundingClientRect();
        const rectB = wordRefActive.current.getBoundingClientRect();

        const isOverlapping =
          rectA.left < rectB.right &&
          rectA.right > rectB.left &&
          rectA.top < rectB.bottom &&
          rectA.bottom > rectB.top;
        setIsOverlapping(isOverlapping);
      }
    };

    const intervalId = setInterval(checkCollision, 100);

    return () => clearInterval(intervalId);
  }, [word]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (word.length < words.length && !isGameOver) {
        let randomNumber;
        let newWord;

        do {
          randomNumber = Math.floor(Math.random() * words.length);
          newWord = words[randomNumber];
        } while (word.includes(newWord));

        setWord((prevWord) => {
          if (!prevWord.includes(newWord)) {
            return [...prevWord, newWord];
          }
          return prevWord;
        });
        if (word.length >= 3) {
          const delayRandom = Math.random() * (3 - 0.5) + 0.5;
          setDelay(delayRandom * 1000);
        }
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, [word, delay, selectIndexWord, isGameOver]);
  useEffect(() => {
    if (word.length < 3 && !isGameOver) {
      let randomNumber;
      let newWord;

      do {
        randomNumber = Math.floor(Math.random() * words.length);
        newWord = words[randomNumber];
      } while (word.includes(newWord));

      setWord((prevWord) => {
        if (!prevWord.includes(newWord)) {
          return [...prevWord, newWord];
        }
        return prevWord;
      });
    }
  }, [word, words, isGameOver]);
  useEffect(() => {
    if (word.length > 0 && !isGameOver) {
      setWordActive(word[selectIndexWord]);
    }
  }, [word, selectIndexWord, isGameOver]);
  useEffect(() => {
    const handleKeyDown = () => {
      if (inputTyping.current) {
        inputTyping.current.focus();
        /* 
        if (wordRefActive.current && wordActive.startsWith(type)) {
          wordRefActive.current.classList.remove('shake');
          void wordRefActive.current.offsetWidth;
          wordRefActive.current.classList.add('shake');
        } */
      }
    };

    const handleInput = () => {
      if (inputTyping.current) {
        setType(inputTyping.current.value);
        if (wordActive == inputTyping.current.value) {
          selectIndexWord += 1;
          const wordLength = wordActive.length;
          if (wordLength <= 3) {
            setScore((score) => (score += 300));
          } else if (wordLength > 3 && wordLength <= 6) {
            setScore((score) => (score += 550));
          } else {
            setScore((score) => (score += 700));
          }
          setWordActive(word[selectIndexWord]);
          setType('');

          if (wordRefActive.current)
            wordRefActive.current.style.display = 'none';
          if (
            inputTyping.current.value == word[word.length - 1] &&
            word[word.length - 1] == wordActive &&
            word.length == words.length
          ) {
            console.log('hola');
            setIsWinner(true);
          }
          inputTyping.current.value = '';
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (inputTyping.current) {
      inputTyping.current.addEventListener('input', handleInput);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (inputTyping.current) {
        inputTyping.current.removeEventListener('input', handleInput);
      }
    };
  }, [word, wordActive, type]);

  return (
    <div className="flex w-full">
      <AreaAttack
        lifes={lifes}
        ref={areaAttackRef}
        score={score}
        word={word.length}
      >
        <input
          ref={inputTyping}
          id="inputTyping"
          autoComplete="none"
          autoCorrect="none"
          type="text"
          className="text-[#000]"
          maxLength={isGameOver ? 0 : wordActive?.length}
        />
      </AreaAttack>
      <div
        className="relative basis-4/5 overflow-x-hidden "
        style={{ background: `URL(${bgPattern})` }}
      >
        {word.map((wordSelect, index) => {
          return (
            <Enemies
              key={index}
              word={wordSelect}
              wordRefIsActive={wordActive == wordSelect}
              type={type}
              ref={wordActive == wordSelect ? wordRefActive : null}
              index={index}
              paused={isGameOver}
            ></Enemies>
          );
        })}
      </div>
      {isGameOver ? (
        <div className="absolute p-5 text-2xl bg-[#000000a9] left-0 top-0 w-screen h-screen z-[900] flex justify-center items-center">
          <div className="absolute p-5 text-2xl  bg-red-600 flex flex-col ">
            <span>PERDISTE</span>
            <span>Puntaje total: {score}</span>
            <button
              className="border-2 border-white"
              onClick={() => {
                tryAgain();
              }}
            >
              Otra vez
            </button>
          </div>
        </div>
      ) : null}
      {isWinner ? (
        <div className="absolute p-5 text-2xl bg-[#000000a9] left-0 top-0 w-screen h-screen z-[900] flex justify-center items-center">
          <div className="absolute p-5 text-2xl  bg-green-600 flex flex-col ">
            <span>Ganaste</span>
            <span>Puntaje total: {score}</span>
            <button
              className="border-2 border-white"
              onClick={() => {
                tryAgain();
              }}
            >
              jugar otra vez
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
