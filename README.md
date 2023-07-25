# Minesweeper

This Minesweeper is built in [React Native](https://reactnative.dev/) by [Expo](https://expo.dev/). And used [TailwindCss](https://tailwindcss.com/) for Styling. To restore the game data after user reopen the app, I used Redux to store the data. And I imported Google Font - IBM_Plex_Mono for styling.

## Important

It only tested the local development with iPhone 14 Pro simulator.

## Perquisite

1. Xcode
2. NodeJS

## Local development

1. Install Expo CLI globally ```npm i -g expo-cli```
2. Install required package by ```npm i```
3. Launch the app with ```expo start --dev-client``` and then enter `i` for choosing ios system.

## Game Description

It is a classic game called minesweeper which you can design the board size and number of bombs by yourself. (The app will be very lag if you create a large board, e.g 100 x 100) There is a timer for recording your play time and a bombs counter that shows the number of bombs left.

[Picture of header]

You can also restart the game anytime by tapping the restart icon button.

[Picture of header with circling the restart icon]

There are 2 modes, Flag mode and Shovel mode.

Under the Flag mode, every tap will be considering as flagged the cell. If you long tap the cell, the cell will be flipped.

Under the Shovel mode, every tap will be considering as flipped the cell.

[Picture of header with circling the flag/shovel]

If you flipped the bombs, you lose the game.

[Picture of bomb]

Back to Home screen, you can choose to start a new game and continue the game.

[Picture of Home]

And there is a record button that navigate player to Record screen which display the game records. Player can choose to delete all the records.

[Picture of Record]

### Win the Game

1. Flag all bombs in Flag mode or,
2. Flip all cell that are not bombs in Shovel mode.

[Picture of winning]

## Production (Deploy to Expo App Store)

**You need to have an Apple Developer account during deployment**

1. Login your Expo account `expo login`
2. Build your app `npm run build:ios`
3. Publish the app `expo publish`
