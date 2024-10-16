import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber?: string = '';
  address?: string = '';
  favouriteGenres?: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((data) => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
      this.favouriteGenres = data.favouriteGenres;
    });
  }
}
