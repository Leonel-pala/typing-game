import { ReactNode, forwardRef } from 'react';
import FaceCam from './faceCam';

interface AreaAttackProps {
  children: ReactNode;
  score: number;
  lifes: number;
}

const AreaAttack = forwardRef<HTMLDivElement, AreaAttackProps>(
  ({ children, score, lifes }, ref) => {
    return (
      <div
        ref={ref}
        className="basis-1/5 relative bg-[#372772] w-96 h-screen p-5 box-border flex flex-col gap-4"
      >
        <p>Puntaje: {score}</p>
        <FaceCam />
        {children}
        <div className="flex justify-around">
          <div
            className={`  w-10 aspect-square  rounded-full ${
              lifes >= 1 ? 'bg-red-500' : 'bg-red-200'
            }`}
          ></div>
          <div
            className={`  w-10 aspect-square  rounded-full ${
              lifes >= 2 ? 'bg-red-500' : 'bg-red-200'
            }`}
          ></div>
          <div
            className={`  w-10 aspect-square  rounded-full ${
              lifes >= 3 ? 'bg-red-500' : 'bg-red-200'
            }`}
          ></div>
        </div>
        <div className="diagonal-stripes absolute w-16 left-full top-0 z-[1] h-full"></div>
      </div>
    );
  }
);

AreaAttack.displayName = 'AreaAttack';

export default AreaAttack;
