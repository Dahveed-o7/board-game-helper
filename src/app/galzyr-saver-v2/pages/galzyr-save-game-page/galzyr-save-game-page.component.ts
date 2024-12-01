import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
} from '@angular/core';
import { signalState } from '@ngrx/signals';
import { GalzyrSaveFormComponent } from '../../components/galzyr-save-form/galzyr-save-form.component';
import { GalzyrStore } from '../../store/galzyr-saver.store';
import { GalzyrGameSave } from '../../types/galzyr-game.type';

@Component({
  selector: 'app-galzyr-save-game-page',
  standalone: true,
  imports: [GalzyrSaveFormComponent],
  templateUrl: './galzyr-save-game-page.component.html',
  styleUrl: './galzyr-save-game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaveGamePageComponent {
  readonly store = inject(GalzyrStore);
  readonly #cd = inject(ChangeDetectorRef);

  //from route
  slug = input<string>('');
  isNewSave = input<boolean>(true);

  gameSave = this.store.loadSave(this.slug());

  readonly state = signalState<{ mode: 'view' | 'edit' }>({
    mode: this.isNewSave() ? 'edit' : 'view',
  });

  constructor() {
    afterNextRender({
      read: () => {
        const initialSave = this.store.loadSave(this.slug());
      },
    });
  }

  autoSave(save: GalzyrGameSave) {
    console.log('autosave fn called with: ', save);
    this.store.saveGame(save);
  }
}
