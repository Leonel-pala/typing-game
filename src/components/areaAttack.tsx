import { ReactNode, forwardRef } from 'react';
import FaceCam from './faceCam';
import heart from '../assets/img/heart.png';
import heartBorder from '../assets/img/heart-border.png';

interface AreaAttackProps {
  children: ReactNode;
  score: number;
  lifes: number;
}

const AreaAttack = forwardRef<HTMLDivElement, AreaAttackProps>(
  ({ children, score, lifes }, ref) => {
    const ScoreDisplay = () => {
      const paddedScore = '0'.repeat(6 - score.toString().length) + score;

      return (
        <div className="bg-zinc-900 text-center px-5 py-2 text-4xl">
          {paddedScore}
        </div>
      );
    };
    return (
      <div
        ref={ref}
        className="basis-1/5 relative bg-[#201642] w-96 h-screen p-5 box-border flex flex-col gap-2"
      >
        <h2 className="text-xl">Puntaje:</h2>
        <ScoreDisplay></ScoreDisplay>
        <FaceCam />
        {children}
        <div className="flex w-max gap-1 px-1 mx-auto bg-zinc-900 py-2">
          <img
            className="w-10 aspect-square"
            src={1 <= lifes ? heart : heartBorder}
            alt="heart"
          />
          <img
            className="w-10 aspect-square"
            src={2 <= lifes ? heart : heartBorder}
            alt="heart"
          />
          <img
            className="w-10 aspect-square"
            src={3 <= lifes ? heart : heartBorder}
            alt="heart"
          />
        </div>
        <div className="diagonal-stripes absolute w-16 left-full top-0 z-[1] h-full"></div>
      </div>
    );
  }
);

AreaAttack.displayName = 'AreaAttack';

export default AreaAttack;
