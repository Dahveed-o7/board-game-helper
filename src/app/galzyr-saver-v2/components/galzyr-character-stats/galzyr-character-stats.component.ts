import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { defaultSkills } from '../../helpers/galzyr-save-helpers';
import {
  GalzyrCharacterSkillName,
  GalzyrCharacterSkills,
  GalzyrCharacterStat,
  Skills,
} from '../../types/galzyr-game.type';

@Component({
  selector: 'app-galzyr-character-stats',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GalzyrCharacterStatsComponent),
      multi: true,
    },
  ],
  templateUrl: './galzyr-character-stats.component.html',
  styleUrl: './galzyr-character-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrCharacterStatsComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  readonly #fb = inject(NonNullableFormBuilder);
  name = input.required<string>();

  readonly skillsRecord = this.#fb.record<
    FormGroup<{
      basic: FormControl<boolean>;
      advanced: FormControl<boolean>;
    }>
  >({
    [Skills.MIGHT]: this.skillGroup,
    [Skills.SURVIVAL]: this.skillGroup,
    [Skills.KNOWLEDGE]: this.skillGroup,
    [Skills.COMMUNICATION]: this.skillGroup,
    [Skills.PERCEPTION]: this.skillGroup,
    [Skills.THIEVERY]: this.skillGroup,
  });

  readonly skills = signal(Object.values(Skills));
  disabled = signal(false);

  sillValueChange?: Subscription;

  get skillGroup() {
    return this.#fb.group({
      basic: this.#fb.control(false),
      advanced: this.#fb.control(false),
    });
  }

  mapStatToObject(stat: GalzyrCharacterStat): {
    basic: boolean;
    advanced: boolean;
  } {
    switch (stat) {
      case 0:
        return { basic: false, advanced: false };
      case 1:
        return { basic: true, advanced: false };
      case 2:
        return { basic: true, advanced: true };
    }
  }

  mapObjectToStat(
    obj?: Partial<{
      basic: boolean;
      advanced: boolean;
    }>
  ): GalzyrCharacterStat {
    if (!obj) {
      return 0;
    }
    const result = Object.values(obj).reduce((n, val) => (val ? n + 1 : n), 0);
    return result <= 0 ? 0 : result >= 2 ? 2 : 1;
  }

  #onChange: (stats: GalzyrCharacterSkills) => void = () => {};
  #onTouched: () => void = () => {};

  ngOnInit(): void {
    this.sillValueChange = this.skillsRecord.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => {
        //NOTE: stucturedClone ha egy konstanst több dolog is felhasználhat és önmagában módosítja az értékeit
        const res: GalzyrCharacterSkills = defaultSkills();
        Object.keys(res).forEach((key) => {
          res[key as GalzyrCharacterSkillName] = this.mapObjectToStat(
            val?.[key]
          );
        });
        this.#onChange(res);
        this.#onTouched();
      });
  }

  ngOnDestroy(): void {
    this.sillValueChange?.unsubscribe();
  }

  writeValue(obj: GalzyrCharacterSkills): void {
    Object.entries(obj).forEach(([key, stat]) => {
      this.skillsRecord.controls[key]?.setValue(this.mapStatToObject(stat));
    });
  }
  registerOnChange(fn: (_: GalzyrCharacterSkills) => void): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
