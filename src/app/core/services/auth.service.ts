import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';
import { LoginRequest, RegisterRequest } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth'; // Your backend URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      }
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    // For demo purposes, using mock login
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/login`, credentials)
    return this.mockLogin(credentials).pipe(
      tap(response => {
        if (response.success) {
          const user: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            profileImage: response.user.profileImage || '/profile-images/default-avatar.jpg'
          };
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('authToken', response.token);
          this.currentUserSubject.next(user);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({ success: false, message: 'Login failed' });
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/register`, userData)
    return this.mockRegister(userData).pipe(
      tap(response => {
        if (response.success) {
          // Auto-login after successful registration
          this.login({ emailOrPhone: userData.email, password: userData.password }).subscribe();
        }
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return of({ success: false, message: 'Registration failed' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Mock methods - replace with actual API calls
  private mockLogin(credentials: LoginRequest): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        const demoCredentials = [
          { email: 'demo@connecto.com', phone: '1234567890', password: 'demo123' },
          { email: 'test@connecto.com', phone: '9876543210', password: 'test123' },
          { email: 'user@connecto.com', phone: '5555555555', password: 'user123' }
        ];

        const isValid = demoCredentials.some(cred => 
          (credentials.emailOrPhone === cred.email || credentials.emailOrPhone === cred.phone) && 
          credentials.password === cred.password
        ) || credentials.password === 'password123';

        if (isValid) {
          observer.next({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 1,
              name: 'Demo User',
              email: credentials.emailOrPhone.includes('@') ? credentials.emailOrPhone : 'demo@connecto.com',
              profileImage: '/profile-images/default-avatar.jpg'
            }
          });
        } else {
          observer.next({
            success: false,
            message: 'Invalid credentials'
          });
        }
        observer.complete();
      }, 1000);
    });
  }

  private mockRegister(userData: RegisterRequest): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Registration successful',
          user: {
            id: Date.now(),
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            profileImage: '/profile-images/default-avatar.jpg'
          }
        });
        observer.complete();
      }, 1500);
    });
  }
}
