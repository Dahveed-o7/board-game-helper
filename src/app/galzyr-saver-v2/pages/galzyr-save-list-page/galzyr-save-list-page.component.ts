import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import galzyrGameSaveFactory from '../../helpers/galzyr-game-save.factory';
import { GalzyrStore } from '../../store/galzyr-saver.store';

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

  readonly selectedGame = signal('');

  addSaveForm = this.#fb.group({
    name: this.#fb.control('', [
      Validators.required,
      Validators.minLength(2),
      availableNameValidator(this.store.checkNameAvailable),
    ]),
  });

  onNewSaveDialogOpen(dialog: HTMLDialogElement): void {
    dialog.showModal();
  }

  onNewSaveDialogSubmit(dialog: HTMLDialogElement): void {
    if (this.addSaveForm.invalid) {
      dialog.close();
      return;
    }

    const { name } = this.addSaveForm.getRawValue();
    this.store.createSave(galzyrGameSaveFactory(name));
    dialog.close();
  }

  onNewSaveDialogCancel(dialog: HTMLDialogElement): void {
    this.addSaveForm.reset();
    dialog.close();
  }

  onDeleteDialogOpen(name: string, dialog: HTMLDialogElement) {
    this.selectedGame.set(name);
    dialog.showModal();
  }

  onDeleteDialogClose(dialog: HTMLDialogElement) {
    this.selectedGame.set('');
    dialog.close();
  }

  onDeleteDialogSubmit(dialog: HTMLDialogElement) {
    this.store.deleteSave(this.selectedGame());
    this.selectedGame.set('');
    dialog.close();
  }
}

export function availableNameValidator(
  checkFn: (val: string) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const available = checkFn(control.value);
    return available ? null : { unavailableName: control.value };
  };
}
