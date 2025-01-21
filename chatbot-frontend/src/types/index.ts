export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  active: boolean;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}