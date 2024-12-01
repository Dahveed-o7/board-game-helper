import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import galzyrGameSaveFactory from '../../helpers/galzyr-game-save.factory';
import { GalzyrStore } from '../../store/galzyr-saver.store';

@Component({
  selector: 'app-galzyr-save-list-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './galzyr-save-list-page.component.html',
  styleUrl: './galzyr-save-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaveListPageComponent {
  readonly store = inject(GalzyrStore);

  addDummyCharacter(): void {
    this.store.createSave(galzyrGameSaveFactory('test', 'test'));
  }
}
