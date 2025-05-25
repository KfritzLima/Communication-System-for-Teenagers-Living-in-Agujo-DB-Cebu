import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<{ message: string; timestamp: Date }[]>([]);
  public notifications$ = this.notifications.asObservable();

  addNotification(message: string) {
    const current = this.notifications.value;
    this.notifications.next([
      { message, timestamp: new Date() },
      ...current
    ]);
  }

  clearNotifications() {
    this.notifications.next([]);
  }

  getAll() {
    return this.notifications.value;
  }
}
