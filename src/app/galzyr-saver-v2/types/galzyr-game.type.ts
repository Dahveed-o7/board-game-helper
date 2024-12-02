import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type GalzyrGameSave = {
  readonly name: string;
  readonly slots: GalzyrNamedSlot[];
  readonly characters: GalzyrCharacterSheetV2[];
};

export type GalzyrForm = FormGroup<{
  name: FormControl<string>;
  slots: FormArray<GalzyrSlotForm>;
  characters: FormArray<GalzyrCharacterForm>;
}>;

export type GalzyrSlotForm = FormGroup<{
  name: FormControl<string>;
  cards: FormArray<FormControl<GalzyrCardV2>>;
  order: FormControl<number>;
}>;

export type GalzyrCharacterForm = FormGroup<{
  name: FormControl<string>;
  order: FormControl<number>;
  cards: FormArray<FormControl<GalzyrCardV2>>;
  playerName: FormControl<string>;
  money: FormControl<number>;
  stats: FormControl<GalzyrCharacterSkills>;
}>;

export type GalzyrNamedSlot = {
  readonly name: string;
  readonly order?: number;
  readonly cards: GalzyrCardV2[];
};

export type GalzyrCharacterSheetV2 = GalzyrNamedSlot & {
  readonly playerName: string;
  readonly money: number;
  readonly stats: GalzyrCharacterSkills;
};

export type GalzyrCardV2 = {
  readonly name: string;
  readonly cardNo: string;
  readonly notes: string;
};

export enum Skills {
  MIGHT = 'might',
  SURVIVAL = 'survival',
  KNOWLEDGE = 'knowledge',
  COMMUNICATION = 'communication',
  PERCEPTION = 'perception',
  THIEVERY = 'thievery',
}

export type GalzyrCharacterSkillName =
  | Skills.MIGHT
  | Skills.SURVIVAL
  | Skills.KNOWLEDGE
  | Skills.COMMUNICATION
  | Skills.PERCEPTION
  | Skills.THIEVERY;

export type GalzyrCharacterSkills = Record<
  GalzyrCharacterSkillName,
  GalzyrCharacterStat
>;

export type GalzyrCharacterNames = 'Bumir' | 'Aysala' | 'Mor' | 'Keridai';

export type GalzyrCharacterV2 = {
  readonly name: string;
  readonly playerName: string;
  readonly money: number;
  readonly stats: Record<GalzyrCharacterSkillName, GalzyrCharacterStat>;
};

export type GalzyrCharacterStat = 0 | 1 | 2;
