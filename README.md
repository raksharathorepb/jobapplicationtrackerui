This is the React frontend for the Job Tracker application, allowing users to add, edit, view, and manage job applications. It uses Formik, Yup, React-Bootstrap, SCSS, and communicates with a backend API for data persistence.

How to Run the Frontend

1. Clone the repository
https://github.com/raksharathorepb/tracjobapplicationui
cd racjobapplicationui
2. Install dependencies
npm install
3. Start the development server
npm start

BACKEND (API / Backend URL)
http://localhost:5257
If your backend is running on a different port (like 5000), set this api.js file
  baseURL: "http://localhost:5257/api"

Note :- Environment Setup- No .env file is strictly required for the frontend 

4. Tech Stack

React 19
React Router v7
Formik + Yup for form handling and validation
React-Bootstrap and Bootstrap 5.3
SCSS for custom styling
Axios for API requests

5. Features

Add a new job application
Edit existing job
Update status directly from the table
Pagination support (view jobs page by page)
Responsive design (works on mobile also)
Loader shown while loading data
Toast messages for success/error

6.  Assumptions

The backend provides the following endpoints:
GET /applications?pageNumber=1&pageSize=5
POST /applications
PUT /applications/:id

6. Date format used is ISO or convertible via JavaScript Date.