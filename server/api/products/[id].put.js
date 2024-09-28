import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
    const body = await readBody(event)
    const name = body.Name
    const details = body.Details

    const updateProduct = await prisma.products.update({
      where: {
        Id: parseInt(event.context.params.id)},
        data: {
            Name: name,
            Details: details,
          },
    });
    return updateProduct;
});
