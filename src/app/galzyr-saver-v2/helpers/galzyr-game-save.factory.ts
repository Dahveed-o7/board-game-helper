import {
  GalzyrCardV2,
  GalzyrCharacterSheetV2,
  GalzyrGameSave,
} from '../types/galzyr-game.type';

export default function galzyrGameSaveFactory(
  name: string,
  slug?: string,
  characterNames: string[] = ['aysala', 'bumir', 'keridai', 'mor']
): GalzyrGameSave {
  const characters: Record<string, GalzyrCharacterSheetV2> =
    generateCharacters(characterNames);

  return {
    name,
    slug: slug ?? encodeURIComponent(name),
    slots: {
      events: generateCard({ from: 64, to: 89 }, 'Event'),
      quests: generateCard({ from: 127, to: 148 }, 'Quest'),
      vault: generateCard({ from: 296, to: 299 }, 'Vault'),
      world: [generateCard('001', 'January')],
    },
    characters,
  };
}

function generateCharacters(
  names: string[]
): Record<string, GalzyrCharacterSheetV2> {
  return names.reduce<Record<string, GalzyrCharacterSheetV2>>((prev, curr) => {
    switch (curr) {
      case 'aysala': {
        prev[curr] = {
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
          name: 'Aysala',
          playerName: 'Player Name',
          stats: {
            communication: 0,
            knowledge: 0,
            might: 0,
            perception: 2,
            survival: 1,
            thievery: 1,
          },
        };
        return prev;
      }
      case 'bumir': {
        prev[curr] = {
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
          name: 'Bumir',
          playerName: 'Player Name',
          stats: {
            communication: 0,
            knowledge: 0,
            might: 1,
            perception: 0,
            survival: 2,
            thievery: 1,
          },
        };
        return prev;
      }
      case 'keridai': {
        prev[curr] = {
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
          name: 'Keridai',
          playerName: 'Player Name',
          stats: {
            communication: 1,
            knowledge: 2,
            might: 0,
            perception: 1,
            survival: 0,
            thievery: 0,
          },
        };
        return prev;
      }
      case 'mor': {
        prev[curr] = {
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
          name: 'Mor',
          playerName: 'Player Name',
          stats: {
            communication: 0,
            knowledge: 0,
            might: 0,
            perception: 2,
            survival: 1,
            thievery: 1,
          },
        };
        return prev;
      }
      default: {
        prev[curr] = {
          cards: [],
          money: 10,
          name: curr,
          playerName: 'Player Name',
          stats: {
            communication: 0,
            knowledge: 0,
            might: 0,
            perception: 0,
            survival: 0,
            thievery: 0,
          },
        };
        return prev;
      }
    }
  }, {});
}

function generateCard(
  cardNo: string,
  name: string,
  notes?: string
): GalzyrCardV2;
function generateCard(
  cardNo: { from: number; to: number },
  name: string
): GalzyrCardV2[];
function generateCard(
  cardNo: string | { from: number; to: number },
  name: string,
  notes?: string
): GalzyrCardV2 | GalzyrCardV2[] {
  if (typeof cardNo === 'string') {
    return { cardNo, name, notes: notes ?? '' };
  }

  const { from, to } = cardNo;
  const res: GalzyrCardV2[] = [];

  for (let i = from; i <= to; i++) {
    res.push(generateCard(transformCardNo(i), name));
  }
  return res;
}

function transformCardNo(cardNo: number): string {
  if (cardNo > 100) {
    return `${cardNo}`;
  } else if (cardNo > 10) {
    return `0${cardNo}`;
  } else {
    return `00${cardNo}`;
  }
}
