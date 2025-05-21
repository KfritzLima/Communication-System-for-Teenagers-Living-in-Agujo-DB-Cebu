import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../user/user.service'; // <-- Import UserService

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class CreateAccountComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService // <-- Inject UserService
  ) {}

  createAccount(): void {
    if (!this.fullName || !this.username || !this.email || !this.password) {
      this.snackBar.open('All fields are required.', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Save to service
    this.userService.setUser({
      fullName: this.fullName,
      username: this.username,
      email: this.email
    });

    // Also save to localStorage (optional)
    localStorage.setItem('userFullName', this.fullName);
    localStorage.setItem('userUsername', this.username);
    localStorage.setItem('userEmail', this.email);
    localStorage.setItem('userPassword', this.password);

    this.snackBar.open('Account created successfully!', 'Close', {
      duration: 2000
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
