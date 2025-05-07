import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (this.email === storedEmail && this.password === storedPassword) {
      // Set auth flag to indicate user is logged in
      localStorage.setItem('isLoggedIn', 'true');
      
      // Show a success notification
      this.snackBar.open('Login Successful!', 'Close', {
        duration: 2000,  // Notification duration in milliseconds
      });

      // Redirect to dashboard after a slight delay to let the notification show
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000); // Match duration of the snack bar
    } else {
      // Show an error message if login is invalid
      this.snackBar.open('Invalid email or password.', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']  // Optional: to style the error differently
      });
    }
  }
}
