const express = require('express');
const cors = require('cors');

const app = express();

// Configuration CORS explicite (plus sûr sur Render)
app.use(cors({
  origin: true, // Autorise toutes les origines (y compris localhost et Vercel)
  credentials: true
}));

app.use(express.json());

let messages = []; // Stockage en mémoire

// GET /api/messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST /api/messages
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  
  if (!author || !author.trim() || !content || !content.trim()) {
    return res.status(400).json({ error: 'Author and content are required' });
  }

  const timestamp = new Date().toISOString();
  const message = {
    author: author.trim(),
    content: content.trim(),
    timestamp
  };

  messages.push(message);
  res.status(201).json(message);
});

// Route de santé pour Render
app.get('/', (req, res) => {
  res.send('Backend Chat is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
