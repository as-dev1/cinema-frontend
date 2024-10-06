import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  Heart,
  LucideAngularModule,
  Mail,
  MapPinHouse,
  Phone,
  User,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // specific import for lucide icons since i am using standalone components
    importProvidersFrom(
      LucideAngularModule.pick({ Mail, Phone, MapPinHouse, Heart, User })
    ),
  ],
};
