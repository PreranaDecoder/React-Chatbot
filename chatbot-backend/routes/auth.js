const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Correctly importing uuid

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique ID for the new user
    const id = uuidv4();

    // Insert the new user into the database
    await db.execute(
      "INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)",
      [id, email, hashedPassword, name]
    );

    // Create a JWT token
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET);

    // Respond with the token and user data
    res.status(201).json({ token, user: { id, email, name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch the user from the database
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // Check if the user exists
    if (users.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = users[0];

    // Validate the password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);

    // Respond with the token and user data
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
