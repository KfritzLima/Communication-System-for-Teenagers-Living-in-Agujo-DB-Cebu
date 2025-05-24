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
  fullName: string = '';
  userProfileImage: string = '';

  newPost: string = '';
  showNotifications: boolean = false;
  showMenu: boolean = false;
  welcomeVisible: boolean = true;

  notifications: Notification[] = [];
  posts: Post[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.fullName = localStorage.getItem('userFullName') ?? 'User';
    this.userProfileImage = localStorage.getItem('userProfileImage')?.trim() || 'assets/user.webp';

    setTimeout(() => {
      this.welcomeVisible = false;
    }, 3000);

    this.addSamplePost();
  }

  private addSamplePost(): void {
    this.posts.push({
      author: 'Lyle Condes',
      profileImage: 'assets/user.webp',
      content: 'Hello Agujo!!',
      comments: [],
      newComment: '',
      likes: 0,
      reactions: { love: 0, laugh: 0, fire: 0 },
      sharedCount: 0,
      timestamp: new Date()
    });

    this.notifications.push({
      message: 'Lyle Condes posted: Hello Agujo!!',
      timestamp: new Date()
    });
  }

  addPost(): void {
    const content = this.newPost.trim();
    if (!content) return;

    this.posts.unshift({
      author: this.fullName,
      profileImage: this.userProfileImage,
      content,
      comments: [],
      newComment: '',
      likes: 0,
      reactions: { love: 0, laugh: 0, fire: 0 },
      sharedCount: 0,
      timestamp: new Date()
    });

    this.notifications.unshift({
      message: `${this.fullName} posted: ${content}`,
      timestamp: new Date()
    });

    this.newPost = '';
  }

  addComment(post: Post): void {
    const text = post.newComment.trim();
    if (!text) return;

    post.comments.push({ author: this.fullName, text });
    this.notifications.unshift({
      message: `${this.fullName} commented on a post`,
      timestamp: new Date()
    });

    post.newComment = '';
  }

  toggleLike(post: Post): void {
    post.userLiked = !post.userLiked;
    post.likes += post.userLiked ? 1 : -1;

    this.notifications.unshift({
      message: `${this.fullName} ${post.userLiked ? 'liked' : 'unliked'} a post by ${post.author}`,
      timestamp: new Date()
    });
  }

  reactToPost(post: Post, type: keyof Reactions): void {
    if (post.userReaction === type) {
      post.reactions[type]--;
      post.userReaction = undefined;

      this.notifications.unshift({
        message: `${this.fullName} removed their ${type} reaction from a post by ${post.author}`,
        timestamp: new Date()
      });
    } else {
      if (post.userReaction) {
        post.reactions[post.userReaction]--;
      }

      post.reactions[type]++;
      post.userReaction = type;

      this.notifications.unshift({
        message: `${this.fullName} reacted (${type}) to a post by ${post.author}`,
        timestamp: new Date()
      });
    }
  }

  sharePost(post: Post): void {
    post.sharedCount++;

    this.notifications.unshift({
      message: `${this.fullName} shared a post by ${post.author}`,
      timestamp: new Date()
    });

    alert(`Post by ${post.author} shared!`);
  }

  toggleNotifications(): void {
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

  goToAbout(): void {
    alert("This is a Facebook-style forum UI built with Angular.");
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
