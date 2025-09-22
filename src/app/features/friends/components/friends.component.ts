import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  profileImage: string;
  requestSent?: boolean;
  isLoading?: boolean;
  isConfirmed?: boolean;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  currentSection: string = 'find-friends';
  searchTerm: string = '';
  
  suggestedFriends: User[] = [];
  friendRequests: User[] = [];
  allFriends: User[] = [];
  filteredFriends: User[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if user is logged in
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        this.router.navigate(['/login']);
        return;
      }
    }
    
    this.loadDummyData();
  }

  private loadDummyData() {
    // Dummy suggested friends
    this.suggestedFriends = [
      {
        id: 1,
        name: 'Lily',
        profileImage: '/profile-images/u2.jpg',
        requestSent: false,
        isLoading: false
      },
      {
        id: 2,
        name: 'Kris kellers',
        profileImage: 'profile-images/kris.jpg',
        requestSent: false,
        isLoading: false
      },
      {
        id: 3,
        name: 'Dr G',
        profileImage: 'profile-images/dr-g.jpg',
        requestSent: false,
        isLoading: false
      },
      {
        id: 4,
        name: 'Golfie',
        profileImage: 'profile-images/golfie.jpg',
        requestSent: false,
        isLoading: false
      },
      {
        id: 5,
        name: 'Chef Monica',
        profileImage: 'profile-images/chef-monica.jpg',
        requestSent: false,
        isLoading: false
      },
      {
        id: 6,
        name: 'Opera',
        profileImage: 'profile-images/opera.jpg',
        requestSent: false,
        isLoading: false
      }
    ];

    // Dummy friend requests
    this.friendRequests = [
      {
        id: 7,
        name: 'Ocean paul',
        profileImage: 'profile-images/ocean-paul.jpg',
        isLoading: false,
        isConfirmed: false
      },
      {
        id: 8,
        name: 'Nature Lover',
        profileImage: 'profile-images/nature-lover.jpg',
        isLoading: false,
        isConfirmed: false
      },
      {
        id: 9,
        name: 'Foodie',
        profileImage: 'profile-images/foodie.jpg',
        isLoading: false,
        isConfirmed: false
      }
    ];

    // Dummy all friends (initially empty, will be populated when friend requests are confirmed)
    this.allFriends = [
      {
        id: 10,
        name: 'Lily',
        profileImage: 'profile-images/lily.jpg',
        isLoading: false
      }
    ];
    
    this.filteredFriends = [...this.allFriends];
  }

  setSection(section: string) {
    this.currentSection = section;
  }

  toggleFriendRequest(user: User) {
    user.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      user.requestSent = !user.requestSent;
      user.isLoading = false;
      
      if (user.requestSent) {
        console.log(`Friend request sent to ${user.name}`);
      } else {
        console.log(`Friend request cancelled for ${user.name}`);
      }
    }, 1000);
  }

  confirmRequest(request: User) {
    request.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      request.isConfirmed = true;
      request.isLoading = false;
      
      // Add to friends list
      this.allFriends.push({
        id: request.id,
        name: request.name,
        profileImage: request.profileImage,
        isLoading: false
      });
      
      // Update filtered friends
      this.filterFriends();
      
      console.log(`Friend request from ${request.name} confirmed`);
      
      // After 2 seconds, remove from friend requests
      setTimeout(() => {
        this.friendRequests = this.friendRequests.filter(r => r.id !== request.id);
      }, 2000);
    }, 1000);
  }

  deleteRequest(request: User) {
    request.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.friendRequests = this.friendRequests.filter(r => r.id !== request.id);
      console.log(`Friend request from ${request.name} deleted`);
    }, 1000);
  }

  viewProfile(user: User) {
    console.log(`Viewing profile of ${user.name}`);
    // Navigate to profile page (will be implemented later)
    // this.router.navigate(['/profile', user.id]);
  }

  unfriend(friend: User) {
    if (confirm(`Are you sure you want to unfriend ${friend.name}?`)) {
      friend.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.allFriends = this.allFriends.filter(f => f.id !== friend.id);
        this.filterFriends();
        console.log(`Unfriended ${friend.name}`);
      }, 1000);
    }
  }

  filterFriends() {
    if (!this.searchTerm.trim()) {
      this.filteredFriends = [...this.allFriends];
    } else {
      this.filteredFriends = this.allFriends.filter(friend =>
        friend.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}