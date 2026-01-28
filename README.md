# Kids Kiro App 🎮

A fun, educational web application designed for children aged 7-14 featuring interactive games, an AI assistant, and a colorful, kid-friendly interface.

## Features

### 🎯 Eight Educational Games
1. **Attention Game** 🎯 - Test reaction speed and reflexes
2. **Memory Game** 🧠 - Match pairs and improve memory
3. **Coding Robot Game** 🤖 - Learn basic programming concepts
4. **Cyber Safety Quiz** 🛡️ - Learn internet safety
5. **Math Challenge** 🔢 - Solve math problems quickly
6. **Word Scramble** 📝 - Unscramble letters to make words
7. **Pattern Master** 🎨 - Remember and repeat color patterns
8. **Typing Speed** ⌨️ - Improve typing skills with fun exercises

### 🤖 Enhanced AI Chat Assistant
- **Smart Homework Help** - Math, reading, science assistance
- **Creative Story Generation** - Interactive storytelling
- **Fun Jokes** - Kid-friendly humor
- **Cool Facts** - Educational trivia
- **Encouragement** - Positive reinforcement
- **Game Recommendations** - Personalized suggestions
- **Emotional Support** - Understanding responses
- **Kid-safe Responses** - Age-appropriate content
- **Image URL Preview** - Visual content support

### 🏆 Leaderboard System
- Track scores across all games
- Filter by game type
- Compete with friends

### 🎨 Kid-Friendly Design
- Bright, colorful interface
- Large buttons and text
- Smooth animations
- Fully responsive (mobile & desktop)
- Touch-friendly controls

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Optional - Configure OpenAI API (for enhanced AI chat):**
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to `.env`:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - If no API key is provided, the app will use kid-friendly fallback responses

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
kids-kiro-app/
├── server.js              # Express server
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── data/
│   └── scores.json       # Score storage
└── public/
    ├── index.html        # Main HTML file
    ├── styles.css        # Styling
    ├── app.js           # Frontend JavaScript
    └── assets/
        └── logo.svg     # Fallback logo
```

## Usage

### Playing Games
1. Click on any game card on the homepage
2. Follow the game instructions
3. Complete the game to see your score
4. Save your score to the leaderboard

### Using AI Chat
1. Scroll to the chat section
2. Type your message (homework questions, story requests, etc.)
3. Press Enter or click Send
4. Paste image URLs to preview images

### Viewing Leaderboard
1. Click the "View Leaderboard" button
2. Filter by game type or view all scores
3. See top 10 scores for each game

### Custom Logo
1. Find an image URL online
2. Paste it in the logo URL input at the top
3. Click "Update Logo"

## API Endpoints

- `GET /logo` - Serves the logo image
- `POST /api/chat` - AI chat endpoint
- `POST /api/save-score` - Save game scores
- `GET /api/leaderboard?game=<gameName>` - Get leaderboard data

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** JSON file-based storage
- **AI:** OpenAI API (optional) with fallback responses

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Safety Features

- Kid-friendly content filtering
- Age-appropriate language
- Safe AI responses
- No external links in games
- Parental guidance encouraged

## Development

### Running in Development Mode
```bash
npm run dev
```

### Testing
```bash
npm test
```

## License

MIT License

## Support

For issues or questions, please create an issue in the repository.

---

Made with ❤️ for kids to learn and have fun!
