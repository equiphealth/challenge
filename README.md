# Pacman Technical Challenge

Typescript & React implementation of the popular arcade game Pacman.

Currently pacman uses [A, S, W, D] keys for moving.

**Suggested time:** 1 hour.

## Tasks

- Create a way to automate Pacman's moves in `src/lib/game/Pacman.ts` such that Pacman can achieve the highest score.
- Add a button that will run 100 iterations using the new automated algorithm
- Take note of any architectural problems for further discussion

## Rules

- "Looking" is defined by examining the `this.items` elements. See `findItem` method of `src/lib/game/Item.ts` for an example
- Pacman can only look ahead and side to side (he can not look behind him).
- Pacman can not look through walls
- Do not alter the Ghosts' behavior
- Do not alter the scoring rules
- Be creative

## Ian Bryant : Submission
- PacMan R(eal)U(ltimate)N(avigation)
- Press 'r' to start/stop PacMan RUNner
- Will move 100 turns or until death, whichever comes first