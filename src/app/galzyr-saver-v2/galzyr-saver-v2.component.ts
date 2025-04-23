import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSaveService } from '../shared/abstract/game-save';
import { GalzyrStore } from './store/galzyr-saver.store';
import { GalzyrGameSave } from './types/galzyr-game.type';
import { IndexedDbGalzyrSaveService } from './services/indexed-db-galzyr-save.service';
import { NestJsGalzyrSaveService } from './services/nest-js-galzyr-save.service';

@Component({
  selector: 'app-galzyr-saver-v2',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    GalzyrStore,
    {
      provide: GameSaveService<GalzyrGameSave>,
      // useClass: IndexedDbGalzyrSaveService,
      useClass: NestJsGalzyrSaveService,
    },
  ],
  template: `<router-outlet />`,
  styles: `:host{
    display: block;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaverV2Component {}
