import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ProjectionComponent } from './projection/projection.component';
import { CartComponent } from './cart/cart.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
  },
  {
    path: 'movies',
    component: MovieComponent,
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'projections',
    component: ProjectionComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'reservation',
    component: ReservationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
