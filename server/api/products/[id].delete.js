import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  try {
    const product = await prisma.products.delete({
      where: {
        Id: parseInt(event.context.params.id),
      },
    });
    return product;
  } catch (error) {
    return { error: error.message };
  }
});
