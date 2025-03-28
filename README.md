To run the project, first, clone the repository from GitHub and navigate to the project directory. Then, install all necessary dependencies using npm install. Once the dependencies are installed, start the development server with npm run dev, which will launch the application in the browser. The project is built using React and requires several dependencies, including React Router DOM for navigation, Axios for handling API requests, and Bootstrap for styling and responsiveness. These dependencies were installed using npm with the following command: npm install react-router-dom axios bootstrap.

About:
Employwise is a React-based user management system that integrates with the Reqres API to provide essential user management functionalities. This application allows users to log in, view a paginated list of users, edit user details, and delete users. The project is designed to be user-friendly, responsive, and efficient, making use of React hooks, React Router, and Bootstrap for styling.
 Features
User Authentication:
Users can log in using a valid email and password.
Upon successful authentication, a token is received from the API and stored in local storage.
If the token is missing or expired, the user is automatically redirected to the login page.

User List Display:
After logging in, users are redirected to a dashboard where all users are displayed in a structured format.
The list of users is fetched from the Reqres API using the /api/users?page=1 endpoint.
Users are displayed in a responsive table or card-based format along with their avatar, first name, and last name.

Pagination and Search Functionality:
The application supports pagination, allowing users to navigate through different pages of users efficiently.
A client-side search and filtering feature is implemented to help users find specific users based on their names.

Edit and Update Users:
Each user entry has an Edit button that opens a pre-filled form containing their details.
Users can update the first name, last name, and email.
The changes are sent to the API using the PUT /api/users/{id} endpoint.

After a successful update, the UI updates dynamically to reflect the changes.

Delete Users:
Each user entry also has a Delete button.
Clicking the delete button removes the user from the list using the DELETE /api/users/{id} endpoint.
The UI updates immediately after a successful deletion.

Error Handling and Validations:
The application ensures form validation for login and editing user details.
API errors (such as incorrect login credentials or network issues) are handled gracefully with appropriate error messages.

Responsive UI:
The application is designed to work smoothly across different devices, ensuring an optimal user experience on desktops, tablets, and mobile phones.
Bootstrap is used for styling, providing a clean and professional look.


