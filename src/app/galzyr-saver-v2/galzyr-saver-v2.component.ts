import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSaveService } from '../shared/abstract/game-save';
import { GalzyrSaveService } from './services/galzyr-save.service';
import { GalzyrStore } from './store/galzyr-saver.store';
import { GalzyrGameSave } from './types/galzyr-game.type';

@Component({
  selector: 'app-galzyr-saver-v2',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    GalzyrStore,
    { provide: GameSaveService<GalzyrGameSave>, useClass: GalzyrSaveService },
  ],
  template: `<router-outlet />`,
  styles: `:host{
    display: block;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaverV2Component {}
