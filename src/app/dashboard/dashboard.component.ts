import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],   // <-- Import FormsModule here for ngModel binding
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  updates = [
    { title: 'New forum category added!', timestamp: new Date() },
    { title: 'Maintenance scheduled for Friday.', timestamp: new Date('2025-05-23T09:00:00') },
  ];

  events = [
    { name: 'Community Meetup', date: new Date('2025-05-21'), location: 'Community Hall' },
    { name: 'Charity Drive', date: new Date('2025-06-01'), location: 'Town Square' },
  ];

  communityNews = [
    { headline: 'Local Hero Saves Cat', details: 'John Doe climbed a tree to rescue a cat stuck for hours.', expanded: false },
    { headline: 'New Library Opening', details: 'A state-of-the-art library opens next month in the town center.', expanded: false },
  ];

  posts: { content: string; timestamp: Date }[] = [];

  newPost: string = '';

  logout() {
    alert('Logout clicked!');
  }

  submitPost() {
    if (!this.newPost.trim()) return;

    this.posts.unshift({
      content: this.newPost.trim(),
      timestamp: new Date(),
    });

    this.newPost = '';
  }
}
