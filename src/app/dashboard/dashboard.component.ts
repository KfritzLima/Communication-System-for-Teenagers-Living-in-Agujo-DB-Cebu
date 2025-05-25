import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  location?: string; // ✅ Added this property
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
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

  constructor(private router: Router) {}

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
      }));
    } else {
      this.addSamplePost();
    }

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
      location: 'Agujo, Daanbantayan, Cebu', // ✅ Added sample location
    };

    this.posts.unshift(sample);
    this.notifications.unshift({
      message: 'Lyle Condes posted: Hello Agujo!!',
      timestamp: new Date(),
    });

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
      location: 'Agujo, Cebu', // ✅ Default location for new posts (optional)
    };

    this.posts.unshift(newPost);
    this.savePosts();

    this.notifications.unshift({
      message: `${this.fullName} posted: ${content || 'a photo'}`,
      timestamp: new Date(),
    });

    this.newPost = '';
    this.removePostImage();
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

    this.notifications.unshift({
      message: `${this.fullName} commented on a post`,
      timestamp: new Date(),
    });

    this.savePosts();
  }

  toggleLike(post: Post): void {
    post.userLiked = !post.userLiked;
    post.likes += post.userLiked ? 1 : -1;

    this.notifications.unshift({
      message: `${this.fullName} ${post.userLiked ? 'liked' : 'unliked'} a post by ${post.author}`,
      timestamp: new Date(),
    });

    this.savePosts();
  }

  reactToPost(post: Post, type: keyof Reactions): void {
    if (post.userReaction === type) {
      post.reactions[type]--;
      post.userReaction = undefined;

      this.notifications.unshift({
        message: `${this.fullName} removed their ${type} reaction from a post by ${post.author}`,
        timestamp: new Date(),
      });
    } else {
      if (post.userReaction) post.reactions[post.userReaction]--;
      post.reactions[type]++;
      post.userReaction = type;

      this.notifications.unshift({
        message: `${this.fullName} reacted (${type}) to a post by ${post.author}`,
        timestamp: new Date(),
      });
    }

    this.savePosts();
  }

  sharePost(post: Post): void {
    post.sharedCount++;

    this.notifications.unshift({
      message: `${this.fullName} shared a post by ${post.author}`,
      timestamp: new Date(),
    });

    alert(`Post by ${post.author} shared!`);
    this.savePosts();
  }

  toggleNotifications(event: Event): void {
    event.preventDefault();
    this.showNotifications = !this.showNotifications;
    this.showMenu = false;
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
}
