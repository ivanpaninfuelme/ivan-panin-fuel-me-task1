// for testing: 
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// for task: 
export type UserPost = Omit<Post, "userId">;
export interface UserWithPosts {
  id: number;
  name: string;
  username: string;
  email: string;
  posts: UserPost[];
}