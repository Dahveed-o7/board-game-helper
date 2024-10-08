import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

export type GalzyrCardV2 = {
  readonly name: string;
  readonly cardNo: string;
  readonly notes: string;
};

@Component({
  selector: 'app-galzyr-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GalzyrCardComponent,
      multi: true,
    },
  ],
  templateUrl: './galzyr-card.component.html',
  styleUrl: './galzyr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrCardComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  readonly #fb = inject(NonNullableFormBuilder);
  readonly cardForm = this.#fb.group({
    name: this.#fb.control('Card name', Validators.required),
    cardNo: this.#fb.control('000', [
      Validators.required,
      Validators.maxLength(3),
      Validators.pattern('^[0-9]*$'),
    ]),
    notes: this.#fb.control(''),
  });

  cardValueChangesSubscription?: Subscription;

  editeMode = signal<boolean>(true);
  disabled = signal<boolean>(false);

  get name() {
    return this.cardForm.getRawValue().name;
  }
  get cardNo() {
    return this.cardForm.getRawValue().cardNo;
  }
  get notes() {
    return this.cardForm.getRawValue().notes;
  }

  #onChange: (card: GalzyrCardV2) => void = () => {};
  #onTouched: () => void = () => {};

  writeValue(obj: GalzyrCardV2): void {
    this.cardForm.setValue(obj);
  }
  registerOnChange(fn: (_: GalzyrCardV2) => void): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  ngOnInit(): void {
    this.cardValueChangesSubscription = this.cardForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        const cardState = this.cardForm.getRawValue();
        this.#onChange(cardState);
        this.#onTouched();
      });
  }

  ngOnDestroy(): void {
    this.cardValueChangesSubscription?.unsubscribe();
  }

  toggleEditMode(): void {
    this.editeMode.set(!this.editeMode());
  }
}
