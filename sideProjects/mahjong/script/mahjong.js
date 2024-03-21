let firstTile = null; /* Storage for tile object */
let secondTile = null; /* Storage for tile object */

let grid = null; /* To be determined */
let globalLevel; /* Stores level int */
let actualLevel; /* Store real level */
let timer = new CountdownTimer( 120, (remainingTime) => { /* Starting time */
              let timerField = document.getElementById('timeCount'); /* Select container */
              timerField.innerHTML = `${remainingTime}s`; /* Show remaining Time */
            }, () => { gameOver(); } ); /* Store timer */
let currentScore = 0; /* Store score */
let playingTiles = []; /* Collect and store the playing tiles where they may/can be placed */

function startLevel( level, realLevel ) { /* Start new game with level attached */
  globalLevel = level; /* set level */
  actualLevel = realLevel; /* Set actual level */
  let menuField = document.getElementById('menu'); /* Select container */
  menuField.style.display = 'block'; /* Make visible */
  let scoreField = document.getElementById('scoreCounter'); /* Select container */
  scoreField.style.display = 'block'; /* Make visible */
  let levelField = document.getElementById('levelField'); /* Select container */
  levelField.innerHTML = actualLevel; /* Select level */
  let gameBackground = document.getElementById('gameBackground'); /* Select container */
  gameBackground.style.background = `center / cover no-repeat url('./back/${actualLevel}.jpg')`; /* Select background */


  timer.start(); // Start the countdown
  // setTimeout(() => timer.pause(), 5000); // Pause the countdown after 5 seconds
  // setTimeout(() => timer.resume(), 10000); // Resume the countdown after 10 seconds
  // setTimeout(() => timer.increaseTime(30), 15000); // Increase time by 30 seconds after 15 seconds
  // setTimeout(() => timer.reset(), 20000); // Reset the countdown after 20 seconds
    
  let gridSizeChange = level + 2;
  let gridContainer = document.getElementById('game'); /* Select container */
  gridContainer.innerHTML = ''; /* Make sure it's empty' */
  playingTiles = []; /* Empty stored */
  firstTile = null; /* empty stored tile */ 
  secondTile = null; /* empty stored tile */ 
  let snapString = function() { /* A utility function for managing asynchronous code execution. Usage: 'newVar = snapString(); newVar.resolve(); newVar.reject();' */
    var res, rej;
    var promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  };

  const tilePatterns = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30]; /* Only in pairs */
  const colours = [ /* colour selector */
    { color: 'rgba(255, 255, 255,0.5)', shade: 'rgba(128, 128, 128,0.5)', image: './tiles/1.png'},         /* White */
    { color: 'rgba(255, 0, 0,0.5)', shade: 'rgba(128, 0, 0,0.5)', image: './tiles/2.png'},                 /* Red */
    { color: 'rgba(0, 255, 0,0.5)', shade: 'rgba(0, 128, 0, 0.5)', image: './tiles/3.png'},                /* Green */
    { color: 'rgba(0, 0, 255, 0.5)', shade: 'rgba(0, 0, 128, 0.5)', image: './tiles/4.png'},               /* Blue */
    { color: 'rgba(255, 255, 0, 0.5)', shade: 'rgba(128, 128, 0, 0.5)', image: './tiles/5.png'},           /* Yellow */
    { color: 'rgba(255, 0, 255, 0.5)', shade: 'rgba(128, 0, 128, 0.5)', image: './tiles/6.png'},           /* Magenta */
    { color: 'rgba(0, 255, 255, 0.5)', shade: 'rgba(0, 128, 128, 0.5)', image: './tiles/7.png'},           /* Cyan */
    { color: 'rgba(128, 128, 128, 0.5)', shade: 'rgba(64, 64, 64, 0.5)', image: './tiles/8.png'},          /* Gray */
    { color: 'rgba(255, 165, 0, 0.5)', shade: 'rgba(128, 82, 0, 0.5)', image: './tiles/9.png'},            /* Orange */
    { color: 'rgba(0, 128, 0, 0.5)', shade: 'rgba(0, 64, 0, 0.5)', image: './tiles/10.png'},                /* Dark Green */
    { color: 'rgba(128, 0, 128, 0.5)', shade: 'rgba(64, 0, 64, 0.5)', image: './tiles/11.png'},             /* Purple */
    { color: 'rgba(0, 128, 128, 0.5)', shade: 'rgba(0, 64, 64, 0.5)', image: './tiles/12.png'},             /* Teal */
    { color: 'rgba(128, 0, 0, 0.5)', shade: 'rgba(64, 0, 0, 0.5)', image: './tiles/13.png'},                /* Maroon */
    { color: 'rgba(0, 0, 128, 0.5)', shade: 'rgba(0, 0, 64, 0.5)', image: './tiles/14.png'},                /* Navy */
    { color: 'rgba(128, 128, 0, 0.5)', shade: 'rgba(64, 64, 0, 0.5)', image: './tiles/15.png'},             /* Olive */
    { color: 'rgba(0, 255, 128, 0.5)', shade: 'rgba(0, 128, 64, 0.5)', image: './tiles/16.png'},            /* Turquoise */
    { color: 'rgba(255, 0, 128, 0.5)', shade: 'rgba(128, 0, 64, 0.5)', image: './tiles/17.png'},            /* Rose */
    { color: 'rgba(128, 0, 255, 0.5)', shade: 'rgba(64, 0, 128, 0.5)', image: './tiles/18.png'},            /* Violet */
    { color: 'rgba(255, 128, 0, 0.5)', shade: 'rgba(128, 64, 0, 0.5)', image: './tiles/19.png'},            /* Amber */
    { color: 'rgba(255, 192, 203, 0.5)', shade: 'rgba(255, 105, 180, 0.5)', image: './tiles/20.png'},       /* Pink */
    { color: 'rgba(70, 130, 180, 0.5)', shade: 'rgba(35, 65, 90, 0.5)', image: './tiles/1.png'},           /* Steel Blue */
    { color: 'rgba(0, 255, 0,0.5)', shade: 'rgba(0, 128, 0, 0.5)', image: './tiles/21.png'},                /* Green */
    { color: 'rgba(0, 0, 255, 0.5)', shade: 'rgba(0, 0, 128, 0.5)', image: './tiles/22.png'},               /* Blue */
    { color: 'rgba(255, 255, 0, 0.5)', shade: 'rgba(128, 128, 0, 0.5)', image: './tiles/23.png'},           /* Yellow */
    { color: 'rgba(255, 0, 255, 0.5)', shade: 'rgba(128, 0, 128, 0.5)', image: './tiles/24.png'},           /* Magenta */
    { color: 'rgba(0, 255, 255, 0.5)', shade: 'rgba(0, 128, 128, 0.5)', image: './tiles/25.png'},           /* Cyan */
    { color: 'rgba(128, 128, 128, 0.5)', shade: 'rgba(64, 64, 64, 0.5)', image: './tiles/26.png'},          /* Gray */
    { color: 'rgba(255, 165, 0, 0.5)', shade: 'rgba(128, 82, 0, 0.5)', image: './tiles/27.png'},            /* Orange */
    { color: 'rgba(0, 128, 0, 0.5)', shade: 'rgba(0, 64, 0, 0.5)', image: './tiles/28.png'},                /* Dark Green */
    { color: 'rgba(128, 0, 128, 0.5)', shade: 'rgba(64, 0, 64, 0.5)', image: './tiles/29.png'},             /* Purple */
    { color: 'rgba(0, 128, 128, 0.5)', shade: 'rgba(0, 64, 64, 0.5)', image: './tiles/30.png'},             /* Teal */
  ];

  gridContainer.style.width = "100vh"; /* Set size to 90 viewheight assure cube shape */
  gridContainer.style.height = "100vh"; /* Set size to 90 viewheight assure cube shape */
  gridContainer.style.display = "grid"; /* Make it a grid */
  gridContainer.style.placeItems = "center"; /* Not entirely relevant, but just incase */
  gridContainer.style.gridTemplateRows = `repeat(${level+2}, 1fr)`; /* Set rows */
  gridContainer.style.gridTemplateColumns = `repeat(${level+2}, 1fr)`; /* Set columns */

  let tiles = []; /* Array storage */
  let loopTilesCount = 0; /* Loop counter */

  while (tiles.length < level * level) { /* Make sure matches are possible by placing pairs */
    tiles = tiles.concat(tilePatterns);
  }

  tiles = tiles.slice(0, level * level); /* Shorten array according to level */

  tiles = shuffleArray(tiles); /* Shuffle the tiles */

  let cellSize = parseInt(gridContainer.offsetWidth/gridSizeChange) / 1.3; /* w + h */

  let row = 1; /* Base first row */
  let column = 1; /* Base first column */
  
  for(let i = 1; i <= gridSizeChange*gridSizeChange; i++) { /* Make a nice loop */
    let cell = document.createElement("div"); /* Create a new element for in grid */
    cell.style.gridRow = row; /* Definition of row */
    cell.style.gridColumn = column; /* Definition of column */
    cell.style.width = '100%'; /* Max width */
    cell.style.height = '100%'; /* Max height */
    cell.style.display = "grid"; /* make it a grid too */
    cell.style.placeItems = "center"; /* Place items on center */
    cell.style.overflow = 'hidden'; /* Overflow hidden */
                  
                  /* TEMP TEMP TEMP */
                  //cell.style.outline = '1px solid red'; /* TEMP TEMP TEMP */
                  /* TEMP TEMP TEMP */
                  
    cell.id = "border"; /* Set ID for easier grabbing */
    
    if(column !== 1 && row !== 1 && column !== gridSizeChange && row !== gridSizeChange) {
      playingTiles.push({row: row, column: column}); /* Collect positions of playing tiles without asigning */
      cell.style.gridColumn = null;
      cell.style.gridRow = null;
      cell.id = "gameBlock"; /* Set ID for easier grabbing */
      const tileValue = tiles[loopTilesCount]; /* Define tile number */
      cell.setAttribute('data-tile-id', i); /* Set unique ID */
      cell.setAttribute('data-tile-value', tileValue); /* value data */
      cell.setAttribute('data-selected', false); /* If tile is selected, obviously false */
      cell.setAttribute('data-matched', false); /* If matched, obviously false too */
      
      /* Define cell content */
      cell.innerHTML = `<div id="tile" class="tile" style="display: grid; place-items: center; ">
                          <div class="tile" style="display: grid; place-items: center; width: 90%; height: 90%; background-color: ${colours[tileValue].color}; outline: inset ${Math.floor(cellSize/20)}px ${colours[tileValue].shade};">
                            <div class="tile" style="display: grid; place-items: center; background: no-repeat center / 75%  url(\'${colours[tileValue].image}\');">    
                            </div>
                          </div>
                        </div>`;

                        
      loopTilesCount++; /* add count */
    }
    
    column +=1; /* Add by one */
    if (column == gridSizeChange+1) { /* if new row needed */
      row += 1; /* + new row */
      column = 1; /* first column */
    }

    gridContainer.appendChild(cell); /* Add new cell to grid */
  }

  gridContainer.addEventListener('click', handleTileClick); /* Listen to clicks on the gamefield */
  let checkMoves = movesLeft(); /* Check if reshuffle is needed */
}

