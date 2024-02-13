import { GalzyrCardType, GalzyrSave } from './galzyr.types';

export const DEFAULT_SAVE: GalzyrSave = {
  name: 'Galzyr Save',
  id: NaN,
  vault: {
    cards: [
      { number: '296', title: 'Helovan', type: GalzyrCardType.COMPANION },
      { number: '297', title: 'Nara', type: GalzyrCardType.COMPANION },
      {
        number: '298',
        title: 'Volcanic Clearance',
        storyNumber: '0374',
        type: GalzyrCardType.LOCAL_STATUS,
      },
      {
        number: '298',
        title: 'Volcanic Clearance',
        storyNumber: '0375',
        type: GalzyrCardType.LOCAL_STATUS,
      },
      {
        number: '299',
        title: 'Mending Society',
        storyNumber: '0376',
        type: GalzyrCardType.LOCAL_STATUS,
      },
      {
        number: '299',
        title: 'Mending Society',
        storyNumber: '0377',
        type: GalzyrCardType.LOCAL_STATUS,
      },
      {
        number: '299',
        title: 'Mending Society',
        storyNumber: '0378',
        type: GalzyrCardType.LOCAL_STATUS,
      },
      {
        number: '299',
        title: 'Mending Society',
        storyNumber: '0379',
        type: GalzyrCardType.LOCAL_STATUS,
      },
    ],
  },
  quests: {
    cards: [
      { number: '127', title: '', type: GalzyrCardType.QUEST },
      { number: '128', title: '', type: GalzyrCardType.QUEST },
      { number: '129', title: '', type: GalzyrCardType.QUEST },
      { number: '130', title: '', type: GalzyrCardType.QUEST },
      { number: '131', title: '', type: GalzyrCardType.QUEST },
      { number: '132', title: '', type: GalzyrCardType.QUEST },
      { number: '133', title: '', type: GalzyrCardType.QUEST },
      { number: '134', title: '', type: GalzyrCardType.QUEST },
      { number: '135', title: '', type: GalzyrCardType.QUEST },
      { number: '136', title: '', type: GalzyrCardType.QUEST },
      { number: '137', title: '', type: GalzyrCardType.QUEST },
      { number: '138', title: '', type: GalzyrCardType.QUEST },
      { number: '139', title: '', type: GalzyrCardType.QUEST },
      { number: '140', title: '', type: GalzyrCardType.QUEST },
      { number: '141', title: '', type: GalzyrCardType.QUEST },
      { number: '142', title: '', type: GalzyrCardType.QUEST },
      { number: '143', title: '', type: GalzyrCardType.QUEST },
      { number: '144', title: '', type: GalzyrCardType.QUEST },
      { number: '145', title: '', type: GalzyrCardType.QUEST },
      { number: '146', title: '', type: GalzyrCardType.QUEST },
      { number: '147', title: '', type: GalzyrCardType.QUEST },
      { number: '148', title: '', type: GalzyrCardType.QUEST },
    ],
  },
  global: {
    cards: [
      {
        number: '001',
        title: 'January',
        type: GalzyrCardType.GLOBAL_STATUS,
      },
      { number: '064', title: 'Discord', type: GalzyrCardType.GLOBAL_STATUS },
      { number: '065', title: 'Harmony', type: GalzyrCardType.GLOBAL_STATUS },
      { number: '066', type: GalzyrCardType.LOCATION },
      { number: '067', type: GalzyrCardType.LOCATION },
      { number: '068', type: GalzyrCardType.LOCATION },
      { number: '069', type: GalzyrCardType.LOCATION },
      { number: '070', type: GalzyrCardType.LOCATION },
      { number: '071', type: GalzyrCardType.LOCATION },
      { number: '072', type: GalzyrCardType.LOCATION },
      { number: '073', type: GalzyrCardType.LOCATION },
      { number: '074', type: GalzyrCardType.LOCATION },
      { number: '075', type: GalzyrCardType.LOCATION },
      { number: '076', type: GalzyrCardType.LOCATION },
      { number: '077', type: GalzyrCardType.LOCATION },
    ],
  },
  events: {
    cards: [
      { number: '078', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '079', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '080', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '081', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '082', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '083', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '084', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '085', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '086', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '087', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '088', title: 'Event', type: GalzyrCardType.EVENT },
      { number: '089', title: 'Event', type: GalzyrCardType.EVENT },
    ],
  },
  playerSlots: {
    aysala: {
      cards: [
        {
          number: '000',
          title: 'Soar in the Sky',
          type: GalzyrCardType.ADVENTURER_STATUS,
        },
        {
          number: '111',
          title: 'Friend in Need',
          type: GalzyrCardType.QUEST,
        },
      ],
      skills: {
        communication: 0,
        knowledge: 0,
        might: 0,
        perception: 2,
        survival: 1,
        thievery: 1,
      },
    },
    bumir: {
      cards: [
        {
          number: '000',
          title: 'Unyielding Spirit',
          type: GalzyrCardType.ADVENTURER_STATUS,
        },
        {
          number: '111',
          title: 'Buried Secrets',
          type: GalzyrCardType.QUEST,
        },
      ],
      skills: {
        communication: 0,
        knowledge: 0,
        might: 1,
        perception: 0,
        survival: 2,
        thievery: 1,
      },
    },
    keridai: {
      cards: [
        {
          number: '000',
          title: 'Power of Mind',
          type: GalzyrCardType.ADVENTURER_STATUS,
        },
        {
          number: '111',
          title: 'Test of Will',
          type: GalzyrCardType.QUEST,
        },
      ],
      skills: {
        communication: 1,
        knowledge: 2,
        might: 0,
        perception: 1,
        survival: 0,
        thievery: 0,
      },
    },
    mor: {
      cards: [
        {
          number: '000',
          title: 'Deep Intuition',
          type: GalzyrCardType.ADVENTURER_STATUS,
        },
        {
          number: '111',
          title: 'Chasing Legends',
          type: GalzyrCardType.QUEST,
        },
      ],
      skills: {
        communication: 2,
        knowledge: 1,
        might: 1,
        perception: 0,
        survival: 0,
        thievery: 0,
      },
    },
  },
};
