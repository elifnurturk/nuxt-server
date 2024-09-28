// Event handler for DELETE request to delete a user
import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async () => {
  const prisma = new PrismaClient()
    try {
    const licence = await prisma.licences.findMany();
    return licence;   
    } catch (error) {
      // Return error if fetching users fails
      return {
        status: 500,
        body: { message: 'Failed to fetch users' }
      };
    }
});
