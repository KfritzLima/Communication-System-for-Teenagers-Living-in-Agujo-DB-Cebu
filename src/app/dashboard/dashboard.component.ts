import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // for ngModel
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Sample updates
  updates = [
    { title: 'Welcome Message', timestamp: new Date() },
    { title: 'Forum Rules Updated', timestamp: new Date() }
  ];

  // Sample events
  events = [
    { name: 'Community Meetup', date: new Date(), location: 'Main Hall' },
    { name: 'Hackathon', date: new Date(), location: 'Auditorium' }
  ];

  // Expandable community news
  communityNews = [
    { headline: 'New Features Released', details: 'Check out what’s new in our forum!', open: false },
    { headline: 'Weekly Highlights', details: 'See what’s trending this week.', open: false }
  ];

  // Notifications list
  notifications = [
    { message: 'Alice commented on your post.' },
    { message: 'New event: Youth Camp 2025!' }
  ];

  // Toggle flags
  showNotifications = false;

  // Full name of logged-in user
  userFullName = localStorage.getItem('fullName') || 'User';

  // Posts and new post form fields
  posts: Array<{
    title: string;
    content: string;
    comments: string[];
    newComment?: string;
  }> = [
    {
      title: 'Welcome to AgujoForum!',
      content: 'Feel free to post your thoughts and ideas here.',
      comments: ['Great forum!', 'Happy to be here!']
    },
    {
      title: 'Upcoming Events',
      content: 'Don’t miss the community meetup next week.',
      comments: ['Looking forward to it!', 'Will there be snacks?']
    }
  ];

  newPostTitle = '';
  newPostContent = '';

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  // Check login state
  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
    }
  }

  // Logout functionality
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Toggle for accordion-style news
  toggleNews(news: any): void {
    news.open = !news.open;
  }

  // Toggle for showing notifications
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // Add new post
  addPost(): void {
    if (this.newPostTitle.trim() && this.newPostContent.trim()) {
      this.posts.unshift({
        title: this.newPostTitle.trim(),
        content: this.newPostContent.trim(),
        comments: []
      });
      this.newPostTitle = '';
      this.newPostContent = '';
    }
  }

  // Add comment to a post
  addComment(post: any): void {
    if (post.newComment && post.newComment.trim()) {
      post.comments.push(post.newComment.trim());
      post.newComment = '';
    }
  }

  // Scroll to post (optional functionality if you want to implement)
  scrollToPost(post: any): void {
    // Placeholder for scrolling functionality
    // Could be implemented using @ViewChildren and ElementRef
    // For now, just alert
    alert(`Scroll to post titled: "${post.title}"`);
  }
}
