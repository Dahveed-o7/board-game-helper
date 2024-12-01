import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import galzyrGameSaveFactory from '../../helpers/galzyr-game-save.factory';
import { GalzyrStore } from '../../store/galzyr-saver.store';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-galzyr-save-list-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './galzyr-save-list-page.component.html',
  styleUrl: './galzyr-save-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaveListPageComponent {
  readonly store = inject(GalzyrStore);
  readonly #fb = inject(NonNullableFormBuilder);

  addSaveForm = this.#fb.group({
    name: this.#fb.control('', [Validators.minLength(2)]),
    slug: this.#fb.control('', [Validators.required]),
  });

  addDummyCharacter(): void {
    this.store.createSave(galzyrGameSaveFactory('test', 'test'));
  }

  openNewSaveDialog(dialog: HTMLDialogElement): void {
    dialog.showModal();
  }

  handleDialogClose(dialog: HTMLDialogElement, cancel = false): void {
    if (cancel) {
      this.addSaveForm.reset();
      dialog.close();
      return;
    }

    if (this.addSaveForm.valid) {
      const { name, slug } = this.addSaveForm.getRawValue();
      this.store.createSave(galzyrGameSaveFactory(name, slug));
    }

    dialog.close();
  }
}
