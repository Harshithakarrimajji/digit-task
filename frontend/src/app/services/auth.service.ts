import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http:HttpClient) { }

  register(user: { email: string, password: string }) {
    return this.http.post(`http://localhost:5000/users/register`, user);
  }

  login(userData: { email: string, password: string }) {
    return this.http.post(`http://localhost:5000/users/login`, userData);
  }

  getProfile(token: string) {
    return this.http.get(`http://localhost:5000/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error: ${error.status}, Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Store the token in local storage
  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Remove the token from local storage
  logout() {
    localStorage.removeItem('authToken');
  }

}
