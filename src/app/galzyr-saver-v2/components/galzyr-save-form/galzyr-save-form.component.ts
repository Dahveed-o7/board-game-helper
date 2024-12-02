import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subscription,
  tap,
} from 'rxjs';
import {
  GalzyrCharacterForm,
  GalzyrForm,
  GalzyrGameSave,
  GalzyrSlotForm,
} from '../../types/galzyr-game.type';
import { GalzyrCharacterComponent } from '../galzyr-character/galzyr-character.component';
import { GalzyrSlotComponent } from '../galzyr-slot/galzyr-slot.component';

export type GalzyrControlOption = { controlKey: string; label: string };

@Component({
  selector: 'app-galzyr-save-form',
  standalone: true,
  imports: [ReactiveFormsModule, GalzyrSlotComponent, GalzyrCharacterComponent],
  templateUrl: './galzyr-save-form.component.html',
  styleUrl: './galzyr-save-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaveFormComponent implements OnInit, OnDestroy {
  readonly #fb = inject(NonNullableFormBuilder);

  data = input.required<GalzyrGameSave>();
  deounce = input<number>(1000);

  autoSave = output<GalzyrGameSave>();

  saveForm?: GalzyrForm;
  #subscription?: Subscription;

  ngOnInit(): void {
    this.#initForm(this.data());
  }

  ngOnDestroy(): void {
    this.#subscription?.unsubscribe();
  }

  #initForm(data: GalzyrGameSave): void {
    const { name } = data;
    const slots = this.#fb.array<GalzyrSlotForm>(
      data.slots.map<GalzyrSlotForm>((slot) =>
        this.#fb.group({
          name: this.#fb.control(slot.name),
          order: this.#fb.control(slot.order || 0),
          cards: this.#fb.array(slot.cards),
        })
      )
    );
    const characters = this.#fb.array<GalzyrCharacterForm>(
      data.characters.map<GalzyrCharacterForm>(
        ({ name, order, cards, money, playerName, stats }) =>
          this.#fb.group({
            name: this.#fb.control(name),
            order: this.#fb.control(order ?? 99),
            cards: this.#fb.array(cards),
            money: this.#fb.control(money),
            playerName: this.#fb.control(playerName),
            stats: this.#fb.control(stats),
          })
      )
    );

    this.saveForm = this.#fb.group({
      name,
      slots,
      characters,
    });

    this.#subscription = this.saveForm.valueChanges
      .pipe(
        filter(Boolean),
        filter(() => (this.saveForm?.valid ? true : false)),
        debounceTime(this.deounce()),
        distinctUntilChanged(),
        map((value) => value as GalzyrGameSave)
      )
      .subscribe((value) => this.autoSave.emit(value));
  }
}
