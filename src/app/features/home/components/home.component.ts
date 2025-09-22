import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  profileImage: string;
}

interface Comment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  images?: string[];
  location?: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  createdAt: string;
  showComments: boolean;
  newComment: string;
}

interface SponsoredAd {
  id: number;
  title: string;
  description: string;
  image: string;
  website: string;
}

interface Contact {
  id: number;
  name: string;
  profileImage: string;
  isOnline: boolean;
}

interface Group {
  id: number;
  name: string;
  image: string;
  hasActivity: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  posts: Post[] = [];
  sponsoredAds: SponsoredAd[] = [];
  onlineContacts: Contact[] = [];
  popularGroups: Group[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.loadDummyData();
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
          profileImage: user.profileImage || '/profile-images/default-avatar.jpg'
        };
      } else {
        // Redirect to login if no user data
        this.router.navigate(['/login']);
      }
    }
  }

  private loadDummyData() {
    // TODO: Replace with actual API calls when backend is ready
    this.loadDummyPosts();
    this.loadDummySidebarData();
  }

  private loadDummyPosts() {
    this.posts = [
      {
        id: 1,
        user: {
          id: 1,
          name: 'Lily',
          profileImage: '/profile-images/u2.jpg'
        },
        content: 'There is nothing more beautiful than enjoying the nature',
        images: [
          '/profile-images/nature1.jpg',
          '/profile-images/nature2.jpg', 
          '/profile-images/nature3.jpg'
        ],
        location: 'Australia',
        likes: 44,
        isLiked: false,
        comments: [
          {
            id: 1,
            user: {
              id: 2,
              name: 'John Doe',
              profileImage: '/profile-images/u3.jpg'
            },
            content: 'Amazing photos! Nature is truly beautiful.',
            createdAt: '1h'
          }
        ],
        createdAt: '2 June 2024',
        showComments: false,
        newComment: ''
      },
      {
        id: 2,
        user: {
          id: 3,
          name: 'Ocean Paul',
          profileImage: '/profile-images/u4.jpg'
        },
        content: 'Just finished an amazing workout session! 💪 Feeling energized and ready to take on the day.',
        images: [],
        likes: 23,
        isLiked: true,
        comments: [
          {
            id: 2,
            user: {
              id: 4,
              name: 'Sarah Wilson',
              profileImage: '/profile-images/u5.jpg'
            },
            content: 'Keep it up! Your dedication is inspiring.',
            createdAt: '30m'
          },
          {
            id: 3,
            user: {
              id: 5,
              name: 'Mike Johnson',
              profileImage: '/profile-images/u6.jpg'
            },
            content: 'What workout routine are you following?',
            createdAt: '15m'
          }
        ],
        createdAt: '3 hours ago',
        showComments: false,
        newComment: ''
      },
      {
        id: 3,
        user: {
          id: 6,
          name: 'Chef Monica',
          profileImage: '/profile-images/u7.jpg'
        },
        content: 'Tried a new recipe today! Homemade pasta with fresh herbs from my garden. Cooking is my therapy 🍝👨‍🍳',
        images: ['/profile-images/food1.jpg'],
        likes: 67,
        isLiked: false,
        comments: [],
        createdAt: '5 hours ago',
        showComments: false,
        newComment: ''
      }
    ];
  }

  private loadDummySidebarData() {
    // Sponsored Ads
    this.sponsoredAds = [
      {
        id: 1,
        title: 'Upgrade Your Wardrobe',
        description: '@ just 1499',
        image: '/profile-images/ad1.jpg',
        website: 'DenimJeans.com'
      },
      {
        id: 2,
        title: 'Organic Advanced Cosmetics',
        description: 'Natural beauty products',
        image: '/profile-images/ad2.jpg',
        website: 'OrganicAll.com'
      }
    ];

    // Online Contacts
    this.onlineContacts = [
      {
        id: 1,
        name: 'Lily',
        profileImage: '/profile-images/u2.jpg',
        isOnline: true
      },
      {
        id: 2,
        name: 'Ocean Paul',
        profileImage: '/profile-images/u4.jpg',
        isOnline: true
      },
      {
        id: 3,
        name: 'Chef Monica',
        profileImage: '/profile-images/u7.jpg',
        isOnline: false
      }
    ];

    // Popular Groups
    this.popularGroups = [
      {
        id: 1,
        name: 'World Animal Care Committee',
        image: '/profile-images/group1.jpg',
        hasActivity: true
      },
      {
        id: 2,
        name: 'Popular Series',
        image: '/profile-images/group2.jpg',
        hasActivity: true
      },
      {
        id: 3,
        name: 'Photography Enthusiasts',
        image: '/profile-images/group3.jpg',
        hasActivity: false
      }
    ];
  }

  toggleLike(post: Post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  toggleComments(post: Post) {
    post.showComments = !post.showComments;
  }

  addComment(post: Post) {
    if (post.newComment.trim() && this.currentUser) {
      const newComment: Comment = {
        id: Date.now(),
        user: this.currentUser,
        content: post.newComment.trim(),
        createdAt: 'now'
      };
      post.comments.push(newComment);
      post.newComment = '';
    }
  }

  findFriends() {
    this.router.navigate(['/friends']);
  }
}