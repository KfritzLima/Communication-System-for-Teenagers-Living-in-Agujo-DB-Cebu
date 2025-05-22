import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'agujoUser';
  private userData: any = null;

  constructor() {
    const stored = localStorage.getItem(this.localStorageKey);
    this.userData = stored ? JSON.parse(stored) : null;
  }

  setUser(data: any) {
    this.userData = data;
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  getUser() {
    return this.userData;
  }

  isLoggedIn(): boolean {
    return this.userData !== null;
  }

  clearUser() {
    this.userData = null;
    localStorage.removeItem(this.localStorageKey);
  }
}
