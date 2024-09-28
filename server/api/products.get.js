import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async () => {
  const prisma = new PrismaClient()
    try {
    const product = await prisma.products.findMany();
    return product;   
    } catch (error) {
      // Return error if fetching users fails
      return {
        status: 500,
        body: { message: 'Failed to fetch users' }
      };
    }
});
