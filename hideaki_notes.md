Finished:
- Get very high level understanding of the implementation of the game
- Figure out what the Key files are
- make new SuperPacman.ts file
- swap PacmanStore to point to an instance of SuperPacman instead of Pacman, test behavior



TODO:

FILES
   lib/Game.ts line 110 is where the instance of Pacman is made, then referenced by PacmanStore from there.
   lib/game/pacman.ts
   lib/game/ghots.ts
   lib/game/items.ts

1.
  Preserve Pacman, just make a new SuperPacman.ts file.
  See if a copy runs fine if lib/Game.ts is swapped to use SuperPacman. 
   modify Pacman.ts file using ghost.ts as a reference for movement

2. leverage findItems method to look at ghosts?
3. Don't forget to self destruct if there are no more biscuits or cherries to end game
4. Make a new feature that runs super pacman 100 times. Speed up tic 



