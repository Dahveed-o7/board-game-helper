import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';

type GalzyrCard = {
  readonly name: string;
  readonly cardNo: string;
  readonly notes: string;
};

@Component({
  selector: 'app-galzyr-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './galzyr-card.component.html',
  styleUrl: './galzyr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrCardComponent implements ControlValueAccessor, OnInit {
  #fb = inject(NonNullableFormBuilder);
  cardForm = this.#fb.group({
    name: this.#fb.control('Card name', Validators.required),
    cardNo: this.#fb.control('000', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.pattern('^[0-9]*$'),
    ]),
    notes: this.#fb.control(''),
  });

  cardValueChanges?: Subscription;

  disabled = signal<boolean>(false);
  editeMode = signal<boolean>(true);

  get name() {
    return this.cardForm.getRawValue().name;
  }
  get cardNo() {
    return this.cardForm.getRawValue().cardNo;
  }
  get notes() {
    return this.cardForm.getRawValue().notes;
  }

  #onChange: (card: GalzyrCard) => void = () => {};
  #onTouched: () => void = () => {};

  writeValue(obj: GalzyrCard): void {
    this.cardForm.setValue(obj);
  }
  registerOnChange(fn: (_: GalzyrCard) => void): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  ngOnInit(): void {
    this.cardValueChanges = this.cardForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe();
  }

  toggleEditMode(): void {
    this.editeMode.set(!this.editeMode());
  }
}
