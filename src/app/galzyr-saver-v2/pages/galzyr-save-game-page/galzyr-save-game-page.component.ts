import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { GalzyrSaveFormComponent } from '../../components/galzyr-save-form/galzyr-save-form.component';
import { GalzyrStore } from '../../store/galzyr-saver.store';
import { GalzyrGameSave } from '../../types/galzyr-game.type';

@Component({
  selector: 'app-galzyr-save-game-page',
  standalone: true,
  imports: [GalzyrSaveFormComponent],
  templateUrl: './galzyr-save-game-page.component.html',
  styleUrl: './galzyr-save-game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaveGamePageComponent implements OnInit {
  readonly store = inject(GalzyrStore);

  //from route
  slug = input<string>('');

  ngOnInit(): void {
    this.store.selectSave(this.slug());
  }
}
