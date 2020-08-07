Finished:
- Get very high level understanding of the implementation of the game
- Figure out what the Key files are
- make new SuperPacman.ts file
- swap PacmanStore to point to an instance of SuperPacman instead of Pacman, test behavior
- make new "Cheat" button, add new initCheatGame action 
- make adjustable tic by moving functionality to Controls

TODOS:

FILES
   lib/Game.ts line 110 is where the instance of Pacman is made, then referenced by PacmanStore from there.
   lib/game/pacman.ts
   lib/game/ghots.ts
   lib/game/items.ts
   Controls.tsx - game mode buttons connects to redux for starting and resetting games

Pacman is an extension of Item. 
Items have the properties:
- this.piece = 1 (0 is WALL, 1 is NON WALL)
- this.items 
- this.pillTimer !!! Initialized to 0 for invincible state.
1.
  - Preserve Pacman, just make a new SuperPacman.ts file.
  - See if a copy runs fine if lib/Game.ts is swapped to use SuperPacman. 
  - modify Pacman.ts file using ghost.ts as a reference for movement

2. leverage findItems method to look at ghosts?
3. Don't forget to self destruct if there are no more biscuits or cherries to end game
4. Make a new feature that runs super pacman 100 times. Make a new event handler inside components/game/Game.tsx that speeds up tic
5. Refactor InitializeGame inside Game.ts so that it can swap out pacman and SuperPacman and SuperPacman100 on button click.

## New Plan

Make a border line cheating Invincible pacman with PillTimer as the easy way out 1st attempt
Make a more reasonable one that just avoids ghosts and clears the stage if I have time



## Potential Problems

Controls.tsx - calls dispatch directly from the store and reducer instead of mapping state and dispatch to props

