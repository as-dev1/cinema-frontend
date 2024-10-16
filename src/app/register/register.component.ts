import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.authService
      .register(
        this.registerForm.value.firstName!,
        this.registerForm.value.lastName!,
        this.registerForm.value.email!,
        this.registerForm.value.password!
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.toastr.error(
            error.error.message || 'Something went wrong',
            undefined,
            { timeOut: 2000 }
          );
        },
      });
  }
}
