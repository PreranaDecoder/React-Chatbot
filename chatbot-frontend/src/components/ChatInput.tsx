import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-secondary-light p-4 bg-secondary">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-secondary-light border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          className="p-2 bg-primary text-secondary rounded-lg hover:bg-primary-light transition-all duration-200 pulse"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}