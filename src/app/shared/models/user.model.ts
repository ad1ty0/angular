export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  isOnline?: boolean;
  lastSeen?: string;
}
