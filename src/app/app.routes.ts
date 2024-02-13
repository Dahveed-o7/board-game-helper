import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Board Game Helper App',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'galzyr-save',
    title: 'Lands of Galzyr Save State Assistant',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./galzyr-saver/galzyr-saver.component').then(
            (mod) => mod.GalzyrSaverComponent
          ),
      },
      {
        path: 'save/:id',
        loadComponent: () =>
          import('./galzyr-saver/save-slot-page/save-slot-page.component').then(
            (mod) => mod.SaveSlotPageComponent
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
