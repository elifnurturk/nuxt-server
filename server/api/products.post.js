import { PrismaClient } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
    const { Name, Details } = await readBody(event)
  
    const product = await prisma.products.create({
      data: {
        Name, Details
      },
    })
    return product
  })