function shuffleArray(array) { /* Function to shuffle an array */
  let currentIndex = array.length, randomIndex; /* Initialize variables for array shuffling */

  while (currentIndex != 0) { /* Continue shuffling until all elements are processed */
    randomIndex = Math.floor(Math.random() * currentIndex); /* Generate a random index within the remaining unshuffled elements */
    currentIndex--; /* Decrement the current index */

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; /* Swap elements at currentIndex and randomIndex */
  }

  return array; /* Return the shuffled array */
}

async function handleTileClick(event) { /* If a tile gets clicked */
  const clickedTile = event.target.closest('#gameBlock'); /* get tile */
  if(!clickedTile) return; /* If not a piece */
  if(clickedTile.dataset.matched === 'true') return; /* Ignore matched tiles */
  const clickedTileCube = clickedTile.querySelector('#tile'); /* get cube */
   
  
  if(!firstTile && !secondTile) { /* If no cube at all */
    clickedTile.dataset.selected = true; /* Set to selected */
    clickedTileCube.classList.add('tileSelected'); /* Visual select */
    //clickedTileCube.classList.remove('tile'); /* Visual select */
    let fieldGrab = document.getElementById('field'); /* Select field */
    fieldGrab.style.animation = 'selectMove .5s 1 linear'; /* Color to red */        
    return firstTile = clickedTile; /* Set first tile and leave function*/
  }
  
  if(firstTile && !secondTile) { /* If we have a first cube, but no second */
    if(clickedTile.dataset.tileId === firstTile.dataset.tileId) { /* If clicked cube is the same cube */
      let toUnmatchCube = firstTile.querySelector('.tileSelected'); /* Select tile */
      //toUnmatchCube.classList.add('tile'); /* re-add cube */
      toUnmatchCube.classList.remove('tileSelected'); /* unselect cube */
      firstTile.dataset.selected = false; /* unmark selection */
      firstTile = null; /* empty stored tile */ 
      secondTile = null; /* empty stored tile */
      let fieldGrab = document.getElementById('field'); /* Select field */
      fieldGrab.style.animation = 'wrongMove .5s 1 linear'; /* Color to red */
      return; /* leave function */
    }
    
    clickedTile.dataset.selected = true; /* Set to selected */
    clickedTileCube.classList.add('tileSelected'); /* Visual select */
    //clickedTileCube.classList.remove('tile'); /* Visual select */
    let fieldGrab = document.getElementById('field'); /* Select field */
    fieldGrab.style.animation = 'selectMove .5s 1 linear'; /* Color to red */
    secondTile = clickedTile; /* Set second tile */
  }
  
  
  if(firstTile.dataset.tileValue !== secondTile.dataset.tileValue) { /* If the tiles are not a match */
    let cubeOne = firstTile.querySelector('.tileSelected');
    //cubeOne.classList.add('tile'); /* re-add cube */
    cubeOne.classList.remove('tileSelected'); /* unselect cube */
    let cubeTwo = secondTile.querySelector('.tileSelected');
    //cubeTwo.classList.add('tile'); /* re-add cube */
    cubeTwo.classList.remove('tileSelected'); /* unselect cube */
    firstTile.dataset.selected = false; /* unmark selection */
    secondTile.dataset.selected = false; /* unmark selection */
    firstTile = null; /* empty stored tile */ 
    secondTile = null; /* empty stored tile */
    let fieldGrab = document.getElementById('field'); /* Select field */
    fieldGrab.style.animation = 'wrongMove .5s 1 linear'; /* Color to red */
    return; /* leave function */
  }
  
  if(firstTile.dataset.tileValue === secondTile.dataset.tileValue) { /* If the tiles are a match */
    if(await gameRules(firstTile, secondTile)) { /* Is move valid by the rules */
      let cubeOne = firstTile.querySelector('.tileSelected');
      cubeOne.classList.add('tileMatched'); /* re-add cube */
      cubeOne.classList.remove('tileSelected'); /* unselect cube */
      let cubeTwo = secondTile.querySelector('.tileSelected');
      cubeTwo.classList.add('tileMatched'); /* re-add cube */
      cubeTwo.classList.remove('tileSelected'); /* unselect cube */
      firstTile.dataset.selected = false; /* unmark selection */
      secondTile.dataset.selected = false; /* unmark selection */
      firstTile.dataset.matched = true; /* mark as matched */
      secondTile.dataset.matched = true; /* mark as matched */
      firstTile = null; /* empty stored tile */ 
      secondTile = null; /* empty stored tile */ 
      let fieldGrab = document.getElementById('field'); /* Select field */
      fieldGrab.style.animation = 'rightMove .5s 1 linear'; /* Color to green */
      let updateScore = document.getElementById('scoreCount'); /* Grab element */
      currentScore = currentScore + (actualLevel*5);
      updateScore.innerHTML = `${currentScore}`; /* Show num */
      let completeGame = await checkGameCompletion(); /* leave function */
      if(completeGame === false) { /* If not complete, update board */
        timer.increaseTime(5);
        boardBehaviour(); /* Check if board needs update */
        movesLeft(); /* Check if reshuffle is needed */
      }
      return;
    } else { /* if move is not valid */
      let cubeOne = firstTile.querySelector('.tileSelected');
      //cubeOne.classList.add('tile'); /* re-add cube */
      cubeOne.classList.remove('tileSelected'); /* unselect cube */
      let cubeTwo = secondTile.querySelector('.tileSelected');
      //cubeTwo.classList.add('tile'); /* re-add cube */
      cubeTwo.classList.remove('tileSelected'); /* unselect cube */
      firstTile.dataset.selected = false; /* unmark selection */
      secondTile.dataset.selected = false; /* unmark selection */
      firstTile = null; /* empty stored tile */ 
      secondTile = null; /* empty stored tile */ 
      let fieldGrab = document.getElementById('field'); /* Select field */
      fieldGrab.style.animation = 'wrongMove .5s 1 linear'; /* Color to red */
      return; /* leave function */
    }
  }
  
  return gameCrash(); /* When this point is reached you are out of luck. */
}

