import { ANIMATION, EMPTY_COUNT } from '~/app/constants/constants';

export interface CarAnimationController {
  drive: (velocity: number) => void;
  pause: () => void;
  stop: () => void;
}

export function createAnimationController(
  car: HTMLElement,
  getter: () => number
): CarAnimationController {
  let animation: Animation | null = null;

  function drive(duration: number): void {
    animation?.cancel();

    animation = car.animate(
      [
        { transform: `translateX(${String(EMPTY_COUNT)})` },
        { transform: `translateX(${String(getter())}px)` },
      ],
      {
        duration,
        easing: ANIMATION.EASING,
        fill: ANIMATION.FILL,
      }
    );
  }

  function pause(): void {
    animation?.pause();
  }

  function stop(): void {
    animation?.cancel();
  }

  return {
    drive,
    pause,
    stop,
  };
}
