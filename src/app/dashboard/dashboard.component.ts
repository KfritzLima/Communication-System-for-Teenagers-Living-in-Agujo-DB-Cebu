import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {
    this.checkLoginStatus(); // Check login status when the dashboard loads
  }

  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      // Redirect to login if the user is not logged in
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Remove auth flag on logout
    this.router.navigate(['/login']);
  }
}
