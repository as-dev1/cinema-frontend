import { Component } from '@angular/core';

import { HeroComponent } from '../components/hero/hero.component';
import { DiffComponent } from '../components/diff/diff.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, DiffComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
