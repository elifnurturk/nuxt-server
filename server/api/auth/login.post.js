import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = ''; // Replace with your secret key

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // Find the user in the database
  const user = await prisma.admin.findUnique({
    where: { Username: username }
  });

  if (!user) {
    return { statusCode: 401, body: { success: false, message: 'Invalid username or password' } };
  }

  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, user.Password);

  if (!validPassword) {
    return { statusCode: 401, body: { success: false, message: 'Invalid username or password' } };
  }

  // Create a JWT token
  const token = jwt.sign(
    { id: user.Id, username: user.Username }, 
    JWT_SECRET, 
    { expiresIn: '48h' } // Token expires in 1 hour
  );

  // Optionally, store user info in session (if session-based authentication is needed)
  if (!event.context.session) {
    event.context.session = {}; // Initialize session if not already done
  }
  event.context.session.user = { id: user.Id, username: user.Username };

  // Return the token to the frontend
  return { 
    statusCode: 200, 
    body: { 
      success: true, 
      message: 'Login successful', 
      token 
    } 
  };
});
