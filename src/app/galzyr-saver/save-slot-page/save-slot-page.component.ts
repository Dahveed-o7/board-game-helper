import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import {
  GalzyrCardForm,
  GalzyrSaveForm,
  GalzyrSlotInner,
  PlayerSlots,
} from '../model/galzyr-form.types';
import { GalzyrSave } from '../model/galzyr.types';
import { GalzyrService } from '../services/galzyr.service';
import { GalzyrFormService } from '../services/galzyr-form.service';
import { GalzyrCardListComponent } from '../galzyr-card-list/galzyr-card-list.component';

@Component({
  selector: 'app-save-slot-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GalzyrCardListComponent],
  templateUrl: './save-slot-page.component.html',
  styleUrl: './save-slot-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveSlotPageComponent {
  @Input() set id(id: number) {
    this.saveSlot$ = this.galzyrService.getSave$(id).pipe(
      tap((val) => {
        this.saveForm = this.galzyrFormService.createFormFromSave(val);
      })
    );
  }

  galzyrService = inject(GalzyrService);
  galzyrFormService = inject(GalzyrFormService);

  saveSlot$?: Observable<GalzyrSave>;
  saveForm?: FormGroup<GalzyrSaveForm>;
}