async function gameRules(tileOne, tileTwo) { /* Set game rules for matching */
  const isMoveValid = await moveCheck(tileOne, tileTwo); /* Send tiles to processor to check if valid */
  return isMoveValid; /* Return true or false depending on move validity */
}

async function movesLeft() { /* Calculate how many moves are left */
  let gridContainer = document.getElementById('game'); /* Select the container */
  let toLoop = [...gridContainer.children]; /* Select offspring */
  let groupSize = globalLevel + 2; /* Calculate group size */
  let boardToUse = []; /* Initialize an array to hold the board */
  
  function splitArrayIntoGroups(array, n) { /* Function to split an array into groups */
    const result = []; /* result array hlder */
    for (let i = 0; i < array.length; i += n) { /* While i is lover than array length */
      result.push(array.slice(i, i + n)); /* Push array */
    }
    return result; /* Return array */
  }

  const groupedArray = splitArrayIntoGroups(toLoop, groupSize); /* Split tiles and group them */
  let pairCoords = {}; /* Coordinate pairs */
  
  groupedArray.forEach((tileHold, index) => {
    let tempRow = []; /* Temporary array holder */
    
    for(let i of tileHold) { /* Loop over [ [] ] */
      if(i.id == 'border') tempRow.push(0); /* Borders are 0 */   
      if(i.id == 'gameBlock' && i.dataset.matched !== 'true') tempRow.push(i.dataset.tileValue); /* If not matched */
      if(i.id == 'gameBlock' && i.dataset.matched === 'true') tempRow.push(0); /* Default matched to 0 */
      
      if(i.id == 'gameBlock' && i.dataset.matched !== 'true') {
        if(!pairCoords[i.dataset.tileValue]) pairCoords[i.dataset.tileValue] = [];
        pairCoords[i.dataset.tileValue].push([tempRow.length-1, boardToUse.length]); /* set tile X. Y */
      
      }
    }
    
    boardToUse.push(tempRow); /* Push row */
  });
  
  let pairsHolder = []; /* reAssemble array */
  for (const tileValue in pairCoords) {
    const coordinatePairs = pairCoords[tileValue]; /* Get the array of coordinate pairs for the current tile value */

    if (coordinatePairs.length >= 4) { /* If there are multiple pairs of coordinates for the current tile value */
      for (let i = 0; i < coordinatePairs.length; i++) { /* Loop through each pair of coordinates */
        for (let j = i + 1; j < coordinatePairs.length; j++) { /* Loop through each pair of coordinates */
          const pair1 = coordinatePairs[i]; /* Create pairs between every pair of coordinates */
          const pair2 = coordinatePairs[j]; /* Create pairs between every pair of coordinates */

          pairsHolder.push([...pair1, ...pair2]); /* push 4 coords into array */
        }
      }
    } else {
      pairsHolder.push([...coordinatePairs[0], ...coordinatePairs[1]]); /* push 4 coords into array */
    }
  }
  
  let boardForNow = JSON.parse(JSON.stringify(boardToUse)); /* Clone old board */
  
  for (let i = 0; i < boardForNow.length; i++) { /* Loop over new array */
    const newArr = boardForNow[i]; /* Rename current iteration */
    for (let j = 0; j < newArr.length; j++) { /* For each entry inside iteration */
      if (newArr[j] > 0) { /* If num is higher than 0 */
        newArr[j] = 1; /* Replace with 1 */
      }
    }
  }

  let waitForMoves = await continueMoves(boardForNow, pairsHolder); /* Drop to new function */
  let divCount = document.getElementById('movesLeft'); /* Grab element */
  divCount.innerHTML = `${waitForMoves}`; /* Show num */
  if(waitForMoves === 0) shuffleBoard('all'); /* If no moves, shuffle */
}

