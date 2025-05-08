import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  isFormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { GalzyrSlotComponent } from '../galzyr-slot/galzyr-slot.component';
import { GalzyrCharacterStatsComponent } from '../galzyr-character-stats/galzyr-character-stats.component';
import {
  GalzyrCardV2,
  GalzyrCharacterNames,
  GalzyrCharacterSkills,
} from '../../types/galzyr-game.type';
import { isGalzyrCharacterSkills } from '../../helpers/galzyr-save-helpers';

@Component({
  selector: 'app-galzyr-character',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GalzyrSlotComponent,
    GalzyrCharacterStatsComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './galzyr-character.component.html',
  styleUrl: './galzyr-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrCharacterComponent implements OnInit, OnDestroy {
  readonly #parentContainer = inject(ControlContainer);
  readonly #fb = inject(NonNullableFormBuilder);

  controlKey = input.required<number>();
  name = input.required<string>();
  initialCards = input<GalzyrCardV2[]>([]);

  readonly statsValidator: ValidatorFn = (control) => {
    if (!isFormControl(control)) {
      return null;
    }
    const value = control.value;
    if (!isGalzyrCharacterSkills(value)) {
      return null;
    }
    const sum = Object.entries(value).reduce((n, [_, stat]) => n + stat, 0);
    return sum === 4 ? null : { stat: true };
  };

  characterForm?: FormGroup<{
    name: FormControl<string>;
    playerName: FormControl<string>;
    money: FormControl<number>;
    stats: FormControl<GalzyrCharacterSkills>;
    cards: FormArray<FormControl<GalzyrCardV2>>;
  }>;

  get parentFormGroup(): FormArray {
    return this.#parentContainer.control as FormArray;
  }

  ngOnInit(): void {
    if (this.parentFormGroup.controls[this.controlKey()]) {
      this.characterForm = this.parentFormGroup.controls[
        this.controlKey()
      ] as FormGroup;
      this.characterForm.controls.stats.addValidators(this.statsValidator);
      return;
    }
    this.characterForm = this.#fb.group({
      name: this.#fb.control<GalzyrCharacterNames | string>(this.name()),
      playerName: this.#fb.control(''),
      money: this.#fb.control(10),
      stats: this.#fb.control<GalzyrCharacterSkills>(
        {
          communication: 0,
          knowledge: 0,
          might: 0,
          perception: 0,
          survival: 0,
          thievery: 0,
        },
        this.statsValidator
      ),
      cards: this.#fb.array<GalzyrCardV2>([]),
    });
    this.parentFormGroup.push(this.characterForm);
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup) this.parentFormGroup.removeAt(this.controlKey());
  }
}
