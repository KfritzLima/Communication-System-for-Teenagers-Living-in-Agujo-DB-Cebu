import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/user.service';  // make sure this path is correct

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.setUser({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
    });

    this.router.navigate(['/dashboard']);
  }
}
