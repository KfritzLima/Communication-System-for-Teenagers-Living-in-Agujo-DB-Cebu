import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!isLoggedIn">
      <h2>Login</h2>
      <button (click)="login()">Log In</button>
    </div>

    <div *ngIf="isLoggedIn">
      <h2>Welcome, User!</h2>
      <button (click)="logout()">Log Out</button>
    </div>
  `,
})
export class AppComponent {
  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
