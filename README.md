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

<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/d0ff325c-4cb8-4425-a227-18933e2ad501" >

<br>

<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/0ead47bc-907d-4f0e-9207-0af881f490f9">

You can also restart the game anytime by tapping the restart icon button.

<img width="363" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/268d5430-d728-4c57-a0f0-bb9fad16db2d">

There are 2 modes, Flag mode, and Shovel mode.

Under the Flag mode, every tap will be considered as flagged in the cell. If you long tap the cell, the cell will be flipped.

Under the Shovel mode, every tap will be considered as flipped cell.

<img width="337" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/32a7747b-2ae9-4104-a124-5dc22dabaf81">

<img width="332" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/e56cb575-1dbe-4c84-bb2e-1f021889d050">
<br>
<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/24dd6760-1bca-4c5e-bfe0-4315a4977a69">

If you flipped the bombs, you lose the game.

<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/8e6fae65-2591-4d27-9d40-908ac949d2b3">

Back to the Home screen, you can choose to start a new game and continue the game. And select the light/dark mode.

<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/97103027-412a-42d2-8b42-413d768384f7">

And there is a record button that navigates the player to the Record screen which displays the game records. Players can choose to delete all the records.

<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/f3f17948-bfcc-4500-9ff9-ea775f39c18c">

### Win the Game

1. Flag all bombs in Flag mode or,
2. Flip all cell that are not bombs in Shovel mode.

<img width="352" alt="image" src="https://github.com/Vincy-Cheng/Minesweeper/assets/60846680/db378931-7bce-402a-857d-e22dd6bd292b">

## Production (Deploy to Expo App Store)

**You need to have an Apple Developer account during deployment**

1. Login your Expo account `expo login`
2. Build your app `npm run build:ios`
3. Publish the app `expo publish`
