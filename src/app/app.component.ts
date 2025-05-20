import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div *ngIf="!loggedIn">
      <h2>Login</h2>
      <button (click)="login()">Log In</button>
    </div>

    <div *ngIf="loggedIn">
      <h2>Dashboard</h2>
      <p>Welcome, user!</p>
      <button (click)="logout()">Log Out</button>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
