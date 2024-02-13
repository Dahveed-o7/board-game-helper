import { Injectable, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {
  GalzyrCardForm,
  GalzyrSaveForm,
  GalzyrSlotInner,
  PlayerSlots,
} from '../model/galzyr-form.types';
import { GalzyrCard, GalzyrCardType, GalzyrSave } from '../model/galzyr.types';

@Injectable({
  providedIn: 'root',
})
export class GalzyrFormService {
  private fb = inject(NonNullableFormBuilder);

  private createEmptyForm(): FormGroup<GalzyrSaveForm> {
    return this.fb.group<GalzyrSaveForm>({
      name: this.fb.control(''),
      id: this.fb.control(NaN),
      vault: this.fb.group({
        cards: this.fb.array<GalzyrCardForm>([]),
      }),
      global: this.fb.group({
        cards: this.fb.array<GalzyrCardForm>([]),
      }),
      quests: this.fb.group({
        cards: this.fb.array<GalzyrCardForm>([]),
      }),
      events: this.fb.group({
        cards: this.fb.array<GalzyrCardForm>([]),
      }),
      playerSlots: this.fb.group<PlayerSlots>({
        bumir: this.fb.group({
          cards: this.fb.array<GalzyrCardForm>([]),
        }),
        mor: this.fb.group({
          cards: this.fb.array<GalzyrCardForm>([]),
        }),
        aysala: this.fb.group({
          cards: this.fb.array<GalzyrCardForm>([]),
        }),
        keridai: this.fb.group({
          cards: this.fb.array<GalzyrCardForm>([]),
        }),
      }),
    });
  }

  createFormFromSave(save: GalzyrSave): FormGroup<GalzyrSaveForm> {
    const temp = this.createEmptyForm();

    // global slots
    save.events.cards.forEach((card) =>
      temp.controls.events.controls.cards.push(this.formFromCard(card))
    );
    save.global.cards.forEach((card) =>
      temp.controls.global.controls.cards.push(this.formFromCard(card))
    );
    save.quests.cards.forEach((card) =>
      temp.controls.quests.controls.cards.push(this.formFromCard(card))
    );
    save.vault.cards.forEach((card) =>
      temp.controls.vault.controls.cards.push(this.formFromCard(card))
    );

    // player slots
    save.playerSlots.bumir.cards.forEach((card) =>
      temp.controls.playerSlots.controls.bumir.controls.cards.push(
        this.formFromCard(card)
      )
    );
    save.playerSlots.mor.cards.forEach((card) =>
      temp.controls.playerSlots.controls.mor.controls.cards.push(
        this.formFromCard(card)
      )
    );
    save.playerSlots.aysala.cards.forEach((card) =>
      temp.controls.playerSlots.controls.aysala.controls.cards.push(
        this.formFromCard(card)
      )
    );
    save.playerSlots.keridai.cards.forEach((card) =>
      temp.controls.playerSlots.controls.keridai.controls.cards.push(
        this.formFromCard(card)
      )
    );

    temp.patchValue(save);
    return temp;
  }

  private formFromCard({
    number,
    storyNumber,
    title,
    type,
  }: GalzyrCard): GalzyrCardForm {
    return this.fb.group({
      number,
      title,
      storyNumber,
      type: type ?? GalzyrCardType.NONE,
    });
  }
}
