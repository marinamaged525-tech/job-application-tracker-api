# Job Application Tracker API

A RESTful API built with Node.js, Express.js, and MongoDB to help users manage and track their job applications.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- User-specific access to job applications
- Create, read, update, and delete job applications
- Input validation and error handling
- Filter applications by status
- Search applications by company name
- Sort applications by creation date
- Pagination with validated query parameters

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Backend framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **bcrypt** — Password hashing
- **JSON Web Token (JWT)** — Authentication
- **dotenv** — Environment variable management
- **Nodemon** — Development server
- **Postman** — API testing

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database, such as MongoDB Atlas
- Postman for API testing

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/marinamaged525-tech/job-application-tracker-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd job-application-tracker-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root directory and add your environment variables:

   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_here
   ```

   Replace the placeholders with your own values. Keep your real `.env` file private and never commit it to GitHub.

5. Start the development server:

   ```bash
   npm run dev
   ```

   Nodemon will start `app.js` and restart the server when you change your code.

The API will run on port 4000 unless another port is configured in your environment.

## API Endpoints

Base URL:

http://localhost:4000


### Authentication

Authentication routes are mounted under:

/api/auth


Use the registration and login endpoints defined in `routes/authRoutes.js`.

### Job Applications

Job application routes are mounted under:

/api/applications


| Method |       Endpoint          |         Purpose           |
|--------|-------------------------|------                     |
| POST-- | `/api/applications`     | Create a job application  |
| GET    | `/api/applications`     | Retrieve job applications |
| GET    | `/api/applications/:id` | Retrieve one application  |
| PUT    | `/api/applications/:id` | Update an application     |
| DELETE | `/api/applications/:id` | Delete an application     |

Application endpoints require a valid JWT Bearer token.

### Filtering, Searching, Sorting, and Pagination

The applications list endpoint supports these query parameters:

- `status` — Filter by application status.
- `search` — Search by company name.
- `sort` — Sort by `newest` or `oldest`.
- `page` — Select the page number.
- `limit` — Set the number of results per page, with a maximum of 100.

Example:

/api/applications?status=Interview&search=Google&sort=newest&page=1&limit=5


## Testing

The API can be tested using Postman. Tests include authentication, CRUD operations, validation, filtering, sorting, pagination, and user-specific access control.

## Future Improvements

- Build a frontend dashboard
- Add application statistics and visualizations
- Deploy the API to a hosting platform

## Author

Marina Maged Fouad

GitHub: https://github.com/marinamaged525-tech