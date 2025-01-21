import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-start gap-2`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-primary' : 'bg-secondary-light'} float`}>
          {isUser ? <User className="w-5 h-5 text-secondary" /> : <Bot className="w-5 h-5 text-primary" />}
        </div>
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-2 rounded-lg ${
            isUser 
              ? 'bg-primary text-secondary' 
              : 'bg-secondary-light text-white'
          } transition-all duration-200 hover:shadow-lg hover:shadow-primary/10`}>
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
        </div>
      </div>
    </div>
  );
}