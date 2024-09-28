// Event handler for DELETE request to delete a user
import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async () => {
  const prisma = new PrismaClient()
    try {
    const users = await prisma.users.findMany();
    return users;   
    } catch (error) {
      // Return error if fetching users fails
      return {
        status: 500,
        body: error.message
      };
    }
});
