import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

// Interfaces based on backend entities
export interface User {
  userId?: number;
  userName: string;
  emailId: string;
  passwordHash?: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHERS';
  bio?: string;
  profilePicturePath?: string;
  createdAt?: string;
}

export interface Post {
  postId?: number;
  userId: number;
  content: string;
  mediaUrl?: string;
  createdAt?: string;
  mediaType?: 'IMAGE' | 'VIDEOS';
  privacy: 'PUBLIC' | 'FRIENDS' | 'CUSTOM';
  user: User;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
}

export interface FriendRequest {
  requestId?: number;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt?: string;
  sender: User;
  receiver: User;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8080/api'; // Backend URL when ready

  constructor() { }

  // Dummy data for development
  private dummyUsers: User[] = [
    {
      userId: 1,
      userName: 'John Doe',
      emailId: 'john@example.com',
      dob: '1990-01-15',
      gender: 'MALE',
      bio: 'Software Developer',
      createdAt: new Date().toISOString()
    },
    {
      userId: 2,
      userName: 'Jane Smith',
      emailId: 'jane@example.com',
      dob: '1992-03-22',
      gender: 'FEMALE',
      bio: 'Designer',
      createdAt: new Date().toISOString()
    }
  ];

  private dummyPosts: Post[] = [
    {
      postId: 1,
      userId: 1,
      content: 'Hello everyone! Just joined Connecto.',
      createdAt: new Date().toISOString(),
      privacy: 'PUBLIC',
      user: this.dummyUsers[0],
      likesCount: 5,
      commentsCount: 2,
      isLiked: false
    }
  ];

  // User methods
  getCurrentUser(): Observable<User | null> {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Return dummy user data for now
      return of(this.dummyUsers[0]).pipe(delay(500));
    }
    return of(null);
  }

  // Posts methods
  getPosts(): Observable<Post[]> {
    // For now, return empty array to show "No posts to show" state
    // Later this will be replaced with actual API call
    return of([]).pipe(delay(1000));
  }

  getUserPosts(userId: number): Observable<Post[]> {
    const userPosts = this.dummyPosts.filter(post => post.userId === userId);
    return of(userPosts).pipe(delay(500));
  }

  // Friends methods
  getFriends(): Observable<User[]> {
    // Return empty array for now
    return of([]).pipe(delay(500));
  }

  getFriendRequests(): Observable<FriendRequest[]> {
    // Return empty array for now
    return of([]).pipe(delay(500));
  }

  sendFriendRequest(userId: number): Observable<any> {
    // Simulate API call
    return of({ success: true, message: 'Friend request sent' }).pipe(delay(1000));
  }

  // Future API methods (will be implemented when backend is ready)
  /*
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  createPost(postData: any): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, postData);
  }

  likePost(postId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/${postId}/like`, {});
  }
  */
}
