import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  loginError = '';
  failedAttempts = 0;
  circuitBreakerActive = false;
  remainingTime = 0;
  private circuitBreakerTimer?: ReturnType<typeof setTimeout>;
  private countdownTimer?: ReturnType<typeof setInterval>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.circuitBreakerTimer) {
      clearTimeout(this.circuitBreakerTimer);
    }
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onLogin() {
    if (this.loginForm.valid && !this.circuitBreakerActive) {
      this.isLoading = true;
      this.loginError = '';
      
      const formData = this.loginForm.value;
      
      // Simulate login API call
      setTimeout(() => {
        // For demo purposes, simulate login logic
        // In real implementation, this would be an HTTP call to backend
        const isValidCredentials = this.validateCredentials(formData.emailOrPhone, formData.password);
        
        if (isValidCredentials) {
          // Successful login
          this.failedAttempts = 0;
          this.loginError = '';
          
          // Store user session (in real app, this would be JWT token)
          if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem('user', JSON.stringify({
              email: formData.emailOrPhone,
              loggedIn: true,
              loginTime: new Date().toISOString()
            }));
          }
          
          // Navigate to home page
          console.log('Login successful! Redirecting to home...');
          this.isLoading = false;
          this.router.navigate(['/home']);
        } else {
          // Failed login
          this.failedAttempts++;
          this.loginError = 'Invalid email/phone or password. Please try again.';
          
          // Check if circuit breaker should activate (3 failed attempts within 30 seconds)
          if (this.failedAttempts >= 3) {
            this.activateCircuitBreaker();
          }
        }
        
        this.isLoading = false;
      }, 1000);
    }
  }

  private validateCredentials(emailOrPhone: string, password: string): boolean {
    // Demo validation - in real app, this would be handled by backend
    // Demo credentials for testing:
    const demoCredentials = [
      { email: 'demo@connecto.com', phone: '1234567890', password: 'demo123' },
      { email: 'test@connecto.com', phone: '9876543210', password: 'test123' },
      { email: 'user@connecto.com', phone: '5555555555', password: 'user123' },
      // Also accept the generic password for any email/phone
      { password: 'password123' }
    ];
    
    // Check specific demo credentials
    for (const cred of demoCredentials) {
      if (cred.email && cred.phone) {
        if ((emailOrPhone === cred.email || emailOrPhone === cred.phone) && password === cred.password) {
          return true;
        }
      } else if (cred.password && password === cred.password) {
        return true;
      }
    }
    
    return false;
  }

  private activateCircuitBreaker() {
    this.circuitBreakerActive = true;
    this.remainingTime = 60; // 1 minute
    this.loginError = '';
    
    // Start countdown
    this.countdownTimer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.deactivateCircuitBreaker();
      }
    }, 1000);
    
    // Auto-deactivate after 1 minute
    this.circuitBreakerTimer = setTimeout(() => {
      this.deactivateCircuitBreaker();
    }, 60000);
  }

  private deactivateCircuitBreaker() {
    this.circuitBreakerActive = false;
    this.failedAttempts = 0;
    this.remainingTime = 0;
    
    if (this.circuitBreakerTimer) {
      clearTimeout(this.circuitBreakerTimer);
    }
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    this.router.navigate(['/forgot-password']);
  }
}