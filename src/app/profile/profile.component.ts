import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



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
export class ProfileComponent implements OnInit {
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

  notifications = [
    { message: 'You have a new follower.', timestamp: new Date() },
    { message: 'Someone liked your post.', timestamp: new Date() },
  ];

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
      })).filter((post: Post) => post.author === this.fullName);
    }

    const savedPhotos = localStorage.getItem('photos');
    if (savedPhotos) {
      this.photos = JSON.parse(savedPhotos);
    }
  }

  get displayUserImage(): string {
    return this.userProfileImage?.trim() || 'assets/user.webp';
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.showNotifications = false;
  }

  toggleNotifications(event: Event): void {
    event.preventDefault(); // ✅ fixes error with $event
    this.showNotifications = !this.showNotifications;
    this.showMenu = false;
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
    };

    this.posts.unshift(newPost);
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
    this.savePosts();
  }

  toggleLike(post: Post): void {
    post.userLiked = !post.userLiked;
    post.likes += post.userLiked ? 1 : -1;
    this.savePosts();
  }

  reactToPost(post: Post, type: keyof Reactions): void {
    if (post.userReaction === type) {
      post.reactions[type]--;
      post.userReaction = undefined;
    } else {
      if (post.userReaction) post.reactions[post.userReaction]--;
      post.reactions[type]++;
      post.userReaction = type;
    }
    this.savePosts();
  }

  sharePost(post: Post): void {
    post.sharedCount++;
    this.savePosts();
    alert('Post shared!');
  }

  private savePosts(): void {
    const allPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPostIds = this.posts.map(p => p.id);
    const nonUserPosts = allPosts.filter(p => !updatedPostIds.includes(p.id));
    const mergedPosts = [...this.posts, ...nonUserPosts];
    localStorage.setItem('posts', JSON.stringify(mergedPosts));
  }

  private generateId(): string {
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 9);
  }
}
