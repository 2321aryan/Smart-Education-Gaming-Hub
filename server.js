const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Initialize data directory and scores file
const dataDir = path.join(__dirname, 'data');
const scoresFile = path.join(dataDir, 'scores.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Created data directory');
}

if (!fs.existsSync(scoresFile)) {
  fs.writeFileSync(scoresFile, JSON.stringify([]), 'utf-8');
  console.log('✅ Initialized scores.json');
}

// Logo endpoint
app.get('/logo', (req, res) => {
  const primaryLogoPath = '/mnt/data/7ecfa6fd-3476-4679-9e89-f21c4decf8c3.png';
  const fallbackLogoPath = path.join(__dirname, 'public', 'assets', 'logo.svg');
  
  // Try to serve primary logo
  if (fs.existsSync(primaryLogoPath)) {
    return res.sendFile(primaryLogoPath);
  }
  
  // Fall back to SVG logo
  if (fs.existsSync(fallbackLogoPath)) {
    return res.sendFile(fallbackLogoPath);
  }
  
  // If neither exists, return 404
  res.status(404).json({ error: 'Logo not found' });
});

// Score management endpoints
app.post('/api/save-score', (req, res) => {
  try {
    const { playerName, gameName, score } = req.body;
    
    // Validate input
    if (!playerName || !gameName || score === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: playerName, gameName, score' 
      });
    }
    
    if (typeof playerName !== 'string' || playerName.length < 1 || playerName.length > 20) {
      return res.status(400).json({ 
        success: false, 
        message: 'Player name must be 1-20 characters' 
      });
    }
    
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Score must be a positive number' 
      });
    }
    
    const validGames = ['attention', 'memory', 'coding', 'cyber-safety', 'math', 'word-scramble', 'pattern', 'typing'];
    if (!validGames.includes(gameName)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid game name' 
      });
    }
    
    // Read existing scores
    const scoresData = fs.readFileSync(scoresFile, 'utf-8');
    const scores = JSON.parse(scoresData);
    
    // Add new score
    const newScore = {
      playerName,
      gameName,
      score,
      timestamp: new Date().toISOString()
    };
    
    scores.push(newScore);
    
    // Save with UTF-8 encoding
    fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2), 'utf-8');
    
    res.json({ success: true, message: 'Score saved successfully!' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/leaderboard', (req, res) => {
  try {
    const { game } = req.query;
    
    // Read scores
    const scoresData = fs.readFileSync(scoresFile, 'utf-8');
    let scores = JSON.parse(scoresData);
    
    // Filter by game if specified
    if (game) {
      scores = scores.filter(s => s.gameName === game);
    }
    
    // Sort by score descending (highest first)
    scores.sort((a, b) => b.score - a.score);
    
    // Return top 10
    const topScores = scores.slice(0, 10);
    
    res.json({ scores: topScores });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ scores: [] });
  }
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long (max 500 characters)' });
    }
    
    let reply;
    
    // Check if OpenAI API key is available
    if (process.env.OPENAI_API_KEY) {
      // TODO: Integrate OpenAI API
      // For now, use fallback
      reply = getFallbackResponse(message);
    } else {
      reply = getFallbackResponse(message);
    }
    
    res.json({
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Something went wrong. Let\'s try again! 🔄' });
  }
});

