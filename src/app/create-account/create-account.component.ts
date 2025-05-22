import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';        // Must import CommonModule
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,       // <-- MUST be here for *ngIf
    FormsModule,
    RouterModule,
    MatSnackBarModule,
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

    this.userService.setUser({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
    });

    localStorage.setItem('userFullName', this.fullName);
    localStorage.setItem('userUsername', this.username);
    localStorage.setItem('userEmail', this.email);
    localStorage.setItem('userPassword', this.password);

    this.snackBar.open('Account created successfully!', 'Close', { duration: 2000 });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
