import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  createAccount(): void {
    if (!this.fullName.trim() || !this.username.trim() || !this.email.trim() || !this.password.trim()) {
      this.snackBar.open('All fields are required.', 'Close', { duration: 2000 });
      return;
    }

    // ✅ Store in your custom user service (if needed)
    this.userService.setUser({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
    });

    // ✅ Store user data to localStorage
    localStorage.setItem('userFullName', this.fullName.trim());
    localStorage.setItem('userUsername', this.username.trim());
    localStorage.setItem('userEmail', this.email.trim());
    localStorage.setItem('userPassword', this.password.trim());

    this.snackBar.open('Account created successfully!', 'Close', { duration: 2000 });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