async function continueMoves(board, pairs) { /* Analyze both to check moves */
  let moveCount = 0;
  let snapString = function() { /* Utility function for managing asynchronous code execution */
    var res, rej;
    var promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  };
    
  function countTurns(path) {  /* Function to count the number of turns in a path */
    let turns = 0;
    let currentDirection = null;

    for (let i = 1; i < path.length; i++) {
      const currentPoint = path[i];
      const previousPoint = path[i - 1];

      const direction = { /* Calculate the direction of the line segment */
        x: currentPoint.x - previousPoint.x,
        y: currentPoint.y - previousPoint.y
      };

      if (currentDirection === null) { /* Check if the direction has changed */
        currentDirection = direction;
      } else if (direction.x !== currentDirection.x || direction.y !== currentDirection.y) {
        turns++;
        currentDirection = direction;
      }
    }

    return turns;
  }
  
  for(let i of pairs) { /* Loop over pairs */
    let tileCoordOne = [i[0], i[1]]; /* Tile One X Y */
    let tileCoordTwo = [i[2], i[3]]; /* Tile Two X Y */
    let boardCopy = JSON.parse(JSON.stringify(board)); /* Clone board */
    boardCopy[tileCoordOne[1]][tileCoordOne[0]] = 0; /* Set coords to 0 (Y X) */
    boardCopy[tileCoordTwo[1]][tileCoordTwo[0]] = 0; /* Set coords to 0 (Y X) */
    
    let toResolve = snapString(); /* Create a promise for managing asynchronous operations */
    let result = false; /* Initialize the result variable */
    
    let easystar = new EasyStar.js(); /* Initialize EasyStar library */
    easystar.setGrid(boardCopy); /* Insert grid */
    easystar.setAcceptableTiles([0]); /* Traverse over 0's */
    easystar.disableDiagonals(); /* Do not allow diagonal movement */
    
    const pathfindingPromise = new Promise((resolve) => { /* Wrap the asynchronous pathfinding in a Promise */
      easystar.findPath(i[0], i[1], i[2], i[3], function (path) {
        if (path === null) {
          result = false;
          toResolve.resolve(false);
        } else {
          const turnCount = countTurns(path);
          if (turnCount <= 2) {
            result = true;
            toResolve.resolve(true);
          } else {
            result = false;
            toResolve.resolve(false);
          }
        }

        resolve(); /* Resolve the outer Promise when pathfinding is done */
      });
    });

    easystar.setIterationsPerCalculation(1000000); /* Iterate over examples */
    easystar.calculate();  /* Start calculating */

    await pathfindingPromise; /* Wait for the asynchronous pathfinding to complete */
    if(result === true) moveCount++;
  }
  
  return moveCount;
}

