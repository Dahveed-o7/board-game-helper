import { JsonPipe } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BGH_DB_STORE, IDBService } from '../core/services/indexed-db.service';
import { GalzyrCharacterComponent } from './components/galzyr-character/galzyr-character.component';
import { GalzyrSlotComponent } from './components/galzyr-slot/galzyr-slot.component';
import { GalzyrStore } from './store/galzyr-saver.store';
import { GalzyrCardV2, GalzyrGameSave } from './types/galzyr-game.type';
import { GameSaveService } from '../shared/abstract/game-save';
import { GalzyrSaveService } from './services/galzyr-save.service';
import galzyrGameSaveFactory from './helpers/galzyr-game-save.factory';

@Component({
  selector: 'app-galzyr-saver-v2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    GalzyrSlotComponent,
    GalzyrCharacterComponent,
    RouterOutlet,
  ],
  providers: [
    GalzyrStore,
    { provide: GameSaveService<GalzyrGameSave>, useClass: GalzyrSaveService },
  ],
  templateUrl: './galzyr-saver-v2.component.html',
  styleUrl: './galzyr-saver-v2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaverV2Component {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly store = inject(GalzyrStore);

  readonly form = this.#fb.record<FormArray<FormControl<GalzyrCardV2>>>({});

  readonly galzyrSlots: { controlKey: string; label: string }[] = [
    { controlKey: 'quests', label: 'Available Quests' },
    { controlKey: 'events', label: 'Event Deck' },
    { controlKey: 'vault', label: 'Vault' },
    { controlKey: 'world', label: 'World Slot' },
  ];

  readonly cards: GalzyrCardV2[] = [
    { cardNo: '2', name: 'asd', notes: 'it be werking' },
  ];

  constructor() {
    afterNextRender({
      read: () => {
        this.store.loadList();
      },
    });
  }

  onAddBtnClick(): void {
    this.store.createSave(galzyrGameSaveFactory('test', 'test-slug'));
  }
}
