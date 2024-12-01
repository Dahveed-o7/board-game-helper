import { Routes } from '@angular/router';

export const galzyrSaverRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../galzyr-saver-v2.component').then(
        (c) => c.GalzyrSaverV2Component
      ),
    children: [
      {
        path: '',
        title: 'BGH Galzyr',
        loadComponent: () =>
          import(
            '../pages/galzyr-save-list-page/galzyr-save-list-page.component'
          ).then((c) => c.GalzyrSaveListPageComponent),
      },
      {
        path: 'save/new/:slug',
        title: 'BGH Galzyr new save',
        loadComponent: () =>
          import(
            '../pages/galzyr-save-game-page/galzyr-save-game-page.component'
          ).then((c) => c.GalzyrSaveGamePageComponent),
        data: { isNewSave: true },
      },
      {
        path: 'save/:slug',
        title: 'BGH Galzyr save',
        loadComponent: () =>
          import(
            '../pages/galzyr-save-game-page/galzyr-save-game-page.component'
          ).then((c) => c.GalzyrSaveGamePageComponent),
        data: { isNewSave: false },
      },
    ],
  },
];
