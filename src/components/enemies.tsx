import clsx from 'clsx';
import { forwardRef, useState, useEffect, useRef } from 'react';

interface EnemiesProps {
  word: string;
  wordRefIsActive: boolean;
  type: string;
  index: number;
}

const Enemies = forwardRef<HTMLDivElement, EnemiesProps>(
  ({ word, wordRefIsActive, type, index }, ref) => {
    const [coordY, setCoordY] = useState(0);
    const lastTwoNumbers = useRef<number[]>([]);

    useEffect(() => {
      setCoordY(generateUniqueCoordY());
    }, []);

    const generateRandomNumber = () => Math.floor(Math.random() * 4);

    const generateUniqueCoordY = () => {
      let newNumber;
      do {
        newNumber = generateRandomNumber();
      } while (lastTwoNumbers.current.includes(newNumber));

      lastTwoNumbers.current = [...lastTwoNumbers.current, newNumber].slice(-2);
      return newNumber;
    };
    return (
      <div
        ref={ref}
        className={
          `animate-slideInLeft left-full text-6xl w-max p-3 m-auto border-2 text-[#ffffff62] flex absolute word ` +
          (wordRefIsActive
            ? clsx({
                'border-red-500': word !== type && type.length === word.length,
                wordSelect: wordRefIsActive,
              })
            : '')
        }
        style={{
          animationDelay: index < 3 ? `${index * 1}s` : '0s',
          top: index < 3 ? `${index * 130 + 30}px` : `${coordY * 130 + 30}px`,
          zIndex: `${100 - index}`,
        }}
      >
        {word.split('').map((letters, index) => (
          <span
            key={index}
            className={
              'p-3 letters box-border relative ' +
              (wordRefIsActive
                ? clsx({
                    'text-green-500': letters === type[index],
                    'text-red-500':
                      letters !== type[index] && index < type.length,
                    'blinking-bar': type.length === index + 1,
                  })
                : '')
            }
          >
            {letters}
          </span>
        ))}
      </div>
    );
  }
);

export default Enemies;
