import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  token:any

  constructor(private authService: AuthService, private router:Router) { }
  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.authService.getProfile(this.token).subscribe(
        (response: any) => {
          this.user = response.user; // Make sure 'user' includes the 'phone' field
          console.log('User data received:', this.user); // Check if phone is present
        },
        (error) => {
          console.error('Error fetching profile:', error);
          this.router.navigate(['/login']);
        }
      );
    }
  }
  
  logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
