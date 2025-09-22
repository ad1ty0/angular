import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Post } from '../../shared/models/post.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_URL = 'http://localhost:8080/api'; // Your backend URL

  constructor(private http: HttpClient) { }

  // Posts
  getPosts(): Observable<Post[]> {
    // Replace with actual HTTP call: return this.http.get<Post[]>(`${this.API_URL}/posts`)
    return this.getMockPosts();
  }

  createPost(postData: any): Observable<any> {
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/posts`, postData)
    return of({ success: true, message: 'Post created successfully' }).pipe(delay(1000));
  }

  likePost(postId: number, userId: number): Observable<any> {
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/posts/${postId}/like`, { userId })
    return of({ success: true, message: 'Post liked successfully' }).pipe(delay(500));
  }

  addComment(postId: number, commentData: any): Observable<any> {
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/posts/${postId}/comments`, commentData)
    return of({ success: true, message: 'Comment added successfully' }).pipe(delay(500));
  }

  // Friends
  getFriends(): Observable<User[]> {
    // Replace with actual HTTP call: return this.http.get<User[]>(`${this.API_URL}/friends`)
    return this.getMockFriends();
  }

  getFriendRequests(): Observable<User[]> {
    // Replace with actual HTTP call: return this.http.get<User[]>(`${this.API_URL}/friends/requests`)
    return this.getMockFriendRequests();
  }

  sendFriendRequest(userId: number): Observable<any> {
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/friends/request`, { userId })
    return of({ success: true, message: 'Friend request sent' }).pipe(delay(500));
  }

  acceptFriendRequest(userId: number): Observable<any> {
    // Replace with actual HTTP call: return this.http.post(`${this.API_URL}/friends/accept`, { userId })
    return of({ success: true, message: 'Friend request accepted' }).pipe(delay(500));
  }

  // Mock data methods - replace with actual API calls
  private getMockPosts(): Observable<Post[]> {
    const mockPosts: Post[] = [
      {
        id: 1,
        userId: 2,
        userName: 'Sarah Johnson',
        userAvatar: '/profile-images/u2.jpg',
        timestamp: '2 hours ago',
        location: 'New York, NY',
        content: 'Just had an amazing coffee at the local cafe! ☕ The atmosphere here is perfect for getting some work done. Highly recommend their vanilla latte!',
        images: [],
        likes: 24,
        comments: [
          {
            id: 1,
            userId: 3,
            userName: 'Mike Chen',
            userAvatar: '/profile-images/u3.jpg',
            content: 'That place looks amazing! I need to check it out.',
            timestamp: '1 hour ago'
          }
        ],
        isLiked: false
      }
    ];

    return of(mockPosts).pipe(delay(1000));
  }

  private getMockFriends(): Observable<User[]> {
    const mockFriends: User[] = [
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        profileImage: '/profile-images/u2.jpg'
      },
      {
        id: 3,
        name: 'Mike Chen',
        email: 'mike@example.com',
        profileImage: '/profile-images/u3.jpg'
      }
    ];

    return of(mockFriends).pipe(delay(800));
  }

  private getMockFriendRequests(): Observable<User[]> {
    const mockRequests: User[] = [
      {
        id: 4,
        name: 'Emma Wilson',
        email: 'emma@example.com',
        profileImage: '/profile-images/u4.jpg'
      }
    ];

    return of(mockRequests).pipe(delay(600));
  }
}
