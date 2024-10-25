import clsx from 'clsx';
import './App.css';
import { useEffect, useRef, useState } from 'react';
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
  const [type, setType] = useState('');

  useEffect(() => {
    if (word.length < 3) {
      let randomIndex;
      let newWord;
      do {
        randomIndex = Math.floor(Math.random() * words.length);
        newWord = words[randomIndex];
      } while (word.includes(newWord));
      setWord((prevWord) => [...prevWord, newWord]);
    }
    setWordActive(word[selectIndexWord]);
  }, [word]);

  useEffect(() => {
    const handleKeyDown = () => {
      if (inputTyping.current) {
        inputTyping.current.focus();
      }
    };

    const handleInput = () => {
      if (inputTyping.current) {
        setType(inputTyping.current.value);
        if (wordActive == inputTyping.current.value) {
          selectIndexWord += 1;
          setWordActive(word[selectIndexWord]);
          inputTyping.current.value = '';
          setType('');
          /*           wordRefActive.current?.remove();
           */ if (word.length < words.length) {
            let randomIndex;
            let newWord;
            do {
              randomIndex = Math.floor(Math.random() * words.length);
              newWord = words[randomIndex];
            } while (word.includes(newWord));
            setWord((prevWord) => [...prevWord, newWord]);
          }
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
  }, [word, wordActive]);
  return (
    <>
      <input
        ref={inputTyping}
        id="inputTyping"
        autoComplete="none"
        autoCorrect="none"
        type="text"
        className="text-[#000]"
        maxLength={wordActive?.length}
      />
      {selectIndexWord}
      <div className="flex flex-wrap gap-2">
        {word.map((wordSelect, index) => {
          return (
            <div
              ref={wordSelect == wordActive ? wordRefActive : null}
              className={
                'text-6xl w-max relative p-3 m-auto border-2 border-red-200 text-[#ffffff62] flex  ' +
                (wordSelect == wordActive
                  ? clsx({
                      'border-red-500':
                        wordSelect != type && type.length == wordSelect.length,
                      'shadow-active ': wordSelect == wordActive,
                    })
                  : '')
              }
            >
              {wordSelect.split('').map((letters, index) => (
                <span
                  className={
                    'p-3 letters box-border relative ' +
                    (wordSelect == wordActive
                      ? clsx({
                          'text-green-500': letters == type[index],
                          'text-red-500':
                            letters != type[index] && index < type.length,
                          'blinking-bar': type.length == index + 1,
                        })
                      : '')
                  }
                >
                  {letters}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
