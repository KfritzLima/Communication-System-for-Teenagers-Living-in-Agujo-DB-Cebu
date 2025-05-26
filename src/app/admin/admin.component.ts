import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Comment {
  author: string;
  text: string;
}

interface Reactions {
  love: number;
  laugh: number;
  fire: number;
}

interface Post {
  id: string;
  author?: string;
  profileImage?: string;
  content: string;
  image?: string;
  timestamp: Date;
  comments: Comment[];
  newComment: string;
  likes: number;
  reactions: Reactions;
  sharedCount: number;
  approved?: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AdminComponent implements OnInit {
  posts: Post[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
      })).filter((p: Post) => !p.approved); // only show pending
    }
  }

  approve(post: Post): void {
    post.approved = true;
    this.save();
    this.posts = this.posts.filter(p => p.id !== post.id);
  }

  reject(post: Post): void {
    const confirmReject = confirm('Are you sure you want to reject this post?');
    if (confirmReject) {
      this.posts = this.posts.filter(p => p.id !== post.id);
      const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const updatedPosts = allPosts.filter((p: Post) => p.id !== post.id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  }

  private save(): void {
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updated = allPosts.map((p: Post) => {
      const match = this.posts.find(updatedPost => updatedPost.id === p.id);
      return match ? { ...p, approved: true } : p;
    });
    localStorage.setItem('posts', JSON.stringify(updated));
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
