<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejeweled</title>
    <style>
        /* Add your CSS styling for the game board and jewels here */
        body {
            background: repeating-linear-gradient(
                45deg,
                #000,
                #000 10px,
                #111 10px,
                #111 20px
            );
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .game-board {
            display: grid;
            grid-template-columns: repeat(8, 60px);
            gap: 5px;
        }

        .jewel {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #aaa 0%, #666 100%);
            border: 2px solid #222;
            position: relative;
            clip-path: polygon(50% 0%, 95% 20%, 95% 80%, 50% 100%, 5% 80%, 5% 20%);
            cursor: pointer;
            transition: transform 0.2s;
            overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        }

        .jewel::before {
            content: "";
            position: absolute;
            top: -10px;
            left: -10px;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, transparent 70%);
            transform: rotate(45deg);
        }

        .jewel.selected {
            transform: scale(1.1);
        }

        .diamond-color {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-size: 50% 50%;
            clip-path: polygon(50% 0%, 95% 20%, 95% 80%, 50% 100%, 5% 80%, 5% 20%);
            mask-size: cover;
            mask-repeat: no-repeat;
        }

        .diamond-red {
            background-image: linear-gradient(135deg, #ff3333 0%, #ff0000 100%);
            mask-image: linear-gradient(135deg, transparent 0%, transparent 100%), radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, transparent 100%);
        }

        .diamond-blue {
            background-image: linear-gradient(135deg, #3333ff 0%, #0000ff 100%);
            mask-image: linear-gradient(135deg, transparent 0%, transparent 100%), radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, transparent 100%);
        }

        .diamond-green {
            background-image: linear-gradient(135deg, #33ff33 0%, #00ff00 100%);
            mask-image: linear-gradient(135deg, transparent 0%, transparent 100%), radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, transparent 100%);
        }

        .diamond-yellow {
            background-image: linear-gradient(135deg, #ffff33 0%, #ffff00 100%);
            mask-image: linear-gradient(135deg, transparent 0%, transparent 100%), radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, transparent 100%);
        }

        .diamond-purple {
            background-image: linear-gradient(135deg, #9933ff 0%, #9900ff 100%);
            mask-image: linear-gradient(135deg, transparent 0%, transparent 100%), radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, transparent 100%);
        }

        /* Modal styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .modal-content {
            background-color: #fff;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .close-button {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .close-button:hover,
        .close-button:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        
        
        .jewel.selected {
          transform: scale(1.2);
          animation: pulse-outline 1s infinite alternate;
      }

      @keyframes pulse-outline {
          0% {
              transform: scale(1.0);
          }
          100% {
             transform: scale(1.2);
          }
      }

    </style>
</head>
<body>
    <!-- Modal -->
    <div id="instructions-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>How to Play Bejeweled</h2>
            <p>Click on adjacent jewels to swap them and match three or more of the same color to score points. You have 60 seconds to get the highest score possible!</p>
            <p>Click the "Play Again" button to start a new game.</p>
        </div>
    </div>

    <header>
        <h1>Bejeweled</h1>
        <p>Click on adjacent jewels to swap them and match three or more of the same color to score points.</p>
        <button id="play-again">Play Again</button>
    </header>
    
    <div class="game-board" id="game-board"></div>
    <div id="score">Score: 0</div>
    <div id="timer">Time Left: 60 seconds</div>

    <script>
        // JavaScript code for the Bejeweled-like game
        const board = document.getElementById('game-board');
        const scoreDisplay = document.getElementById('score');

        // Define the jewel colors
        const jewelColors = ['diamond-red', 'diamond-blue', 'diamond-green', 'diamond-yellow', 'diamond-purple'];

        // Create a function to generate a random jewel
        function getRandomJewelColor() {
            const randomIndex = Math.floor(Math.random() * jewelColors.length);
            return jewelColors[randomIndex];
        }

        // Create the game board
        const numRows = 8;
        const numCols = 8;
        const jewels = [];

        function createGameBoard() {
            for (let row = 0; row < numRows; row++) {
                jewels[row] = [];
                for (let col = 0; col < numCols; col++) {
                    const jewel = document.createElement('div');
                    jewel.classList.add('jewel', getRandomJewelColor());
                    jewel.setAttribute('data-row', row);
                    jewel.setAttribute('data-col', col);
                    jewel.addEventListener('click', handleJewelClick);
                    board.appendChild(jewel);
                    jewels[row][col] = jewel;
                }
            }
        }

        // Handle jewel click
        let selectedJewel = null;
        let score = 0;
        
        function handleJewelClick(event) {
          const clickedJewel = event.target;

          if (!selectedJewel) {
              selectedJewel = clickedJewel;
              selectedJewel.classList.add('selected');
          } else {
              // Check if the clicked jewel is the currently selected jewel
              if (clickedJewel === selectedJewel) {
                  // Deselect the jewel when it's clicked again
                  selectedJewel.classList.remove('selected');
                  selectedJewel = null;
              } else {
                  // Swap the two selected jewels
                  const row1 = +selectedJewel.getAttribute('data-row');
                  const col1 = +selectedJewel.getAttribute('data-col');
                  const row2 = +clickedJewel.getAttribute('data-row');
                  const col2 = +clickedJewel.getAttribute('data-col');

                  if (isAdjacent(row1, col1, row2, col2)) {
                      swapJewels(selectedJewel, clickedJewel);

                      // Check for matches
                      if (checkForMatches(row1, col1) || checkForMatches(row2, col2)) {
                          setTimeout(() => {
                              handleMatches();
                          }, 200);
                      } else {
                          // If no matches, swap back
                          setTimeout(() => {
                              swapJewels(selectedJewel, clickedJewel);
                              selectedJewel.classList.remove('selected');
                              selectedJewel = null;
                          }, 300);
                      }
                  } else {
                      // If not adjacent, deselect the first jewel
                      selectedJewel.classList.remove('selected');
                      selectedJewel = clickedJewel;
                      selectedJewel.classList.add('selected');
                  }
              }
          }
      }

        
        
       

        // Swap two jewels
        function swapJewels(jewel1, jewel2) {
            const tempRow = jewel1.getAttribute('data-row');
            const tempCol = jewel1.getAttribute('data-col');
            jewel1.setAttribute('data-row', jewel2.getAttribute('data-row'));
            jewel1.setAttribute('data-col', jewel2.getAttribute('data-col'));
            jewel2.setAttribute('data-row', tempRow);
            jewel2.setAttribute('data-col', tempCol);
            board.insertBefore(jewel1, jewel2);
        }

        // Check if two jewels are adjacent
        function isAdjacent(row1, col1, row2, col2) {
            const rowDiff = Math.abs(row1 - row2);
            const colDiff = Math.abs(col1 - col2);
            return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
        }

        // Check for matches in the entire board
        function checkForMatches(row, col) {
            const jewelColor = jewels[row][col].classList[1]; // Get the color class of the current jewel
            let horizontalMatches = 1;
            let verticalMatches = 1;

            // Check horizontally
            for (let i = col - 1; i >= 0 && jewels[row][i].classList[1] === jewelColor; i--) {
                horizontalMatches++;
            }
            for (let i = col + 1; i < numCols && jewels[row][i].classList[1] === jewelColor; i++) {
                horizontalMatches++;
            }

            // Check vertically
            for (let i = row - 1; i >= 0 && jewels[i][col].classList[1] === jewelColor; i--) {
                verticalMatches++;
            }
            for (let i = row + 1; i < numRows && jewels[i][col].classList[1] === jewelColor; i++) {
                verticalMatches++;
            }

            // If there are three or more matching jewels horizontally or vertically, it's a match
            return horizontalMatches >= 3 || verticalMatches >= 3;
        }

        // Handle matches and replace with new jewels
        function handleMatches() {
            const matchedJewels = document.querySelectorAll('.selected');
            matchedJewels.forEach((jewel) => {
                const row = +jewel.getAttribute('data-row');
                const col = +jewel.getAttribute('data-col');
                const newJewel = document.createElement('div');
                newJewel.classList.add('jewel', getRandomJewelColor());
                newJewel.setAttribute('data-row', row);
                newJewel.setAttribute('data-col', col);
                newJewel.addEventListener('click', handleJewelClick);
                board.replaceChild(newJewel, jewel);
                jewels[row][col] = newJewel;
            });

            // Clear the selection
            selectedJewel = null;

            // Remove and replace matched tiles
            removeAndReplaceMatchedTiles(matchedJewels);

            // Continue checking for more matches
            setTimeout(() => {
                if (checkForMoreMatches()) {
                    handleMatches();
                }
            }, 200);
        }

        // Remove matched tiles and update the score
        function removeAndReplaceMatchedTiles(matchedTiles) {
            matchedTiles.forEach((tile) => {
                const row = +tile.getAttribute('data-row');
                const col = +tile.getAttribute('data-col');
                board.removeChild(tile);
                jewels[row][col] = null;
            });

            // Update the score
            score += matchedTiles.length * 10;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        // Check for more matches in the entire board
        function checkForMoreMatches() {
            let foundMatches = false;

            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    if (checkForMatches(row, col)) {
                        foundMatches = true;
                    }
                }
            }

            return foundMatches;
        }

        // Fill the board with new tiles
        function fillBoard() {
            for (let col = 0; col < numCols; col++) {
                const emptySpaces = [];
                
                // Find empty spaces in the column
                for (let row = numRows - 1; row >= 0; row--) {
                    if (!jewels[row][col]) {
                        emptySpaces.push(row);
                    }
                }

                // Fill the empty spaces with new tiles
                emptySpaces.forEach((row) => {
                    const newJewel = document.createElement('div');
                    newJewel.classList.add('jewel', getRandomJewelColor());
                    newJewel.setAttribute('data-row', row);
                    newJewel.setAttribute('data-col', col);
                    newJewel.addEventListener('click', handleJewelClick);
                    board.appendChild(newJewel);
                    jewels[row][col] = newJewel;
                });
            }
        }

        // Initialize the game
        createGameBoard();

        // Start the game timer (adjust the time as needed)
        let timeLeft = 60;
        const timerDisplay = document.getElementById('timer');
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Game Over! Your final score is ' + score);
                // Optionally, reset the game here
            }
        }, 1000);

        // Play Again button functionality
        const playAgainButton = document.getElementById('play-again');
        playAgainButton.addEventListener('click', () => {
            // Reset the game (you can implement this part)
            location.reload();
        });

        // Modal functionality
        const modal = document.getElementById('instructions-modal');
        const closeButton = document.querySelector('.close-button');

        // Show modal when the page loads
        modal.style.display = 'block';

        // Close the modal when the close button is clicked
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close the modal when the user clicks outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    </script>
</body>
</html>

