import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, FormsModule],
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber?: string = '';
  address?: string = '';
  favouriteGenres?: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

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

  onCancel() {
    this.router.navigateByUrl('/profile');
  }

  onSubmit() {
    // Make array of genres based on user input
    // If user input is horror, action it creates array ['horror', 'action']
    const genresToArray =
      this.favouriteGenres
        ?.toString()
        .split(',')
        .map((genre) => genre.trim()) || [];

    this.authService
      .update({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        favouriteGenres: genresToArray,
      })
      .subscribe(() => {
        this.router.navigateByUrl('/profile');
      });
  }
}
