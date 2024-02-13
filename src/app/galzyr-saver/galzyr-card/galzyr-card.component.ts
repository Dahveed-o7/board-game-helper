import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalzyrCardForm } from '../model/galzyr-form.types';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-galzyr-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './galzyr-card.component.html',
  styleUrl: './galzyr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrCardComponent {
  @Input({ required: true }) cardForm!: GalzyrCardForm;
}
