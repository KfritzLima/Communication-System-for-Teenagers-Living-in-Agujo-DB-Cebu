import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../user/user.service'; // ✅ Make sure this path is correct

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fullName = '';
  username = '';
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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const user = this.userService.getUser();
    if (user) {
      this.fullName = user.fullName;
      this.username = user.username;
    }
  }

  submitPost() {
    const trimmed = this.newPost.trim();
    if (!trimmed) return;

    this.posts.unshift({
      author: this.fullName || 'You',
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
      author: this.fullName || 'You',
      text: trimmed
    });

    post.newComment = '';
  }

  logout() {
  console.log('Logging out...');
  this.userService.clearUser();
  this.router.navigate(['/login']);
}

}
