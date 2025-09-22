import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  passwordsDoNotMatch(): boolean {
    const { newPassword, confirmPassword } = this.resetForm.value;
    return !!newPassword && !!confirmPassword && newPassword !== confirmPassword;
  }

  onSubmit() {
    if (this.resetForm.invalid || this.passwordsDoNotMatch()) {
      this.errorMessage = 'Please fix the errors before submitting.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      alert('Password updated successfully. Please log in with your new password.');
      this.router.navigate(['/login']);
    }, 800);
  }
}


