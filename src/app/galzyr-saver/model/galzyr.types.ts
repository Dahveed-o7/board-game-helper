export type GalzyrCard = {
  readonly number: string;
  readonly title?: string;
  readonly storyNumber?: string;
  readonly type?: GalzyrCardType;
};

export enum GalzyrCardType {
  ITEM,
  COMPANION,
  QUEST,
  ADVENTURER_STATUS,
  LOCAL_STATUS,
  GLOBAL_STATUS,
  EVENT,
  LOCATION,
  NONE,
}

export type GalzyrSlot = {
  readonly cards: GalzyrCard[];
};

export type GalzyrCharacterSlot = GalzyrSlot & {
  skills: GalzyrCharacterSkills;
};

export type GalzyrCharacterSkills = {
  readonly thievery: GalzyrSkill;
  readonly might: GalzyrSkill;
  readonly survival: GalzyrSkill;
  readonly knowledge: GalzyrSkill;
  readonly communication: GalzyrSkill;
  readonly perception: GalzyrSkill;
};

export type GalzyrSkill = 0 | 1 | 2;

export type GalzyrSave = {
  readonly name: string;
  readonly id: number;
  readonly vault: GalzyrSlot;
  readonly global: GalzyrSlot;
  readonly quests: GalzyrSlot;
  readonly events: GalzyrSlot;
  readonly playerSlots: {
    readonly bumir: GalzyrCharacterSlot;
    readonly mor: GalzyrCharacterSlot;
    readonly aysala: GalzyrCharacterSlot;
    readonly keridai: GalzyrCharacterSlot;
    readonly yamej?: GalzyrCharacterSlot;
    readonly nokoAndUmi?: GalzyrCharacterSlot;
  };
};
