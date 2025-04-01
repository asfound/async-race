import { CAR_MODELS } from '../constants/constants';

export function getRandomName(): string {
  const brands = Object.keys(CAR_MODELS);
  const randomBrand = brands[Math.floor(Math.random() * brands.length)];

  const models = CAR_MODELS[randomBrand];
  const randomModel = models[Math.floor(Math.random() * models.length)];

  return `${randomBrand} ${randomModel}`;
}
