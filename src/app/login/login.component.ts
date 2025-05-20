import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule  // ✅ Needed for snackbar to work
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
      localStorage.setItem('isLoggedIn', 'true');

      this.snackBar.open('Login Successful!', 'Close', {
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.snackBar.open('Invalid email or password.', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
