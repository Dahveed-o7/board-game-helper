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
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { GalzyrCardV2 } from '../../types/galzyr-game.type';
import { GalzyrCardComponent } from '../galzyr-card/galzyr-card.component';
import { defaultCard } from '../../helpers/galzyr-save-helpers';

@Component({
  selector: 'app-galzyr-slot',
  standalone: true,
  imports: [ReactiveFormsModule, GalzyrCardComponent],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './galzyr-slot.component.html',
  styleUrl: './galzyr-slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSlotComponent implements OnInit, OnDestroy {
  readonly #parentContainer = inject(ControlContainer);
  readonly #fb = inject(NonNullableFormBuilder);

  controlKey = input.required<string>();
  label = input.required<string>();
  initialCards = input<GalzyrCardV2[]>([]);

  slotArray?: FormArray<FormControl<GalzyrCardV2>>;

  get parentFormGroup(): FormGroup {
    return this.#parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    if (this.parentFormGroup.controls[this.controlKey()]) {
      this.slotArray = this.parentFormGroup.controls[
        this.controlKey()
      ] as FormArray;
      return;
    } else {
      this.slotArray = this.#fb.array<GalzyrCardV2>(this.initialCards());
      this.parentFormGroup.addControl(this.controlKey(), this.slotArray);
    }
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup)
      this.parentFormGroup.removeControl(this.controlKey());
  }

  addCard(): void {
    this.slotArray?.push(this.#fb.control<GalzyrCardV2>(defaultCard()));
  }

  removeCard(cardIndex: number): void {
    this.slotArray?.removeAt(cardIndex);
  }
}
