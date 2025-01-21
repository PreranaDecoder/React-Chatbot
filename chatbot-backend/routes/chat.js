const express = require("express");
const router = express.Router();
const db = require("../config/database");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// Get user's chats
router.get("/", auth, async (req, res) => {
  try {
    const [chats] = await db.execute(
      "SELECT * FROM chats WHERE user_id = ? ORDER BY updated_at DESC",
      [req.user.id]
    );
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats" });
  }
});

// Create new chat
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const id = uuidv4();

    await db.execute(
      "INSERT INTO chats (id, title, user_id) VALUES (?, ?, ?)",
      [id, title, req.user.id]
    );

    res.status(201).json({ id, title, user_id: req.user.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating chat" });
  }
});

// Get chat messages
router.get("/:chatId/messages", auth, async (req, res) => {
  try {
    const [messages] = await db.execute(
      "SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC",
      [req.params.chatId]
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// Add message to chat
router.post("/:chatId/messages", auth, async (req, res) => {
  try {
    const { content, isUser } = req.body;
    const id = uuidv4();

    await db.execute(
      "INSERT INTO messages (id, chat_id, content, is_user) VALUES (?, ?, ?, ?)",
      [id, req.params.chatId, content, isUser]
    );

    res.status(201).json({ id, content, isUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
});

module.exports = router;
