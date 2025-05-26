import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class LoginComponent {
  identifier: string = ''; // Username or email
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    // ✅ Admin login (hardcoded)
    if (this.identifier === adminUsername && this.password === adminPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('userFullName', 'Admin');

      this.snackBar.open('Admin login successful!', 'Close', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['/admin']);
      }, 2000);
      return;
    }

    // ✅ Regular user login
    const storedUsername = localStorage.getItem('userUsername');
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    const storedFullName = localStorage.getItem('userFullName');

    const isMatch =
      (this.identifier === storedUsername || this.identifier === storedEmail) &&
      this.password === storedPassword;

    if (isMatch) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userFullName', storedFullName || this.identifier);

      this.snackBar.open('Login successful!', 'Close', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.snackBar.open('Invalid username/email or password.', 'Close', {
        duration: 2500,
        panelClass: ['error-snackbar']
      });
    }
  }
}
