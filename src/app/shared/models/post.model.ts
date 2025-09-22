export interface Post {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  timestamp: string;
  location?: string;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}
