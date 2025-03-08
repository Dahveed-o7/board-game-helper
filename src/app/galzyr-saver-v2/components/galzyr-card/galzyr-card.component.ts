import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
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
import { GalzyrCardV2 } from '../../types/galzyr-game.type';

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

  @HostBinding('class.card') card = true;

  readonly idPrefix = input<string>();
  readonly delete = output<void>();

  readonly disabled = signal<boolean>(false);

  readonly cardForm = this.#fb.group({
    name: this.#fb.control('Card name', Validators.required),
    cardNo: this.#fb.control('000', [
      Validators.required,
      Validators.maxLength(3),
      Validators.pattern('^[0-9]*$'),
    ]),
    notes: this.#fb.control(''),
  });

  #cardValueChangesSubscription?: Subscription;

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
    this.#cardValueChangesSubscription = this.cardForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        const cardState = this.cardForm.getRawValue();
        this.#onChange(cardState);
        this.#onTouched();
      });
  }

  ngOnDestroy(): void {
    this.#cardValueChangesSubscription?.unsubscribe();
  }

  emitDelete(): void {
    this.delete.emit();
  }
}