async function moveCheck(tileOne, tileTwo) { /* Move checker */
  let snapString = function() { /* Utility function for managing asynchronous code execution */
    var res, rej;
    var promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  };

  let toResolve = snapString(); /* Create a promise for managing asynchronous operations */
  let result = false; /* Initialize the result variable */

  let gridContainer = document.getElementById('game'); /* Select the container */
  let toLoop = [...gridContainer.children]; /* Select offspring */
  let tile1, tile2; /* Initialize variables for the first and second tiles */
  
  
  function countTurns(path) {  /* Function to count the number of turns in a path */
    let turns = 0;
    let currentDirection = null;

    for (let i = 1; i < path.length; i++) {
      const currentPoint = path[i];
      const previousPoint = path[i - 1];

      const direction = { /* Calculate the direction of the line segment */
        x: currentPoint.x - previousPoint.x,
        y: currentPoint.y - previousPoint.y
      };

      if (currentDirection === null) { /* Check if the direction has changed */
        currentDirection = direction;
      } else if (direction.x !== currentDirection.x || direction.y !== currentDirection.y) {
        turns++;
        currentDirection = direction;
      }
    }

    return turns;
  }  
  
  function splitArrayIntoGroups(array, n) { /* Function to split an array into groups */
    const result = []; /* result array hlder */
    for (let i = 0; i < array.length; i += n) { /* While i is lover than array length */
      result.push(array.slice(i, i + n)); /* Push array */
    }
    return result; /* Return array */
  }

  let groupSize = globalLevel + 2; /* Calculate group size */
  let boardToUse = []; /* Initialize an array to hold the board */

  const groupedArray = splitArrayIntoGroups(toLoop, groupSize); /* Split tiles and group them */

  groupedArray.forEach((tileHold, index) => {
    let tempRow = []; /* Temporary array holder */
    
    for(let i of tileHold) { /* Loop over [ [] ] */
      if(i.id == 'border') tempRow.push(0); /* Borders are 0 */   
      if(i.id == 'gameBlock' && i.dataset.matched !== 'true') { /* If not matched */
      
        if(i.dataset.tileId === tileOne.dataset.tileId || i.dataset.tileId === tileTwo.dataset.tileId) { /* If selected tiles */
          tempRow.push(0); /* set to 0 for pathfinding */
        } else {
          tempRow.push(1); /* set to 1 */
        }
      }
      
      if(i.id == 'gameBlock' && i.dataset.matched === 'true') tempRow.push(0); /* Default matched to 0 */
      if(i.id == 'gameBlock' && i.dataset.tileId === tileOne.dataset.tileId ) tile1 = [tempRow.length-1, boardToUse.length]; /* set first tile X. Y */
      if(i.id == 'gameBlock' && i.dataset.tileId === tileTwo.dataset.tileId ) tile2 = [tempRow.length-1, boardToUse.length]; /* set second tile X, Y */
    }
    
    boardToUse.push(tempRow); /* Push row */
  });
  
  let easystar = new EasyStar.js(); /* Initialize EasyStar library */
  easystar.setGrid(boardToUse); /* Insert grid */
  easystar.setAcceptableTiles([0]); /* Traverse over 0's */
  easystar.disableDiagonals(); /* Do not allow diagonal movement */

  //console.log(boardToUse.join('\r\n')); /* Convert the board to a 2D object */

  const pathfindingPromise = new Promise((resolve) => { /* Wrap the asynchronous pathfinding in a Promise */
    easystar.findPath(tile1[0], tile1[1], tile2[0], tile2[1], function (path) {
      if (path === null) {
        result = false;
        toResolve.resolve(false);
      } else {
        const turnCount = countTurns(path);
        if (turnCount <= 30) {
          result = true;
          
          const canvas = document.getElementById('drawCanvas'); /* Get the canvas element */
          const ctx = canvas.getContext('2d'); /* Get the 2D rendering context of the canvas */
          ctx.clearRect(0, 0, canvas.width, canvas.height); /* Clear the entire canvas */
          const numRows = globalLevel + 2; /* Define the number of rows in the grid */
          const numCols = globalLevel + 2; /* Define the number of columns in the grid */
          const cellSize = Math.min(canvas.width / numCols, canvas.height / numRows); /* Calculate the size of each grid cell based on canvas dimensions and grid size */
          
          function drawPath(path) { /* Function to draw the path */
            ctx.beginPath(); /* Begin a new path */
            ctx.strokeStyle = 'red'; /* Set the stroke color to red */
            ctx.lineWidth = 4; /* Set the line width to 2 */
            ctx.lineCap = 'round';
            ctx.lineJoin = 'bevel'; /*Set line join style */
            ctx.setLineDash([5, 10]); /* 5 pixels on, 10 pixels off */
            ctx.moveTo((path[0].x + 0.5) * cellSize, (path[0].y + 0.5) * cellSize); /* Move the path to the starting point */

            for (let i = 1; i < path.length; i++) { /* Iterate over each point in the path */
              const nextX = (path[i].x + 0.5) * cellSize; /** Calculate the coordinates of the next point */
              const nextY = (path[i].y + 0.5) * cellSize; /* Calculate the coordinates of the next point */
              ctx.lineTo(nextX, nextY); /* Draw a line to the next point */
            }
            
            ctx.stroke(); /* Stroke the path */
          }
          
          function clearCanvas() { /* Function to clear the canvas */
            ctx.clearRect(0, 0, canvas.width, canvas.height); /* Clear the entire canvas */
          }

          drawPath(path); /* Draw the path on the canvas */

          setTimeout(() => { /* Clear the canvas after a delay of 1000 milliseconds (1 second) */
            clearCanvas();
          }, 1000);

          toResolve.resolve(true);
        } else {
          result = false;
          toResolve.resolve(false);
        }
      }

      resolve(); /* Resolve the outer Promise when pathfinding is done */
    });
  });

  easystar.setIterationsPerCalculation(100000000); /* Iterate over examples */
  easystar.calculate();  /* Start calculating */

  await pathfindingPromise; /* Wait for the asynchronous pathfinding to complete */

  return result;  /* Return the result only after the pathfinding is done */
}

function pauseMe() { /* Pause and unpause */
  let pauseButton = document.getElementById('pauseButton'); /* Select container */
  let coverMe = document.getElementById('noticeField'); /* Select container */
  if(pauseButton.innerHTML == 'Pause') { /* If innerHTML is pause */
    timer.pause(); /* Pause the timer */
    pauseButton.innerHTML = 'Resume'; /* Set to resume */
    coverMe.style.backgroundColor = "gray"; /* Set anti peek */
    coverMe.innerHTML = `<div class="waviy">
          <span style="--i:1">p</span>
          <span style="--i:2">a</span>
          <span style="--i:3">u</span>
          <span style="--i:4">s</span>
          <span style="--i:5">e</span>
          <span style="--i:6">d</span>
        </div>`; /* Set text */
  } else {
    timer.resume(); /* Resume timer */
    pauseButton.innerHTML = 'Pause'; /* Reset to pause */
    coverMe.style.backgroundColor = "transparent"; /* Remove background */
    coverMe.innerHTML = ``; /* Set to none */
  }
}

