# myFlix App

## Overview

The **myFlix** app is a single-page, responsive web application designed for movie buffs who want quick access to detailed information about a wide variety of films. Users can browse movies, filter by search criteria, and manage their favorite movies all in one place. The app is built using **React**, employs **Bootstrap** for styling and responsiveness, and is connected to a server-side API to retrieve movie data.

## User Stories

1. As a user, I want to be able to **access information about movies** so that I can learn more about the movies I’ve watched or am interested in.
2. As a user, I want to be able to **create a profile** so I can save data about my favorite movies.

## Features & Requirements

### Essential Views & Features

- **Main View**:
  - Displays **ALL movies** (with image, title, and description).
  - Provides a **search filter** to easily find movies.
  - Users can select a movie for **more details**.
  - Allows users to **log out** and navigate to the Profile view.

- **Single Movie View**:
  - Shows data (description, genre, director, image) about a specific movie.
  - Allows users to **add a movie** to their favorites.

- **Login View**:
  - Enables users to **log in** with a username and password.

- **Signup View**:
  - Allows new users to **register** (with username, password, email, and date of birth).

- **Profile View**:
  - Displays user **registration details** and favorite movies.
  - Allows users to **update their info** (username, password, email, date of birth).
  - Users can **remove movies** from their list of favorites.
  - Provides an option for users to **deregister** from the app.

### Optional Views & Features

- **Actors View**: Displays information about various actors.
- **Genre View**: Shows a genre’s name and description, along with example movies.
- **Director View**: Displays data about a director (name, bio, birth year, death year) and example movies they’ve directed.

### Optional Single Movie View Features

- Shows which **actors** star in the movie.
- Provides additional information like **release date** and **movie rating**.
- Includes **tooltips** for genre and director descriptions.
- Allows users to **share** movies or view a list of **related movies**.

### Optional Main View Features

- Users can **sort movies** by different criteria.

### Optional Profile, Single Movie, and Main Views Features

- Users can create a “**To Watch**” list in addition to their “Favorite Movies” list.

## Technical Requirements

- The app must be a **single-page application (SPA)**.
- It must use **state routing** for navigation between views and URL sharing.
- The app should include a **search filter** for movies.
- **Parcel** must be used as the build tool.
- The app must be written using **React** (ES2015+).
- **Bootstrap** should be used for styling and responsiveness.
- The app should use **function components**.
- It must be **hosted online**.
- **React Redux** can be used for state management of at least one feature (e.g., movie filtering).

