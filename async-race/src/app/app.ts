import { main } from '~/app/utils/create-element';

export function initApp(): void {
  document.body.append(main({}, ['init']));
}
