import { gameStoreFactory } from '../../shared/store/game-store-factory.store';

export const GalzyrStore = gameStoreFactory<{ name: string; slug: string }>();
