import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  updates = [
    { title: 'Welcome Message', timestamp: new Date() },
    { title: 'Forum Rules Updated', timestamp: new Date() }
  ];

  events = [
    { name: 'Community Meetup', date: new Date(), location: 'Main Hall' },
    { name: 'Hackathon', date: new Date(), location: 'Auditorium' }
  ];

  communityNews = [
    { headline: 'New Features Released', details: 'Check out what’s new in our forum!', open: false },
    { headline: 'Weekly Highlights', details: 'See what’s trending this week.', open: false }
  ];

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  toggleNews(news: any): void {
    news.open = !news.open;
  }
}
