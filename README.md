# GitHub Elo

GitHub Elo is a React + Node.js web application that calculates and ranks GitHub users' Elo scores based on their GitHub profile and contributions. The project uses the GitHub API, Firebase for data storage, and other technologies to provide users with an interactive experience for assessing their GitHub presence.

## Demo

You can try the live version of the app here: [GitHub Elo](https://githubelo.web.app/)

## Features

- **Username Input:** Enter any GitHub username on the login page.
- **Elo Score Calculation:** The GitHub Elo score is calculated based on the user's contributions, repositories, followers, and other metrics fetched via the GitHub API.
- **Firebase Database:** The username and Elo score are stored in a Firebase database:
  - If the username already exists, the existing Elo score is updated.
  - If the username doesn't exist, a new entry is created with the calculated Elo score.
- **Dashboard Display:** The user's Elo score is displayed on the dashboard.
- **Leaderboard:** Users can view all GitHub users in the database ranked by their Elo score on the leaderboard screen.
- **Screen Capture:** Uses `html-to-image` for capturing visual snapshots.

## Technology Stack

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** Firebase Firestore
- **API Integration:** GitHub API
- **Libraries Used:**
  - `axios`: For making HTTP requests to the GitHub API
  - `html-to-image`: For generating screen captures

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**

   ```sh
   git clone https://github.com/ammar-15/GitHubElo.git
   cd GitHubElo
   ```

2. **Install dependencies**

   - Install backend dependencies:

     ```sh
     cd gitscore-backend
     npm install
     ```

   - Install frontend dependencies:

     ```sh
     cd ../src
     npm install
     ```

3. **Set up Firebase**

   - Create a Firebase project in [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to the project.

4. **Set up GitHub API access**

   - Create a [GitHub personal access token](https://github.com/settings/tokens).
   - Add the token to the backend to access GitHub's data.

5. **Run the project**

   - Start the backend server:

     ```sh
     cd gitscore-backend
     npm start
     ```

   - Start the frontend development server:

     ```sh
     cd ../src
     npm start
     ```

6. **Access the Application**

   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter a valid GitHub username in the input box on the login page.
2. The application will calculate the user's Elo score based on their GitHub activity.
3. If the username already exists in the database, the Elo score will be updated. If not, the new username and Elo score will be added.
4. The dashboard will display the calculated Elo score, and you can explore other features like the leaderboard.

## Project Structure

- **gitscore-backend/**: Contains the Node.js backend code for handling API requests and database operations.
  - **controllers/githubController.js**: Handles GitHub API requests and Elo score calculations.
  - **routes/api.js**: Defines the backend API routes.
  - **firebase.js**: Firebase configuration for database access.
- **src/**: Contains the React frontend code.
  - **App.js, Dashboard.js, Leaderboard.js, LoginPage.js**: Main components for the application.
  - **public/**: Contains static files like `index.html`.
  - **firebase.js**: Firebase configuration for the frontend.
  - **styles (e.g., App.css, Dashboard.css, etc.)**: CSS files for styling components.
- **.env**: Environment variables for sensitive information.
- **public/**: Static files including `404.html` and images.
- **screenshots/**: Screenshots for README documentation.

## Screenshots

- **Login Page:**

  ![Login Page](https://github.com/user-attachments/assets/ce1e0d9a-8650-427e-8056-63d975d9be45)

- **Dashboard:**
  ![Dashboard](https://github.com/user-attachments/assets/09eed49f-c849-4a3f-8f1f-0c1628cf77dd)

- **Leaderboard:**

  ![Leaderboard](https://github.com/user-attachments/assets/2955d6aa-30ef-40a6-9882-6fdd92414b02)


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **GitHub API** for providing user data.
- **Firebase** for database services.
- **html-to-image** for the screen capture feature.
- **Postman** for API testing and development.

## Author

- [Ammar Faruqui](https://github.com/ammar-15)

## Links

- [LinkedIn](https://www.linkedin.com/in/ammarfaruqui/)
- [Twitter](https://x.com/ammar_tsx/highlights)

