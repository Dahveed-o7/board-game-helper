import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subscription,
  tap,
} from 'rxjs';
import {
  GalzyrCardV2,
  GalzyrCharacterSkills,
  GalzyrGameSave,
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

  slotOptions = signal<GalzyrControlOption[]>([]);
  characterOptions = signal<GalzyrControlOption[]>([]);

  saveForm?: FormGroup<{
    name: FormControl<string>;
    slug: FormControl<string>;
    slots: FormRecord<FormArray<FormControl<GalzyrCardV2>>>;
    characters: FormRecord<
      FormGroup<{
        name: FormControl<string>;
        playerName: FormControl<string>;
        money: FormControl<number>;
        stats: FormControl<GalzyrCharacterSkills>;
        cards: FormArray<FormControl<GalzyrCardV2>>;
      }>
    >;
  }>;

  #subscription?: Subscription;

  ngOnInit(): void {
    console.log(this.data());
    this.#initForm(this.data());
  }

  ngOnDestroy(): void {
    this.#subscription?.unsubscribe();
  }

  #initForm(fromData: GalzyrGameSave): void {
    console.log(`initin form @ url ${fromData.slug}`);
    const { name, slug } = fromData;

    const slots = this.#fb.record(
      Object.fromEntries(
        Object.entries(fromData.slots).map(([key, value]) => [
          key,
          this.#fb.array(value),
        ])
      )
    );

    const characters = this.#fb.record(
      Object.fromEntries(
        Object.entries(fromData.characters).map(([key, value]) => [
          key,
          this.#fb.group<{
            name: FormControl<string>;
            playerName: FormControl<string>;
            money: FormControl<number>;
            stats: FormControl<GalzyrCharacterSkills>;
            cards: FormArray<FormControl<GalzyrCardV2>>;
          }>({
            name: this.#fb.control(value.name),
            playerName: this.#fb.control(value.playerName),
            money: this.#fb.control(value.money),
            stats: this.#fb.control(value.stats),
            cards: this.#fb.array(value.cards),
          }),
        ])
      )
    );

    this.saveForm = this.#fb.group({
      name,
      slug,
      slots,
      characters,
    });

    this.slotOptions.set([
      { controlKey: 'quests', label: 'Available Quests' },
      { controlKey: 'events', label: 'Event Deck' },
      { controlKey: 'vault', label: 'Vault' },
      { controlKey: 'world', label: 'World Slot' },
    ]);

    this.characterOptions.set([
      { controlKey: 'bumir', label: 'Bumir' },
      { controlKey: 'keridai', label: 'Keridai' },
      { controlKey: 'mor', label: 'Mor' },
      { controlKey: 'aysala', label: 'Aysala' },
    ]);

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
