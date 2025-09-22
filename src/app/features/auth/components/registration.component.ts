import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  isLoading = false;
  registrationError = '';
  showConfirmationModal = false;
  registeredMobileNumber = '';
  passwordMismatch = false;
  dateOfBirthError = '';

  // Date options
  days: number[] = [];
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  years: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initializeDateOptions();
    this.initializeForm();
    this.setupPasswordMatchValidator();
  }

  private initializeDateOptions() {
    // Generate days 1-31
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    
    // Generate years from current year - 100 to current year - 13
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 13; i >= currentYear - 100; i--) {
      this.years.push(i);
    }
  }

  private initializeForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
      ]],
      surname: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
      ]],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in)$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  private setupPasswordMatchValidator() {
    this.registrationForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    
    this.registrationForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
  }

  private checkPasswordMatch() {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    
    this.passwordMismatch = password && confirmPassword && password !== confirmPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private validateDateOfBirth(): boolean {
    const day = this.registrationForm.get('day')?.value;
    const month = this.registrationForm.get('month')?.value;
    const year = this.registrationForm.get('year')?.value;

    if (!day || !month || !year) {
      this.dateOfBirthError = 'Please provide a valid date of birth';
      return false;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    // Check if date is valid
    if (birthDate.getDate() !== parseInt(day) || 
        birthDate.getMonth() !== month - 1 || 
        birthDate.getFullYear() !== parseInt(year)) {
      this.dateOfBirthError = 'Please provide a valid date';
      return false;
    }

    // Check if date is in the past
    if (birthDate >= today) {
      this.dateOfBirthError = 'Date of birth must be in the past';
      return false;
    }

    // Check if user is at least 13 years old
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      actualAge--;
    }

    if (actualAge < 13) {
      this.dateOfBirthError = 'You must be at least 13 years old';
      return false;
    }

    this.dateOfBirthError = '';
    return true;
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  onRegister() {
    if (this.registrationForm.valid && !this.passwordMismatch) {
      // Validate date of birth
      if (!this.validateDateOfBirth()) {
        return;
      }

      this.isLoading = true;
      this.registrationError = '';
      
      const formData = { ...this.registrationForm.value };
      
      // Capitalize first letter of names
      formData.firstName = this.capitalizeFirstLetter(formData.firstName);
      formData.surname = this.capitalizeFirstLetter(formData.surname);
      
      // Simulate registration API call
      setTimeout(() => {
        // Check for duplicate email/mobile (in real app, this would be handled by backend)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const isDuplicate = existingUsers.some((user: any) => 
          user.email === formData.email || user.mobileNumber === formData.mobileNumber
        );
        
        if (isDuplicate) {
          this.registrationError = 'An account with this email or mobile number already exists.';
          this.isLoading = false;
          return;
        }
        
        // Store user data (in real app, this would be sent to backend)
        const userData = {
          id: Date.now(),
          firstName: formData.firstName,
          surname: formData.surname,
          dateOfBirth: `${formData.year}-${formData.month.toString().padStart(2, '0')}-${formData.day.toString().padStart(2, '0')}`,
          gender: formData.gender,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          createdAt: new Date().toISOString()
        };
        
        existingUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        // Show confirmation modal
        this.registeredMobileNumber = formData.mobileNumber;
        this.showConfirmationModal = true;
        this.isLoading = false;
        
        console.log('Registration successful:', userData);
      }, 1500);
    }
  }

  onConfirmationClose() {
    this.showConfirmationModal = false;
    this.router.navigate(['/login']);
  }

  goToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}