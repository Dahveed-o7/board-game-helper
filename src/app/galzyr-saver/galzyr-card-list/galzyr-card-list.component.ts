import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalzyrCardForm } from '../model/galzyr-form.types';
import { GalzyrCardComponent } from '../galzyr-card/galzyr-card.component';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-galzyr-card-list',
  standalone: true,
  imports: [GalzyrCardComponent],
  templateUrl: './galzyr-card-list.component.html',
  styleUrl: './galzyr-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrCardListComponent {
  @Input({ required: true }) cardArray!: FormArray<GalzyrCardForm>;
}
