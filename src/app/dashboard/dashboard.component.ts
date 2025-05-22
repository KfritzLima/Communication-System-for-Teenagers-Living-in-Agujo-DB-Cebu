import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../user/user.service'; // Import UserService

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
  fullName: string = '';
  newPost = '';
  posts = [
    {
      author: 'Alice',
      content: 'Hello World!',
      comments: [{ author: 'Bob', text: 'Hi Alice!' }],
      newComment: ''
    }
  ];

  constructor(private router: Router, private userService: UserService) {
    // Load user data from service or fallback to localStorage
    const user = this.userService.getUser();
    this.fullName = user?.fullName || localStorage.getItem('userFullName') || 'John Doe';
  }

  logout() {
    this.userService.clearUser();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

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
}
