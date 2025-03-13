export interface User {
  id: string; // MongoDB ObjectId
  email: string;
  password: string;
  username: string;
  image?: string; // Optional
  provider: string;
  providerAccountId?: string;
  createdAt: Date;
  updatedAt: Date;

  conservationIds: string[]; // Array of ObjectId strings
  converstarions: Conversation[]; // Array of related Conversation objects

  seenMessagesIds: string[];
  seenMessages: Message[]; // Array of seen messages

  messages: Message[]; // Array of messages
}

export interface Conversation {
  id: string;
  participants: User[]; // Users in the conversation
  messages: Message[]; // Messages in the conversation
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  seenBy: User[]; // Users who have seen the message
  createdAt: Date;
}
