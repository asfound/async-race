import { Route } from './route';

interface RouterProperties {
  root: HTMLElement;
  routes: Record<string, () => HTMLElement>;
}

export function initRouter({ root, routes }: RouterProperties): void {
  function handleHashChange(): void {
    const hash = globalThis.location.hash.replace(/#/, '') || Route.GARAGE;

    const newPage = routes[hash] ?? routes[Route.GARAGE];

    setPage(root, newPage);
  }

  globalThis.addEventListener('hashchange', handleHashChange);

  handleHashChange();
}

export function navigate(route: string = Route.GARAGE): void {
  globalThis.location.hash = route;
}

function setPage(root: HTMLElement, getPage: () => HTMLElement): void {
  root.replaceChildren(getPage());
}