function shuffleBoard( method ) { /* Shuffle the board */
  let gridContainer = document.getElementById('game'); /* Select container */
  let gamePieces = gridContainer.querySelectorAll('#gameBlock'); /* Grab gameBlocks */
  let newTiles = gridContainer.children; /* Select offSpring */
  let countMe = 1; /* Make sure shuffle stays normal */
  let shuffledTiles = Array.from(gamePieces).sort(() => Math.random() - 0.5); /* pieces random */
  
  let noticeBoard = document.getElementById('noticeField'); /* Select container */
  noticeBoard.innerHTML = `<div class="waviy">
          <span style="--i:1">s</span>
          <span style="--i:2">h</span>
          <span style="--i:3">u</span>
          <span style="--i:4">f</span>
          <span style="--i:5">f</span>
          <span style="--i:6">l</span>
          <span style="--i:7">i</span>
          <span style="--i:8">n</span>
          <span style="--i:9">g</span>
        </div>`;
  setTimeout(() => { /* Clear the board after a delay of 1000 milliseconds (1 second) */
    noticeBoard.innerHTML = '';
  }, 1000);
  
  if(method === 'all') { /* spread around */
    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = shuffledTiles[countMe-1].outerHTML; /* Replace with new tile */
        countMe++; /* Increase counter for smooth shuffle */
      }
    }
  }
  
  if(method === 'top') { /* sort top */
    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = shuffledTiles[countMe-1].outerHTML; /* Replace with new tile */
        countMe++; /* Increase counter for smooth shuffle */
      }
    }
    tileDrop('up'); /* Move tiles */
  }
  
  if(method === 'bottom') { /* sort bottom */
    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = shuffledTiles[countMe-1].outerHTML; /* Replace with new tile */
        countMe++; /* Increase counter for smooth shuffle */
      }
    }
    
    tileDrop('down'); /* Move tiles */ 
  }
  
  if(method === 'left') { /* sort left */
    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = shuffledTiles[countMe-1].outerHTML; /* Replace with new tile */
        countMe++; /* Increase counter for smooth shuffle */
      }
    }
    
    tileDrop('left'); /* Move tiles */
  }
  
  if(method === 'right') { /* sort right */
    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = shuffledTiles[countMe-1].outerHTML; /* Replace with new tile */
        countMe++; /* Increase counter for smooth shuffle */
      }
    }
    
    tileDrop('right'); /* Move tiles */
  }
  
  boardBehaviour(); /* After shuffle, behave board */
}

function boardBehaviour() { /* After match adjust board */

  function randomDrop() { /* Randomly triggers one of four functions: tileDrop('up'), tileDrop('down'), tileDrop('left'), or tileDrop('right') */
    const functions = [() => tileDrop('up'), () => tileDrop('down'), () => tileDrop('left'), () => tileDrop('right')]; /* Define functions */
    const randomIndex = Math.floor(Math.random() * 4); /* Select random function */
    functions[randomIndex](); /* Execute whatever is selected */
  }
  
  switch(actualLevel) {
    case 1:
      tileDrop('down'); /* drop down */
    break;
    
    case 2:
      tileDrop('right'); /* drop down */
    break;
    
    case 3:
      tileDrop('up'); /* drop up */
    break;
    
    case 4:
      tileDrop('down'); /* drop down */
      tileDrop('left'); /* Float left */
    break;
    
    case 5:
      tileDrop('down'); /* drop down */
    break;
    
    case 6:
      tileDrop('left'); /* drop down */
    break;
    
    case 7:
      tileDrop('up'); /* drop up */
    break;
    
    case 8:
      tileDrop('up'); /* drop up */
      tileDrop('right'); /* Float left */
    break;
    
    case 9:
      tileDrop('down'); /* drop down */
      tileDrop('right'); /* Float right */
    break;
    
    case 10:
      randomDrop(); /* Fun trigger for max level */
    break;
  }
  
  let checkMoves = movesLeft(); /* Check if reshuffle is needed */
  //randomDrop(); /* Fun trigger for max level */
  //tileDrop('up'); 
  //tileDrop('down'); 
  //tileDrop('left'); 
  //tileDrop('right'); 
}

function splitToGroup() { /* Put current tiles in arrays where each array represents row */
  let gridContainer = document.getElementById('game'); /* Select container */
  let storeMe = [], groupsFormed = [], arrayOfStuff = [...gridContainer.children]; /* Array holders */

  arrayOfStuff.forEach((tile, index) => { /* Loop trough arrayOfStuff tiles */
    if (tile.id === 'gameBlock') { /* Only process tiles with proper ID */
      storeMe.push(tile); /* Put tile in temp storage */

      if (storeMe.length === globalLevel || index === arrayOfStuff.length - 1) { /* Ensure tiles are divided */
        groupsFormed.push(storeMe); /* Push to group */
        storeMe = []; /* Start with empty array */
      }
    }
  });

  return groupsFormed; /* Give back the new arrays */
}

