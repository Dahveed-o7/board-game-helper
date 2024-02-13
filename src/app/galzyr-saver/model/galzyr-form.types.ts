import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GalzyrCardType, GalzyrSkill } from './galzyr.types';

export type GalzyrSaveForm = {
  name: FormControl<string>;
  id: FormControl<number>;
  vault: FormGroup<GalzyrSlotInner>;
  global: FormGroup<GalzyrSlotInner>;
  quests: FormGroup<GalzyrSlotInner>;
  events: FormGroup<GalzyrSlotInner>;
  playerSlots: FormGroup<PlayerSlots>;
};

export type PlayerSlots = {
  bumir: FormGroup<GalzyrCharacterForm>;
  mor: FormGroup<GalzyrCharacterForm>;
  aysala: FormGroup<GalzyrCharacterForm>;
  keridai: FormGroup<GalzyrCharacterForm>;
  yamej?: FormGroup<GalzyrCharacterForm>;
  nokoAndUmi?: FormGroup<GalzyrCharacterForm>;
};

export type GalzyrSlotInner = {
  cards: FormArray<GalzyrCardForm>;
};

export type GalzyrCardForm = FormGroup<{
  number: FormControl<string>;
  title: FormControl<string | undefined>;
  storyNumber: FormControl<string | undefined>;
  type: FormControl<GalzyrCardType>;
}>;

export type GalzyrCharacterForm = GalzyrSlotInner & {
  skills?: FormGroup<{
    thievery: FormControl<GalzyrSkill>;
    might: FormControl<GalzyrSkill>;
    survival: FormControl<GalzyrSkill>;
    knowledge: FormControl<GalzyrSkill>;
    communication: FormControl<GalzyrSkill>;
    perception: FormControl<GalzyrSkill>;
  }>;
};
