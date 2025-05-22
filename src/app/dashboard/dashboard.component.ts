import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fullName: string | null = '';
  newPost: string = '';
  showNotifications: boolean = false;

  notifications: string[] = [
    'Lyle Condes posted: Hello Agujo!!',
    'Someone commented on your post'
  ];

  posts: {
    author: string;
    content: string;
    comments: { author: string; text: string }[];
    newComment: string;
  }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
    }

    this.fullName = localStorage.getItem('userFullName') || 'User';

    // ✅ Preloaded post from Lyle Condes
    this.posts.push({
      author: 'Lyle Condes',
      content: 'Hello Agujo!!',
      comments: [],
      newComment: ''
    });
  }

  addPost(): void {
    if (this.newPost.trim()) {
      this.posts.unshift({
        author: this.fullName || 'User',
        content: this.newPost,
        comments: [],
        newComment: ''
      });
      this.newPost = '';
    }
  }

  addComment(post: any): void {
    if (post.newComment && post.newComment.trim()) {
      post.comments.push({
        author: this.fullName || 'User',
        text: post.newComment
      });
      post.newComment = '';
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
