import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class NavigationComponent implements OnInit {
  currentUser: User | null = null;
  isDropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user') || localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentUser = {
          id: user.id || 1,
          name: user.name || user.firstName + ' ' + user.lastName || 'Demo User',
          email: user.email || 'demo@connecto.com',
          profileImage: user.profileImage || '/profile-images/default-avatar.jpg'
        };
      }
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    // Clear user data from localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('currentUser');
    }
    
    // Close dropdown
    this.closeDropdown();
    
    // Navigate to login page
    this.router.navigate(['/login']);
    
    // Optional: Show logout confirmation
    console.log('User logged out successfully');
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.profile-dropdown');
    
    if (!dropdown && this.isDropdownOpen) {
      this.closeDropdown();
    }
  }
}