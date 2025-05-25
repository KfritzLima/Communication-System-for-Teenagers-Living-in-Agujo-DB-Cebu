import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Notification {
  message: string;
  timestamp: Date;
}

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
  userReaction?: keyof Reactions;
  userLiked?: boolean;
  showMenu?: boolean;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProfileComponent implements OnInit, OnDestroy {
  fullName = 'John Doe';
  bio = 'Passionate developer. Coffee lover. 🖤';
  profileImage = '';
  coverPhoto = '';
  userProfileImage = '';

  showMenu = false;
  showNotifications = false;
  activeTab: 'posts' | 'photos' = 'posts';

  newPost = '';
  postImagePreview: string | null = null;

  posts: Post[] = [];
  photos: Photo[] = [];
  notifications: Notification[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fullName = localStorage.getItem('userFullName') ?? 'John Doe';
    this.bio = localStorage.getItem('bio') ?? 'Passionate developer. Coffee lover. 🖤';
    this.profileImage = localStorage.getItem('userProfileImage') || '';
    this.coverPhoto = localStorage.getItem('coverPhoto') || '';
    this.userProfileImage = this.profileImage;

    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      this.posts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
        comments: post.comments || [],
        newComment: '',
        likes: post.likes ?? 0,
        reactions: post.reactions ?? { love: 0, laugh: 0, fire: 0 },
        sharedCount: post.sharedCount ?? 0,
        showMenu: false
      })).filter((post: Post) => post.author === this.fullName);
    }

    const savedPhotos = localStorage.getItem('photos');
    if (savedPhotos) {
      this.photos = JSON.parse(savedPhotos);
    }

    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications).map((n: any) => ({
        message: n.message,
        timestamp: new Date(n.timestamp)
      }));
    }

    document.addEventListener('click', this.handleOutsideClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  get displayUserImage(): string {
    return this.userProfileImage?.trim() || 'assets/user.webp';
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.showNotifications = false;
  }

  toggleNotifications(event: Event): void {
    event.preventDefault();
    this.showNotifications = !this.showNotifications;
    this.showMenu = false;
  }

  closeNotifications(): void {
    this.showNotifications = false;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
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

  switchTab(tab: 'posts' | 'photos'): void {
    this.activeTab = tab;
  }

  updateProfilePhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.profileImage = base64;
      this.userProfileImage = base64;
      localStorage.setItem('userProfileImage', base64);
    };
    reader.readAsDataURL(file);
  }

  updateCoverPhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.coverPhoto = base64;
      localStorage.setItem('coverPhoto', base64);
    };
    reader.readAsDataURL(file);
  }

  handlePostImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.postImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removePostImage(): void {
    this.postImagePreview = null;
  }

  submitPost(): void {
    const content = this.newPost.trim();
    if (!content && !this.postImagePreview) return;

    const newPost: Post = {
      id: this.generateId(),
      author: this.fullName,
      profileImage: this.userProfileImage,
      content,
      image: this.postImagePreview || undefined,
      timestamp: new Date(),
      comments: [],
      newComment: '',
      likes: 0,
      reactions: { love: 0, laugh: 0, fire: 0 },
      sharedCount: 0,
      showMenu: false
    };

    this.posts.unshift(newPost);
    this.addNotification(`${this.fullName} posted: ${content || 'a photo'}`);
    this.savePosts();
    this.newPost = '';
    this.postImagePreview = null;
  }

  handlePhotoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const photo: Photo = {
        id: this.generateId(),
        url: reader.result as string,
        caption: 'New Photo',
      };
      this.photos.push(photo);
      localStorage.setItem('photos', JSON.stringify(this.photos));
    };
    reader.readAsDataURL(file);
  }

  addComment(post: Post): void {
    const text = post.newComment.trim();
    if (!text) return;

    post.comments.push({ author: this.fullName, text });
    post.newComment = '';
    this.addNotification(`${this.fullName} commented on a post`);
    this.savePosts();
  }

  toggleLike(post: Post): void {
    post.userLiked = !post.userLiked;
    post.likes += post.userLiked ? 1 : -1;
    this.addNotification(`${this.fullName} ${post.userLiked ? 'liked' : 'unliked'} a post`);
    this.savePosts();
  }

  reactToPost(post: Post, type: keyof Reactions): void {
    if (post.userReaction === type) {
      post.reactions[type]--;
      post.userReaction = undefined;
      this.addNotification(`${this.fullName} removed their ${type} reaction`);
    } else {
      if (post.userReaction) post.reactions[post.userReaction]--;
      post.reactions[type]++;
      post.userReaction = type;
      this.addNotification(`${this.fullName} reacted with ${type}`);
    }
    this.savePosts();
  }

  sharePost(post: Post): void {
    post.sharedCount++;
    this.addNotification(`${this.fullName} shared a post`);
    this.savePosts();
    alert('Post shared!');
  }

  togglePostMenu(post: Post): void {
    this.posts.forEach(p => {
      if (p !== post) p.showMenu = false;
    });
    post.showMenu = !post.showMenu;
  }

  deletePost(post: Post): void {
    this.posts = this.posts.filter(p => p.id !== post.id);
    this.addNotification(`${this.fullName} deleted a post`);
    this.savePosts();
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isInside = target.closest('.post-menu-btn') || target.closest('.post-menu-dropdown');

    if (!isInside) {
      this.posts.forEach(p => p.showMenu = false);
    }
  };

  private savePosts(): void {
    const allPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPostIds = this.posts.map(p => p.id);
    const nonUserPosts = allPosts.filter(p => !updatedPostIds.includes(p.id));
    const mergedPosts = [...this.posts, ...nonUserPosts];
    localStorage.setItem('posts', JSON.stringify(mergedPosts));
  }

  private addNotification(message: string): void {
    const notif: Notification = {
      message,
      timestamp: new Date()
    };
    this.notifications.unshift(notif);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  private generateId(): string {
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 9);
  }
}
