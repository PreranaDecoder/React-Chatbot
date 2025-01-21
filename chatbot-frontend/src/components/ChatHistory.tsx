import React from 'react';
import { MessageSquare, Plus, Menu } from 'lucide-react';
import type { Chat } from '../types';

interface ChatHistoryProps {
  chats: Chat[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ChatHistory({ chats, onSelectChat, onNewChat, isSidebarOpen, onToggleSidebar }: ChatHistoryProps) {
  return (
    <>
      <button
        onClick={onToggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-secondary rounded-lg hover:bg-primary-light transition-all duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-secondary-light border-r border-secondary
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="h-full flex flex-col p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary-light transition-all duration-200 pulse sparkle"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
          
          <div className="mt-4 flex-1 overflow-y-auto space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  chat.active
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-secondary text-gray-300 hover:text-primary'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}