import jwt from 'jsonwebtoken';

const JWT_SECRET = 'fba3d5271a6040c536b7e9f08ec553b5c9a9592740f3bacb8a980afb07a0711a'; // Ensure this is a secure, environment-based key

export default defineEventHandler(async (event) => {
  return
  /* const url = event.node.req.url;

  // Skip authentication for login and registration routes
  if (url.startsWith('/api/auth/login') || url.startsWith('/api/auth/register')) {
    return;
  }

  // Apply authentication only to API routes
  if (url.startsWith('/api/')) {
    const authHeader = event.node.req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      event.node.res.statusCode = 401;
      event.node.res.end('Unauthorized: No token provided');
      return;
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      event.context.user = decodedToken; // Attach user info to context
    } catch (error) {
      event.node.res.statusCode = 401;
      event.node.res.end('Unauthorized: Invalid or expired token');
    }
  } */
});
