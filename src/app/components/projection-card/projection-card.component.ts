import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Projection } from '../../models/projection';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projection-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projection-card.component.html',
})
export class ProjectionCardComponent {
  @Input() projection!: Projection;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  addToCart() {
    if (this.authService.user) {
      this.cartService
        .createReservation({
          user: this.authService.user._id!,
          projection: this.projection._id,
        })
        .subscribe(() => {
          this.router.navigateByUrl('/cart');
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }

  shortDescription(description: string) {
    return description.substring(0, 90) + '...';
  }
}
