import {
  GalzyrCardV2,
  GalzyrCharacterSheetV2,
  GalzyrGameSave,
  GalzyrNamedSlot,
} from '../types/galzyr-game.type';

export default function galzyrGameSaveFactory(
  name: string,
  characterSlots: string[] = ['Aysala', 'Bumir', 'Keridai', 'Mor'],
  cardSlots: string[] = ['Event', 'Quest', 'Vault', 'World']
): GalzyrGameSave {
  const characters: GalzyrCharacterSheetV2[] =
    generateCharacters(characterSlots);
  const slots: GalzyrNamedSlot[] = generateSlots(cardSlots);

  return {
    name,
    slots,
    characters,
  };
}

function generateSlots(names: string[]): GalzyrNamedSlot[] {
  return names.map<GalzyrNamedSlot>((name) => {
    switch (name) {
      case 'Event':
        return {
          name,
          cards: generateCard({ from: 64, to: 89 }, 'Event'),
          order: 1,
        };
      case 'Quest':
        return {
          name,
          cards: generateCard({ from: 127, to: 148 }, 'Quest'),
          order: 2,
        };
      case 'Vault':
        return {
          name,
          cards: generateCard({ from: 296, to: 299 }, 'Vault'),
          order: 3,
        };
      case 'World':
        return { name, cards: [generateCard('001', 'January')], order: 4 };
      default:
        return { name, cards: [] };
    }
  });
}

function generateCharacters(names: string[]): GalzyrCharacterSheetV2[] {
  return names.map<GalzyrCharacterSheetV2>((name) => {
    switch (name) {
      case 'Aysala': {
        return {
          name,
          order: 1,
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
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
      }
      case 'Bumir': {
        return {
          name,
          order: 2,
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
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
      }
      case 'Keridai': {
        return {
          name,
          order: 3,
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
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
      }
      case 'Mor': {
        return {
          name,
          order: 4,
          cards: [generateCard('000', 'special'), generateCard('111', 'quest')],
          money: 10,
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
      }
      default: {
        return {
          cards: [],
          money: 10,
          name,
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
      }
    }
  });
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