function tileDrop( method ) { /* Drop tiles when needed */
  if(method === 'down') { /* Drop tiles down */
    let gridContainer = document.getElementById('game'); /* Select container */
    let gamePieces = gridContainer.querySelectorAll('#gameBlock'); /* Grab gameBlocks */
    let processTiles = splitToGroup(); /* Put tiles in groups */
    let newtilePositions = []; /* Holder of new tiles */

    let lastInArray = processTiles[processTiles.length - 1]; /* Get last array */

    lastInArray.forEach((tile, index) => { /* Loop over tiles */
      let checkMyTiles = []; /* First new sorted tiles */
      for(let i of processTiles) { /* Loop over grouped tiles */
        checkMyTiles.push(i[index]); /* Push tiles */
      }

      function customSort(a, b) { /* Sorter true to top, false to bottom */
        if (a.dataset.matched === 'true' && b.dataset.matched !== 'true') { /* Check if 'a' is true and 'b' is not true */
          return -1; /* If true comes before false, return -1 */
        } else if (a.dataset.matched !== 'true' && b.dataset.matched === 'true') { /* Check if 'a' is not true and 'b' is true */
          return 1; /* If false comes before true, return 1 */
        }

        return 0; /* If both are true or both are false, maintain their relative order (return 0) */
      }

      let olderArray = [...checkMyTiles]; /* Duplicate array */

      checkMyTiles.sort(customSort); /* Sort using custom method */
      newtilePositions.push(...checkMyTiles); /* Push newly sorted array */
    });

    let newLocationsArray = []; /* Empty array holder */
    let countMe = 0; /* Counter for indexing */
    
    for(let i of newtilePositions) { /* Loop over previous array */
      if(countMe == globalLevel) countMe = 0; /* if num is equal to globalLevel, reset */
      if(!newLocationsArray[countMe]) newLocationsArray[countMe] = []; /* If no array for index, make one */
      newLocationsArray[countMe].push(i) /* Push to array */
      countMe++; /* Add to count */
    }

    let newSortedArray = []; /* Final array */
    for(let i of newLocationsArray) { /* Loop over previous array */
      for(let a of i) { /* In array is another array */
        newSortedArray.push(a); /* push item */
      }
    }

    let newTiles = gridContainer.children; /* Select offSpring */
    let countMeMore = 1; /* Make sure reposition stays normal */

    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = newSortedArray[countMeMore-1].outerHTML; /* Replace with new tile */
        countMeMore++; /* Increase counter for smooth reposition */
      }
    }
  }
  
  if(method === 'up') { /* Float tiles up */
    let gridContainer = document.getElementById('game'); /* Select container */
    let gamePieces = gridContainer.querySelectorAll('#gameBlock'); /* Grab gameBlocks */
    let processTiles = splitToGroup(); /* Put tiles in groups */
    let newtilePositions = []; /* Holder of new tiles */

    let lastInArray = processTiles[processTiles.length - 1]; /* Get last array */

    lastInArray.forEach((tile, index) => { /* Loop over tiles */
      let checkMyTiles = []; /* First new sorted tiles */
      for(let i of processTiles) { /* Loop over grouped tiles */
        checkMyTiles.push(i[index]); /* Push tiles */
      }

      function customSort(a, b) { /* Sorter false to top, true to bottom */
        if (a.dataset.matched === 'false' && b.dataset.matched !== 'false') { /* Check if 'a' is true and 'b' is not true */
          return -1; /* If true comes before false, return -1 */
        } else if (a.dataset.matched !== 'false' && b.dataset.matched === 'false') { /* Check if 'a' is not true and 'b' is true */
          return 1; /* If false comes before true, return 1 */
        }

        return 0; /* If both are true or both are false, maintain their relative order (return 0) */
      }

      let olderArray = [...checkMyTiles]; /* Duplicate array */

      checkMyTiles.sort(customSort); /* Sort using custom method */
      newtilePositions.push(...checkMyTiles); /* Push newly sorted array */
    });

    let newLocationsArray = []; /* Empty array holder */
    let countMe = 0; /* Counter for indexing */
    
    for(let i of newtilePositions) { /* Loop over previous array */
      if(countMe == globalLevel) countMe = 0; /* if num is equal to globalLevel, reset */
      if(!newLocationsArray[countMe]) newLocationsArray[countMe] = []; /* If no array for index, make one */
      newLocationsArray[countMe].push(i) /* Push to array */
      countMe++; /* Add to count */
    }

    let newSortedArray = []; /* Final array */
    for(let i of newLocationsArray) { /* Loop over previous array */
      for(let a of i) { /* In array is another array */
        newSortedArray.push(a); /* push item */
      }
    }

    let newTiles = gridContainer.children; /* Select offSpring */
    let countMeMore = 1; /* Make sure reposition stays normal */

    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = newSortedArray[countMeMore-1].outerHTML; /* Replace with new tile */
        countMeMore++; /* Increase counter for smooth reposition */
      }
    }
  }
  
  if(method === 'left') { /* Float tiles left */
    let gridContainer = document.getElementById('game'); /* Select container */
    let gamePieces = gridContainer.querySelectorAll('#gameBlock'); /* Grab gameBlocks */
    let processTiles = splitToGroup(); /* Put tiles in groups */
    let newtilePositions = []; /* Holder of new tiles */
    
    processTiles.forEach((tile, index) => { /* Loop over tiles */
      let checkMyTiles = [...tile]; /* First new sorted tiles */
      
      function customSort(a, b) { /* Sorter false to left, true to right */
        if (a.dataset.matched === 'false' && b.dataset.matched !== 'false') { /* Check if 'a' is true and 'b' is not true */
          return -1; /* If true comes before false, return -1 */
        } else if (a.dataset.matched !== 'false' && b.dataset.matched === 'false') { /* Check if 'a' is not true and 'b' is true */
          return 1; /* If false comes before true, return 1 */
        }

        return 0; /* If both are true or both are false, maintain their relative order (return 0) */
      }
      
      checkMyTiles.sort(customSort); /* Sort using custom method */
      newtilePositions.push(...checkMyTiles); /* Push newly sorted array */
    });
    
    let newTiles = gridContainer.children; /* Select offSpring */
    let countMeMore = 1; /* Make sure reposition stays normal */

    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = newtilePositions[countMeMore-1].outerHTML; /* Replace with new tile */
        countMeMore++; /* Increase counter for smooth reposition */
      }
    }
  }
  
  if(method === 'right') { /* Float tiles right */
    let gridContainer = document.getElementById('game'); /* Select container */
    let gamePieces = gridContainer.querySelectorAll('#gameBlock'); /* Grab gameBlocks */
    let processTiles = splitToGroup(); /* Put tiles in groups */
    let newtilePositions = []; /* Holder of new tiles */
    
    processTiles.forEach((tile, index) => { /* Loop over tiles */
      let checkMyTiles = [...tile]; /* First new sorted tiles */
      
      function customSort(a, b) { /* Sorter false to right, true to left */
        if (a.dataset.matched === 'true' && b.dataset.matched !== 'true') { /* Check if 'a' is true and 'b' is not true */
          return -1; /* If true comes before false, return -1 */
        } else if (a.dataset.matched !== 'true' && b.dataset.matched === 'true') { /* Check if 'a' is not true and 'b' is true */
          return 1; /* If false comes before true, return 1 */
        }

        return 0; /* If both are true or both are false, maintain their relative order (return 0) */
      }
      
      checkMyTiles.sort(customSort); /* Sort using custom method */
      newtilePositions.push(...checkMyTiles); /* Push newly sorted array */
    });
    
    let newTiles = gridContainer.children; /* Select offSpring */
    let countMeMore = 1; /* Make sure reposition stays normal */

    for (let i of newTiles) { /* Loop over tiles */
      if(i.id === 'gameBlock') { /* If not border */
        i.outerHTML = newtilePositions[countMeMore-1].outerHTML; /* Replace with new tile */
        countMeMore++; /* Increase counter for smooth reposition */
      }
    }
  }
}

