import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true, // Required for using imports array in Angular components
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProfileComponent {
  fullName = 'John Doe';
  bio = 'Passionate developer. Coffee lover. 🖤';
  profileImage = '';
  coverPhoto = '';
  userProfileImage = '';
  showMenu = false;
  activeTab: 'posts' | 'photos' = 'posts';

  newPostContent = '';
  posts: { content: string, image?: string, timestamp: Date }[] = [];
  photos: { url: string, caption: string }[] = [];

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleNotifications(): void {
    alert('Notifications toggled.');
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  switchTab(tab: 'posts' | 'photos'): void {
    this.activeTab = tab;
  }

  updateProfilePhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileImage = URL.createObjectURL(file);
    }
  }

  updateCoverPhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.coverPhoto = URL.createObjectURL(file);
    }
  }

  handlePostImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const image = URL.createObjectURL(file);
      this.submitPost(image);
    }
  }

  submitPost(image?: string): void {
    if (this.newPostContent.trim()) {
      this.posts.unshift({
        content: this.newPostContent,
        image,
        timestamp: new Date()
      });
      this.newPostContent = '';
    }
  }

  handlePhotoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photos.push({
        url: URL.createObjectURL(file),
        caption: 'New Photo'
      });
    }
  }
}
