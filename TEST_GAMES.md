# 🎮 Game Testing Guide

## How to Test All Games

### Before Testing
1. Start the server: `npm start`
2. Open browser: `http://localhost:3000`
3. Turn on sound (click 🔊 button)
4. Open browser console (F12) to see any errors

---

## Game Testing Checklist

### ✅ 1. Attention Game 🎯
- [ ] Click the game card
- [ ] Game modal opens
- [ ] Circle appears (pink color)
- [ ] Wait for circle to turn green
- [ ] Click when green
- [ ] Reaction time is displayed
- [ ] Completes 5 attempts
- [ ] Shows final score
- [ ] Can save score
- [ ] Sounds play correctly

**Expected Sounds:**
- Game start melody
- Click sound on circle
- Success sound on correct timing
- Error sound if clicked too early
- Game end melody

---

### ✅ 2. Memory Game 🧠
- [ ] Click the game card
- [ ] 4x4 grid of cards appears
- [ ] Cards flip when clicked
- [ ] Cards show emojis
- [ ] Matching pairs stay flipped
- [ ] Non-matching pairs flip back
- [ ] Move counter increases
- [ ] Game ends when all matched
- [ ] Shows final score
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Click sound on card flip
- Success sound on match
- Error sound on mismatch
- Game end melody

---

### ✅ 3. Coding Robot Game 🤖
- [ ] Click the game card
- [ ] 5x5 grid appears
- [ ] Robot (arrow emoji) visible
- [ ] Goal (🎯) visible
- [ ] Command buttons work
- [ ] Commands are added to list
- [ ] Run button executes commands
- [ ] Robot moves on grid
- [ ] Reset button clears commands
- [ ] Shows score when goal reached
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Click sound on command buttons
- Success sound on reaching goal
- Game end melody

---

### ✅ 4. Cyber Safety Quiz 🛡️
- [ ] Click the game card
- [ ] Question appears
- [ ] 4 answer options visible
- [ ] Can click an answer
- [ ] Correct answer turns green
- [ ] Wrong answer turns pink
- [ ] Explanation shows
- [ ] Next button appears
- [ ] Progresses through 10 questions
- [ ] Shows final score
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Click sound on answer
- Correct sound for right answer
- Wrong sound for wrong answer
- Game end melody

---

### ✅ 5. Math Challenge 🔢
- [ ] Click the game card
- [ ] Math problem appears (e.g., "5 + 3 = ?")
- [ ] 4 answer options visible
- [ ] Can click an answer
- [ ] Feedback shows (✅ or ❌)
- [ ] Progresses to next question
- [ ] Completes 10 questions
- [ ] Shows time elapsed
- [ ] Shows final score
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Click sound on answer
- Correct sound for right answer
- Wrong sound for wrong answer
- Game end melody

**Common Issues:**
- If buttons don't work, check console for errors
- Make sure `checkMathAnswer` function is defined
- Verify onclick handlers are set correctly

---

### ✅ 6. Word Scramble 📝
- [ ] Click the game card
- [ ] Scrambled word appears
- [ ] Hint is displayed
- [ ] Input field is visible
- [ ] Can type answer
- [ ] Enter key submits answer
- [ ] Check button works
- [ ] Feedback shows (correct/incorrect)
- [ ] Progresses through 5 words
- [ ] Shows final score
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Key press sounds while typing
- Correct sound for right answer
- Wrong sound for wrong answer
- Confetti sound on correct
- Game end melody

**Common Issues:**
- If input doesn't work, check focus
- Make sure `checkWordAnswer` function is defined
- Verify Enter key listener is attached

---

### ✅ 7. Pattern Master 🎨
- [ ] Click the game card
- [ ] 4 colored squares appear
- [ ] Start button visible
- [ ] Click start button
- [ ] Pattern plays (colors flash)
- [ ] Can click colors to repeat
- [ ] Correct pattern advances level
- [ ] Wrong pattern ends game
- [ ] Level number increases
- [ ] Shows final score
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Different tone for each color
- Success sound on correct pattern
- Wrong sound on incorrect pattern
- Level up sound
- Game end melody

**Common Issues:**
- If start button doesn't work, check `startPattern` function
- Make sure function is globally accessible: `window.startPattern = startPattern`
- Verify color flash animations work
- Check pattern array is building correctly

---

