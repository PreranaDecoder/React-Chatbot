const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Default to localhost if not set

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async signup(email: string, password: string, name: string) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  },

  async getChats(token: string) {
    const response = await fetch(`${API_URL}/chats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  async createChat(token: string, title: string) {
    const response = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  async getChatMessages(token: string, chatId: string) {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  async sendMessage(
    token: string,
    chatId: string,
    content: string,
    isUser: boolean
  ) {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, isUser }),
    });
    return response.json();
  },
};
