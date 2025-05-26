import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Creator {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private router: Router) {}
  creators: Creator[] = [
    {
      name: 'Kfritz Lima',
      role: 'Project Lead',
      image: 'assets/creators/Fritz.jpg',
  
    },
    {
      name: 'Dember Pepito',
      role: 'UI/UX Designer',
      image: 'assets/creators/dembs.jpg',
    
    },
    {
      name: 'John Moses Puyot',
      role: 'Backend Developer',
      image: 'assets/creators/motet.jpg',
     
    },
    {
      name: 'Janna Krista Kim Coyoca',
      role: 'Frontend Developer',
      image: 'assets/creators/part.jpg',
   
    }
    
  ];
    goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}