// Kid-friendly fallback responses
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
    const greetings = [
      '👋 Hello there, friend! I\'m Kiro, your AI buddy! Ready for some fun learning?',
      '🌟 Hi! I\'m so happy to chat with you! What would you like to explore today?',
      '✨ Hey there! I\'m Kiro, and I love helping kids learn! What can I do for you?',
      '🎉 Hello! Welcome back! Ready to learn something awesome today?'
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Homework help - Math
  if (lowerMessage.includes('math') || lowerMessage.includes('add') || lowerMessage.includes('subtract') || lowerMessage.includes('multiply') || lowerMessage.includes('divide')) {
    return '🔢 Math is super fun! Here are some tips:\n\n' +
           '➕ Addition: Put numbers together (5 + 3 = 8)\n' +
           '➖ Subtraction: Take away (10 - 4 = 6)\n' +
           '✖️ Multiplication: Quick addition (3 × 4 = 12)\n' +
           '➗ Division: Share equally (12 ÷ 3 = 4)\n\n' +
           'What specific problem are you working on? I can help break it down!';
  }
  
  // Homework help - Reading/Writing
  if (lowerMessage.includes('read') || lowerMessage.includes('write') || lowerMessage.includes('essay') || lowerMessage.includes('paragraph')) {
    return '📚 Reading and writing are amazing skills! Here are some tips:\n\n' +
           '📖 When reading: Take your time and imagine the story\n' +
           '✍️ When writing: Start with your main idea, then add details\n' +
           '🎯 Use describing words to make it interesting\n' +
           '🔤 Check your spelling and punctuation\n\n' +
           'What are you reading or writing about?';
  }
  
  // Science questions
  if (lowerMessage.includes('science') || lowerMessage.includes('why') || lowerMessage.includes('how does') || lowerMessage.includes('what is')) {
    return '🔬 Great question! Science helps us understand the amazing world! Here are some cool facts:\n\n' +
           '🌍 Earth is the only planet with liquid water\n' +
           '🦕 Dinosaurs lived millions of years ago\n' +
           '🌈 Rainbows are made when light bends through water\n' +
           '⚡ Lightning is super hot - hotter than the sun!\n\n' +
           'What specific science topic are you curious about?';
  }
  
  // Story creation
  if (lowerMessage.includes('story') || lowerMessage.includes('tale') || lowerMessage.includes('adventure')) {
    const stories = [
      '📖 Once upon a time, in a magical forest, there lived a brave young explorer who discovered a hidden treasure map! The map led to...',
      '🏰 In a kingdom far away, a clever kid found a magic key that could open any door. Behind the first door was...',
      '🚀 On a distant planet made of candy, a space explorer landed and met friendly aliens who loved to...',
      '🐉 Deep in the mountains, a kind dragon needed help finding its lost baby. The adventure began when...'
    ];
    return stories[Math.floor(Math.random() * stories.length)] + '\n\nWhat happens next? You decide!';
  }
  
  // Games
  if (lowerMessage.includes('game') || lowerMessage.includes('play')) {
    return '🎮 I love games! We have 8 awesome games:\n\n' +
           '🎯 Attention Game - Test your reflexes!\n' +
           '🧠 Memory Game - Match the pairs!\n' +
           '🤖 Coding Game - Program the robot!\n' +
           '🛡️ Cyber Safety - Learn internet safety!\n' +
           '🔢 Math Challenge - Solve problems fast!\n' +
           '📝 Word Scramble - Unscramble words!\n' +
           '🎨 Pattern Master - Remember patterns!\n' +
           '⌨️ Typing Speed - Type super fast!\n\n' +
           'Which one sounds fun to you?';
  }
  
  // Jokes
  if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
    const jokes = [
      '😄 Why did the math book look sad? Because it had too many problems! 📚',
      '🤣 What do you call a bear with no teeth? A gummy bear! 🐻',
      '😂 Why don\'t scientists trust atoms? Because they make up everything! ⚛️',
      '😆 What did one wall say to the other? I\'ll meet you at the corner! 🏠',
      '🤪 Why did the cookie go to the doctor? Because it felt crumbly! 🍪'
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // Encouragement
  if (lowerMessage.includes('hard') || lowerMessage.includes('difficult') || lowerMessage.includes('can\'t')) {
    return '💪 You\'ve got this! Remember:\n\n' +
           '⭐ Every expert was once a beginner\n' +
           '🌟 Mistakes help us learn and grow\n' +
           '✨ Take breaks when you need them\n' +
           '🎯 Break big problems into small steps\n\n' +
           'I believe in you! What do you need help with?';
  }
  
  // Fun facts
  if (lowerMessage.includes('fact') || lowerMessage.includes('tell me') || lowerMessage.includes('interesting')) {
    const facts = [
      '🐙 Octopuses have three hearts and blue blood!',
      '🦒 A giraffe\'s tongue is about 20 inches long!',
      '🌙 The moon is slowly moving away from Earth!',
      '🐝 Bees can recognize human faces!',
      '🌊 The ocean is home to 95% of all life on Earth!',
      '⚡ Your brain uses 20% of your body\'s energy!',
      '🦋 Butterflies taste with their feet!',
      '🌟 Stars are actually different colors based on temperature!'
    ];
    return '🎓 Here\'s a cool fact:\n\n' + facts[Math.floor(Math.random() * facts.length)] + '\n\nWant to learn more?';
  }
  
  // Compliments
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return '🌟 You\'re very welcome! I\'m always here to help you learn and have fun! Keep being awesome! ✨';
  }
  
  // Feelings
  if (lowerMessage.includes('happy') || lowerMessage.includes('sad') || lowerMessage.includes('feel')) {
    return '💙 I\'m glad you\'re sharing with me! Remember:\n\n' +
           '😊 It\'s okay to have all kinds of feelings\n' +
           '🤗 Talking to someone you trust always helps\n' +
           '🌈 Every day is a new chance to feel better\n\n' +
           'Want to play a game or learn something fun?';
  }
  
  // Colors
  if (lowerMessage.includes('color') || lowerMessage.includes('favourite') || lowerMessage.includes('favorite')) {
    return '🎨 Colors are amazing! Did you know:\n\n' +
           '🔴 Red makes us feel energetic\n' +
           '🔵 Blue is calming and peaceful\n' +
           '🟡 Yellow makes us happy\n' +
           '🟢 Green reminds us of nature\n\n' +
           'What\'s your favorite color?';
  }
  
  // Animals
  if (lowerMessage.includes('animal') || lowerMessage.includes('pet') || lowerMessage.includes('dog') || lowerMessage.includes('cat')) {
    return '🐾 Animals are wonderful! Here are some fun facts:\n\n' +
           '🐕 Dogs can understand up to 250 words!\n' +
           '🐈 Cats sleep 70% of their lives!\n' +
           '🐘 Elephants never forget!\n' +
           '🐬 Dolphins have names for each other!\n\n' +
           'Do you have a pet? Tell me about them!';
  }
  
  // Default friendly response with suggestions
  return '🤖 That\'s interesting! I can help you with:\n\n' +
         '📚 Homework (math, reading, science)\n' +
         '📖 Creating fun stories\n' +
         '🎮 Recommending games\n' +
         '😄 Telling jokes\n' +
         '🎓 Sharing cool facts\n' +
         '💪 Giving encouragement\n\n' +
         'What would you like to explore?';
}

// Routes will be added here

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kids Kiro App server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from /public`);
  console.log(`💾 Data directory: ${dataDir}`);
});

module.exports = app;
