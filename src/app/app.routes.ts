import { Routes } from '@angular/router';
import { galzyrSaverRoutes } from './galzyr-saver-v2/routes/galzyr-save.routes';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Board Game Helper App',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'galzyr-save',
    title: 'Lands of Galzyr Save State Assistant',
    children: [
      {
        path: 'v1',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./galzyr-saver/galzyr-saver.component').then(
                (m) => m.GalzyrSaverComponent
              ),
          },
          {
            path: 'save/:id',
            loadComponent: () =>
              import(
                './galzyr-saver/save-slot-page/save-slot-page.component'
              ).then((m) => m.SaveSlotPageComponent),
          },
        ],
      },
      {
        path: 'v2',
        children: [
          {
            path: '',
            // loadComponent: () =>
            //   import('./galzyr-saver-v2/galzyr-saver-v2.component').then(
            //     (m) => m.GalzyrSaverV2Component
            //   ),
            children: galzyrSaverRoutes,
          },
        ],
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