### ✅ 8. Typing Speed ⌨️
- [ ] Click the game card
- [ ] Sentence to type appears
- [ ] Input field is visible and focused
- [ ] Can type in input
- [ ] Letters turn green when correct
- [ ] Letters turn pink when wrong
- [ ] Progresses to next sentence
- [ ] Completes 5 sentences
- [ ] Shows WPM (Words Per Minute)
- [ ] Shows accuracy percentage
- [ ] Shows final score
- [ ] Can save score

**Expected Sounds:**
- Game start melody
- Key press sound for each keystroke
- Success sound on sentence complete
- Game end melody

**Common Issues:**
- If typing doesn't register, check input focus
- Make sure `checkTyping` function is attached to input event
- Verify color coding logic works
- Check WPM calculation

---

## Common Issues & Fixes

### Games Not Opening
**Problem:** Clicking game card does nothing
**Fix:**
1. Check browser console for errors
2. Verify `launchGame` function exists
3. Check that game case exists in switch statement
4. Ensure modal display is set to 'block'

### Buttons Not Working
**Problem:** Onclick handlers don't fire
**Fix:**
1. Check if function is globally accessible
2. Add to window object: `window.functionName = functionName`
3. Verify function is defined before HTML renders
4. Check for typos in function names

### Sounds Not Playing
**Problem:** No audio feedback
**Fix:**
1. Click sound toggle button (🔊)
2. Check `soundEnabled` variable is true
3. Verify browser supports Web Audio API
4. Check console for audio errors

### Modal Not Closing
**Problem:** Can't close game modal
**Fix:**
1. Click X button in top-right
2. Click outside modal
3. Press Escape key (if implemented)
4. Refresh page as last resort

### Scores Not Saving
**Problem:** Save score button doesn't work
**Fix:**
1. Check network tab for API errors
2. Verify server is running
3. Check scores.json file exists
4. Ensure player name is 1-20 characters

---

## Testing Sounds

### Sound Types to Test
1. **Click** - Any button click
2. **Hover** - Mouse over buttons/cards
3. **Success** - Correct answer/completion
4. **Error** - Wrong answer
5. **Game Start** - Opening a game
6. **Game End** - Completing a game
7. **Achievement** - Unlocking milestone
8. **Confetti** - Visual celebration
9. **Level Up** - Pattern game progression
10. **Victory** - High score achievement

### How to Test Sounds
1. Turn sound ON (🔊 button)
2. Hover over game cards (should hear subtle sound)
3. Click buttons (should hear click)
4. Play games and listen for feedback
5. Complete games (should hear victory melody)

---

## Performance Testing

### Things to Check
- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No lag when clicking buttons
- [ ] Confetti doesn't slow down page
- [ ] Games respond instantly
- [ ] Modal opens/closes smoothly
- [ ] Sounds don't overlap badly
- [ ] Stats update in real-time

---

## Browser Compatibility

### Test in Multiple Browsers
- [ ] Chrome (recommended)
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Mobile Testing
- [ ] Touch events work
- [ ] Layout is responsive
- [ ] Text is readable
- [ ] Buttons are large enough
- [ ] Games work on small screens
- [ ] Sounds work on mobile

---

## Debugging Tips

### Console Commands
```javascript
// Check if game functions exist
console.log(typeof initMathChallenge);
console.log(typeof initWordScramble);
console.log(typeof initPatternMaster);
console.log(typeof initTypingSpeed);

// Check sound system
console.log(soundEnabled);
sounds.click();
sounds.success();

// Check game state
console.log(gameState);
console.log(currentGame);

// Test confetti
createConfetti(50);

// Test achievement
showAchievement('Test Achievement!', '🎉');
```

### Common Console Errors
1. **"function is not defined"** - Function not globally accessible
2. **"Cannot read property of undefined"** - Variable not initialized
3. **"Failed to fetch"** - Server not running or API error
4. **"AudioContext was not allowed to start"** - User interaction required first

---

## Success Criteria

### All Games Should:
✅ Open without errors
✅ Display correctly
✅ Respond to user input
✅ Calculate scores accurately
✅ Play appropriate sounds
✅ Show visual feedback
✅ Allow score saving
✅ Close properly

### Overall App Should:
✅ Load quickly
✅ Look colorful and fun
✅ Be easy to navigate
✅ Work on mobile
✅ Have no console errors
✅ Save stats persistently
✅ Show achievements
✅ Be kid-friendly

---

## Reporting Issues

If you find bugs:
1. Note which game has the issue
2. Describe what you expected
3. Describe what actually happened
4. Check browser console for errors
5. Note your browser and version
6. Try to reproduce the issue

---

**Happy Testing! 🎮✨**
