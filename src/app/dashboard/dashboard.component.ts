import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule, MatExpansionModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  updates = [
    { title: 'New forum category added!', timestamp: new Date() },
    { title: 'Maintenance scheduled for Friday.', timestamp: new Date('2025-05-23T09:00:00') }
  ];

  events = [
    { name: 'Community Meetup', date: new Date('2025-05-21'), location: 'Community Hall' },
    { name: 'Charity Drive', date: new Date('2025-06-01'), location: 'Town Square' }
  ];

  communityNews = [
    { headline: 'Local Hero Saves Cat', details: 'John Doe climbed a tree to rescue a cat stuck for hours.' },
    { headline: 'New Library Opening', details: 'A state-of-the-art library opens next month in the town center.' }
  ];

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
