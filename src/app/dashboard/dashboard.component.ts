import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../services/notification.service';

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
  author: string;
  profileImage?: string | null;
  content: string;
  comments: Comment[];
  newComment: string;
  likes: number;
  reactions: Reactions;
  sharedCount: number;
  userReaction?: keyof Reactions;
  userLiked?: boolean;
  timestamp: Date;
  image?: string;
  location?: string;
  sharedFrom?: Post;
  showMenu?: boolean; // for 3-dot menu toggle
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  fullName = '';
  userProfileImage = '';
  newPost = '';
  showNotifications = false;
  showMenu = false;
  welcomeVisible = true;

  notifications: Notification[] = [];
  posts: Post[] = [];

  postImagePreview: string | null = null;
  postImageFile: File | null = null;

  shareModalVisible = false;
  selectedPost: Post | null = null;
  shareComment = '';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.fullName = localStorage.getItem('userFullName') ?? 'User';
    this.userProfileImage = localStorage.getItem('userProfileImage')?.trim() || 'assets/user.webp';

    setTimeout(() => (this.welcomeVisible = false), 3000);

    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      this.posts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
        sharedFrom: post.sharedFrom
          ? { ...post.sharedFrom, timestamp: new Date(post.sharedFrom.timestamp) }
          : undefined
      }));
    } else {
      this.addSamplePost();
    }

    this.notificationService.notifications$.subscribe(notifs => {
      this.notifications = notifs;
    });

    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  private addSamplePost(): void {
    const sample: Post = {
      author: 'Lyle Condes',
      profileImage: 'assets/user.webp',
      content: 'Hello Agujo!!',
      comments: [],
      newComment: '',
      likes: 0,
      reactions: { love: 0, laugh: 0, fire: 0 },
      sharedCount: 0,
      timestamp: new Date(),
      location: 'Agujo, Daanbantayan, Cebu'
    };

    this.posts.unshift(sample);
    this.notificationService.addNotification('Lyle Condes posted: Hello Agujo!!');
    this.savePosts();
  }

  submitPost(): void {
    const content = this.newPost.trim();
    if (!content && !this.postImagePreview) return;

    const newPost: Post = {
      author: this.fullName,
      profileImage: this.userProfileImage,
      content,
      comments: [],
      newComment: '',
      likes: 0,
      reactions: { love: 0, laugh: 0, fire: 0 },
      sharedCount: 0,
      timestamp: new Date(),
      image: this.postImagePreview || undefined,
      location: 'Agujo, Cebu'
    };

    this.posts.unshift(newPost);
    this.notificationService.addNotification(`${this.fullName} posted: ${content || 'a photo'}`);
    this.showToast('Post submitted!');

    this.newPost = '';
    this.removePostImage();
    this.savePosts();
  }

  handlePostImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.postImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.postImagePreview = e.target.result;
      };
      reader.readAsDataURL(this.postImageFile);
    }
  }

  removePostImage(): void {
    this.postImagePreview = null;
    this.postImageFile = null;
  }

  addComment(post: Post): void {
    const text = post.newComment.trim();
    if (!text) return;

    post.comments.push({ author: this.fullName, text });
    post.newComment = '';
    this.notificationService.addNotification(`${this.fullName} commented on a post`);
    this.showToast('Comment added!');
    this.savePosts();
  }

  toggleLike(post: Post): void {
    post.userLiked = !post.userLiked;
    post.likes += post.userLiked ? 1 : -1;

    this.notificationService.addNotification(
      `${this.fullName} ${post.userLiked ? 'liked' : 'unliked'} a post by ${post.author}`
    );
    this.showToast(post.userLiked ? 'You liked this post!' : 'Like removed');
    this.savePosts();
  }

  reactToPost(post: Post, type: keyof Reactions): void {
    if (post.userReaction === type) {
      post.reactions[type]--;
      post.userReaction = undefined;
      this.notificationService.addNotification(
        `${this.fullName} removed their ${type} reaction from a post by ${post.author}`
      );
      this.showToast('Reaction removed');
    } else {
      if (post.userReaction) {
        post.reactions[post.userReaction]--;
      }
      post.reactions[type]++;
      post.userReaction = type;
      this.notificationService.addNotification(
        `${this.fullName} reacted (${type}) to a post by ${post.author}`
      );
      this.showToast(`You reacted with ${type}`);
    }
    this.savePosts();
  }

  openShareModal(post: Post): void {
    this.selectedPost = post;
    this.shareModalVisible = true;
    this.shareComment = '';
  }

  closeShareModal(): void {
    this.selectedPost = null;
    this.shareModalVisible = false;
    this.shareComment = '';
  }

  shareNow(): void {
    if (!this.selectedPost) return;

    const sharedPost: Post = {
      author: this.fullName,
      profileImage: this.userProfileImage,
      content: this.shareComment.trim(),
      comments: [],
      newComment: '',
      likes: 0,
      reactions: { love: 0, laugh: 0, fire: 0 },
      sharedCount: 0,
      timestamp: new Date(),
      sharedFrom: this.selectedPost
    };

    this.selectedPost.sharedCount++;
    this.posts.unshift(sharedPost);
    this.notificationService.addNotification(
      `${this.fullName} shared a post by ${this.selectedPost.author}`
    );
    this.showToast('Post shared!');
    this.savePosts();
    this.closeShareModal();
  }

  // NEW — 3-dot post menu toggle
  togglePostMenu(post: Post): void {
    this.posts.forEach(p => {
      if (p !== post) p.showMenu = false;
    });
    post.showMenu = !post.showMenu;
  }

  // NEW — Delete post method
  deletePost(postToDelete: Post): void {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    this.posts = this.posts.filter(post => post !== postToDelete);
    this.savePosts();
    this.notificationService.addNotification(`${this.fullName} deleted a post.`);
    this.showToast('Post deleted!');
  }

  toggleNotifications(event: Event): void {
    event.preventDefault();
    this.showNotifications = !this.showNotifications;
    this.showMenu = false;
  }

  closeNotifications(): void {
    this.showNotifications = false;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.showNotifications = false;
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

  refreshPage(event: Event): void {
    event.preventDefault();
    window.location.reload();
  }

  handleOutsideClick(event: MouseEvent): void {
    const dropdown = document.querySelector('.notifications-dropdown');
    const bellIcon = document.querySelector('.fa-bell');

    if (
      dropdown &&
      bellIcon &&
      !dropdown.contains(event.target as Node) &&
      !bellIcon.contains(event.target as Node)
    ) {
      this.showNotifications = false;
    }
  }

  private savePosts(): void {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'floating-notification show';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}
