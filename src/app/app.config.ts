import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import {
  Heart,
  Loader,
  LucideAngularModule,
  Mail,
  MapPinHouse,
  Phone,
  User,
  House,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    // specific import for lucide icons since i am using standalone components
    importProvidersFrom(
      LucideAngularModule.pick({
        Mail,
        Phone,
        MapPinHouse,
        Heart,
        User,
        Loader,
        House,
      })
    ),
  ],
};
