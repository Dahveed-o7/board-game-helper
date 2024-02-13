import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-galzyr-saver',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './galzyr-saver.component.html',
  styleUrl: './galzyr-saver.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalzyrSaverComponent {
  saveSlots: { name: string; id: number }[] = [{ name: 'test', id: 0 }];
}
