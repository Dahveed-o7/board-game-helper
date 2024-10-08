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
  FormControl,
  FormGroup,
  isFormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { GalzyrCardV2 } from '../galzyr-card/galzyr-card.component';
import { GalzyrSlotComponent } from '../galzyr-slot/galzyr-slot.component';
import { GalzyrCharacterStatsComponent } from '../galzyr-character-stats/galzyr-character-stats.component';

export type GalzyrCharacterSkillName =
  | Skills.MIGHT
  | Skills.SURVIVAL
  | Skills.KNOWLEDGE
  | Skills.COMMUNICATION
  | Skills.PERCEPTION
  | Skills.THIEVERY;

export enum Skills {
  MIGHT = 'might',
  SURVIVAL = 'survival',
  KNOWLEDGE = 'knowledge',
  COMMUNICATION = 'communication',
  PERCEPTION = 'perception',
  THIEVERY = 'thievery',
}

export type GalzyrCharacterSkills = Record<
  GalzyrCharacterSkillName,
  GalzyrCharacterStat
>;

export const defaultSkills: GalzyrCharacterSkills = {
  communication: 0,
  knowledge: 0,
  might: 0,
  perception: 0,
  survival: 0,
  thievery: 0,
};

export type GalzyrCharacterNames = 'Bumir' | 'Aysala' | 'Mor' | 'Keridai';

const characterSkilNames: Record<GalzyrCharacterSkillName, string> = {
  communication: 'Communication',
  knowledge: 'Knowledge',
  might: 'Might',
  perception: 'Perception',
  survival: 'Survival',
  thievery: 'Thievery',
};

export type GalzyrCharacterV2 = {
  readonly name: string;
  readonly playerName: string;
  readonly money: number;
  readonly stats: Record<GalzyrCharacterSkillName, GalzyrCharacterStat>;
};

export type GalzyrCharacterStat = 0 | 1 | 2;

const isGalzyrCharacterSkills = (obj: any): obj is GalzyrCharacterSkills => {
  const skills = obj as GalzyrCharacterSkills;
  return (
    skills.communication !== undefined &&
    skills.knowledge !== undefined &&
    skills.might !== undefined &&
    skills.perception !== undefined &&
    skills.survival !== undefined &&
    skills.thievery !== undefined
  );
};

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

  controlKey = input.required<string>();
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
  }>;

  //TODO: mindenhol isFormGroup fn használata
  get parentFormGroup(): FormGroup {
    return this.#parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.characterForm = this.#fb.group({
      name: this.#fb.control<GalzyrCharacterNames | string>(this.name()),
      playerName: this.#fb.control(''),
      money: this.#fb.control(10),
      stats: this.#fb.control<GalzyrCharacterSkills>(
        {
          [Skills.COMMUNICATION]: 0,
          [Skills.KNOWLEDGE]: 0,
          [Skills.MIGHT]: 0,
          [Skills.PERCEPTION]: 0,
          [Skills.SURVIVAL]: 0,
          [Skills.THIEVERY]: 0,
        },
        this.statsValidator
      ),
    });
    this.parentFormGroup.addControl(this.controlKey(), this.characterForm);
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey());
  }
}
