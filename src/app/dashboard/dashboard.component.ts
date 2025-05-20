import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  newPost = '';
  notifications = ['Maria commented on your post.', 'System maintenance at 10 PM.'];

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
    if (!this.newPost.trim()) return;

    this.posts.unshift({
      author: 'You',
      timestamp: new Date().toLocaleString(),
      content: this.newPost.trim(),
      comments: [],
      newComment: ''
    });

    this.newPost = '';
  }

  addComment(post: any) {
    if (!post.newComment.trim()) return;

    post.comments.push({
      author: 'You',
      text: post.newComment.trim()
    });

    post.newComment = '';
  }

  logout() {
    // Optionally clear session
    // localStorage.clear();
    
    this.router.navigate(['/login']); // ✅ Navigate to login page
  }
}
