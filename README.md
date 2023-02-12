# Moving Puzzle Game Documentation

## Overview
This project is a simple puzzle game that can be played in a web browser. The project consists of a home page, a registration page, a login page, the game, and a ranking page. The game has a timer, and the ranking page allows users to see their scores and the scores of other players.

### Home page
The home page serves as the landing page for the application. It should have a brief description of the game and navigation links to the Registration, Login, and Ranking pages.

### Registration page
The registration page should contain a form for users to create a new account.
The form should have fields for the user's name, email, and password, as well as a password confirmation field.
The form should also have a submit button to submit the form and register the user.
The information entered into the form should be stored in local storage or a database for later use.

### Login page
The login page should contain a form for users to log in with an existing account.
The form should have fields for the user's email and password.
The form should also have a submit button to submit the form and log the user in.
The information entered into the form should be compared against the information stored in local storage or a database to verify the user's identity.

### Game page
The game page should contain the game itself.
The game should consist of a puzzle with several pieces that can be moved around to complete the puzzle.
The game should have a timer that starts when the game starts and stops when the puzzle is completed.
The user's score should be calculated based on the time taken to complete the puzzle and stored in local storage or a database for later use.

### Timer
The timer should start when the game starts and stop when the puzzle is completed.
The timer should be displayed in a prominent place on the game page.
The timer should be implemented using JavaScript's setInterval function.

### Ranking page
The ranking page should display the scores of all users, sorted by time taken to complete the puzzle.
The user's own score should be highlighted in the list.
The scores should be retrieved from local storage or a database and displayed in a table or a similar format.
