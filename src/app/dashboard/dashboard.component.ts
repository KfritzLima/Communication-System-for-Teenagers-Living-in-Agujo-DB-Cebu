import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Forum post functionality
  newPost: string = '';
  posts: { content: string; timestamp: Date }[] = [];

  // Dashboard content
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
    this.checkLoginStatus();
    this.loadPosts();
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

  submitPost(): void {
    if (this.newPost.trim()) {
      this.posts.unshift({ content: this.newPost.trim(), timestamp: new Date() });
      this.newPost = '';
      this.savePosts();
    }
  }

  savePosts(): void {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  loadPosts(): void {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts);
    }
  }
}
