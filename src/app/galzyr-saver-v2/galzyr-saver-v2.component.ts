import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  GalzyrCardComponent,
  GalzyrCardV2,
} from './components/galzyr-card/galzyr-card.component';
import { GalzyrSlotComponent } from './components/galzyr-slot/galzyr-slot.component';
import { GalzyrCharacterComponent } from './components/galzyr-character/galzyr-character.component';

@Component({
  selector: 'app-galzyr-saver-v2',
  standalone: true,
  imports: [
    GalzyrCardComponent,
    ReactiveFormsModule,
    JsonPipe,
    GalzyrSlotComponent,
    GalzyrCharacterComponent,
  ],
  templateUrl: './galzyr-saver-v2.component.html',
  styleUrl: './galzyr-saver-v2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaverV2Component {
  readonly #fb = inject(NonNullableFormBuilder);

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
}
