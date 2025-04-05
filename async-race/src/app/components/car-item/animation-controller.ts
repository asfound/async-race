export interface CarAnimationController {
  drive: (velocity: number) => void;
  pause: () => void;
  stop: () => void;
}

const MILLISECONDS_PER_SECOND = 1000;

export function createAnimationController(
  car: SVGElement,
  getter: () => number
): CarAnimationController {
  let animation: Animation | null = null;

  function drive(velocity: number): void {
    const duration = (getter() / velocity) * MILLISECONDS_PER_SECOND;

    if (animation) {
      animation.cancel();
    }

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
