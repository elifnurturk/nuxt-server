# server-with-nuxt
Fullstack Admin Dashboard
A fullstack web project for managing license keys, users, products, and logs. Built using Nuxt 3, PrimeVue, JavaScript/TypeScript, PostgreSQL, Prisma ORM, and TailwindCSS, the dashboard provides an efficient and secure environment for admin users to manage software licenses.

For  detailed tips on handling Nuxt 3 server logic and integrating API endpoints, check out my article on Medium, which also includes Postman screen examples for testing endpoints.
https://elifnurturk.medium.com/exploring-server-side-rendering-and-database-operations-in-nuxt-3-with-prisma-orm-39cb51e0bb2a

# Features<br />
• Licence Key Management: Create, update, and delete license keys.<br />
• User and Product Management: Manage users and products with a RESTful API that ensures unique email addresses.<br />
• Single-Device Login Enforcement: Each license key is restricted to one device at a time. If a new login is detected, the current session is terminated.<br />
• Type-safe Database Schemas: Prisma ORM ensures type-safe schemas, supporting relationships and migrations.<br />
• Action Logs: Admin and user action logs for tracking activities and ensuring accountability.<br />
• JWT Authentication: Secure admin authentication with JWT, integrated with a custom database.<br />
• Responsive Admin Dashboard: Built with PrimeVue and TailwindCSS for a modern, responsive UI.<br />
• Confirmation Popups: User-friendly confirmation popups for actions such as deletion, ensuring no accidental changes.<br />
<br /><br />

# Tech Stack<br />
- Frontend: Vue 3, Nuxt 3, PrimeVue, TailwindCSS, JavaScript/TypeScript <br />
- Backend: JavaScript/TypeScript, PostgreSQL, Prisma ORM, RESTful API<br />
- Authentication: JWT-based authentication using a custom admin database table<br />
- Database: PostgreSQL with Prisma ORM for migrations and schema management<br />
<br /><br />
Nuxt 3 Server: Insights and API Endpoints<br />
Nuxt 3 includes a built-in server, which allows you to create API routes without needing external backends like Express. It seamlessly integrates server-side rendering (SSR), static site generation (SSG), and API development into one framework.<br />

# Benefits of Nuxt 3 Server <br />
• Server-side Rendering (SSR): Improves SEO and initial page load times by rendering pages server-side.<br />
• API Routes: Nuxt provides a built-in API routing system that automatically handles HTTP requests based on the file structure inside the server/api directory.<br />
• TypeScript Support: Full TypeScript integration helps ensure type safety across your entire app, including API routes.<br />
• Automatic API Routing: Files in the server/api folder are automatically mapped to RESTful API routes.<br />
• Built-in Middleware: Nuxt supports middleware that you can use for authentication, logging, and other request-handling logic.<br />
• Creating API Endpoints in Nuxt 3<br />
Nuxt 3 makes it easy to create RESTful API endpoints by simply adding files to the server/api directory. These files automatically map to HTTP routes without the need for extra configuration.<br />

Example 1: POST Route (user.post.js)<br />
Create a server/api/user.post.js file to handle user creation.<br />

```
// server/api/user.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Parse request body
  const { name, email, password } = body;

  // Insert logic to add a user, e.g., using Prisma ORM
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password, // Use proper encryption for real-world applications
    },
  });

  return { success: true, user };
});
```
This file will automatically create an API route at POST /api/user. You can call this endpoint from the frontend or any external source.<br />

Example 2: Folder-based Routing (user/index.post.js)<br />
Nuxt 3 also supports folder-based routing. For example, you can place multiple methods (GET, POST, etc.) under the same folder.<br />

Create a folder server/api/user/ and add index.post.js for POST requests and index.get.js for GET requests.
```
// server/api/user/index.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email } = body;

  // Example: Logic to add a new user
  return { success: true, message: 'User created', data: { name, email } };
});
```
// server/api/user/index.get.js
```
export default defineEventHandler(async (event) => {
  // Example: Logic to retrieve all users
  const users = await prisma.user.findMany();
  return users;
});
```
This creates two routes:

POST /api/user: To create a new user.
GET /api/user: To retrieve all users.
Adding TypeScript to API Endpoints
Nuxt 3 supports TypeScript out-of-the-box, providing type safety across your API routes.

Example with TypeScript (user/index.post.ts):
```
// server/api/user/index.post.ts
interface User {
  name: string;
  email: string;
  password: string;
}
```
export default defineEventHandler(async (event): Promise<{ success: boolean, user?: User }> => {
  const body = await readBody<User>(event);

  const user: User = {
    name: body.name,
    email: body.email,
    password: 'body.password', // Hash the password before storing
  };

  return { success: true, user };
});
```
This adds type safety to the request body and the response, helping catch errors during development.

Error Handling in API Routes
Nuxt provides an easy way to handle errors in API routes using the createError function.


// server/api/user/index.post.js
```
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Email and password are required',
    });
  }

  // Example logic to create user
  return { success: true };
});

This will return a 400 Bad Request status code if the required fields are missing.

# Getting Started 
To run the project locally, follow these steps:

1. Clone the repository

```
git clone https://github.com/elifnurturk/nuxt-server.git
cd nuxt-server
```
2. Install the required packages
Make sure you have Node.js installed, then install the project dependencies:
```
npm install
```
3. Set up the environment variables
Copy the .env.example file to .env and update it with your database connection information and any other environment variables needed.

In your .env file, add your PostgreSQL database connection URL:


```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
JWT_SECRET=your_jwt_secret_here
```
Make sure to replace USER, PASSWORD, localhost, and DATABASE_NAME with your actual database connection details.

4. Handle the database connection and migrations
This project uses Prisma ORM for database schema management. After setting up your database connection in the .env file, you can run the database migrations to set up the required tables.

Run the following command to generate the Prisma client and apply migrations:
```
npx prisma migrate dev
```
This will:

Generate the Prisma client.
Create the database tables according to the defined schema.
Apply any existing migrations to ensure the database is up to date.
If you make any changes to your schema in the future, you can run:
```
npx prisma migrate dev
```
to create and apply new migrations.

5. Start the development server
Once the packages are installed and the database is set up, you can start the development server with:
```
npm run dev
```
