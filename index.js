const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango',
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
  constructor(word) {
    this.word = word; // The correct word
    this.displayWord = word.replaceAll(/[\w]/g, "_"); // Displayed word with underscores
    this.remainingGuesses = 10; // Number of guesses left
    this.incorrectLetters = []; // Letters guessed incorrectly
    this.correctLetters = []; // Letters guessed correctly
  }

  // Process a guessed letter
  guessLetter(letter) {
    // Ignore if letter has already been guessed
    if (
      this.correctLetters.includes(letter) ||
      this.incorrectLetters.includes(letter)
    ) {
      return;
    }

    if (this.word.includes(letter)) {
      // Correct guess: Update displayWord and add to correctLetters
      this.correctLetters.push(letter);
      let updatedDisplay = [...this.displayWord];
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          updatedDisplay[i] = letter;
        }
      }
      this.displayWord = updatedDisplay.join("");
    } else {
      // Incorrect guess: Add to incorrectLetters and decrement remainingGuesses
      this.incorrectLetters.push(letter);
      this.remainingGuesses--;
    }
  }

  // Update the screen with the current game state
  updateScreen() {
    const wordToGuessEl = document.getElementById("word-to-guess");
    const remainingGuessesEl = document.getElementById("remaining-guesses");
    const incorrectLettersEl = document.getElementById("incorrect-letters");

    wordToGuessEl.textContent = this.displayWord;
    remainingGuessesEl.textContent = this.remainingGuesses;
    incorrectLettersEl.textContent = this.incorrectLetters.join(", ");
  }

  // Check if the game is over
  isGameOver() {
    // Game is over if the word is fully guessed or if no guesses remain
    return this.displayWord === this.word || this.remainingGuesses <= 0;
  }

  // Determine if the game was a win or a loss
  getWinOrLoss() {
    if (this.displayWord === this.word) {
      return "win";
    } else if (this.remainingGuesses <= 0) {
      return "loss";
    }
    return null; // This should not be reached if `isGameOver` is used correctly
  }
}

// Start a new game
function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  currentWord = new Word(randomWord);
  currentWord.updateScreen();
}

// Handle key presses
document.onkeyup = function (e) {
  const pressedKey = e.key.toLowerCase();
  // Early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return;

  // Pass the guessed letter to the current word object
  currentWord.guessLetter(pressedKey);
  // Allow the word object to update the screen
  currentWord.updateScreen();

  // Check if the game is over
  const gameOver = currentWord.isGameOver();

  // If the game is over, update wins/losses and start a new game
  if (gameOver) {
    const previousWord = document.getElementById("previous-word");
    const winDisplay = document.getElementById("wins");
    const lossDisplay = document.getElementById("losses");
    previousWord.textContent = currentWord.word;
    const result = currentWord.getWinOrLoss();
    if (result === "win") {
      wins++;
      winDisplay.textContent = wins;
    } else if (result === "loss") {
      losses++;
      lossDisplay.textContent = losses;
    }
    newGame();
  }
};

// Start the first game
newGame();
