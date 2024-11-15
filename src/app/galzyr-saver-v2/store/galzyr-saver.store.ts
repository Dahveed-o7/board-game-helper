import { gameStoreFactory } from '../../shared/store/game-store-factory.store';
import { GalzyrGameSave } from '../types/galzyr-game.type';

export const GalzyrStore = gameStoreFactory<GalzyrGameSave>();
