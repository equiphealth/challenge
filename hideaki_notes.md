## Finished Tasks
- Get very high level understanding of the implementation of the game
- Figure out what the key files are
- make new SuperPacman.ts file
- swap PacmanStore to point to an instance of SuperPacman instead of Pacman, test behavior
- make new "Cheat" button
- add new initCheatGame action so regular functionality remains intact
- make adjustable tic by moving functionality to Controls with setInterval, clearInterval inside useEffect along with local useState hook
- make cheatMode Redux state
- make Tic action call INIT_CHEAT if game if finished automatically if iteration is less than 100


## TODOS:
alter behavior of super pacman
Pacman is an extension of Item. 
Items have the properties:
- this.piece = 1 (0 is WALL, 1 is NON WALL)
- this.items 

1.


3. Don't forget to self destruct if there are no more biscuits or cherries to end game
4. Make a new feature that runs super pacman 100 times. Make a new event handler inside components/game/Game.tsx that speeds up tic
5. Refactor InitializeGame inside Game.ts so that it can swap out pacman and SuperPacman and SuperPacman100 on button click.

Extension:
Make Invincible Pacman (pill Infinity, seek ghosts)
New Button

## Things I learned

1. set / clearInterval inside useEffect of controls to change tic speed for different game modes 
2. TS object undefined error when using iteration state
3. Proper implementation of TS with redux and react


## Issues

Controls.tsx - calls dispatch directly from the store and reducer instead of mapping state and dispatch to props? 



