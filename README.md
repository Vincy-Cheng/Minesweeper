# Minesweeper

This Minesweeper is built in [React Native](https://reactnative.dev/) by [Expo](https://expo.dev/). And used [TailwindCss](https://tailwindcss.com/) for Styling. I used Redux to store the data to restore the game data after users reopen the app. And I imported Google Font - IBM_Plex_Mono for styling.

## Important

It only tested the local development with iPhone 14 Pro simulator.

## Prerequisite

1. Xcode
2. NodeJS

## Local development

1. Install Expo CLI globally ```npm i -g expo-cli```
2. Install the required package by ```npm i```
3. Launch the app with ```expo start --dev-client``` and then enter `i` for choosing ios system.

## Game Description

It is a classic game called Minesweeper which you can design the board size and number of bombs by yourself. (The app will be very lag if you create a large board, e.g 100 x 100) There is a timer for recording your play time and a bombs counter that shows the number of bombs left.

<img src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/5ffe1041-7160-450d-b18b-5e01b2a3d083" alt="image" width="200">

You can also restart the game anytime by tapping the restart icon button.

<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/c718c3f3-4049-4210-abc5-07b3c2bb6426">


There are 2 modes, Flag mode, and Shovel mode.
<br>
<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/40cfbd32-a68d-4ba2-bff5-320b0cb08f9d">
<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/68fed447-ee47-4bca-ac2e-357e1cecc922">


Under the Flag mode, every tap will be considered to flag the cell. If you long tap the cell, the cell will be flipped.

Under the Shovel mode, every tap will be considered to flip the cell.

If you flipped the bombs, you lose the game.

<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/ef4ce571-da38-4293-a351-e793bd55cfa6">

Back to the Home screen, you can choose to start a new game and continue the game. And select the light/dark mode.

<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/177eca9c-b26d-42bd-8923-eae17be425a3">
<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/8cb358e2-9c39-4c22-9b7f-474e5273b946">

And there is a record button that navigates the player to the Record screen which displays the game records. Players can choose to delete all the records.

<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/463f09ca-5a1a-4647-b93a-369d6273efb2">
<br>
<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/b4bf93cc-d3a9-4b83-bcda-4effa8d7aff3">


### Win the Game

1. Flag all bombs in Flag mode or,
2. Flip all cells that are not bombs in Shovel mode.

<img width="200" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/eb5ec710-0d2d-42ee-a158-2fa923f3871e">

## Production (Deploy to Expo App Store)

**You need to have an Apple Developer account during deployment**

1. Login your Expo account `expo login`
2. Build your app `npm run build:ios`
3. Publish the app `expo publish`
