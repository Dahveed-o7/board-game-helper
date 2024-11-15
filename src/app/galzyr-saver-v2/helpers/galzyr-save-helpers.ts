import { GalzyrCardV2, GalzyrCharacterSkills } from '../types/galzyr-game.type';

export function isGalzyrCharacterSkills(
  obj: any
): obj is GalzyrCharacterSkills {
  const skills = obj as GalzyrCharacterSkills;
  return (
    skills.communication !== undefined &&
    skills.knowledge !== undefined &&
    skills.might !== undefined &&
    skills.perception !== undefined &&
    skills.survival !== undefined &&
    skills.thievery !== undefined
  );
}

export function defaultSkills(): GalzyrCharacterSkills {
  return {
    communication: 0,
    knowledge: 0,
    might: 0,
    perception: 0,
    survival: 0,
    thievery: 0,
  };
}

export function defaultCard(): GalzyrCardV2 {
  return { cardNo: '000', name: 'Card', notes: '' };
}
