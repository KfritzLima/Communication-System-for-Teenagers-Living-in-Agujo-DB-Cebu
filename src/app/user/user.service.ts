// src/app/user/user.service.ts

import { Injectable } from '@angular/core';

export interface User {
  fullName: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  // Save user data
  setUser(user: User): void {
    this.user = user;
    console.log('UserService: setUser called:', user);
  }

  // Get user data
  getUser(): User | null {
    console.log('UserService: getUser called:', this.user);
    return this.user;
  }

  // Clear user data (e.g., logout)
  clearUser(): void {
    this.user = null;
    console.log('UserService: clearUser called');
  }
}
