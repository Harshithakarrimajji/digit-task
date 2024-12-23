import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fixed the typo in 'styleUrls'
})
export class LoginComponent {
  loginForm!: FormGroup;
  message: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          alert('Login successful');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials!');
        }
      );
    }
  }
  
}
