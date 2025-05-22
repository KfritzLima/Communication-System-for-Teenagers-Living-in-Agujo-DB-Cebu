import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fullName = 'John Doe';
  newPost = '';
  posts = [
    {
      author: 'Alice',
      content: 'Hello World!',
      comments: [{ author: 'Bob', text: 'Hi Alice!' }],
      newComment: ''
    }
  ];

  submitPost() {
    if (!this.newPost.trim()) return;
    this.posts.unshift({
      author: this.fullName,
      content: this.newPost.trim(),
      comments: [],
      newComment: ''
    });
    this.newPost = '';
  }

  addComment(post: any) {
    if (!post.newComment.trim()) return;
    post.comments.push({
      author: this.fullName,
      text: post.newComment.trim()
    });
    post.newComment = '';
  }

  logout() {
    // Add your logout logic here:
    console.log('User logged out');
    // For example, clear tokens, redirect, etc.
  }
}
