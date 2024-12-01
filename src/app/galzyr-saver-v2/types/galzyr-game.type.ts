export type GalzyrGameSave = {
  name: string;
  slug: string;
  slots: {
    quests: GalzyrCardV2[];
    events: GalzyrCardV2[];
    vault: GalzyrCardV2[];
    world: GalzyrCardV2[];
  };
  characters: {
    [character: string]: GalzyrCharacterSheetV2;
  };
};

export type GalzyrCharacterSheetV2 = {
  cards: GalzyrCardV2[];
  name: string;
  playerName: string;
  money: number;
  stats: GalzyrCharacterSkills;
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
