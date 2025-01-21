import React, { useState, useEffect } from 'react';
import { ChatHistory } from './components/ChatHistory';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Auth } from './components/Auth';
import { UserProfile } from './components/UserProfile';
import type { Message, Chat, User } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    // TODO: Implement actual login logic with your backend
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    loadUserChats(mockUser.id);
  };

  const handleSignup = async (email: string, password: string) => {
    // TODO: Implement actual signup logic with your backend
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setIsAuthenticated(true);
    // Initialize empty chat history for new user
    setChats([]);
  };

  const loadUserChats = async (userId: string) => {
    // TODO: Implement actual chat loading from your backend
    const mockChats: Chat[] = [
      {
        id: '1',
        title: 'First Chat',
        active: true,
        userId,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setChats(mockChats);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated response from the chatbot.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleNewChat = () => {
    if (!user) return;

    const newChat: Chat = {
      id: Date.now().toString(),
      title: `New Chat ${chats.length + 1}`,
      active: true,
      userId: user.id,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setChats((prev) => 
      prev.map(chat => ({ ...chat, active: false }))
        .concat(newChat)
    );
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (id: string) => {
    setChats((prev) =>
      prev.map((chat) => ({
        ...chat,
        active: chat.id === id,
      }))
    );
    // TODO: Load chat messages for selected chat from your backend
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setChats([]);
    setMessages([]);
  };

  if (!isAuthenticated || !user) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="flex h-screen bg-secondary">
      <ChatHistory
        chats={chats}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col">
        <UserProfile user={user} onLogout={handleLogout} />
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;