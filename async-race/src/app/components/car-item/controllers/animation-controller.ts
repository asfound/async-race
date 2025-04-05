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
        { transform: 'translateX(0)' },
        { transform: `translateX(${String(getter())}px)` },
      ],
      {
        duration,
        easing: 'linear',
        fill: 'forwards',
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
