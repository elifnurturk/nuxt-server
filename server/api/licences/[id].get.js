import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
        try {
          const licence = await prisma.licences.findUnique(({
            where: {
              Id: parseInt(event.context.params.id)
            },
          }))
          return licence;
        } catch (error) {
          return {
            status: 500,
            body: { message: 'Failed to fetch licence' }
          };
        }
    
  });
  