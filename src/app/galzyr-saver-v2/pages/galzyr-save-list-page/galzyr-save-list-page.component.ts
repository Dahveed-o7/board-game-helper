import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import galzyrGameSaveFactory from '../../helpers/galzyr-game-save.factory';
import { GalzyrStore } from '../../store/galzyr-saver.store';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-galzyr-save-list-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './galzyr-save-list-page.component.html',
  styleUrl: './galzyr-save-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaveListPageComponent implements OnInit, OnDestroy {
  readonly store = inject(GalzyrStore);
  readonly #fb = inject(NonNullableFormBuilder);

  addSaveForm = this.#fb.group({
    name: this.#fb.control('', [Validators.minLength(2)]),
    slug: this.#fb.control('', [
      Validators.required,
      availableNameValidator(this.store.checkSlugValidity),
    ]),
  });

  #createSaveSlugSub?: Subscription;

  ngOnInit(): void {
    this.#createSaveSlugSub = this.addSaveForm.controls.name.valueChanges
      .pipe(map((val) => val.toLocaleLowerCase()))
      .subscribe((val) => this.addSaveForm.controls.slug.setValue(val));
  }

  ngOnDestroy(): void {
    this.#createSaveSlugSub?.unsubscribe();
  }

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

export function availableNameValidator(
  checkFn: (val: string) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const available = checkFn(control.value);
    console.log('available ', available);
    return available ? null : { unavailableName: control.value };
  };
}
