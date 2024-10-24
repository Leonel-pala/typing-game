import clsx from 'clsx';
import './App.css';
import { useEffect, useRef, useState } from 'react';

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

  const [word, setWord] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex]);
  }, []);

  const [type, setType] = useState('');
  const inputTyping = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = () => {
      if (inputTyping.current) {
        inputTyping.current.focus();
      }
    };

    const handleInput = () => {
      if (inputTyping.current) {
        setType(inputTyping.current.value);
        if (
          inputTyping.current.value.length == word.length &&
          inputTyping.current.value == word
        ) {
          setType('');
          inputTyping.current.value = '';
          const newRandomIndex = Math.floor(Math.random() * words.length);
          setWord(words[newRandomIndex]);
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
  }, [word]);
  return (
    <>
      <input
        ref={inputTyping}
        id="inputTyping"
        autoComplete="none"
        autoCorrect="none"
        type="text"
        className="text-[#000]"
        maxLength={word.length}
      />
      <div
        ref={null}
        className={
          'text-6xl w-max relative p-3 m-auto border-2 text-[#ffffff62] flex  ' +
          clsx({
            'border-green-700': word == type,
            'border-red-500': word != type && type.length == word.length,
          })
        }
      >
        {word.split('').map((letters, index) => {
          return (
            <span
              className={clsx('p-3 letters box-border relative   ', {
                'text-green-500': letters == type[index],
                'text-red-500': letters != type[index] && index < type.length,
                'blinking-bar': type.length == index + 1,
              })}
            >
              {letters}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default App;