function checkGameCompletion() { /* Trigger on succesful and valid match */
  const gridContainer = document.getElementById('game'); /* Select gameboard */
  const unmatchedTiles = gridContainer.querySelectorAll('[data-matched="false"]'); /* select all false matches */
  
  if (unmatchedTiles.length === 0) { /* If no unmatched left you win */
    let menuField = document.getElementById('menu'); /* Select container */
    menuField.style.display = 'none'; /* Make invisible */
    let scoreField = document.getElementById('scoreCounter'); /* Select container */
    let timerField = document.getElementById('timeCount'); /* Select time field */
    let timeRemaining = parseInt(timerField.innerHTML.slice(0,-1));
    let calcTimerScore = parseInt(timeRemaining*actualLevel);
    currentScore = currentScore+calcTimerScore;
    scoreField.style.display = 'none'; /* Make invisible */
    gridContainer.style = ''; /* Empty style */
    gridContainer.style.width = "100vh"; /* Redefine width */
    gridContainer.style.height = "100vh"; /* Redefine height */
    gridContainer.style.display = "grid"; /* Redefine grid */
    gridContainer.style.placeItems = "center"; /* Redefine item placement */
    let levelSelect = [8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 14];
    if(actualLevel === 10) {
      gridContainer.innerHTML = `<div class="waviy">
            <span style="--i:1">G</span>
            <span style="--i:2">a</span>
            <span style="--i:3">m</span>
            <span style="--i:4">e</span>
            <span style="--i:5">-</span>
            <span style="--i:6">s</span>
            <span style="--i:7">e</span>
            <span style="--i:8">t</span>
            <span style="--i:9">!</span><br /><hr />
            <button class="theButton" onclick="startLevel(8, 1)">Play again?</button><br /><br />
            <span style="font-size: 2em;">Your score: ${currentScore}<br />Time left: ${timerField.innerHTML.slice(0,-1)} seconds</span>
          </div>`;  /* Add the winning words */
    } else {
      gridContainer.innerHTML = `<div class="waviy">
            <span style="--i:1">y</span>
            <span style="--i:2">o</span>
            <span style="--i:3">u</span>
            <span style="--i:4"> </span>
            <span style="--i:5">w</span>
            <span style="--i:6">i</span>
            <span style="--i:7">n</span>
            <span style="--i:8">!</span><br /><hr />
            <button class="theButton" onclick="startLevel(${levelSelect[actualLevel]}, ${actualLevel+1})">Next Level</button><br /><br />
            <span style="font-size: 2em;">Score: ${currentScore}<br />Time left: ${timerField.innerHTML.slice(0,-1)} seconds</span>
          </div>`;  /* Add the winning words */
    }
    gridContainer.removeEventListener('click', handleTileClick);  /* Remove listener */
    playingTiles = []; /* Empty stored position */
    firstTile = null; /* empty stored tile */ 
    secondTile = null; /* empty stored tile */
    timer.pause(); /* Pause timer */
    timer.reset(); /* Reset timer */
    return true; /* Game completed */
  } else {
    return false; /* Not complete */
  }
}

function gameOver() { /* gameover screen */
  let gridContainer = document.getElementById('game'); /* Select game */
  let menuField = document.getElementById('menu'); /* Select container */
  menuField.style.display = 'none'; /* Make invisible */
  let scoreField = document.getElementById('scoreCounter'); /* Select container */
  scoreField.style.display = 'none'; /* Make invisible */
  playingTiles = []; /* Empty stored position */
  firstTile = null; /* empty stored tile */ 
  secondTile = null; /* empty stored tile */ 
  timer.pause(); /* Pause timer */
  timer.reset(); /* Reset timer */
  
  for(let i of gridContainer.children) { /* for every tile */
    i.style.animation = `byeTile ${Math.random()}s ease-in-out 1s forwards`; /* Make it go away */
  }

  setTimeout(() => { /* After a brief timeout */
    gridContainer.style = ''; /* Clear styles */
    gridContainer.style.width = "100vh"; /* Set width */
    gridContainer.style.height = "100vh"; /* Set height */
    gridContainer.style.display = "grid"; /* remake grid */
    gridContainer.style.placeItems = "center"; /* Set items to center */
    gridContainer.innerHTML = `<div class="waviy">
          <span style="--i:1">g</span>
          <span style="--i:2">a</span>
          <span style="--i:3">m</span>
          <span style="--i:4">e</span>
          <span style="--i:5"> </span>
          <span style="--i:6">o</span>
          <span style="--i:7">v</span>
          <span style="--i:8">e</span>
          <span style="--i:9">r</span><br /><hr />
          <button class="theButton" onclick="startLevel(8, 1)">Start Again</button><br /><br />
          <span style="font-size: 2em;">Time's up, you suck.</span><br />
          <span style="font-size: 2em;">Score: ${currentScore}</span>
        </div>`; /* Be a sore loser */
    let updateScore = document.getElementById('scoreCount'); /* Grab element */
    currentScore = 0;
    updateScore.innerHTML = `${currentScore}`; /* Show num */
  }, 2000); /* Interval in ms */
}

function gameCrash() { /* Trigger when game is crashed */
  let gridContainer = document.getElementById('game'); /* Select game */
  let menuField = document.getElementById('menu'); /* Select container */
  menuField.style.display = 'none'; /* Make invisible */
  let scoreField = document.getElementById('scoreCounter'); /* Select container */
  scoreField.style.display = 'none'; /* Make invisible */
  let updateScore = document.getElementById('scoreCount'); /* Grab element */
  currentScore = 0;
  updateScore.innerHTML = `${currentScore}`; /* Show num */
  playingTiles = []; /* Empty stored position */
  firstTile = null; /* empty stored tile */ 
  secondTile = null; /* empty stored tile */ 
  
  gridContainer.style = ''; /* Clear styles */
  gridContainer.style.width = "100vh"; /* Set width */
  gridContainer.style.height = "100vh"; /* Set height */
  gridContainer.style.display = "grid"; /* remake grid */
  gridContainer.style.placeItems = "center"; /* Set items to center */
  gridContainer.innerHTML = 'Game crashed, oops.'; /* Show crash */
}

