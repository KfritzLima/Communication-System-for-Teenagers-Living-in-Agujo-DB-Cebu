import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; // ✅ Import added here

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule // ✅ Don't forget the comma before this
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  newPost = '';
  notifications = [
    'Maria commented on your post.',
    'System maintenance at 10 PM.'
  ];

  posts = [
    {
      author: 'Maria',
      timestamp: new Date().toLocaleString(),
      content: 'This is my first post!',
      comments: [
        { author: 'Juan', text: 'Welcome Maria!' }
      ],
      newComment: ''
    }
  ];

  submitPost() {
    const trimmed = this.newPost.trim();
    if (!trimmed) return;

    this.posts.unshift({
      author: 'You',
      timestamp: new Date().toLocaleString(),
      content: trimmed,
      comments: [],
      newComment: ''
    });

    this.newPost = '';
  }

  addComment(post: any) {
    const trimmed = post.newComment.trim();
    if (!trimmed) return;

    post.comments.push({
      author: 'You',
      text: trimmed
    });

    post.newComment = '';
  }

  logout() {
    // Optional: localStorage.clear();
    this.router.navigate(['/login']); // ✅ Navigates to login page
  }
}
