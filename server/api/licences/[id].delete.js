import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  try {
    const licence = await prisma.licences.delete({
      where: {
        Id: parseInt(event.context.params.id),
      },
    });
    return licence;
  } catch (error) {
    return { error: error.message };
  }
});
