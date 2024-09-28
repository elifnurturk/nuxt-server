import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const product = await prisma.products.findUnique(({
    where: {
      Id: parseInt(event.context.params.id)
    },
    //include: { author: true }
  }))
  return product;
});
  